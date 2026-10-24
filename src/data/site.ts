// All personal content for the site lives here.
// Change text in this file instead of inside the components.

export const profile = {
  name: "Mark Ehab",
  title: "Front-End Developer",
  location: "6th of October City, Egypt",
  availability: "Available for freelance work",
  // Temporary photo. To swap it, replace the file or change this path.
  avatar: "/avatar.jpg",
  cv: "/Mark_Ehab_CV.pdf",
};

// The live address of this site. Set NEXT_PUBLIC_SITE_URL on Vercel after deploying.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const links = {
  email: "markehabalfons@gmail.com",
  emailHref: "mailto:markehabalfons@gmail.com",
  whatsapp: "+20 120 161 5767",
  whatsappHref: "https://wa.me/201201615767",
  linkedin: "https://www.linkedin.com/in/mark-ehab-453519389/",
  github: "https://github.com/Markehab1",
};

export type NavLink = {
  label: string;
  href: string;
};

// "/#about" (not just "#about") so the links also work from case-study pages.
export const navLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  heading: "Hi, I'm Mark Ehab",
  subheading: "Front-End Developer building fast, responsive websites.",
  text: "I turn ideas and designs into clean, responsive code with React, Next.js and TypeScript. Available for freelance projects and internships.",
  primaryButton: "Hire me",
  secondaryButton: "Download CV",
};

export const about = {
  title: "About",
  paragraphs: [
    "I'm a front-end developer and Computer Science student at Misr University for Science and Technology (MUST). I build fast, responsive websites that work on every screen.",
    "I recently delivered a live website for a US-based medical transportation company, working directly with the client from the first draft through feedback rounds to deployment.",
    "I'm currently learning Node.js to grow into full-stack development.",
  ],
  facts: [
    "Based in 6th of October City, Egypt",
    "B.Sc. Computer Science, MUST (expected 2029)",
    "Open to freelance and remote internships",
  ],
};

export type SkillGroup = {
  name: string;
  skills: string[];
  // true = still learning, shown with a "learning" label
  learning?: boolean;
};

export const skills: { title: string; groups: SkillGroup[] } = {
  title: "Skills",
  groups: [
    {
      name: "Languages",
      skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"],
    },
    {
      name: "Frameworks",
      skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap"],
    },
    {
      name: "Web",
      skills: [
        "Responsive Web Design",
        "Flexbox",
        "CSS Grid",
        "REST APIs",
        "DOM Manipulation",
        "localStorage",
      ],
    },
    {
      name: "Tools",
      skills: ["Git", "GitHub", "GitHub Pages", "Vercel", "npm", "Figma", "VS Code"],
    },
    {
      name: "Learning",
      skills: ["Node.js", "Back-End Development"],
      learning: true,
    },
  ],
};

export const projectsSection = {
  title: "Projects",
};

export type Service = {
  title: string;
  description: string;
};

export const services: { title: string; items: Service[]; ctaText: string; ctaButton: string } = {
  title: "Services",
  items: [
    {
      title: "Landing pages",
      description: "Responsive landing pages for products, events and campaigns.",
    },
    {
      title: "Business websites",
      description:
        "Multi-page websites for small businesses and services, built to work on every screen.",
    },
    {
      title: "Design to code",
      description: "Turning Figma designs into clean, responsive HTML/CSS or React.",
    },
    {
      title: "Fix and improve",
      description:
        "Bug fixes, responsive fixes, speed and accessibility improvements for existing websites.",
    },
  ],
  ctaText: "Have a project in mind?",
  ctaButton: "Let's talk",
};

export const contact = {
  title: "Let's work together",
  text: "Tell me about your project and I'll get back to you within 24 hours.",
  submit: "Send message",
  sending: "Sending...",
  success: "Thanks! I'll reply soon.",
  error: "Something went wrong. Please email me directly.",
};
