# CLAUDE.md — constituția proiectului „Atelier Gabriela"

Orice sesiune de lucru — cu sau fără AI — respectă ce scrie aici. Dacă o regulă se schimbă, se schimbă întâi aici. Afirmațiile măsurabile din acest fișier se verifică programatic contra codului (auditul adevărului, §10).

## 1. Despre proiect

Site de prezentare (fără magazin online) pentru atelierul handmade al Gabrielei Lăzărescu: lumânări de botez, buchete de nuntă din flori de mătase și criogenate, tăvițe de moț, tablouri, decorațiuni de sezon. **Diferențiatorul afacerii:** personalizare după poza trimisă de client. **Publicare:** GitHub Pages, depozit public. **Legături:** facebook.com/lazarescugabriela11 · m.me/lazarescugabriela11.

## 2. Principiile proprietarului (nenegociabile)

**Perfecțiune și aliniere:** totul ordonat, disciplinat, „la linie". **Estetică:** minimalist, premium, elegant, fin — emoție prin puțin, nu prin mult. **Editabil manual:** codul se poate modifica fără AI, de o persoană fără pregătire tehnică avansată. **Limbă:** română, cu diacritice corecte în tot conținutul. **Prețuri:** există în date, rămân ascunse până la decizia proprietarului. **Livrări:** în runde de revizuire, nu în vrac. **Testare locală:** exclusiv din folderul complet (ZIP-ul dezarhivat) — fișierele-nucleu trăiesc împreună; un index.html descărcat singur se explică, dar nu se îmbracă.

## 3. Harta depozitului

```
index.html        scheletul paginii principale (structură + conținut static)
stil.css          TEMA UNICĂ — tot designul, S00–S22; orice pagină o include
fonturi/          18 fișiere woff2 (Cormorant Garamond + Manrope, latin+latin-ext) — locale
date.js           ZONA DE EDITARE — config, categorii, produse, transformări
mecanica.js       logica site-ului (nu se modifică pentru conținut)
poze/             fotografiile și clipurile (coperta.jpg = previzualizarea de link; mici/ = miniaturi)
404.html          pagina de eroare — aceeași temă, prin stil.css
robots.txt        acces permis motoarelor de căutare
README.md         descrierea depozitului
GHID-EDITARE.md   cum se editează conținutul, pozele, prețurile, contactul
GHID-PUBLICARE.md pașii de publicare și actualizare pe GitHub Pages
ZIUA-ARHIVEI.md   coregrafia completă a zilei în care sosește arhiva (repetată în avans)
CLAUDE.md         acest fișier
```

**Unelte nepublicate** (rulează la Claude): `populare.py` (motorul de conținut) și `unelte-claude.zip` (suita jsdom, acceptanța pe ZIP, repetiția la scară, planse.py — planșe de triaj, transcodor.py — Trecerea B, chipuri.py — scanarea de fețe). Trăiesc în fișierele livrate ale conversației; la o sesiune nouă se re-încarcă în chat și totul continuă de unde a rămas.

## 4. Navigarea în cod

Cuprinsul complet stă în `index.html`, la început. **Stilul:** secțiunile `S00–S22` (+ `S20b`) în `stil.css`. **Corpul:** `C00–C12` în `index.html`. **Conținutul:** `date.js` = ZONA DE EDITARE, singurul loc de modificat curent. **Logica:** `mecanica.js`, nu se atinge fără motiv întemeiat. Orice pagină nouă include tema prin `<link rel="stylesheet" href="stil.css">` și bootstrap-ul din `<head>` (clasa `.js` + plasa de siguranță care explică pe loc dacă tema lipsește) — singurul script inline permis; paginile nu au voie la `<style>` propriu. Bannerul de avarie e singura excepție de stil injectat, tocmai pentru că apare când stilurile lipsesc.

## 5. Sistemul de design

