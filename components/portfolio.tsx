"use client";

import { ArrowDownRight, ArrowUpRight, Check, Code2, Gauge, Globe2, LifeBuoy, Menu, Send, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { copy, type Locale } from "@/lib/content";
import { contact, cvCopy, projects } from "@/lib/cv";
import { findDesign } from "@/lib/catalog";
import { briefNeeds, briefTimelines, briefNeedLabels, briefTimelineLabel } from "@/lib/brief";

const serviceIcons = [Globe2, Code2, Gauge, LifeBuoy];

export function Portfolio({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const cv = cvCopy[locale];
  const navigation = [...t.nav.slice(0, 2), [cv.nav, "work"], ...t.nav.slice(2)];
  const base = locale === "sr" ? "/" : "/en";
  const alternate = locale === "sr" ? "/en" : "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [demoSelection, setDemoSelection] = useState<{ id: string; name: string; business: string; primary: string; secondary: string; font: string } | null>(null);
  const [briefSummary, setBriefSummary] = useState<{ industry: string; needs: string; timeline: string; rawNeeds: string; rawTimeline: string } | null>(null);
  const formStartedAt = useRef(0);
  const contactForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale === "sr" ? "sr-Latn" : "en";
    formStartedAt.current = Date.now();
    const query = new URLSearchParams(window.location.search);
    const selected = findDesign(query.get("design") ?? "");
    const form = contactForm.current;
    if (form) {
      const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;
      if (selected) {
        field("subject").value = `${locale === "sr" ? "Upit za dizajn" : "Design inquiry"}: ${selected.name}`;
        field("projectType").value = locale === "sr" ? "Novi poslovni sajt" : "New business website";
        const validColor = (value: string | null) => value && /^#[0-9a-f]{6}$/i.test(value) ? value : "";
        setDemoSelection({ id: selected.id, name: selected.name, business: (query.get("business") ?? "").trim().slice(0, 60), primary: validColor(query.get("primary") ?? query.get("color")), secondary: validColor(query.get("secondary")), font: validColor(query.get("font")) });
      }
      if (query.get("project") === "redesign") {
        field("projectType").value = locale === "sr" ? "Redizajn sajta" : "Website redesign";
        field("subject").value = locale === "sr" ? "Unapređenje postojećeg sajta" : "Improve an existing website";
      }
      const industry = (query.get("industry") ?? "").trim().slice(0, 80);
      const allowedNeeds = new Set<string>(briefNeeds.map(item => item.id));
      const needs = [...new Set((query.get("needs") ?? "").split(",").filter(item => allowedNeeds.has(item)))].slice(0, 6).join(",");
      const timeline = (query.get("timeline") ?? "").trim();
      if (selected && industry && needs && briefTimelines.some(item => item.id === timeline)) {
        const needsLabel = briefNeedLabels(needs, locale);
        const timelineLabel = briefTimelineLabel(timeline, locale);
        setBriefSummary({ industry, needs: needsLabel, timeline: timelineLabel, rawNeeds: needs, rawTimeline: timeline });
        field("message").value = locale === "sr"
          ? `Zdravo, potreban mi je sajt za delatnost: ${industry}. Na sajtu želim: ${needsLabel}. Okvirni rok: ${timelineLabel}.`
          : `Hello, I need a website for: ${industry}. It should include: ${needsLabel}. Approximate timing: ${timelineLabel}.`;
      }
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [locale]);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, startedAt: formStartedAt.current }),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      formStartedAt.current = Date.now();
      setBriefSummary(null);
      setDemoSelection(null);
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <a href={`${base}#home`} className="brand" aria-label="SMDev — home"><span>S</span><b>SMDev</b></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href={locale === "sr" ? "/katalog" : "/en/catalog"}>{locale === "sr" ? "Katalog" : "Catalog"}</a>
          {navigation.map(([label, id]) => <a key={id} href={`${base}#${id}`}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="language-link" href={alternate} aria-label={t.languageLabel}>{t.language}</a>
          <a className="nav-cta" href={`${base}#contact`}>{t.start}<ArrowUpRight size={16} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <div id="mobile-menu" className={`mobile-nav ${menuOpen ? "open" : ""}`}>
          <a href={locale === "sr" ? "/katalog" : "/en/catalog"}>{locale === "sr" ? "Katalog dizajna" : "Design catalog"}<ArrowUpRight/></a>
          {navigation.map(([label, id], index) => <a key={id} href={`${base}#${id}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>)}
          <a className="mobile-project-link" href={`${base}#contact`} onClick={() => setMenuOpen(false)}>{t.start}<ArrowUpRight /></a>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero section-shell">
          <div className="hero-copy reveal">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.headlineA}<br /><em>{t.headlineB}</em></h1>
            <p className="hero-description">{t.heroDescription}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">{t.primary}<ArrowDownRight /></a>
              <a className="text-link" href="#expertise">{t.secondary}<ArrowUpRight /></a>
            </div>
            <a className="catalog-home-link" href={locale === "sr" ? "/katalog" : "/en/catalog"}>{locale === "sr" ? "Nemate sajt? Pronađite izgled za svoj biznis →" : "Need a website? Find a design for your business →"}</a>
          </div>
          <div className="hero-signal reveal" aria-label={t.role}>
            <div className="signal-top"><span className="pulse-dot" />{t.availability}</div>
            <div className="signal-mark" aria-hidden="true"><span>S</span><i>+</i></div>
            <div className="signal-role">{t.role}</div>
            <div className="signal-list">{t.heroLabels.map((label, i) => <div key={label}><span>0{i + 1}</span>{label}<Check size={16} /></div>)}</div>
          </div>
          <div className="hero-index" aria-hidden="true">01<span>/ 06</span></div>
        </section>

        <section id="services" className="services section-shell dark-section">
          <SectionHeading kicker={t.servicesKicker} title={t.servicesTitle} intro={t.servicesIntro} />
          <div className="services-editorial reveal">
            <div className="service-list" role="tablist" aria-label={t.servicesKicker}>
              {t.services.map((service, index) => {
                const Icon = serviceIcons[index];
                return <button key={service.title} role="tab" aria-selected={activeService === index} aria-controls="service-detail" onClick={() => setActiveService(index)} className={activeService === index ? "active" : ""}><span className="service-number">0{index + 1}</span><Icon /><span><b>{service.title}</b><small>{service.short}</small></span><ArrowUpRight /></button>;
              })}
            </div>
            <article id="service-detail" className="service-detail" role="tabpanel" aria-live="polite">
              <span className="detail-index">0{activeService + 1}</span>
              <h3>{t.services[activeService].title}</h3>
              {(["problem", "receive", "useful"] as const).map((key) => <div className="detail-row" key={key}><b>{t.labels[key]}</b><p>{t.services[activeService][key]}</p></div>)}
              <a href="#contact">{t.discuss}<ArrowUpRight /></a>
            </article>
          </div>
        </section>

        <section id="work" className="selected-work section-shell">
          <SectionHeading kicker={cv.kicker} title={cv.title} intro={cv.intro} />
          <div className="project-gallery">{projects.map((project, index) => <article className="project-entry reveal" key={project.id}>
            <figure><img src={`/projects/${project.id}.svg`} alt={`${project.name} — ${locale === "sr" ? "ilustrativni koncept interfejsa" : "illustrative interface concept"}`} width={800} height={480} loading="lazy" /><figcaption>{cv.concept}</figcaption></figure>
            <div className="project-meta"><span>{String(index + 1).padStart(2, "0")} / {project.category[locale === "sr" ? 1 : 0]}</span><span>{project.role}</span></div>
            <h3>{project.name}</h3><p>{project[locale]}</p>
            <ul className="project-stack">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
          </article>)}</div>
        </section>

        <section className="process section-shell" aria-labelledby="process-title">
          <div className="process-heading reveal"><p className="eyebrow red">{t.workKicker}</p><h2 id="process-title">{t.workTitle}</h2><p>{t.workIntro}</p></div>
          <div className="process-board reveal">
            <div className="process-tabs" role="tablist">
              {t.process.map(([name], index) => <button key={name} role="tab" aria-selected={activeProcess === index} onClick={() => setActiveProcess(index)} className={activeProcess === index ? "active" : ""}><span>0{index + 1}</span>{name}</button>)}
            </div>
            <div className="process-display" role="tabpanel" aria-live="polite"><span>0{activeProcess + 1}</span><h3>{t.process[activeProcess][0]}</h3><p>{t.process[activeProcess][1]}</p><div className="process-line"><i /></div></div>
          </div>
        </section>

        <section id="expertise" className="expertise section-shell">
          <SectionHeading kicker={t.expertiseKicker} title={t.expertiseTitle} intro={t.expertiseIntro} />
          <div className="expertise-explorer reveal">
            <div className="expertise-tabs" role="tablist">
              {t.expertise.map((item, index) => <button key={item.name} onClick={() => setActiveExpertise(index)} role="tab" aria-selected={activeExpertise === index} className={activeExpertise === index ? "active" : ""}><span>0{index + 1}</span>{item.name}</button>)}
            </div>
            <div className="expertise-value" role="tabpanel" aria-live="polite"><p>{t.expertise[activeExpertise].value}</p><div className="tech-cloud">{t.expertise[activeExpertise].tech.map((tech, i) => <span key={tech} style={{ "--i": i } as React.CSSProperties}>{tech}</span>)}</div></div>
          </div>
        </section>

        <section id="experience" className="experience section-shell dark-section">
          <SectionHeading kicker={t.expKicker} title={t.expTitle} intro={t.expIntro} />
          <div className="timeline reveal">{cv.jobs.map(([period, title, description], index) => <article key={period}><span className="timeline-number">0{index + 1}</span><div><p>{period}</p><h3>{title}</h3></div><p className="timeline-description">{description}</p><ArrowDownRight /></article>)}</div>
        </section>

        <section id="about" className="about section-shell">
          <div className="about-stamp reveal" aria-hidden="true"><div>S</div><span>FULLSTACK<br />WEB SOLUTIONS</span></div>
          <div className="about-copy reveal"><p className="eyebrow red">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2><p>{cv.profile}</p><p>{t.aboutBody[1]}</p><ul>{t.principles.map((item) => <li key={item}><Check />{item}</li>)}</ul></div>
        </section>

        <section id="contact" className="contact section-shell">
          <div className="contact-intro reveal"><p className="eyebrow">{t.contactKicker}</p><h2>{t.contactTitle}</h2><p>{t.contactIntro}</p><address className="direct-contact"><b>{cv.direct}</b><a href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={16} /></a><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={16} /></a><span>{cv.location}</span></address></div>
          <form className="contact-form reveal" onSubmit={submitContact} ref={contactForm}>
            <input type="hidden" name="design" value={demoSelection?.id ?? ""} readOnly/>
            <input type="hidden" name="briefIndustry" value={briefSummary?.industry ?? ""} readOnly/>
            <input type="hidden" name="briefNeeds" value={briefSummary?.rawNeeds ?? ""} readOnly/>
            <input type="hidden" name="briefTimeline" value={briefSummary?.rawTimeline ?? ""} readOnly/>
            {briefSummary && <div className="contact-brief-summary"><b>{locale === "sr" ? "Vaš kratki upitnik" : "Your short brief"}</b><p><strong>{locale === "sr" ? "Delatnost:" : "Industry:"}</strong> {briefSummary.industry}</p><p><strong>{locale === "sr" ? "Potrebno:" : "Needed:"}</strong> {briefSummary.needs}</p><p><strong>{locale === "sr" ? "Rok:" : "Timing:"}</strong> {briefSummary.timeline}</p><small>{locale === "sr" ? "Poruku ispod možete slobodno dopuniti pre slanja." : "You can add to the message below before sending."}</small></div>}
            {demoSelection && <label>{locale === "sr" ? "Izabrani dizajn" : "Selected design"}<input name="designLabel" readOnly value={demoSelection.name}/></label>}
            {demoSelection?.business && <label>{locale === "sr" ? "Naziv firme u demou" : "Business name in demo"}<input name="brandName" readOnly maxLength={60} value={demoSelection.business}/></label>}
            {demoSelection && (demoSelection.primary || demoSelection.secondary || demoSelection.font) && <div className="form-grid">
              {demoSelection.primary && <label>{locale === "sr" ? "Primarna boja" : "Primary colour"}<input name="brandPrimary" readOnly maxLength={7} value={demoSelection.primary}/></label>}
              {demoSelection.secondary && <label>{locale === "sr" ? "Sekundarna boja" : "Secondary colour"}<input name="brandSecondary" readOnly maxLength={7} value={demoSelection.secondary}/></label>}
              {demoSelection.font && <label>{locale === "sr" ? "Boja fonta" : "Font colour"}<input name="brandFont" readOnly maxLength={7} value={demoSelection.font}/></label>}
            </div>}
            <input type="text" name="company" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-grid">
              <label>{t.form.name}<input name="name" required minLength={2} maxLength={80} placeholder={t.form.placeholders[0]} autoComplete="name" /></label>
              <label>{t.form.email}<input name="email" type="email" required maxLength={120} placeholder={t.form.placeholders[1]} autoComplete="email" /></label>
            </div>
            <label>{t.form.subject}<input name="subject" required minLength={3} maxLength={140} placeholder={t.form.placeholders[2]} /></label>
            <label>{t.form.type}<select name="projectType" defaultValue=""><option value="">{t.form.select}</option>{t.form.options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
            <label>{locale === "sr" ? "Postojeći sajt (opciono)" : "Existing website (optional)"}<input name="website" type="url" maxLength={500} placeholder="https://"/></label>
            <label>{t.form.message}<textarea name="message" required minLength={20} maxLength={4000} rows={6} placeholder={t.form.placeholders[3]} /></label>
            <div className="form-footer"><button className="button button-light" type="submit" disabled={formState === "sending"}>{formState === "sending" ? t.form.sending : t.form.send}<Send /></button><p className={`form-status ${formState}`} role="status">{formState === "success" ? t.form.success : formState === "error" ? t.form.error : ""}</p></div>
          </form>
        </section>
      </main>

      <footer className="footer"><a href={`${base}#home`} className="brand light"><span>S</span><b>SMDev</b></a><p>{t.footer}</p><a href="#home">{t.back}<ArrowUpRight /></a></footer>
    </>
  );
}

function SectionHeading({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return <div className="section-heading reveal"><p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{intro}</p></div>;
}
