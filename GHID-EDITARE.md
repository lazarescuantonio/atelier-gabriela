# Ghid — site Atelier Gabriela

Site-ul are patru fișiere-nucleu: `index.html` (structura), `stil.css` (toată tema — o culoare se schimbă aici și se propagă peste tot), `mecanica.js` (logica — nu se atinge) și `date.js` — singurul fișier de editat pentru conținut, marcat ZONA DE EDITARE: produse, categorii, transformări, contact, prețuri. Regula de aur pentru testarea locală: dezarhivează pachetul și deschide index.html DIN folderul rezultat — cele patru fișiere trebuie să stea împreună; deschis singur, index.html va afișa un banner care explică exact ce lipsește.

## Produse ascunse temporar (fețele de clienți)

Unele produse au în poză chipul unui client sau al unui copil. Ca să nu apară public înainte de a le pregăti, au primit un semn în `date.js`: `ascuns:true`. Aceste produse rămân în catalog, dar nu se văd pe site și nu apar în căutare.

Când ești gata cu unul (de exemplu i-ai pus o inimă roșie peste față în poză și ai înlocuit fișierul):
1. găsești produsul în `date.js` (caută după numele lui);
2. ștergi din linie bucata `ascuns:true, ` — exact atât, cu virgulă și spațiul de după;
3. salvezi și urci fișierul. Produsul apare instant la vedere.

Ca să vezi câte mai sunt ascunse, caută în `date.js` cuvântul `ascuns:true`.

## Publicarea și actualizarea site-ului

Pașii compleți și mereu actuali sunt în **GHID-PUBLICARE.md** (o singură sursă de adevăr — lista fișierelor de urcat include tema, datele, mecanica și fonturile, nu doar index.html). Reamintire utilă: fișierul deschis local pe telefon nu e un test corect (iOS previzualizează fără JavaScript); site-ul publicat funcționează perfect pe orice telefon.

## Cum îmi transferi arhiva de Facebook prin GitHub

Mediul meu de lucru poate descărca de pe GitHub, deci planul tău funcționează. Ca să protejăm datele: nu urca arhiva întreagă — despachetează ZIP-ul pe calculator și urcă într-un depozit **separat** (nu cel al site-ului) doar folderul cu postările, de obicei `your_facebook_activity/posts` (conține pozele, clipurile și fișierele JSON cu textele). Ține cont că un depozit public e vizibil oricui cât timp există, iar GitHub refuză fișierele individuale peste 100 MB (clipurile mari sări-le sau trimite-mi-le direct în chat). După ce urci, dă-mi linkul depozitului în conversație — îl descarc, confirm, iar tu poți șterge depozitul imediat (Settings → General → jos de tot, Delete this repository). Alternativ, dacă arhiva e mică, o poți încărca direct aici în chat, fără GitHub.

## Fotografii și videoclipuri în site

Folderul `poze` stă lângă `index.html` (pe GitHub îl urci în același depozit). O singură poză: `foto: "poze/nume.jpg"`. Mai multe poze pe același produs, ca listă: `foto: ["poze/fata.jpg", "poze/detaliu.jpg"]` — săgețile de răsfoire apar automat. Un clip: `video: "poze/clip.mp4"`, singur sau împreună cu pozele. Cardurile mari de colecție își iau pozele din `fotoColectii`, în blocul `CONFIG`. Categoriile valide: botez, nunta, mot, tablouri, absolvire, paste, craciun, indragostiti. Clipurile e bine să rămână scurte și sub ~50 MB. Pentru viteză, cardurile galeriei folosesc miniaturi din `poze/mici/` — motorul de populare le creează automat; la o poză adăugată manual fără miniatură, cardul revine singur la poza mare.

## Secțiunea „înainte / după"

În lista `TRANSFORMARI` din zona de editare adaugi perechi: poza primită de la client + produsul lucrat de Gabriela, cu un text scurt opțional. Secțiunea „De la poza ta, la piesa ta" e ascunsă și apare pe site automat la primul exemplu completat — e cea mai convingătoare dovadă a serviciului de personalizare, merită 2–3 exemple bune.

## Prețurile (ascunse momentan)

În `CONFIG`, schimbă `AFISEAZA_PRETURI: false` în `true` când vei fi pregătită. Produsele cu câmpul `pret` completat (ex: `pret: "de la 250 lei"`) îl afișează atunci pe card și în detalii; cele cu `pret: null` rămân fără. Cât timp e pe `false`, nimic nu apare, chiar dacă e completat.

## Contact

Tot în `CONFIG`: `telefon`, `whatsapp`, `instagram` și `adresa` (butoanele — respectiv cardul «Unde ne găsești», cu link și hartă Google la cerere — apar pe site abia după completare), `oras`, plus linkurile de Facebook/Messenger deja setate.

## Descărcarea arhivei din Facebook (reamintire scurtă)

Pe desktop sau din aplicația de telefon: Setări și confidențialitate → Setări → Centrul de conturi → Informațiile tale și permisiunile → Descarcă-ți informațiile → alege profilul → Anumite tipuri de informații → bifează Postări (și Fotografii și videoclipuri, dacă apare separat) → Descarcă pe dispozitiv → interval Dintotdeauna (sau doar ultimele luni, pentru o arhivă mică) → format JSON, calitate media Ridicată → Creează fișiere. Scurtătură: facebook.com/dyi.
