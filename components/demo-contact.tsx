"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import "./demo-contact.css";

export type DemoId = "atelier" | "trpeza" | "majstor" | "ordinacija" | "bilans" | "izlog";
const localDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;

function Calendar({ sr, id, value, onChange }: { sr: boolean; id: DemoId; value: string; onChange: (value: string) => void }) {
  const [month, setMonth] = useState(() => { const now = new Date(); return new Date(now.getFullYear(), now.getMonth(), 1); });
  const today = new Date();
  const todayKey = localDate(today);
  const offset = (month.getDay()+6)%7;
  const count = new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
  const firstMonth = new Date(today.getFullYear(),today.getMonth(),1);
  const lastMonth = new Date(today.getFullYear(),today.getMonth()+3,1);
  const days = sr ? ["Po","Ut","Sr","Če","Pe","Su","Ne"] : ["Mo","Tu","We","Th","Fr","Sa","Su"];
  const format = new Intl.DateTimeFormat(sr ? "sr-Latn-RS" : "en-GB", { dateStyle: "full" });
  return <fieldset className="dc-calendar"><legend>{sr ? "Izaberite datum" : "Choose a date"}</legend><div className="dc-month"><button type="button" disabled={month<=firstMonth} aria-label={sr ? "Prethodni mesec" : "Previous month"} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}>←</button><strong aria-live="polite">{month.toLocaleDateString(sr ? "sr-Latn-RS" : "en-GB",{month:"long",year:"numeric"})}</strong><button type="button" disabled={month>=lastMonth} aria-label={sr ? "Sledeći mesec" : "Next month"} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}>→</button></div><div className="dc-days">{days.map((day,i)=><span key={i} aria-hidden="true">{day}</span>)}{Array.from({length:offset},(_,i)=><span key={`blank-${i}`}/>)}{Array.from({length:count},(_,i)=>{
    const date = new Date(month.getFullYear(),month.getMonth(),i+1);
    const key = localDate(date);
    const weekday = date.getDay();
    const closed = id === "trpeza" ? weekday === 1 : id === "atelier" ? weekday === 0 || weekday === 1 : weekday === 0 || weekday === 6;
    return <button key={key} type="button" disabled={key<todayKey || closed} aria-label={format.format(date)} aria-pressed={value===key} aria-current={key===todayKey ? "date" : undefined} onClick={()=>onChange(key)}>{i+1}</button>;
  })}</div><p className="dc-hint">{sr ? "Primer rasporeda • naredna 3 meseca. Zasivljeni dani nisu dostupni u demonstraciji." : "Sample schedule • next 3 months. Greyed-out days are unavailable in this demo."}</p></fieldset>;
}

function DemoMap({ sr }: { sr: boolean }) {
  const map = "https://www.google.com/maps?q=Becej%2C%20Serbia&z=14&output=embed";
  return <section className="dc-location" aria-label={sr ? "Lokacija — primer" : "Sample location"}><div><small>{sr ? "KAKO DO NAS" : "FIND US"}</small><h3>{sr ? "Vidimo se u komšiluku." : "See you in the neighbourhood."}</h3><p>{sr ? "Bečej, Srbija — primer lokacije. Za vaš sajt postavljamo tačnu adresu vaše firme." : "Bečej, Serbia — sample location. Your website will show your business’s actual address."}</p><a href="https://www.google.com/maps/search/?api=1&query=Becej%2C%20Serbia" target="_blank" rel="noopener noreferrer">{sr ? "Otvori primer u Google mapama" : "Open sample in Google Maps"} ↗</a></div><div className="dc-map"><iframe title={sr ? "Google mapa Bečeja — demonstraciona lokacija" : "Google map of Bečej — sample location"} src={map} loading="eager" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div></section>;
}

