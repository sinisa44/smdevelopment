"use client";

import { ArrowDownRight, ArrowUpRight, Check, Code2, Gauge, Globe2, LifeBuoy, Menu, Send, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { copy, type Locale } from "@/lib/content";

const serviceIcons = [Globe2, Code2, Gauge, LifeBuoy];

export function Portfolio({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const base = locale === "sr" ? "/sr" : "/";
  const alternate = locale === "sr" ? "/" : "/sr";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formStartedAt = useRef(0);

  useEffect(() => {
    document.documentElement.lang = locale === "sr" ? "sr-Latn" : "en";
    formStartedAt.current = Date.now();
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
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <a href={`${base}#home`} className="brand" aria-label="Siniša — home"><span>S</span><b>Siniša</b></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {t.nav.map(([label, id]) => <a key={id} href={`${base}#${id}`}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="language-link" href={alternate} aria-label={t.languageLabel}>{t.language}</a>
          <a className="nav-cta" href={`${base}#contact`}>{t.start}<ArrowUpRight size={16} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <div id="mobile-menu" className={`mobile-nav ${menuOpen ? "open" : ""}`}>
          {t.nav.map(([label, id], index) => <a key={id} href={`${base}#${id}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>)}
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
          <div className="timeline reveal">{t.experience.map(([number, title, description, tags]) => <article key={number}><span className="timeline-number">{number}</span><div><p>{tags}</p><h3>{title}</h3></div><p className="timeline-description">{description}</p><ArrowDownRight /></article>)}</div>
        </section>

        <section id="about" className="about section-shell">
          <div className="about-stamp reveal" aria-hidden="true"><div>S</div><span>FULLSTACK<br />WEB SOLUTIONS</span></div>
          <div className="about-copy reveal"><p className="eyebrow red">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2>{t.aboutBody.map((p) => <p key={p}>{p}</p>)}<ul>{t.principles.map((item) => <li key={item}><Check />{item}</li>)}</ul></div>
        </section>

        <section id="contact" className="contact section-shell">
          <div className="contact-intro reveal"><p className="eyebrow">{t.contactKicker}</p><h2>{t.contactTitle}</h2><p>{t.contactIntro}</p><div className="contact-orbit" aria-hidden="true"><span>@</span></div></div>
          <form className="contact-form reveal" onSubmit={submitContact}>
            <input type="text" name="company" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-grid">
              <label>{t.form.name}<input name="name" required minLength={2} maxLength={80} placeholder={t.form.placeholders[0]} autoComplete="name" /></label>
              <label>{t.form.email}<input name="email" type="email" required maxLength={120} placeholder={t.form.placeholders[1]} autoComplete="email" /></label>
            </div>
            <label>{t.form.subject}<input name="subject" required minLength={3} maxLength={140} placeholder={t.form.placeholders[2]} /></label>
            <label>{t.form.type}<select name="projectType" defaultValue=""><option value="">{t.form.select}</option>{t.form.options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
            <label>{t.form.message}<textarea name="message" required minLength={20} maxLength={4000} rows={6} placeholder={t.form.placeholders[3]} /></label>
            <div className="form-footer"><button className="button button-light" type="submit" disabled={formState === "sending"}>{formState === "sending" ? t.form.sending : t.form.send}<Send /></button><p className={`form-status ${formState}`} role="status">{formState === "success" ? t.form.success : formState === "error" ? t.form.error : ""}</p></div>
          </form>
        </section>
      </main>

      <footer className="footer"><a href={`${base}#home`} className="brand light"><span>S</span><b>Siniša</b></a><p>{t.footer}</p><a href="#home">{t.back}<ArrowUpRight /></a></footer>
    </>
  );
}

function SectionHeading({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return <div className="section-heading reveal"><p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{intro}</p></div>;
}
