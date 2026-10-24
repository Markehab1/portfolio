# Mark Ehab — Portfolio (project spec)

@AGENTS.md

This file is the source of truth for this project's content and design. Read it fully before every task.

**Next.js version:** this project uses Next.js 16 (see package.json). Before using any Next.js API (routing, `params`, metadata, `opengraph-image`, route handlers, `next/image`, `next/font`), read the matching guide in `node_modules/next/dist/docs/` as AGENTS.md says. If anything in this spec conflicts with those docs, follow the docs and tell me what you changed.

## How to work with me

- I am a front-end developer learning as I build. After every change, explain what you did and why, in simple English.
- Work on **one build step at a time** (see "Build plan"). Finish it, run the checks, then stop and wait for me.
- **Never invent facts** about me, my projects, clients or skills. All content comes from `src/data/`. If something is missing, ask me.
- Keep code simple and readable over clever. TypeScript strict, no `any`.
- Never put secrets (API keys) in code. Use `.env.local`, which must stay out of git.
- Do **not** add `Co-Authored-By` lines or any AI attribution to commits or pull requests.
- I use Windows and PowerShell. Give commands that work there.
- Before saying a step is done, run `npm run lint` and `npm run build`. Both must pass with no errors.

## Goal

A portfolio that gets me **freelance clients first** and **jobs/internships second**. Visitors should understand in 5 seconds: who I am, what I build, proof that I can do it, and how to hire me.

## Tech stack

- **Next.js** (App Router, `src/` directory) with **TypeScript**
- **Tailwind CSS v4**, CSS-first config with `@theme` in `src/app/globals.css` (no `tailwind.config` file)
- **next-themes** for light/dark mode (class strategy)
- **motion** (Framer Motion) for animations, imported from `motion/react`
- **Resend** for the contact form email
- **zod** for validating contact form input on the server
- **@vercel/analytics** for visitor analytics
- **playwright** (dev only) for capturing project screenshots
- Font: **Geist Sans** and **Geist Mono** via `next/font` (already set up by create-next-app)
- Hosting: **Vercel**, free `.vercel.app` address

Do not add other libraries without asking me. Brand icons (GitHub, LinkedIn, WhatsApp) are inline SVG components, not an icon library.

## Folder structure

```
src/
  app/
    layout.tsx              # fonts, ThemeProvider, Navbar, Footer, Analytics, metadata
    page.tsx                # home: Hero, About, Skills, Projects, Services, Contact
    globals.css             # Tailwind import, @theme tokens, dark variant
    not-found.tsx
    opengraph-image.tsx     # generated share image (name + title)
    sitemap.ts
    robots.ts
    projects/[slug]/page.tsx  # case-study page per project
    api/contact/route.ts    # POST handler that sends email with Resend
  components/
    navbar.tsx
    footer.tsx
    theme-provider.tsx
    theme-toggle.tsx
    section.tsx             # shared section wrapper (id, heading, spacing)
    reveal.tsx              # motion wrapper for scroll reveal
    project-card.tsx
    contact-form.tsx
    icons.tsx               # GitHub, LinkedIn, WhatsApp, Mail SVGs
    sections/
      hero.tsx
      about.tsx
      skills.tsx
      projects.tsx
      services.tsx
      contact.tsx
  data/
    site.ts                 # profile, links, about, skills, services
    projects.ts             # typed project list
public/
  avatar.jpg                # temporary photo
  Mark_Ehab_CV.pdf
  projects/<slug>/desktop.png
  projects/<slug>/mobile.png
scripts/
  screenshots.mjs
```

## Design

Clean and modern: lots of white space, one accent color, strong typography, subtle motion. References: vercel.com, linear.app.

### Color tokens (define in `@theme`, switch in dark mode)

| Token | Light | Dark |
| --- | --- | --- |
| background | `#FFFFFF` | `#0A0A0A` |
| surface (cards) | `#F8FAFC` | `#111113` |
| border | `#E5E7EB` | `#27272A` |
| text | `#0F172A` | `#F4F4F5` |
| muted text | `#475569` | `#A1A1AA` |
| accent | `#2563EB` | `#60A5FA` |
| accent text on accent button | `#FFFFFF` | `#0A0A0A` |

Dark mode in Tailwind v4: add `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css`, and use next-themes with `attribute="class"`, `defaultTheme="system"`, `enableSystem`. Add `suppressHydrationWarning` on `<html>`.

