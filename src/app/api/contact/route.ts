import { Resend } from "resend";
import { z } from "zod";

// What a valid message looks like. Checked on the server, because
// browser checks can be skipped by anyone.
const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email(),
  message: z.string().trim().min(10).max(2000),
});

// The hidden "company" field. Real visitors never see it, so if it has a value it's a bot.
const honeypotSchema = z.object({ company: z.string().min(1) });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bot detected: pretend it worked, but send nothing.
  if (honeypotSchema.safeParse(body).success) {
    return Response.json({ ok: true });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Please check your details." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    // Logged on the server only. The visitor just sees a general error.
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return Response.json({ error: "Could not send message." }, { status: 500 });
  }

  const { name, email, message } = result.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      subject: `New portfolio message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Contact form: Resend returned an error.", error);
      return Response.json({ error: "Could not send message." }, { status: 500 });
    }
  } catch (error) {
    console.error("Contact form: sending failed.", error);
    return Response.json({ error: "Could not send message." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
