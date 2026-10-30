"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { findDesign } from "@/lib/catalog";
import { briefNeeds, briefTimelines } from "@/lib/brief";
import type { Locale } from "@/lib/content";
import "./design-brief.css";

export function DesignBrief({ locale }: { locale: Locale }) {
  const sr = locale === "sr";
  const [designId, setDesignId] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.lang = sr ? "sr-Latn" : "en";
    const query = new URLSearchParams(window.location.search);
    setSearch(window.location.search);
    const design = findDesign(query.get("design") ?? "");
    if (design) setDesignId(design.id);
  }, [sr]);

  const design = findDesign(designId);
  const catalog = sr ? "/katalog" : "/en/catalog";
  const home = sr ? "/" : "/en";

  function toggleNeed(value: string) {
    setError("");
    setSelectedNeeds(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value]);
  }

  function continueToContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedNeeds.length) {
      setError(sr ? "Izaberite bar jednu stavku koja vam treba." : "Choose at least one thing you need.");
      return;
    }
    const input = new URLSearchParams(window.location.search);
    const output = new URLSearchParams();
    if (design) output.set("design", design.id);
    const business = (input.get("business") ?? "").trim().slice(0, 60);
    if (business) output.set("business", business);
    for (const key of ["primary", "secondary", "font"] as const) {
      const value = input.get(key) ?? "";
      if (/^#[0-9a-f]{6}$/i.test(value)) output.set(key, value);
    }
    output.set("industry", industry.trim().slice(0, 80));
    output.set("needs", selectedNeeds.join(","));
    output.set("timeline", timeline);
    window.location.assign(`${home}?${output.toString()}#contact`);
  }

  return <div className="brief-page">
    <header className="brief-header"><a className="brand" href={home}><span>S</span><b>SMDev</b></a><a href={catalog}>{sr ? "← Nazad u katalog" : "← Back to catalog"}</a><a href={`${sr ? "/en/brief" : "/upitnik"}${search}`} lang={sr ? "en" : "sr-Latn"}>{sr ? "EN" : "SR"}</a></header>
    <main className="brief-main"><div className="brief-intro"><p className="eyebrow">SMDev / {sr ? "KRATAK UPITNIK" : "SHORT BRIEF"}</p><h1>{sr ? "Recite nam malo" : "Tell us a little"}<br/><em>{sr ? "o svom poslu." : "about your business."}</em></h1><p>{sr ? "Tri kratka odgovora pomoći će da razgovor počne od onoga što vam stvarno treba. Ništa se ne šalje dok ne potvrdite kontakt formu." : "Three short answers help us start with what you actually need. Nothing is sent until you submit the contact form."}</p>{design && <div className="brief-selected"><small>{sr ? "IZABRANI DIZAJN" : "SELECTED DESIGN"}</small><strong>{design.name}</strong><span>{sr ? design.sr : design.en}</span><a href={`${catalog}/${design.id}`}>{sr ? "Pogledaj ponovo" : "View again"} ↗</a></div>}</div>
      <form className="brief-form" onSubmit={continueToContact}>
        <div className="brief-question"><span>01 / {sr ? "DELATNOST" : "INDUSTRY"}</span><label htmlFor="brief-industry">{sr ? "Čime se bavi vaša firma?" : "What does your business do?"}</label><input id="brief-industry" value={industry} onChange={event => setIndustry(event.target.value)} required maxLength={80} placeholder={sr ? "Npr. frizerski salon, pekara, servis…" : "E.g. salon, bakery, repair service…"}/></div>
        <fieldset className="brief-question"><legend><span>02 / {sr ? "SADRŽAJ I FUNKCIJE" : "CONTENT AND FEATURES"}</span>{sr ? "Šta vam treba na sajtu?" : "What should the website include?"}</legend><p>{sr ? "Možete izabrati više stavki." : "Choose as many as you need."}</p><div className="brief-options">{briefNeeds.map(item => <label key={item.id} className={selectedNeeds.includes(item.id) ? "is-selected" : ""}><input type="checkbox" checked={selectedNeeds.includes(item.id)} onChange={() => toggleNeed(item.id)}/><span>{item[locale]}</span></label>)}</div></fieldset>
        <div className="brief-question"><span>03 / {sr ? "OKVIRNI ROK" : "TIMING"}</span><label htmlFor="brief-timeline">{sr ? "Kada biste voleli da počnemo?" : "When would you like to start?"}</label><select id="brief-timeline" value={timeline} onChange={event => setTimeline(event.target.value)} required><option value="">{sr ? "Izaberite okvirni rok" : "Choose an approximate time"}</option>{briefTimelines.map(item => <option key={item.id} value={item.id}>{item[locale]}</option>)}</select></div>
        {error && <p className="brief-error" role="alert">{error}</p>}
        <div className="brief-actions"><button type="submit">{sr ? "Nastavi na kontakt" : "Continue to contact"}<ArrowUpRight size={20}/></button><p>{sr ? "Na sledećoj stranici možete pregledati i dopuniti upit pre slanja." : "On the next page, you can review and add to your inquiry before sending."}</p></div>
      </form>
    </main>
  </div>;
}