### Layout rules

- Max content width 1100px, centered, side padding 20px on mobile, 32px on desktop.
- Section vertical spacing: 96px desktop, 64px mobile.
- Mobile first. Must look right at 360px, 768px, 1024px and 1440px wide. No horizontal scroll at any width.
- Cards: 12px radius, 1px border, surface background, small lift on hover.
- Every interactive element has a visible focus ring (accent color).

### Motion rules

- Sections fade up 16px on first scroll into view (once, 0.5s, ease-out).
- Hover: cards lift 2–4px, buttons darken slightly.
- Respect `prefers-reduced-motion`: no movement, only instant opacity.
- No animation may delay the hero text from being readable.

## Content (use exactly; this lives in `src/data/`)

### Profile and links (`site.ts`)

- Name: **Mark Ehab**
- Title: **Front-End Developer**
- Location: **6th of October City, Egypt**
- Email: `markehabalfons@gmail.com`
- WhatsApp: `+20 120 161 5767` → link `https://wa.me/201201615767`
- LinkedIn: `https://www.linkedin.com/in/mark-ehab-453519389/`
- GitHub: `https://github.com/Markehab1`
- CV file: `/Mark_Ehab_CV.pdf`
- Availability badge: **Available for freelance work**

### Hero

- Small badge: "Available for freelance work" with a green dot
- Heading: **Hi, I'm Mark Ehab**
- Subheading: **Front-End Developer building fast, responsive websites.**
- Text: "I turn ideas and designs into clean, responsive code with React, Next.js and TypeScript. Available for freelance projects and internships."
- Buttons: **Hire me** (scrolls to #contact, accent) and **Download CV** (opens `/Mark_Ehab_CV.pdf`, outline)
- Small links row: GitHub, LinkedIn, Email icons
- Image: `/avatar.jpg` in a circle, 200px desktop, 140px mobile, using `next/image` with `priority`. The photo is temporary, so keep it easy to swap (one path in `site.ts`).

### About

"I'm a front-end developer and Computer Science student at Misr University for Science and Technology (MUST). I build fast, responsive websites that work on every screen.

I recently delivered a live website for a US-based medical transportation company, working directly with the client from the first draft through feedback rounds to deployment.

I'm currently learning Node.js to grow into full-stack development."

Small facts next to the text:
- Based in 6th of October City, Egypt
- B.Sc. Computer Science, MUST (expected 2029)
- Open to freelance and remote internships

### Skills (grouped)

- **Languages:** HTML5, CSS3, JavaScript (ES6+), TypeScript
- **Frameworks:** React, Next.js, Tailwind CSS, Bootstrap
- **Web:** Responsive Web Design, Flexbox, CSS Grid, REST APIs, DOM Manipulation, localStorage
- **Tools:** Git, GitHub, GitHub Pages, Vercel, npm, Figma, VS Code
- **Learning:** Node.js, Back-End Development (show with a "learning" label so it is clearly not a finished skill)

### Services (no prices)

1. **Landing pages** — "Responsive landing pages for products, events and campaigns."
2. **Business websites** — "Multi-page websites for small businesses and services, built to work on every screen."
3. **Design to code** — "Turning Figma designs into clean, responsive HTML/CSS or React."
4. **Fix and improve** — "Bug fixes, responsive fixes, speed and accessibility improvements for existing websites."

Below the cards: "Have a project in mind?" + **Let's talk** button to #contact.

### Contact

- Heading: **Let's work together**
- Text: "Tell me about your project and I'll get back to you within 24 hours."
- Form fields: Name, Email, Message (all required), plus a hidden honeypot field named `company` that must stay empty.
- Buttons beside the form: **WhatsApp** and **Email** (mailto).
- States: sending (button disabled, "Sending..."), success ("Thanks! I'll reply soon."), error ("Something went wrong. Please email me directly.").

### Projects (`projects.ts`)

Type:

```ts
export type Project = {
  slug: string;
  title: string;
  tag: "Client project" | "Personal project";
  summary: string;        // one line for the card
  stack: string[];
  liveUrl: string;
  codeUrl: string;
  overview: string;
  role: string;
  features: string[];
  challenges: { problem: string; solution: string }[];
  status?: string;        // optional note, e.g. work in progress
};
```

Order on the page: OZO, Weather App, To-Do List, Product Management System.

**1. OZO Transportation** — slug `ozo-transportation`
- tag: Client project
- summary: "Website for a US non-emergency medical transportation company."
- stack: HTML, CSS, JavaScript, GitHub Pages
- liveUrl: `https://markehab1.github.io/NEMT---OZO-Transprotation/`
- codeUrl: `https://github.com/Markehab1/NEMT---OZO-Transprotation`
- overview: "OZO Transportation is a non-emergency medical transportation company in Florida, USA. They needed a clear, mobile-friendly website that explains their services and lets patients request rides."
- role: "Freelance front-end developer. I worked directly with the client from the first draft through feedback rounds to deployment."
- features:
  - "Multi-page, responsive website that works on phones, tablets and desktops"
  - "Ride-request page with form validation"
  - "Deployed live on GitHub Pages"
- challenges:
  - problem: "First real client: requirements changed after each review." solution: "Kept the site live on GitHub Pages so the client could review each version, and applied feedback in rounds."
  - problem: "Making sure ride requests arrive complete and correct." solution: "Added form validation so visitors can't submit missing or invalid details."- status: "The ride-request page is still being finalized with the client."

**2. Weather App** — slug `weather-app`
- tag: Personal project
- summary: "Search any city for live weather, with clear loading and error states."
- stack: JavaScript, OpenWeatherMap API, HTML, CSS
- liveUrl: `https://markehab1.github.io/Weather-App/`
- codeUrl: `https://github.com/Markehab1/Weather-App`
- overview: "A responsive weather app that fetches live data from the OpenWeatherMap API for any city."
- role: "Designed and built it on my own."
- features:
  - "Search by button or Enter key"
  - "Temperature, weather description, humidity, wind speed and country, with a matching icon"
  - "Loading indicator while data is fetched"
  - "Different messages for an unknown city, API errors, too many requests and no internet"
  - "Responsive layout that respects reduced-motion settings"
- challenges:
  - problem: "The API returns wind speed in meters per second." solution: "Converted it to km/h (multiply by 3.6) so users see the unit they expect."
  - problem: "Every failure looked the same to the user." solution: "Checked the response status to show specific messages for 404, 401, 429 and network errors."
  - problem: "On a static site the API key has to live in client-side code, where anyone can see it." solution: "Replaced the exposed key with a new free-tier key. Next step: move the request to a serverless function so the key stays private."

**3. To-Do List** — slug `to-do-list`
- tag: Personal project
- summary: "Task manager with editing, completed tab and saved progress."
- stack: JavaScript, HTML, CSS, localStorage
- liveUrl: `https://markehab1.github.io/To-Do-List/`
- codeUrl: `https://github.com/Markehab1/To-Do-List`
- overview: "A to-do app for adding, editing, completing and deleting tasks, with everything saved in the browser."
- role: "Designed and built it on my own."
- features:
  - "Add, edit, complete and delete tasks"
  - "Visible edit button plus double-click to edit; Enter saves, Escape cancels"
  - "Tasks and Completed tabs with smooth animations"
  - "Data saved in localStorage, so tasks stay after a reload"
- challenges:
  - problem: "Editing by double-click alone was hidden from users." solution: "Added a visible edit button and kept double-click as a shortcut."
  - problem: "Keeping the screen and saved data in sync." solution: "Updated the task list and saved it to localStorage after every change."

**4. Product Management System** — slug `product-management-system`
- tag: Personal project
- summary: "CRUD app for managing products, with search and automatic totals."
- stack: JavaScript, HTML, CSS, localStorage
- liveUrl: `https://markehab1.github.io/Product-management-system-CRUDS-/`
- codeUrl: `https://github.com/Markehab1/Product-management-system-CRUDS-`
- overview: "A product management dashboard to create, view, update and delete products."
- role: "Designed and built it on my own."
- features:
  - "Create, read, update and delete products"
  - "Live total (price + taxes + ads − discount) with a color indicator"
  - "Bulk create: add up to 100 copies of a product at once"
  - "Live search by title or category"
  - "Delete All button showing the product count"
  - "Data saved in localStorage"
- challenges:
  - problem: "Keeping the total correct while the user types." solution: "Recalculated the total on every keystroke in the price fields."
  - problem: "Data disappeared on page reload." solution: "Saved products to localStorage and loaded them on start."

### Project card

Screenshot (desktop image) on top, tag, title, summary, stack chips, and links: **Case study** (to `/projects/<slug>`), **Live**, **Code**. External links open in a new tab with `rel="noopener noreferrer"`.

### Case-study page (`/projects/[slug]`)

Use `generateStaticParams` and `generateMetadata`. Sections: back link, title + tag, summary, Live and Code buttons, desktop screenshot, Overview, My role, Features, Challenges (problem → solution), Tech stack, mobile screenshot, status note if present, and a "Next project" link at the bottom. Unknown slug → `notFound()`.

## Features

### Navbar

Sticky, blurred background, bottom border on scroll. Links: About, Skills, Projects, Services, Contact (anchor links to section ids). Right side: theme toggle and **Download CV** button. On mobile: a menu button that opens an accessible menu (closes on link click and on Escape).

### Contact API (`src/app/api/contact/route.ts`)

- `POST` with JSON `{ name, email, message, company }`.
- Validate with zod: name 2–80 chars, valid email, message 10–2000 chars.
- If `company` (honeypot) is filled, return 200 and send nothing.
- Send with Resend from `onboarding@resend.dev` to `process.env.CONTACT_TO_EMAIL`, subject `New portfolio message from <name>`, `replyTo` set to the visitor's email.
- Env vars in `.env.local`: `RESEND_API_KEY`, `CONTACT_TO_EMAIL=markehabalfons@gmail.com`. Add a `.env.example` with empty values, and add the line `!.env.example` to `.gitignore` (it currently ignores all `.env*` files) so the example is committed but `.env.local` never is.
- Important: on Resend's free tier without a verified domain, `onboarding@resend.dev` can only send to the email that owns the Resend account. Mark must sign up to Resend with `markehabalfons@gmail.com`.
- Return 400 for invalid input, 500 if sending fails, 200 on success. Never expose the API key or error details to the client.

### SEO and sharing

- `metadataBase` from `process.env.NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3000`).
- Title template `%s | Mark Ehab`, default title `Mark Ehab — Front-End Developer`.
- Description: "Front-end developer building fast, responsive websites with React, Next.js and TypeScript. Available for freelance projects and internships."
- `opengraph-image.tsx` with `ImageResponse`: name, title, accent color, 1200×630.
- `sitemap.ts` (home + every project page) and `robots.ts`.
- Each case-study page has its own title and description.

