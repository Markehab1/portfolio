export type Project = {
  slug: string;
  title: string;
  tag: "Client project" | "Personal project";
  summary: string; // one line for the card
  stack: string[];
  liveUrl: string;
  codeUrl: string;
  overview: string;
  role: string;
  features: string[];
  challenges: { problem: string; solution: string }[];
  status?: string; // optional note, e.g. work in progress
};

// The order here is the order on the page.
export const projects: Project[] = [
  {
    slug: "ozo-transportation",
    title: "OZO Transportation",
    tag: "Client project",
    summary: "Website for a US non-emergency medical transportation company.",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    liveUrl: "https://markehab1.github.io/NEMT---OZO-Transprotation/",
    codeUrl: "https://github.com/Markehab1/NEMT---OZO-Transprotation",
    overview:
      "OZO Transportation is a non-emergency medical transportation company in Florida, USA. They needed a clear, mobile-friendly website that explains their services and lets patients request rides.",
    role: "Freelance front-end developer. I worked directly with the client from the first draft through feedback rounds to deployment.",
    features: [
      "Multi-page, responsive website that works on phones, tablets and desktops",
      "Ride-request page with form validation",
      "Deployed live on GitHub Pages",
    ],
    challenges: [
      {
        problem: "First real client: requirements changed after each review.",
        solution:
          "Kept the site live on GitHub Pages so the client could review each version, and applied feedback in rounds.",
      },
      {
        problem: "Making sure ride requests arrive complete and correct.",
        solution:
          "Added form validation so visitors can't submit missing or invalid details.",
      },
    ],
    status: "The ride-request page is still being finalized with the client.",
  },
  {
    slug: "weather-app",
    title: "Weather App",
    tag: "Personal project",
    summary: "Search any city for live weather, with clear loading and error states.",
    stack: ["JavaScript", "OpenWeatherMap API", "HTML", "CSS"],
    liveUrl: "https://markehab1.github.io/Weather-App/",
    codeUrl: "https://github.com/Markehab1/Weather-App",
    overview:
      "A responsive weather app that fetches live data from the OpenWeatherMap API for any city.",
    role: "Designed and built it on my own.",
    features: [
      "Search by button or Enter key",
      "Temperature, weather description, humidity, wind speed and country, with a matching icon",
      "Loading indicator while data is fetched",
      "Different messages for an unknown city, API errors, too many requests and no internet",
      "Responsive layout that respects reduced-motion settings",
    ],
    challenges: [
      {
        problem: "The API returns wind speed in meters per second.",
        solution:
          "Converted it to km/h (multiply by 3.6) so users see the unit they expect.",
      },
      {
        problem: "Every failure looked the same to the user.",
        solution:
          "Checked the response status to show specific messages for 404, 401, 429 and network errors.",
      },
      {
        problem:
          "On a static site the API key has to live in client-side code, where anyone can see it.",
        solution:
          "Replaced the exposed key with a new free-tier key. Next step: move the request to a serverless function so the key stays private.",
      },
    ],
  },
  {
    slug: "to-do-list",
    title: "To-Do List",
    tag: "Personal project",
    summary: "Task manager with editing, completed tab and saved progress.",
    stack: ["JavaScript", "HTML", "CSS", "localStorage"],
    liveUrl: "https://markehab1.github.io/To-Do-List/",
    codeUrl: "https://github.com/Markehab1/To-Do-List",
    overview:
      "A to-do app for adding, editing, completing and deleting tasks, with everything saved in the browser.",
    role: "Designed and built it on my own.",
    features: [
      "Add, edit, complete and delete tasks",
      "Visible edit button plus double-click to edit; Enter saves, Escape cancels",
      "Tasks and Completed tabs with smooth animations",
      "Data saved in localStorage, so tasks stay after a reload",
    ],
    challenges: [
      {
        problem: "Editing by double-click alone was hidden from users.",
        solution: "Added a visible edit button and kept double-click as a shortcut.",
      },
      {
        problem: "Keeping the screen and saved data in sync.",
        solution:
          "Updated the task list and saved it to localStorage after every change.",
      },
    ],
  },
  {
    slug: "product-management-system",
    title: "Product Management System",
    tag: "Personal project",
    summary: "CRUD app for managing products, with search and automatic totals.",
    stack: ["JavaScript", "HTML", "CSS", "localStorage"],
    liveUrl: "https://markehab1.github.io/Product-management-system-CRUDS-/",
    codeUrl: "https://github.com/Markehab1/Product-management-system-CRUDS-",
    overview:
      "A product management dashboard to create, view, update and delete products.",
    role: "Designed and built it on my own.",
    features: [
      "Create, read, update and delete products",
      "Live total (price + taxes + ads − discount) with a color indicator",
      "Bulk create: add up to 100 copies of a product at once",
      "Live search by title or category",
      "Delete All button showing the product count",
      "Data saved in localStorage",
    ],
    challenges: [
      {
        problem: "Keeping the total correct while the user types.",
        solution: "Recalculated the total on every keystroke in the price fields.",
      },
      {
        problem: "Data disappeared on page reload.",
        solution: "Saved products to localStorage and loaded them on start.",
      },
    ],
  },
];
