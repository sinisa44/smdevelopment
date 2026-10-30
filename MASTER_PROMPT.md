# Master prompt — SMDev portfolio

Ovaj dokument služi za nastavak rada na drugom računaru ili u novom AI razgovoru. Objedinjuje dostavljeni „MASTER PLAN UPDATE — Business Growth & WordPress” i kasnije odluke korisnika. Nije doslovna kopija nedostupnog originalnog master plana. Kasnije odluke navedene ovde imaju prednost nad početnim zahtevima.

## Prompt za nastavak rada

Personalizacija demoa: `components/demo-personalization.tsx` i `.css` omogućavaju unos naziva firme i izbor tri boje pomoću odvojenih color pickera: primarna, sekundarna i boja fonta. Kontrole su sakrivene u pristupačnom modalnom dijalogu koji se otvara istaknutim dugmetom „Prilagodi dizajn“ u gornjoj traci svakog demoa; odabrane vrednosti ostaju aktivne kada se dijalog zatvori. Sve obojene površine, obrubi, trake, dugmad, forme i dekorativni elementi unutar demo sajtova koriste te boje ili nijanse izvedene iz njih; ne ostavljaj fiksne boje u `components/demo-sites.css` i `components/demo-contact.css`. Fotografije i eksterni Google Maps prikaz nisu deo recolor sistema. Naziv se odmah prikazuje u zaglavlju. Kada korisnik promeni boju fonta, ona važi za sav tekst unutar demoa, uključujući naslove, linkove, dugmad, kalendare i obojene sekcije; dugmad dobijaju kontrastnu podlogu. Sve CTA veze unutar demoa prenose `design`, `business`, `primary`, `secondary` i `font` u kratak upitnik na `/upitnik` ili `/en/brief`. Posle pitanja o delatnosti, potrebama i okvirnom roku, odgovori prelaze u SMDev kontakt formu; ona prikazuje vrednosti pre slanja i uključuje ih u email uz serversku validaciju. Iza svakog demoa je pregled mogućih stranica i funkcija prilagođen toj delatnosti; konačan obim se dogovara za klijenta.

Demo kontakt i zakazivanje: `components/demo-contact.tsx` / `.css` prikazuju lokalne interaktivne forme na prvih šest sajtova, a `components/demo-expansion.tsx` na dodatnih 12. Atelier, Trpeza, Ordinacija i Bilans imaju mesečni kalendar i izbor termina, sa prošlim datumima i neradnim danima onemogućenim. Restoran ima broj gostiju, servis mesto radova, prodavnica proizvod, knjigovodstvo firmu. Submit samo prikazuje demo potvrdu — ne šalje, ne čuva podatke i ne rezerviše stvarne termine. Ne povezivati ove forme sa stvarnim kontakt API-jem bez zahteva. Google Maps se prikazuje odmah, bez dugmeta i bez dodatnog klika za salon, restoran, ordinaciju i prodavnicu; Bečej je jasno označen primer lokacije, ne stvarna adresa firme.

Katalog mora imati 18 sadržajnih demo sajtova u šest kategorija, sa različitim kompozicijama, ne isti raspored u drugim bojama. Implementacija je u `components/demo-sites.tsx` i `components/demo-sites.css`: Atelier je editorial salon sa ritualima i cenovnikom; Trpeza restoran sa velikom fotografijom, jelovnikom i pričom; Majstor servis sa uslugama, radovima, procesom i FAQ; Ordinacija ima usluge, uloge tima i vodič za prvu posetu; Bilans poslovni pregled, ekspertizu i modele saradnje; Izlog kolekciju proizvoda, poklone i informacije o radnji. Dodatnih 12 primera je u `components/demo-expansion.tsx` i `.css`; svaki ima kontakt formu, primer mape gde je primeren i vidljiv kalendar kada je potrebno zakazivanje. Sadržaj je dvojezičan. Fotografije u `public/catalog/` su dokumentovane u `public/catalog/SOURCES.md` i ilustrativne, ne dokazi stvarnih radova ili članova tima. Zadrži različitu kompoziciju, tipografiju i vrste sekcija. Katalog ima posebne pregledne kartice usklađene sa izgledom demoa.

