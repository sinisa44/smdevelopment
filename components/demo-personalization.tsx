"use client";

import { createContext, useContext, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { Locale } from "@/lib/content";
import { findDesign } from "@/lib/catalog";
import "./demo-personalization.css";

type Palette = { primary: string; secondary: string; font: string };
const defaultColors: Record<string, Palette> = {
  atelier: { primary: "#a36065", secondary: "#eadad2", font: "#583c40" },
  trpeza: { primary: "#283d2c", secondary: "#dedfc6", font: "#283d2c" },
  majstor: { primary: "#ffca32", secondary: "#e4e5de", font: "#1c2a30" },
  ordinacija: { primary: "#194b4d", secondary: "#edf6f3", font: "#194b4d" },
  bilans: { primary: "#172d4c", secondary: "#e9edf0", font: "#172d4c" },
  izlog: { primary: "#3a334f", secondary: "#ecc6bd", font: "#3a334f" },
  ogledalo: { primary: "#5b242c", secondary: "#e9d4cc", font: "#352227" },
  miris: { primary: "#8f6f69", secondary: "#efe6dc", font: "#342b2c" },
  jutro: { primary: "#e69b30", secondary: "#fff0c9", font: "#4b2c1c" },
  slatko: { primary: "#d6516e", secondary: "#ffebef", font: "#4c1e32" },
  uredno: { primary: "#2a716d", secondary: "#e4f1ec", font: "#1d3637" },
  prostor: { primary: "#9c5747", secondary: "#e8e1d5", font: "#2c3030" },
  osmeh: { primary: "#268899", secondary: "#e9f7f6", font: "#16444a" },
  korak: { primary: "#655f91", secondary: "#e7e7f2", font: "#282843" },
  kompas: { primary: "#1b3346", secondary: "#dbe9e0", font: "#1b3346" },
  nacrt: { primary: "#7a5647", secondary: "#e8e0d4", font: "#292f2b" },
  zeleno: { primary: "#487650", secondary: "#e1ecd3", font: "#233f2e" },
  dar: { primary: "#a74e68", secondary: "#f3ddd7", font: "#492638" },
};
function foregroundFor(hex: string) {
  const channels = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);
  const luminance = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * luminance[0] + 0.7152 * luminance[1] + 0.0722 * luminance[2] > 0.36 ? "#17212c" : "#ffffff";
}

