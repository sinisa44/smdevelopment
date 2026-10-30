"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { designs } from "@/lib/catalog";
import type { Locale } from "@/lib/content";
import "./catalog.css";
import { DemoSite } from "./demo-sites";
import { DemoPersonalization, useDemoPersonalization } from "./demo-personalization";

type Design = (typeof designs)[number];

export function DesignCatalog({ locale }: { locale: Locale }) {
  const sr = locale === "sr";
  const [filter, setFilter] = useState("all");
  const base = sr ? "/" : "/en";
  const catalog = sr ? "/katalog" : "/en/catalog";
  useEffect(() => { document.documentElement.lang = sr ? "sr-Latn" : "en"; }, [sr]);
  return <div className="catalog-page">
    <header className="catalog-header"><a className="brand" href={base}><span>S</span><b>SMDev</b></a><a href={base}>{sr ? "Nazad na početnu" : "Back to home"}</a><a href={sr ? "/en/catalog" : "/katalog"} lang={sr ? "en" : "sr-Latn"}>{sr ? "EN" : "SR"}</a></header>
    <main>
      <section className="catalog-intro"><p className="eyebrow">SMDev / {sr ? "Katalog dizajna" : "Design collection"}</p><h1>{sr ? "Kako bi vaš sajt" : "What could your"}<br/><em>{sr ? "mogao da izgleda?" : "website look like?"}</em></h1><div className="catalog-intro-bottom"><p>{sr ? "Pronađite pravac koji odgovara vašem biznisu. Zatim zajedno prilagođavamo sadržaj, boje i funkcionalnosti vašoj firmi." : "Find a direction that suits your business. Then we tailor the content, colours and functionality to your company."}</p><span>06 / {sr ? "različitih polaznih ideja" : "distinct starting points"}</span></div></section>
      <section className="catalog-collection" aria-label={sr ? "Dizajni sajtova" : "Website designs"}>
        <div className="catalog-filters" aria-label={sr ? "Filtriraj po delatnosti" : "Filter by industry"}><button onClick={() => setFilter("all")} aria-pressed={filter === "all"}>{sr ? "Svi dizajni" : "All designs"}</button>{designs.map(design => <button key={design.id} aria-pressed={filter === design.category} onClick={() => setFilter(design.category)}>{sr ? design.sr : design.en}</button>)}</div>
        <p className="catalog-note">{sr ? "Demonstracioni primeri sa izmišljenim sadržajem. Svaki dizajn se prilagođava vašem poslovanju." : "Demonstration designs with fictional content. Every design is adapted to your business."}</p>
        <div className="catalog-grid">{designs.filter(design => filter === "all" || filter === design.category).map(design => <article className="catalog-card" key={design.id}>
          <a className="catalog-preview-link" href={`${catalog}/${design.id}`} aria-label={`${sr ? "Pogledaj demo" : "View demo"}: ${design.name}`}><TemplatePreview design={design} locale={locale}/><span className="preview-open">{sr ? "Otvori primer" : "Open demo"} ↗</span></a>
          <div className="catalog-card-title"><h2>{design.name}</h2><span>{sr ? design.sr : design.en}</span></div><p>{design.desc[sr ? 1 : 0]}</p><ul className="catalog-pages">{design.pages[sr ? 1 : 0].map(page => <li key={page}>{page}</li>)}</ul><div className="catalog-card-actions"><a href={`${catalog}/${design.id}`}>{sr ? "Pogledaj demo" : "View demo"}<ArrowUpRight size={17}/></a><a href={`${base}?design=${design.id}#contact`}>{sr ? "Želim ovakav sajt" : "I want this design"}<ArrowUpRight size={17}/></a></div>
        </article>)}</div>
      </section>
      <section className="catalog-redesign"><p className="eyebrow">{sr ? "Već imate sajt?" : "Already have a website?"}</p><h2>{sr ? "Možda mu treba novi početak." : "It might be time for a fresh start."}</h2><p>{sr ? "Pošaljite adresu postojećeg sajta i recite šta vam smeta. Razgovaraćemo o tome šta vredi zadržati i šta treba unaprediti." : "Share your existing website and what is getting in the way. We can discuss what to keep and what to improve."}</p><a className="button button-primary" href={`${base}?project=redesign#contact`}>{sr ? "Želim da unapredim svoj sajt" : "Improve my existing website"}<ArrowUpRight/></a></section>
    </main><footer className="catalog-footer">SMDev / {sr ? "Ideja je početak. Vaš biznis daje pravac." : "An idea is the start. Your business sets the direction."}</footer>
  </div>;
}

export function TemplatePreview({ design, locale }: { design: Design; locale: Locale }) {
  const sr = locale === "sr";
  const headlines = { atelier: sr ? "Lepota u vašem ritmu." : "Beauty at your own pace.", trpeza: sr ? "Još jedan zalogaj." : "One more bite.", majstor: sr ? "MANJE BRIGE. VIŠE URAĐENOG." : "LESS WORRY. MORE DONE.", ordinacija: sr ? "Vaše zdravlje. Naša pažnja." : "Your health. Our attention.", bilans: sr ? "Brojevi u redu. Glava mirna." : "Numbers in order. Peace of mind.", izlog: sr ? "Stvari koje čine dom." : "Things that make a home." };
  return <div className={`catalog-snapshot snapshot-${design.id}`}><div className="snapshot-nav"><b>{design.name}{design.id === "izlog" ? "✳" : design.id === "ordinacija" ? " +" : ""}</b><span>{design.pages[sr ? 1 : 0].slice(1,3).join(" / ")}</span></div><div className="snapshot-body"><div><small>{sr ? design.sr : design.en}</small><h2>{headlines[design.id]}</h2><span className="snapshot-cta">{sr ? "Otkrijte više" : "Discover more"} ↗</span></div>{design.id === "bilans" ? <div className="snapshot-chart" aria-hidden="true">{[35,60,45,75,65,90].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div> : <div className="snapshot-photo"/>}</div><div className="snapshot-bottom">{design.services[sr ? 1 : 0].map(item=><span key={item}>{item}</span>)}</div></div>;
}

export function DesignDemo({ design, locale }: { design: Design; locale: Locale }) {
  const sr = locale === "sr";
  const base = sr ? "/" : "/en";
  const catalog = sr ? "/katalog" : "/en/catalog";
  useEffect(() => { document.documentElement.lang = sr ? "sr-Latn" : "en"; }, [sr]);
  return <div className="demo-page"><DemoPersonalization id={design.id} locale={locale}><div className="demo-toolbar"><a href={catalog}>← {sr ? "Svi dizajni" : "All designs"}</a><span>{sr ? "Demo sa izmišljenim sadržajem" : "Demo with fictional content"} · {design.name}</span><DemoCustomizeButton sr={sr}/><DemoToolbarLink fallback={`${base}?design=${design.id}#contact`} sr={sr}/></div><DemoSite id={design.id} locale={locale}/></DemoPersonalization></div>;
}

function DemoCustomizeButton({ sr }: { sr: boolean }) {
  const picked = useDemoPersonalization();
  return <button type="button" className="demo-customize-button" onClick={picked?.openCustomizer}>✦ {sr ? "Prilagodi dizajn" : "Customize design"}</button>;
}

function DemoToolbarLink({ fallback, sr }: { fallback: string; sr: boolean }) {
  const picked = useDemoPersonalization();
  return <a href={picked?.inquiryUrl ?? fallback}>{sr ? "Želim ovaj dizajn" : "Choose this design"} ↗</a>;
}