Katalog za male firme: `/katalog` (SR) i `/en/catalog` (EN), sa 18 demonstracionih vizuelnih pravaca u šest kategorija, uključujući Atelier, Trpeza, Majstor, Ordinacija, Bilans i Izlog. Srpski je primarni jezik na `/`, engleski je na `/en`; stare rute `/sr` i `/catalog` preusmeravaju. Demo stranice su na podputanji sa ID-jem dizajna. Ovo su izmišljeni demonstracioni sajtovi, a ne radovi za stvarne klijente. Izbor vodi kroz kratak upitnik na `/upitnik?design=ID` (EN: `/en/brief?design=ID`), pa na početnu kontakt formu sa izabranim dizajnom, delatnošću, potrebama i rokom. Opcija za redizajn koristi `?project=redesign#contact`. Kontakt forma prima i URL postojećeg sajta. Server proverava ID dizajna, vrednosti iz upitnika i HTTP/HTTPS URL i dodaje ih email obaveštenju. Kod je u `lib/catalog.ts`, `components/catalog.tsx` i `components/catalog.css`.

Najnovija odluka korisnika: naziv brenda je SMDev. Ne prikazuj lično ime vlasnika u tekstovima, logotipu, pristupačnim oznakama ili SEO metapodacima. Kontakt adrese i postojeći hosting identitet nisu novi brendirani nalozi; ne izmišljaj zamenske email adrese ili URL-ove.

Radi na postojećem portfoliju SMDev. Najpre pročitaj ovaj dokument, README.md i relevantan izvorni kod. Pregledaj git status i sačuvaj postojeće izmene. Nastavi postojeću implementaciju; nemoj praviti novi projekat ili menjati tehnološki stack bez zahteva korisnika.

### Cilj i publika

Portfolio treba prvenstveno da privuče vlasnike biznisa, startape i kompanije kojima trebaju poslovni sajtovi, web aplikacije, redizajn ili tehnička podrška. Sekundarna publika su regruteri i inženjerski timovi.

Pozicioniranje: „Fullstack Developer & Web Solutions Partner”. Poveži inženjersku stručnost sa praktičnom vrednošću: jasnije predstavljanje usluga, kredibilitet, dobro korisničko iskustvo, održavanje i efikasniji poslovni procesi. Ne garantuj prodaju, rangiranje ili rezultate. Ne izmišljaj klijente, recenzije, metrike, sertifikate ili iskustvo.

### Tehnologija i lokalizacija

- Zadrži Next.js, TypeScript i Tailwind CSS. Projekat koristi Vinext/Vite i podržava Cloudflare/Sites isporuku.
- Srpska latinica je primarna na `/`; engleska verzija je na `/en`.
- Svaka korisnička izmena sadržaja i navigacije treba da postoji na oba jezika.
- WordPress je usluga/veština, a ne framework ili CMS ovog portfolija.
- Najnovija odluka korisnika: NE naglašavati WordPress. Pominjati ga samo jednom po jezičkoj verziji, u tehnologijama pod Web platforms / Web platforme. Ne vraćaj ga u hero, footer, naslove usluga, kontakt opcije ili SEO naglašavanje.

### Uvodni sadržaj

EN eyebrow: FULLSTACK DEVELOPMENT / DIGITAL SOLUTIONS

EN headline: Your business deserves more than just a website.

EN description: I design and develop fast, reliable websites and web applications that help businesses stand out, build trust and turn their online presence into new opportunities.

EN CTA: Let’s Discuss Your Project / Explore My Expertise

SR eyebrow: FULLSTACK DEVELOPMENT / DIGITALNA REŠENJA

SR headline: Vaš biznis zaslužuje više od običnog sajta.

SR description: Razvijam brze, pouzdane web sajtove i aplikacije koji pomažu firmama da se izdvoje, izgrade poverenje i bolje iskoriste svoje online prisustvo.

SR CTA: Hajde da razgovaramo o projektu / Istraži moje veštine

### Struktura i sadržaj

Navigacija obuhvata Home / Početna, Services / Usluge, Selected Work / Projekti, Expertise / Veštine, Experience / Iskustvo, About / O meni i Contact / Kontakt. Istakni Start a Project / Pokreni projekat i omogući mobilni ekvivalent.

Četiri usluge:

1. Business Websites / Poslovni sajtovi — jasna ponuda, kredibilitet i sadržaj koji se lako održava.
2. Custom Web Applications / Web aplikacije po meri — interni alati, portali, kontrolne table i integracije.
3. Redesign & Performance / Redizajn i performanse — dizajn, navigacija, pristupačnost, tehničke SEO osnove i brzina.
4. Maintenance & Support / Održavanje i podrška — ažuriranja, rešavanje problema, optimizacija i unapređenja.

Svaka usluga objašnjava izazov, šta klijent dobija, zašto je korisno i kako da se javi. Koristi interaktivni, urednički raspored umesto ponavljajućih generičkih kartica.

