import type { Locale } from "@/lib/content";
import "./business-websites.css";

const content = {
  sr: {
    kicker: "SMDev / POSLOVNI SAJTOVI",
    title: "Izrada poslovnih sajtova za male firme",
    intro: "Kada neko traži vašu uslugu, sajt treba brzo da pokaže čime se bavite, zašto da vam veruje i kako da vas kontaktira. SMDev pravi sajtove oko tih konkretnih pitanja, uz dizajn koji odgovara vašem poslu.",
    catalog: "Pogledajte primere dizajna", contact: "Razgovarajmo o sajtu", home: "Početna", detail: "Izrada sajtova",
    situationsTitle: "Kada je vreme za novi sajt?", situations: [
      ["Nemate svoje online mesto", "Posetioci vas pronalaze preko društvenih mreža, ali ne mogu na jednom mestu da vide usluge, radno vreme i kontakt."],
      ["Postojeći sajt ne objašnjava ponudu", "Informacije su zastarele, teško se čitaju na telefonu ili posetiocu nije jasan sledeći korak."],
      ["Posao je prerastao stari prikaz", "Imate nove usluge, proizvode ili način rada i potrebno vam je jasnije predstavljanje."],
    ],
    scopeTitle: "Šta sajt može da obuhvati", scopeIntro: "Konačan obim određujemo prema vašem poslu. Za većinu malih firmi polazimo od sledećih delova:",
    scope: [
      ["Jasna ponuda", "Stranice za usluge ili proizvode, sa odgovorima na pitanja koja kupci zaista postavljaju."],
      ["Prikaz na telefonu", "Navigacija, tipografija i forme koje rade i na manjim ekranima."],
      ["Kontakt i lokacija", "Vidljiv poziv na akciju, kontakt forma i mapa kada je fizička lokacija važna."],
      ["Sadržaj koji možete održavati", "Po potrebi planiramo jednostavan način za izmenu teksta, fotografija ili ponude."],
    ],
    processTitle: "Kako nastaje sajt", process: [
      ["Razgovor", "Razumemo publiku, usluge i cilj sajta."],
      ["Struktura i sadržaj", "Određujemo stranice i poruke pre dizajna."],
      ["Dizajn i razvoj", "Pravimo responzivan sajt i proveravamo važne tokove."],
      ["Objava i dalji rad", "Postavljamo sajt i dogovaramo naredna poboljšanja."],
    ],
    faqTitle: "Česta pitanja", faq: [
      ["Da li mogu da krenem od dizajna iz kataloga?", "Da. Primer je polazni pravac; tekst, fotografije, boje i funkcije prilagođavamo vašoj firmi."],
      ["Šta je potrebno od mene za početak?", "Dovoljno je da opišete posao, usluge i cilj. Postojeće fotografije i tekstovi pomažu, ali sadržaj možemo zajedno strukturirati."],
      ["Možete li unaprediti moj postojeći sajt?", "Da. Najpre pogledamo šta već radi dobro, a zatim dogovorimo redizajn ili tehnička poboljšanja."],
      ["Koliko traje izrada?", "Zavisi od broja stranica, spremnosti sadržaja i potrebnih funkcija. Posle kratkog razgovora možemo definisati realan plan."],
    ],
    endTitle: "Sajt treba da olakša sledeći korak.", endText: "Pogledajte primere ili pošaljite kratak opis posla. Predložiću smer koji odgovara vašim potrebama.",
  },
  en: {
    kicker: "SMDev / BUSINESS WEBSITES",
    title: "Business websites for small companies",
    intro: "When someone looks for your service, your website should quickly show what you do, why they can trust you and how to get in touch. SMDev builds websites around those practical questions, with a design that fits your business.",
    catalog: "Explore website designs", contact: "Discuss your website", home: "Home", detail: "Business websites",
    situationsTitle: "When is it time for a new website?", situations: [
      ["You have no place of your own online", "People find you on social media, but cannot see your services, opening hours and contact details in one clear place."],
      ["Your current site hides the offer", "Information is dated, difficult to read on a phone or leaves visitors unsure what to do next."],
      ["Your business has moved on", "New services, products or ways of working need a clearer presentation."],
    ],
    scopeTitle: "What the website can include", scopeIntro: "We agree the final scope around your business. For many small companies, these are useful starting points:",
    scope: [
      ["A clear offer", "Service or product pages that answer the questions customers actually ask."],
      ["A strong mobile experience", "Navigation, typography and forms that work on smaller screens."],
      ["Contact and location", "A visible next step, a contact form and a map when a physical location matters."],
      ["Content you can maintain", "Where useful, we plan a simple way to update text, photographs or your offer."],
    ],
    processTitle: "How we build it", process: [
      ["Discovery", "We understand your audience, services and the website's purpose."],
      ["Structure and content", "We define the pages and key messages before design."],
      ["Design and development", "We build a responsive site and check the important journeys."],
      ["Launch and improvement", "We publish the site and agree on further improvements."],
    ],
    faqTitle: "Common questions", faq: [
      ["Can we start from a catalog design?", "Yes. Each example is a starting direction; we adapt the copy, photos, colours and features to your company."],
      ["What do you need from me to start?", "A description of your business, services and goal is enough. Existing photos and copy help, but we can structure the content together."],
      ["Can you improve an existing website?", "Yes. We first review what already works, then agree on a redesign or technical improvements."],
      ["How long does it take?", "It depends on the number of pages, available content and required features. A short conversation helps us set a realistic plan."],
    ],
    endTitle: "Make the next step easier.", endText: "Explore a design or send a short outline of your business. I can suggest a direction that fits your needs.",
  },
} as const;

