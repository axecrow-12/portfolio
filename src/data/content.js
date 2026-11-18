// All editable site content lives here.

export const links = {
  github: "https://github.com/axecrow-12",
  linkedin: "https://www.linkedin.com/in/wilmar-macheke-597934352",
  email: "axecrow12@gmail.com",
  cv: `${import.meta.env.BASE_URL}Wilmar-CV.pdf`,
};

// status: "Live" | "Built" | "In Progress" | "Concept + Build"
export const projects = [
  {
    title: "Level Up Lounge",
    description:
      "Point of sale and reporting system for a gaming arcade. Staff record sessions and sales, while admins manage packages, watch transactions arrive in real time and export daily closing reports.",
    tech: ["React", "Spring Boot", "PostgreSQL", "WebSockets", "JWT"],
    status: "Live",
    live: "https://level-up-lounge-weld.vercel.app",
    category: ["Web", "React", "Java"],
  },
  {
    title: "Sparkle & Slay",
    description:
      "Online store for a Harare fashion boutique, with a product catalogue, an admin panel for managing collections, and EcoCash checkout that confirms every payment directly with EcoCash before accepting it.",
    tech: ["JavaScript", "PHP", "MySQL", "EcoCash API"],
    status: "Live",
    live: "https://sparkleandslay.net",
    category: ["Web", "PHP"],
  },
  {
    title: "Pique Squid Cyber",
    description:
      "Marketing and lead generation site for the cybersecurity division of Pique Squid, covering managed SOC, cloud security, AI governance and awareness training, with a multi step quote wizard.",
    tech: ["HTML", "CSS", "Bootstrap 5", "JavaScript"],
    status: "Live",
    live: "https://cyber.piquesquid.com",
    category: ["Web"],
  },
  {
    title: "FarmRoute",
    description:
      "Offline first Android app that diagnoses crop diseases from a photo of a leaf, entirely on the phone. Each diagnosis is tagged to the farmer's field by GPS and synced later when a connection is available.",
    tech: ["Java", "Android", "TensorFlow Lite", "CameraX", "Room"],
    status: "Built",
    github: "https://github.com/axecrow-12/farm-route",
    category: ["Android", "Java", "Machine Learning"],
  },
  {
    title: "SmartPay Shield",
    description:
      "Fraud detection for Zimbabwe mobile money. Every EcoCash payment is scored live by a LightGBM model plus local fraud rules, with an explainable risk score and passkey verification for risky transactions.",
    tech: ["Node.js", "Python", "FastAPI", "LightGBM", "Firebase"],
    status: "Built",
    category: ["Web", "Machine Learning"],
  },
  {
    title: "ICLPSM CMS",
    description:
      "Content management system for a professional body in Harare, turning a 61 page static website into a database backed site with a schema driven admin console.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    status: "In Progress",
    category: ["Web", "PHP"],
  },
  {
    title: "LocationTracker",
    description:
      "Android application for GPS tracking, geofencing, push notifications, and Google Maps navigation. Implements real-time location updates with background service support.",
    tech: ["Java", "Android", "Room", "Google Maps API"],
    status: "Built",
    github: "https://github.com/axecrow-12/LocationTracker",
    category: ["Android", "Java"],
  },
  {
    title: "KuraVizor",
    description:
      "Offline-first farm intelligence platform designed for low-connectivity environments. Provides practical agricultural analytics, crop tracking, and decision support with full offline capability.",
    tech: ["TypeScript", "React", "PostgreSQL", "Prisma"],
    status: "In Progress",
    github: "https://github.com/axecrow-12/kuravisor",
    category: ["Web", "TypeScript", "React"],
  },
  {
    title: "Agrovia 2.0",
    description:
      "Collaborative agriculture platform enabling farmer coordination, resource sharing, market access, and analytics. Designed to connect smallholder farmers with tools for collective growth.",
    tech: ["React", "Spring Boot", "MySQL"],
    status: "Concept + Build",
    github: "https://github.com/axecrow-12/Agrovia_2.0",
    category: ["Web", "React", "Java"],
  },
];

export const statusBadge = {
  Live: "badge-live",
  Built: "badge-built",
  "In Progress": "badge-progress",
  "Concept + Build": "badge-concept",
};

export const skillGroups = [
  {
    title: "Mobile",
    items: ["Java", "Android SDK", "Room", "CameraX", "Google Maps API", "Gradle"],
  },
  {
    title: "Web & Backend",
    items: [
      "React", "TypeScript", "JavaScript", "Spring Boot", "Node.js",
      "PHP", "Laravel", "REST APIs", "WebSockets",
    ],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "MySQL", "Prisma ORM", "Firebase"],
  },
  {
    title: "Machine Learning",
    items: ["Python", "FastAPI", "TensorFlow Lite", "LightGBM"],
  },
  {
    title: "Tooling",
    items: ["Git & GitHub", "GitHub Actions", "Vite"],
  },
];

export const education = [
  {
    title: "BTech Software Engineering",
    place: "Harare Institute of Technology",
    period: "Current",
  },
];

export const phrases = [
  "building offline-first platforms",
  "solving real problems with code",
  "developing Android applications",
  "engineering for impact",
];
