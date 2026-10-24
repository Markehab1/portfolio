"use client";

import { useLayoutEffect, useState, type FormEvent } from "react";
import { contact } from "@/data/site";
import { buttonPrimary } from "./styles";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-2 block w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground placeholder:text-muted/70 transition-colors focus:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  // Next.js keeps pages alive when you navigate away (Cache Components).
  // Clear an old success/error message so it isn't still there when you come back.
  useLayoutEffect(() => {
    return () => setStatus("idle");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5 rounded-xl border border-border bg-surface p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from people, but spam bots fill it in. Must stay empty. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={sending}
          className={`${buttonPrimary} disabled:cursor-not-allowed disabled:opacity-70`}
        >
          {sending ? contact.sending : contact.submit}
        </button>

        {/* role="status" makes screen readers announce the result */}
        <p role="status" className="text-sm">
          {status === "success" && (
            <span className="text-emerald-700 dark:text-emerald-400">{contact.success}</span>
          )}
          {status === "error" && (
            <span className="text-red-700 dark:text-red-400">{contact.error}</span>
          )}
        </p>
      </div>
    </form>
  );
}