export function BusinessWebsites({ locale }: { locale: Locale }) {
  const t = content[locale];
  const home = locale === "sr" ? "/" : "/en";
  const catalog = locale === "sr" ? "/katalog" : "/en/catalog";
  const alternate = locale === "sr" ? "/en/business-websites" : "/izrada-sajtova";
  return <div className="bw-page">
    <header className="bw-nav"><a className="brand" href={home}><span>S</span><b>SMDev</b></a><nav aria-label={locale === "sr" ? "Navigacija" : "Navigation"}><a href={home}>{t.home}</a><a href={catalog}>{locale === "sr" ? "Katalog" : "Catalog"}</a><a href={alternate} lang={locale === "sr" ? "en" : "sr-Latn"}>{locale === "sr" ? "EN" : "SR"}</a></nav></header>
    <main><div className="bw-hero"><div className="bw-breadcrumb"><a href={home}>{t.home}</a><span>/</span><span>{t.detail}</span></div><p className="eyebrow">{t.kicker}</p><h1>{t.title}</h1><p className="bw-lead">{t.intro}</p><div className="bw-actions"><a className="bw-primary" href={catalog}>{t.catalog} ↗</a><a href={`${home}#contact`}>{t.contact} ↗</a></div><div className="bw-signal" aria-hidden="true">S<span>+</span></div></div>
      <section className="bw-section bw-situations"><div className="bw-section-head"><small>01 / {locale === "sr" ? "POLAZNA TAČKA" : "THE STARTING POINT"}</small><h2>{t.situationsTitle}</h2></div><div className="bw-grid three">{t.situations.map(([title, body], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="bw-section bw-scope"><div className="bw-section-head"><small>02 / {locale === "sr" ? "KORISTAN SAJT" : "A USEFUL WEBSITE"}</small><h2>{t.scopeTitle}</h2><p>{t.scopeIntro}</p></div><div className="bw-grid two">{t.scope.map(([title, body], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="bw-section bw-process"><div className="bw-section-head"><small>03 / {locale === "sr" ? "SARADNJA" : "WORKING TOGETHER"}</small><h2>{t.processTitle}</h2></div><ol>{t.process.map(([title, body]) => <li key={title}><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
      <section className="bw-section bw-faq"><div className="bw-section-head"><small>04 / FAQ</small><h2>{t.faqTitle}</h2></div><div>{t.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      <section className="bw-end"><h2>{t.endTitle}</h2><p>{t.endText}</p><div className="bw-actions"><a className="bw-primary" href={catalog}>{t.catalog} ↗</a><a href={`${home}#contact`}>{t.contact} ↗</a></div></section>
    </main><footer className="bw-footer"><a href={home}>SMDev</a><span>{locale === "sr" ? "Poslovni sajtovi i web aplikacije" : "Business websites and web applications"}</span></footer>
  </div>;
}