| Variabilă | Valoare | Rol |
|---|---|---|
| `--ivoriu` | `#FCFBF9` | fundal porțelan |
| `--ceara` | `#F5F1EB` | secțiuni alternate |
| `--hartie` | `#FFFFFF` | carduri |
| `--cacao` | `#29241F` | text principal, butoane (cerneală caldă) |
| `--cacao-soft` | `#6F675E` | text secundar (adâncit pentru contrast AA) |
| `--roz` / `--roz-pal` | `#C89B92` / `#F4E8E4` | roz pudrat: decor |
| `--roz-text` | `#9C5F55` | roz pentru LITERE (italicele din titluri, prețuri) — AA |
| `--auriu` / `--auriu-pal` | `#BCA184` / `#F1E9DD` | șampanie: linii fine, decor |
| `--auriu-text` | `#7E694D` | șampanie pentru LITERE (etichete, numere) — AA |
| `--eucalipt*` | = șampanie/cerneală | nume istorice, valorile sunt actuale |

**Fonturi:** Cormorant Garamond (titluri, 600; italic = accentul emoțional) + Manrope (text, UI) — locale (S00, pachete Fontsource, doar woff2, trei fișiere preîncărcate); nicio conexiune către Google. **Reguli de bază:** umbre discrete; o singură familie de accente pe ecran; separatoare = fir de 56px șampanie (S07); butoane = capsule cu majuscule spațiate; culorile se schimbă DOAR din variabile.

**Micro-reguli „la linie":** borduri exclusiv 1px; colțuri pe scala 12px (carduri) / 16px (suprapuneri) / 999px (capsule) / 50% (cercuri); hover-lift: butoane −1px, carduri −4px; contur iconițe în sprite: 1.7 conținut, 2 glife funcționale (ilustrația din hero e artă, cu grosimile ei).

