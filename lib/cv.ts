export const contact = {
  name: "SMDev",
  email: "smdev.development@gmail.com",
  phone: "+381 69 199 4022",
  phoneHref: "+381691994022",
  linkedin: "https://www.linkedin.com/in/sini%C5%A1a-mi%C5%A1kovi%C4%87-08aa44144/",
};

export const projects = [
  { id: "curoflow", name: "Curoflow", category: ["Healthcare platform", "Zdravstvena platforma"], role: "Fullstack", tech: ["React", "TypeScript", "Express.js"], en: "Developing modules for a platform connecting clinics, patients and doctors, across React/TypeScript interfaces and Express.js backend services.", sr: "Razvoj modula platforme koja povezuje klinike, pacijente i lekare, kroz React/TypeScript interfejse i Express.js backend servise." },
  { id: "mojstcable", name: "MojSTCable", category: ["Customer self-service", "Korisnički portal"], role: "Fullstack", tech: ["Next.js", "Lumen", "MySQL", "Docker", "GitLab CI/CD"], en: "Built frontend features and backend integrations for payments, account status checks and synchronization with a central customer database.", sr: "Razvoj frontend funkcionalnosti i backend integracija za plaćanja, proveru statusa naloga i sinhronizaciju sa centralnom bazom korisnika." },
  { id: "tsc", name: "TSC Ticketing System", category: ["Stadium ticketing", "Stadionske ulaznice"], role: "Backend", tech: ["Lumen", "Laravel", "Node.js", "WebSockets", "MySQL", "Docker"], en: "Developed services for ticket generation and synchronization, match workflows and pre-entry ticket management, with technical support for PDA validation and entrance-gate integrations.", sr: "Razvoj servisa za generisanje i sinhronizaciju ulaznica, upravljanje utakmicama i pripremu ulaska, uz tehničku podršku za PDA validaciju i integracije sa ulaznim kapijama." },
  { id: "crm", name: "Sattrakt CRM", category: ["Internal CRM", "Interni CRM"], role: "Backend", tech: ["Lumen", "Laravel", "PHP", "MySQL", "MongoDB", "Docker"], en: "Built and maintained backend services for customer accounts and third-party integrations, connecting internal platforms into a unified workflow.", sr: "Razvoj i održavanje backend servisa za korisničke naloge i integracije sa spoljnim sistemima, uz povezivanje internih platformi u jedinstven tok rada." },
  { id: "fleet", name: "Fleet Tracking System", category: ["Vehicle operations", "Praćenje vozila"], role: "Fullstack", tech: ["Next.js", "Lumen", "Laravel", "Material UI", "MySQL", "Docker"], en: "An internal real-time vehicle tracking project with fuel monitoring, speed and zone alerts, and vehicle inventory service notifications.", sr: "Interni projekat za praćenje vozila u realnom vremenu, sa nadzorom goriva, upozorenjima za brzinu i zone i obaveštenjima o servisiranju vozila." },
  { id: "memorial", name: "Memorial", category: ["Memorial platform", "Memorijalna platforma"], role: "Fullstack", tech: ["Next.js", "Lumen", "Semantic UI", "MySQL", "Docker"], en: "Created the interface and built registration, memorial-page creation and online payments for a platform for sharing memorial information.", sr: "Izrada interfejsa, registracije, kreiranja memorijalnih stranica i online plaćanja za platformu za deljenje memorijalnih informacija." },
  { id: "hotspot", name: "ST Hotspot Login", category: ["Public Wi-Fi access", "Pristup javnoj Wi-Fi mreži"], role: "Fullstack", tech: ["PHP", "Laravel", "MySQL", "Tailwind", "Microservices"], en: "Created login, email verification, error and success screens, with server-side storage and email verification for public Wi-Fi access.", sr: "Izrada ekrana za prijavu, verifikaciju emaila, greške i potvrdu pristupa, uz serversko čuvanje podataka i email verifikaciju za javni Wi-Fi." },
  { id: "epg", name: "STTV EPG API", category: ["TV data service", "Servis TV podataka"], role: "Backend", tech: ["PHP", "Laravel", "MongoDB", "XML", "Microservices"], en: "A service that parses EPG data from external grabbers and generates a new XML format for mobile, web and OTT TV applications.", sr: "Servis koji obrađuje EPG podatke iz spoljnih izvora i generiše novi XML format za mobilne, web i OTT TV aplikacije." },
  { id: "stcable", name: "STCable", category: ["Business website", "Poslovni sajt"], role: "Fullstack", tech: ["Next.js", "Lumen", "Semantic UI", "MySQL", "Docker", "GitLab CI/CD"], en: "Developed pages from Figma designs for offers, promotions and company information, using Lumen microservice APIs and backend-driven content.", sr: "Razvoj stranica prema Figma dizajnu za ponude, promocije i informacije, uz Lumen mikroservisne API-je i sadržaj kojim upravlja backend." },
];

export const cvCopy = {
  en: {
    nav: "Selected Work", kicker: "Selected engineering work", title: "Real projects. Practical problems.", intro: "My contribution across healthcare, customer platforms, internal tools and connected services.", concept: "Illustrative interface concept — not a screenshot of the delivered product.", contribution: "My contribution", details: "Explore project", close: "Close project", location: "Bečej, Serbia", direct: "Or get in touch directly", profile: "SMDev brings 7+ years of fullstack development experience across React, Next.js, Laravel, Lumen and Node.js. The focus is on clean architecture, performance and maintainable code.",
    jobs: [
      ["2026 — Present", "Fullstack Developer", "Developing Curoflow features across frontend interfaces and backend services, with attention to dependable healthcare workflows."],
      ["2021 — 2026", "Fullstack Developer", "Delivered frontend and backend features, resolved production issues and improved web applications and internal tools."],
      ["2021", "Frontend Developer", "Built responsive interfaces from predefined designs, collaborating with the frontend team on cross-browser implementation."],
      ["2019 — 2021", "Backend Developer", "Developed backend services, wrote unit tests, managed databases and maintained technical documentation."],
    ],
  },
  sr: {
    nav: "Projekti", kicker: "Odabrani razvojni projekti", title: "Stvarni projekti. Konkretni problemi.", intro: "Moj doprinos zdravstvenim platformama, korisničkim portalima, internim alatima i povezanim servisima.", concept: "Ilustrativni koncept interfejsa — nije snimak realizovanog proizvoda.", contribution: "Moj doprinos", details: "Istraži projekat", close: "Zatvori projekat", location: "Bečej, Srbija", direct: "Ili me kontaktirajte direktno", profile: "SMDev donosi više od 7 godina iskustva u fullstack razvoju sa React, Next.js, Laravel, Lumen i Node.js tehnologijama. Fokus je na jasnoj arhitekturi, performansama i kodu koji se lako održava.",
    jobs: [
      ["2026 — danas", "Fullstack developer", "Razvoj Curoflow funkcionalnosti kroz frontend interfejse i backend servise, uz pažnju posvećenu pouzdanim zdravstvenim procesima."],
      ["2021 — 2026", "Fullstack developer", "Razvoj frontend i backend funkcionalnosti, rešavanje produkcionih problema i unapređivanje web aplikacija i internih alata."],
      ["2021", "Frontend developer", "Izrada responzivnih interfejsa prema gotovim dizajnima, u saradnji sa frontend timom, uz podršku za različite pregledače."],
      ["2019 — 2021", "Backend developer", "Razvoj backend servisa, pisanje unit testova, upravljanje bazama podataka i održavanje tehničke dokumentacije."],
    ],
  },
};