function mixColors(first: string, second: string, firstWeight: number) {
  const channels = [1, 3, 5].map((start) => Math.round(parseInt(first.slice(start, start + 2), 16) * firstWeight + parseInt(second.slice(start, start + 2), 16) * (1 - firstWeight)));
  return `#${channels.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

type Personalization = { businessName: string; colors: Palette; inquiryUrl: string; openCustomizer: () => void };
const PersonalizationContext = createContext<Personalization | null>(null);
export function useDemoPersonalization() { return useContext(PersonalizationContext); }

export function DemoPersonalization({ id, locale, children }: { id: string; locale: Locale; children: ReactNode }) {
  const sr = locale === "sr";
  const [businessName, setBusinessName] = useState("");
  const [colors, setColors] = useState<Palette>(defaultColors[id] ?? defaultColors.atelier);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openCustomizer = () => { if (!dialogRef.current?.open) dialogRef.current?.showModal(); };
  const closeCustomizer = () => dialogRef.current?.close();
  const decorativeAccent = mixColors(colors.primary, colors.secondary, 0.7);
  const surface = mixColors(colors.secondary, "#ffffff", 0.35);
  const setColor = (key: keyof Palette, value: string) => setColors((current) => ({ ...current, [key]: value }));
  const query = new URLSearchParams({ design: id });
  if (businessName.trim()) query.set("business", businessName.trim());
  for (const key of ["primary", "secondary", "font"] as const) query.set(key, colors[key]);
  const inquiryUrl = `${sr ? "/upitnik" : "/en/brief"}?${query.toString()}`;

  return <PersonalizationContext.Provider value={{ businessName: businessName.trim(), colors, inquiryUrl, openCustomizer }}>
    <div className="demo-personalized" data-font-customized={colors.font !== (defaultColors[id] ?? defaultColors.atelier).font ? "true" : undefined} style={{
      "--demo-accent": colors.primary,
      "--demo-on-accent": foregroundFor(colors.primary),
      "--demo-primary": colors.primary,
      "--demo-secondary": colors.secondary,
      "--demo-tertiary": decorativeAccent,
      "--demo-font": colors.font,
      "--demo-font-backdrop": foregroundFor(colors.font),
      "--demo-surface": surface,
      "--demo-on-secondary": foregroundFor(colors.secondary),
      "--demo-on-tertiary": foregroundFor(decorativeAccent),
    } as CSSProperties}>
      {children}
      <dialog ref={dialogRef} className="demo-customizer-modal" aria-labelledby="demo-customizer-title" onClick={(event) => { if (event.target === event.currentTarget) closeCustomizer(); }}>
        <div className="demo-customizer">
          <div className="demo-customizer-heading"><div><span>SMDev / {sr ? "PRILAGODITE PRIMER" : "MAKE IT YOURS"}</span><h2 id="demo-customizer-title">{sr ? "Prilagodite ovaj dizajn" : "Customize this design"}</h2><p>{sr ? "Unesite naziv firme i odaberite primarnu, sekundarnu i boju fonta. Promene se odmah vide na sajtu." : "Enter your business name and choose a primary, secondary and font colour. Changes appear on the site instantly."}</p></div><button type="button" className="demo-customizer-close" onClick={closeCustomizer} aria-label={sr ? "Zatvori podešavanja" : "Close settings"}>×</button></div>
          <label>{sr ? "Naziv firme" : "Business name"}<input type="text" value={businessName} onChange={(event) => setBusinessName(event.target.value)} maxLength={60} placeholder={sr ? "Upišite naziv firme" : "Enter your business name"} autoComplete="organization"/></label>
          <div className="demo-color-grid">{(["primary", "secondary", "font"] as const).map((key) => <label className="demo-color-label" key={key}>{({ primary: sr ? "Primarna" : "Primary", secondary: sr ? "Sekundarna" : "Secondary", font: sr ? "Boja fonta" : "Font colour" })[key]}<span className="demo-color-control"><input type="color" value={colors[key]} onChange={(event) => setColor(key, event.target.value)} aria-label={sr ? `Izaberite ${key === "font" ? "boju fonta" : key === "primary" ? "primarnu boju" : "sekundarnu boju"}` : `Choose ${key} colour`}/><output>{colors[key].toUpperCase()}</output></span></label>)}</div>
          <div className="demo-customizer-actions"><button type="button" onClick={closeCustomizer}>{sr ? "Pogledaj dizajn" : "View design"} ↗</button></div>
        </div>
      </dialog>
    </div>
  </PersonalizationContext.Provider>;
}

const extras: Record<string, [string[], string[]]> = {
  atelier: [["Cenovnik tretmana", "Galerija salona", "Upit za termin", "Mapa i radno vreme"], ["Treatment pricing", "Studio gallery", "Appointment inquiry", "Map and opening hours"]],
  trpeza: [["Jelovnik i cene", "Rezervacija stola", "Broj gostiju", "Mapa i radno vreme"], ["Menu and prices", "Table reservation inquiry", "Party size", "Map and opening hours"]],
  majstor: [["Pregled usluga", "Galerija radova", "Upit za ponudu", "Česta pitanja"], ["Service overview", "Work gallery", "Quote inquiry", "FAQs"]],
  ordinacija: [["Usluge i tim", "Kalendar termina", "Priprema za posetu", "Mapa ordinacije"], ["Services and team", "Appointment calendar", "Visit preparation", "Practice map"]],
  bilans: [["Usluge i paketi", "Kalendar konsultacija", "Proces saradnje", "Kontakt upit"], ["Services and plans", "Consultation calendar", "Working process", "Contact inquiry"]],
  izlog: [["Katalog proizvoda", "Upit o dostupnosti", "Ideje za poklone", "Mapa radnje"], ["Product collection", "Availability inquiry", "Gift ideas", "Shop map"]],
  ogledalo: [["Usluge i stilisti", "Galerija stila", "Primer zakazivanja", "Mapa salona"], ["Services and stylists", "Style gallery", "Booking preview", "Salon map"]],
  miris: [["Rituali nege", "Poklon kartice", "Primer zakazivanja", "Mapa studija"], ["Care rituals", "Gift cards", "Booking preview", "Studio map"]],
  jutro: [["Dnevna ponuda", "Meni i cene", "Kontakt upit", "Mapa lokala"], ["Daily counter", "Menu and prices", "Contact inquiry", "Café map"]],
  slatko: [["Galerija kolača", "Torte po narudžbini", "Upit za datum", "Mapa radnje"], ["Cake gallery", "Custom orders", "Date inquiry", "Shop map"]],
  uredno: [["Paketi čišćenja", "Proces rada", "Upit za ponudu", "Česta pitanja"], ["Cleaning plans", "How it works", "Quote inquiry", "FAQs"]],
  prostor: [["Primeri prostora", "Faze projekta", "Upit za procenu", "Galerija radova"], ["Space examples", "Project phases", "Estimate inquiry", "Work gallery"]],
  osmeh: [["Usluge ordinacije", "Prva poseta", "Primer zakazivanja", "Mapa ordinacije"], ["Practice services", "First visit", "Booking preview", "Practice map"]],
  korak: [["Put oporavka", "Seanse", "Primer zakazivanja", "Mapa studija"], ["Recovery pathway", "Sessions", "Booking preview", "Studio map"]],
  kompas: [["Oblasti savetovanja", "Proces saradnje", "Upit za konsultacije", "Česta pitanja"], ["Advisory areas", "Working process", "Consultation inquiry", "FAQs"]],
  nacrt: [["Portfolio koncepata", "Proces projektovanja", "Upit za projekat", "Galerija"], ["Concept portfolio", "Design process", "Project inquiry", "Gallery"]],
  zeleno: [["Kolekcija biljaka", "Saveti za negu", "Upit o dostupnosti", "Mapa radnje"], ["Plant collection", "Care advice", "Availability inquiry", "Shop map"]],
  dar: [["Poklon kolekcije", "Lični detalji", "Upit za preuzimanje", "Mapa radnje"], ["Gift collections", "Personal touches", "Pickup inquiry", "Shop map"]],
};

export function DemoIncluded({ id, locale }: { id: string; locale: Locale }) {
  const sr = locale === "sr";
  const design = findDesign(id);
  const picked = useDemoPersonalization();
  if (!design) return null;
  return <section className="demo-included" aria-labelledby="demo-included-title"><div><small>SMDev / {sr ? "ŠTA DOBIJATE" : "WHAT’S INCLUDED"}</small><h2 id="demo-included-title">{sr ? "Šta ovaj sajt može da sadrži?" : "What can this website include?"}</h2><p>{sr ? "Stranice, sadržaj i funkcije prilagođavamo vašem poslu. Ovo je pregled mogućnosti za odabrani dizajn." : "We tailor pages, content and features to your business. This is an overview of what this design can offer."}</p></div><div className="demo-included-list"><div><h3>{sr ? "Stranice" : "Pages"}</h3><ul>{design.pages[sr ? 1 : 0].map(page => <li key={page}>{page}</li>)}</ul></div><div><h3>{sr ? "Funkcije i sadržaj" : "Features and content"}</h3><ul>{extras[id][sr ? 0 : 1].map(feature => <li key={feature}>{feature}</li>)}</ul></div></div><div className="demo-included-foot"><p>{sr ? "Konačan obim i funkcionalnosti dogovaramo prema vašim potrebama. Demo forme i kalendari služe za prikaz." : "We agree the final scope and features around your needs. Demo forms and calendars illustrate the experience."}</p><a href={picked?.inquiryUrl ?? `${sr ? "/upitnik" : "/en/brief"}?design=${id}`}>{sr ? "Pošaljite upit za ovaj dizajn" : "Ask about this design"} ↗</a></div></section>;
}