**Reguli din auditul vizual:** cardurile-buton se declară `display:flex;flex-direction:column` (browserele centrează nativ conținutul butoanelor — cauza „liniei albe" din galerie); textul cardurilor de galerie are `flex:1`, ca rândurile să împartă aceleași linii; cardurile cu imagine până la margine folosesc `outline` interior, nu bordură (se pictează peste conținut, imun la ruperi sub-pixel). **Tactil:** orice control are minimum 44×44 pt, garantat prin `(hover:none) and (pointer:coarse)` (S20b) — nu prin lățime: telefonul în landscape primește stiluri de desktop, dar rămâne tactil.

## 6. Modelul de conținut (date.js)

**Categorii:** `botez, nunta, mot, tablouri, absolvire, paste, craciun, indragostiti, aniversari, martisor` (ultimele două născute din arhiva reală) — filtrele apar doar pentru cele cu produse; fiecare are link distribuibil `/#categoria`, iar schimbarea filtrului actualizează adresa. **Galeria la volum:** căutare fără diacritice (nume+descriere+categorie), loturi de 12 cu „Arată încă N", răsfoire piesă-cu-piesă în lightbox pe lista curent filtrată, stare goală cu invitație la personalizare; cardurile încarcă miniaturi din `poze/mici/` (convenția motorului), cu revenire tăcută la poza mare. **Scheme:** produs `{cat, nume, desc, foto, video, ascuns?, pret}` (`ascuns:true` = produs în catalog dar nepublicat, sărit de galerie și căutare — folosit pentru pozele cu chip de client până la editare) (`foto` text sau listă; `video` .mp4); transformare `{inainte, dupa, text}` — secțiunea C06 apare la primul exemplu. **CONFIG:** `AFISEAZA_PRETURI, facebook, messenger, telefon, whatsapp, instagram, oras, adresa, fotoColectii{botez,nunta,mot}` — butoanele de contact și cardul «Unde ne găsești» (adresă + link Google Maps + hartă încărcată DOAR la atingerea vizitatorului) apar doar când câmpurile lor sunt completate.

## 7. Convenții de cod și securitate

**Cod:** identificatori în română, ASCII, fără diacritice; textele afișate cu diacritice corecte; indentare 2 spații; comentariile explică intenția; variabilele CSS nu se redenumesc; fără build, framework-uri sau dependențe externe la rulare (fonturile sunt copiate în depozit); zero stiluri inline — stările prin `hidden` sau clase; un singur `!important` (S21), documentat; intro-urile secțiunilor late sunt centrate, layouturile pe două coloane la stânga.

**Editarea în masă a conținutului (lege plătită scump):** orice curățare automată a textelor din `date.js` se face DOAR pe valori capturate (o funcție care primește `nume`/`desc` și întoarce versiunea curată), NICIODATĂ cu regex direct pe fișierul brut — o singură trecere brută a mâncat ghilimeri peste granițele valorilor și a rănit 22 de linii de produs plus blocul de categorii. Reguli obligatorii înainte de orice astfel de operație: copie pre-operație (`date.js.pre-...`); validator de formă pe fiecare linie de produs (tipar strict cat/nume/desc/foto/video/pret); `node --check` după fiecare mutație; donator de recuperare la îndemână (ieșirea originală `produse.js` a motorului, potrivire pe sufixul fișierului). La verificarea integrității, comentariile se ignoră întâi (exemplele didactice conțin căi fictive: `fata.jpg`, `colectie-botez.jpg`).

**Securitate și confidențialitate:** fără cookie-uri, trackere sau analytics. Politica **zero terți la rulare** — nicio cerere către alte domenii, verificat prin jurnalul de rețea; singura excepție, explicită și consimțită: harta Google, doar după click. CSP prin meta cu hash-ul exact al bootstrap-ului (fără unsafe-inline; la orice modificare a bootstrap-ului, hash-ul se recalculează); referrer `strict-origin-when-cross-origin`; `frame-src` include www.google.com, maps.google.com, consent.google.com (redirecționările UE). Pagina 404 folosește căi ABSOLUTE cu numele depozitului (Pages o servește de la orice adâncime) — la redenumire sau domeniu propriu, prefixul se actualizează (notat și în fișier).

## 8. Convenții pentru media

Nume: `categorie-descriere-scurta-NN.jpg` (litere mici, fără diacritice, cratime). Poze: max 1600px, JPEG q82, EXIF (inclusiv GPS) șters + miniatură 640 în `mici/` — motorul le face pe toate. Video: .mp4 scurt, sub 50 MB. Coperta: 1200×630, orizontală. **Pozele cu chipuri de clienți sau copii NU se publică fără confirmarea explicită a proprietarului.**

## 9. Fluxul de lucru

Conținut brut (chat sau depozit GitHub temporar; descărcare verificată: `git clone --depth 1` sau arhiva codeload) → **populare.py**: grupează pozele aceleiași postări într-un produs cu răsfoire, sortează pe categorii, repară diacriticele exportului, deduplichează pe conținut, semnalează coliziunile de nume, ordonează cronologic invers, acceptă GIF, detectează exportul greșit (HTML), scrie ambele mărimi și, cu `--injecteaza cale/date.js`, pune produsele direct în site, cu copie .bak. Repere măsurate: 6 fișiere → 1,4s; 152 imagini → 66 produse → 18,3s; ~90 ms/poză (1000 ≈ 2 min); video: 2 secunde de clip pe secundă de lucru pe un nucleu; spațiu de lucru ~9 GB (arhive ≤4 GB dintr-o trecere; peste, în valuri). Triaj vizual la volum: planșe numerotate de 48 de miniaturi (planse.py). Detalii operaționale: ZIUA-ARHIVEI.md, anexa pentru arhive mari. → **curatoriere umană** (categorisirea vizuală a nesigurelor, texte pe tonul premium, coperta, fotoColectii, exemplele înainte/după, filtrul de chipuri) → **livrare** → proprietarul urcă (pentru sute de fișiere: ZIUA-ARHIVEI.md) → Pages, ~1 minut.

## 10. Porțile de calitate (nimic nu pleacă fără ele)

**Statice:** sintaxă JS (`node --check`), parsare CSS curată, echilibru HTML, **auditul adevărului** — afirmațiile măsurabile ale acestui fișier, verificate contra codului. **Funcționale:** suita jsdom completă (galerie, loturi, căutare, filtre, lightbox cu răsfoire media + piese, transformări, hartă, contact, meniu, buton sus, moduri de eșec) citind direct sursa din pachet; simularea fără JavaScript (conținutul static vizibil). **Rețea:** zero cereri externe, din jurnalul browserului. **Măsurate:** Lighthouse (server local, simulare mobilă severă) — Performance 96 · Accessibility 100 · Best Practices 100 · SEO 100, CLS 0, TBT 0 ms. **Acceptanța pe ZIP-ul livrat:** arhiva dezarhivată proaspăt, servită sub sub-calea exactă Pages (regula director→index), probele unui vizitator real. **La scară** (obligatoriu la orice schimbare a galeriei): arhivă sintetică de 60 de postări prin tot lanțul, apoi browser real — repere: încărcare 766 ms, prima vopsire 576 ms, zero poze cerute înainte de derulare, 12 miniaturi la primul lot, căutare în 66 de produse ~200 ms. **Vizual:** capturi Chromium reale; desktop 1280@2; telefon 430×932@3 (dispozitivul proprietarului; 15 Pro Max are viewport identic) + 360@3 + landscape 932×430; depășire orizontală zero; ținte ≥44pt; scanarea muchiilor cardurilor la pixel.

**Metodologie (lecții plătite):** testele așteaptă condiții, nu pauze (filele headless amână temporizatoarele); derulează ca oamenii (lazy nu încarcă sub linia de plutire); izolează starea între navigări (căutare + hash se combină intenționat); martorul se refotografiază la orice suspiciune; la fullPage pe mobil, bara cu backdrop-filter lasă fantome la granițele de 4096px ale aparatului — pentru diff exact, blur-ul se dezactivează în aparat; orice defect vizual raportat se reproduce, se măsoară, se repară la cauză și se re-măsoară.

## 11. Istoric al deciziilor

Single-file la origine, pentru editare manuală și publicare simplă. Redesign la cererea proprietarului: porțelan/cerneală/roz pudrat/șampanie; fundal `#FCFBF9`. Conținutul nu depinde de JavaScript (lecția previzualizării de pe iPhone). Facebook nu poate fi accesat automat — conținutul vine doar prin export oficial sau direct de la proprietar. Arhitectura pe fișiere (tema/date/logică/pagini) — executată cu acordul proprietarului; echivalența vizuală demonstrată prin diff de capturi: zero pixeli diferiți pe desktop și, cu metodologia corectă, și pe mobil. Catalogul real (din arhiva Facebook): 1019 produse — nuntă 329 · botez ~300 · moț ~140 · Crăciun ~81 · Paște ~55 · mărțișor ~36 · aniversări ~29 · tablouri ~15 · îndrăgostiți ~14 · absolvire ~12 (26 ascunse temporar, cu fețe de clienți). Faza 2 (pagină per colecție, generată din aceleași date; prag ~15–20 piese/categorie) — la acest volum, botez și nuntă o justifică din plin; se decide pe volumul real; până atunci, linkurile pe categorie acoperă partajarea.

## 12. În așteptare de la proprietar (busola oricărei sesiuni)

Publicarea pachetului pe GitHub Pages și adresa finală — la primirea ei: `og:url` + `og:image` absolute, `sitemap.xml`, verificarea live împreună. Arhiva Facebook (ZIUA-ARHIVEI.md). Completarea în `date.js`: `telefon, whatsapp, instagram, oras, adresa`. Confirmarea numelui atelierului — „Atelier Gabriela" e provizoriu (apare în index, coperta, 404, README, §1). Confirmarea pozelor cu chipuri, la populare. Decizia de Faza 2, pe volum. Comutatorul prețurilor, la cuvântul proprietarului.