### Analytics

Add `<Analytics />` from `@vercel/analytics/next` in the root layout.

### Screenshots (`scripts/screenshots.mjs`)

Setup once: `npm i -D playwright` then `npx playwright install chromium`.

Run locally with `node scripts/screenshots.mjs`. Using Playwright Chromium:
- For each project, open `liveUrl` at 1440×900 and save `public/projects/<slug>/desktop.png`, then at 390×844 (mobile) and save `mobile.png`.
- Wait for network idle plus 1 second before each capture.
- For the Weather App only: type `Cairo` in `#cityInput`, press Enter, and wait for the results to show before capturing.
- Add `"screenshots": "node scripts/screenshots.mjs"` to package.json scripts.

## Quality bar (must pass before launch)

- Lighthouse 95+ in Performance, Accessibility, Best Practices and SEO, on mobile and desktop.
- All images use `next/image` with correct `sizes`; hero image has `priority`.
- Semantic HTML: one `h1`, ordered headings, `<nav>`, `<main>`, `<footer>`, labelled form fields, `alt` text on every image.
- Color contrast meets WCAG AA in both themes.
- Keyboard: everything reachable with Tab, visible focus, mobile menu usable with keyboard.
- No console errors, `npm run lint` and `npm run build` pass.
- Every link in `site.ts` and `projects.ts` opens the correct page.

## Build plan (one step per session)

1. **Setup:** install dependencies, globals.css tokens and dark variant, ThemeProvider, theme toggle, Navbar, Footer, Section wrapper, data files with all content above. Home page shows empty sections with headings.
2. **Hero, About, Skills** sections.
3. **Projects:** screenshot script and images, project cards, case-study pages.
4. **Services and Contact:** services cards, contact form, API route with Resend.
5. **Polish:** motion animations, SEO, Open Graph image, sitemap, robots, analytics, not-found page.
6. **Quality and launch:** responsive check at all widths, Lighthouse fixes, push to GitHub, deploy on Vercel, set env vars on Vercel, set `NEXT_PUBLIC_SITE_URL`.

After each step: summarize what changed in simple words, list files touched, and suggest a commit message.