export function DemoContact({id,sr}:{id:DemoId;sr:boolean}) {
  const t=(s:string,e:string)=>sr?s:e;
  const [date,setDate]=useState("");
  const [time,setTime]=useState("");
  const [result,setResult]=useState("");
  const [error,setError]=useState("");
  const booking=["atelier","trpeza","ordinacija","bilans"].includes(id);
  const map=["atelier","trpeza","ordinacija","izlog"].includes(id);
  const options: Record<DemoId,string[]> = {
    atelier:[t("Šišanje i stilizovanje","Cut & style"),t("Feniranje","Blow-dry"),t("Ritual hidratacije","Hydration ritual"),t("Dnevna šminka","Everyday makeup")],
    trpeza:[t("Ručak","Lunch"),t("Večera","Dinner"),t("Mala proslava","Small celebration")],
    ordinacija:[t("Prvi pregled","First consultation"),t("Kontrolni pregled","Follow-up"),t("Informativni razgovor","General inquiry")],
    bilans:[t("Upoznavanje i konsultacija","Introductory consultation"),t("Promena knjigovođe","Changing accountants"),t("Ponuda za saradnju","Service proposal")],
    majstor:[t("Sitne popravke","Small repairs"),t("Montaža i ugradnja","Assembly & fitting"),t("Osveženje prostora","Room refresh"),t("Redovno održavanje","Regular maintenance")],
    izlog:[t("Dostupnost proizvoda","Product availability"),t("Pomoć oko poklona","Gift advice"),t("Preuzimanje u radnji","In-store collection"),t("Drugo pitanje","Other inquiry")]
  };
  const titles: Record<DemoId,string> = {atelier:t("Vaš sledeći ritual.","Your next ritual."),trpeza:t("Sačuvajte mesto za stolom.","A place at our table."),majstor:t("Recite nam šta treba srediti.","Tell us what needs fixing."),ordinacija:t("Dogovorimo vašu posetu.","Plan your visit."),bilans:t("Počnimo jednim razgovorom.","Start with a conversation."),izlog:t("Šta vam je zapalo za oko?","What caught your eye?")};
  const saturday = date ? new Date(`${date}T12:00:00`).getDay()===6 : false;
  const slots = id==="trpeza" ? ["12:00","13:30","15:00","18:00","19:30","21:00"] : id==="atelier" ? (saturday ? ["09:00","10:30","12:00","13:30"] : ["09:00","10:30","12:00","14:00","16:00","17:30"]) : id==="ordinacija" ? ["08:30","10:00","11:30","14:00","16:30","18:00"] : ["09:00","10:00","11:00","13:00","14:00","15:00"];
  function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(booking && (!date || !time)) { setResult("");setError(t("Izaberite datum i termin u kalendaru.","Choose a date and time in the calendar."));return; }
    if(booking && date<localDate(new Date())) { setResult("");setError(t("Izabrani datum je prošao. Izaberite novi datum.","That date has passed. Please select another date."));return; }
    const data=new FormData(event.currentTarget);
    const selection=booking ? `${new Intl.DateTimeFormat(sr?"sr-Latn-RS":"en-GB",{dateStyle:"long"}).format(new Date(`${date}T12:00:00`))} · ${time}` : String(data.get("topic"));
    setError("");
    setResult(`${t("Pregled demo upita", "Demo inquiry preview")}: ${selection}. ${t("Ništa nije poslato niti rezervisano. U stvarnoj verziji ovde biste dobili potvrdu prijema zahteva.","Nothing has been sent or booked. In the live version you would receive confirmation that your request was received.")}`);
  }
  return <><section id="inquiry" className={`dc-section dc-${id}`} aria-labelledby="dc-title"><div className="dc-intro"><small>{booking?t("TERMIN PO VAŠOJ MERI","A TIME THAT SUITS YOU"):t("KONTAKT","GET IN TOUCH")}</small><h2 id="dc-title">{titles[id]}</h2><p>{id==="trpeza"?t("Izaberite datum, vreme i broj gostiju. Za veća društva opišite priliku u poruci.","Choose your date, time and party size. For larger groups, tell us about the occasion."):id==="majstor"?t("Opišite posao, lokaciju i okvirne dimenzije. Na osnovu toga možemo da dogovorimo sledeći korak.","Describe the job, location and approximate dimensions so we can plan the next step."):id==="izlog"?t("Pitajte za proizvod, poklon ili preuzimanje. Napišite naziv predmeta da bismo vam lakše pomogli.","Ask about a product, gift or collection. Include the item name so we can help."):t("Odaberite uslugu i željeni termin, pa ostavite kontakt podatke. Termin se potvrđuje nakon dogovora.","Choose a service and preferred time, then leave your contact details. Appointments are confirmed after discussion.")}</p><p className="dc-demo-note">{t("Interaktivni demo: podaci se ne šalju i ne čuvaju. Termini su ilustrativni.","Interactive demo: details are not sent or stored. Times are illustrative.")}</p></div>
  <form className="dc-form" onSubmit={submit} onChange={()=>{setResult("");setError("");}}>
    <div className="dc-fields"><label>{t("Ime i prezime","Full name")}<input name="name" autoComplete="name" required maxLength={100} placeholder={t("Vaše ime","Your name")}/></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="ime@primer.com"/></label><label>{t("Telefon (opciono)","Phone (optional)")}<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+381 …"/></label><label>{id==="trpeza"?t("Povod dolaska","Occasion"):t("Tema / usluga","Topic / service")}<select name="topic" required defaultValue=""><option value="" disabled>{t("Izaberite opciju","Choose an option")}</option>{options[id].map(item=><option key={item}>{item}</option>)}</select></label>
    {id==="trpeza"&&<label>{t("Broj gostiju","Party size")}<select name="guests" defaultValue="2">{[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n}</option>)}<option value="9+">9+ · {t("po dogovoru","by arrangement")}</option></select></label>}
    {id==="majstor"&&<label>{t("Mesto radova","Job location")}<input name="area" required maxLength={150} placeholder={t("Grad / naselje","Town / neighbourhood")}/></label>}
    {id==="izlog"&&<label>{t("Naziv proizvoda (opciono)","Product name (optional)")}<input name="product" maxLength={150} placeholder={t("Npr. Mala vaza, velika radost","E.g. Little vase, big joy")}/></label>}
    {id==="bilans"&&<label>{t("Firma (opciono)","Business (optional)")}<input name="company" autoComplete="organization" maxLength={150}/></label>}</div>
    {booking&&<div className="dc-booking"><Calendar sr={sr} id={id} value={date} onChange={value=>{setDate(value);setTime("");setResult("");setError("");}}/><fieldset className="dc-times"><legend>{t("Željeno vreme","Preferred time")}</legend><p>{date?new Intl.DateTimeFormat(sr?"sr-Latn-RS":"en-GB",{dateStyle:"long"}).format(new Date(`${date}T12:00:00`)):t("Prvo izaberite datum.","Choose a date first.")}</p><div>{slots.map(slot=><label key={slot} className={time===slot?"selected":""}><input type="radio" name="time" value={slot} disabled={!date} checked={time===slot} onChange={()=>setTime(slot)}/>{slot}</label>)}</div><p className="dc-hint">{t("Prikazani termini nisu povezani sa stvarnim kalendarom.","These times are not linked to a live calendar.")}</p></fieldset></div>}
    <label>{t("Poruka", "Message")}{booking?t(" (opciono)"," (optional)"):""}<textarea name="message" rows={4} maxLength={2000} required={!booking} placeholder={id==="ordinacija"?t("Samo organizaciona pitanja, bez medicinske dokumentacije.","Scheduling questions only; no medical documents."):t("Kako možemo da pomognemo?","How can we help?")}/></label>
    <button className="ds-button dc-submit" type="submit">{booking?t("Prikaži demo rezervacije","Preview demo booking"):t("Prikaži demo upita","Preview demo inquiry")} ↗</button>
    {error&&<p className="dc-error" role="alert">{error}</p>}{result&&<p className="dc-result" role="status">{result}</p>}
  </form></section>{map&&<DemoMap sr={sr}/>}</>;
}