Kako radim: Discover / Upoznavanje; Plan & Design / Plan i dizajn; Build / Izrada; Launch & Improve / Lansiranje i razvoj. Interakcije moraju ostati pristupačne tastaturom i podržavati smanjeno kretanje.

Zadrži tehnički explorer i fullstack identitet. Tehnologije objašnjavaj kroz njihovu korisnost, uz dovoljno tehničke preciznosti.

### CV, projekti i iskustvo — potvrđene odluke

Korisnik je dostavio CV i odobrio preuzimanje projekata, iskustva, tehnologija i kontakta. Podaci su preneti u `lib/cv.ts`; originalni PDF nije deo repozitorijuma i nije potreban za nastavak postojećeg rada.

Najnovija odluka: NE navoditi imena poslodavaca. Fokus je na projektima, konkretnoj ulozi, doprinosu i tehnologijama. Iskustvo prikazivati po ulozi i periodu, bez naziva firmi. Nazivi projekata u postojećim podacima potiču iz CV-ja.

Projekti:

- Curoflow — zdravstvena platforma koja povezuje klinike, pacijente i lekare; React, TypeScript i Express.js.
- MojSTCable — korisnički portal, plaćanja, provere statusa i integracije sa centralnom bazom; Next.js, Lumen, MySQL, Docker, GitLab CI/CD.
- TSC Ticketing System — generisanje i sinhronizacija ulaznica, tokovi utakmica, kapije i PDA validacija; Lumen, Laravel, Node.js, WebSockets, MySQL, Docker.
- Sattrakt CRM — backend internog CRM-a, korisnički nalozi i integracije; Lumen, Laravel, PHP, MySQL, MongoDB, Docker.
- Fleet Tracking System — praćenje vozila, gorivo, brzina, zone i servisna obaveštenja.
- Memorial — interfejs, registracija, memorijalne stranice i online plaćanje.
- ST Hotspot Login — prijava na javni Wi-Fi, email verifikacija i serversko čuvanje podataka.
- STTV EPG API — obrada podataka TV programa i izvoz XML-a za mobilne, web i OTT aplikacije.
- STCable — prezentacione stranice prema Figma dizajnu uz backend sadržaj i Lumen API-je.

Iskustvo iz CV-ja: Fullstack developer 2026–danas; Fullstack developer 2021–2026; Frontend developer 2021; Backend developer 2019–2021. CV navodi 7+ godina iskustva. Detaljni opisi su u `lib/cv.ts`.

Potvrđene tehnologije uključuju JavaScript, TypeScript, PHP, React, Next.js, HTML, CSS, SASS, Tailwind, Bootstrap, Semantic UI, Material UI, Laravel, Lumen, Node.js, NestJS, Express.js, MySQL, MongoDB, Git, Docker, CI/CD, mikroservise i Lens. CV pominje i Codex, ChatGPT i Claude Code. Ne dodaj nepodržane tvrdnje o stručnosti.

Korisnik je izričito tražio uklanjanje bloka Obrazovanje / Jezici / Rad u EU. Ne vraćaj taj blok, podatke o školi, državljanstvu ili pravu rada na stranicu. Neupotrebljene vrednosti su uklonjene i iz `lib/cv.ts` pre GitHub objave.

### Slike i linkovi

Korisnik je tražio slike prema nameni projekata i zatim naglasio da budu punije, živopisnije i različite, bez istog kalupa.

Postoje ručno izrađeni SVG koncepti u `public/projects/`: `curoflow.svg`, `mojstcable.svg`, `tsc.svg`, `crm.svg`, `fleet.svg`, `memorial.svg`, `hotspot.svg`, `epg.svg`, `stcable.svg`.

Zadrži različite kompozicije: zdravstveni raspored, korisnički portal sa mobilnim prikazom, stadion i ulaznica, CRM radna tabla, mapa vozila, mirna memorijalna stranica, živopisna Wi-Fi prijava, TV vodič i poslovni sajt. Ovo nisu autentični snimci isporučenih proizvoda. Jasno ih označi kao ilustrativne koncepte.

Korisnik odobrava linkove tamo gde postoje. CV sadrži LinkedIn URL, ali ne sadrži web adrese projekata. Nemoj nagađati produkcione URL-ove ili repozitorijume; dodaj ih kada ih korisnik potvrdi ili kada imaš pouzdan izvor.

### Kontakt i slanje emaila

- Ime: SMDev
- Email: smdev.development@gmail.com
- Telefon: +381 69 199 4022
- Lokacija: Bečej, Srbija
- LinkedIn: https://www.linkedin.com/in/sini%C5%A1a-mi%C5%A1kovi%C4%87-08aa44144/

Kontakt ima direktne `mailto:`, `tel:` i LinkedIn linkove. Forma ima ime, email, naslov, opcionu vrstu projekta i poruku. Tipovi projekta: novi poslovni sajt, redizajn, aplikacija po meri, održavanje/podrška ili nešto drugo.

`app/api/contact/route.ts` koristi Gmail SMTP kroz Nodemailer u Node.js runtime-u, Zod validaciju na serveru, honeypot, proveru vremena i ograničavanje ponovljenih zahteva. Odabrani tip projekta ide u email. Reply-To je email posetioca. Demo forme u katalogu ostaju samo interaktivni primeri i ništa ne šalju.

Za produkciju je odabran Vercel sa Next.js buildom (`npm run build:vercel`), uz GitHub repozitorijum `https://github.com/sinisa44/smdevelopment`. Direktni Gmail SMTP transport je implementiran, ali ne tvrdi da forma šalje dok Vercel promenljive nisu podešene i dostava testirana.

Potrebne runtime promenljive: `GMAIL_ADDRESS=smdev.development@gmail.com` i `GMAIL_APP_PASSWORD` (Google App Password, ne obična lozinka naloga). Primer je u `.env.example`, a uputstvo u README.md. Ključevi i lozinke ne pripadaju ovom dokumentu ili Gitu. Na drugom računaru podesiti lokalni `.env.local`, a na Vercelu runtime tajne u Project Settings → Environment Variables.

### Dizajn i kvalitet

Sačuvaj izražajnu tipografiju, asimetričan raspored, tamnoplavu, toplu svetlu pozadinu, koralnu i kontrolisane jarke akcente. Sajt treba da deluje kao lični rad iskusnog developera. Obezbedi responzivnost, čitljivost, vidljiv fokus, pristupačne forme i smanjeno kretanje. Izbegavaj lažne logotipe klijenata, stock fotografije agencije, generičke ilustracije i preterane marketinške tvrdnje.

SEO neka prirodno pokriva fullstack/web razvoj, poslovne sajtove, aplikacije, redizajn i održavanje na oba jezika. Ne izmišljaj lokacije, rezultate ili reference.

### Mapa projekta i nastavak

- `components/portfolio.tsx` — sekcije, navigacija, projekti, interakcije i forma.
- `lib/content.ts` — EN/SR tekstovi sajta.
- `lib/cv.ts` — projekti, iskustvo i kontakt iz CV-ja.
- `app/globals.css` — vizuelni sistem i responzivnost.
- `app/page.tsx`, `app/sr/page.tsx`, `app/layout.tsx` — rute i metapodaci.
- `public/projects/` — prenosive SVG ilustracije; koristi relativne putanje sajta.
- `.openai/hosting.json` — postojeći Sites identitet. Sačuvaj ga; ne registruj duplikat sajta.

Posle promena pokreni provere u meri potrebnoj za izmenu: `npx tsc --noEmit` i `npm run build`, a za promene izgleda proveri desktop i mobilni prikaz. Nemoj tvrditi da su provere prošle bez izvršavanja.

Postojeća privatna objava: https://sinisa-web-solutions-portfolio.bloomymug512.chatgpt.site

Važno: naknadne lokalne promene (manje naglašavanje WordPressa, CV/projekti, slike i uklanjanje bloka obrazovanja) nisu potvrđeno ponovo objavljene. Proveri stanje hostinga pre tvrdnje da objava odgovara lokalnom kodu. Lokalni server je ranije koristio port 4173, ali je privremen i treba ga pokrenuti na novom računaru.

Ne oslanjaj se na apsolutne putanje prethodnog računara, privremene PNG preglede, stanje razgovora ili token iz stare sesije. Sve potrebne izmene moraju biti u projektu. Ne briši nepoznate fajlove, uključujući eventualne iCloud duplikate, bez provere.

## Pokretanje na drugom računaru

1. Prenesi ceo izvorni projekat sa `package.json`, `package-lock.json`, `public/`, `app/`, `lib/`, `components/` i konfiguracijom. Sam ovaj prompt ne sadrži izvorni kod ili slike.
2. Instaliraj Node.js 22.13 ili noviji, pa u korenu projekta pokreni `npm ci`.
3. Po potrebi podesi `.env.local` prema `.env.example`. Tajne prenesi odvojeno i bezbedno.
4. Pokreni `npm run dev -- --port 4173` i otvori adresu koju terminal prikaže.
5. Novom AI asistentu pošalji: „Pročitaj MASTER_PROMPT.md i README.md u ovom projektu. Nastavi rad na postojećem portfoliju, poštujući navedene odluke i postojeće izmene.”
