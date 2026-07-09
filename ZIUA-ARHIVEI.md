# Ziua arhivei — coregrafia completă, pas cu pas

Scopul: din momentul în care ai arhiva Facebook, site-ul populat să fie live în aceeași zi, cu partea mecanică sub un minut și partea ta redusă la câteva click-uri. Totul de mai jos e repetat și cronometrat în avans.

## Partea ta, la început (≈10 minute)

1. Despachetează ZIP-ul arhivei pe calculator.
2. Creează pe GitHub un depozit temporar, public, cu orice nume neutru (ex: `arhiva-temp`) — separat de depozitul site-ului.
3. Urcă în el DOAR folderul cu postările (de regulă `your_facebook_activity/posts`): conține pozele, clipurile și fișierele JSON cu texte. Fișierele individuale peste 100 MB nu trec — clipurile mari sări-le sau trimite-mi-le direct în chat.
4. Dă-mi linkul depozitului în conversație.
5. După ce confirm că am descărcat totul, șterge depozitul (Settings → Delete this repository).

## Partea mea (automată + curatoriere)

Descarc arhiva (`git clone --depth 1` sau arhiva codeload — ambele căi verificate din mediul meu), apoi motorul `populare.py` face restul într-un minut: grupează pozele aceleiași postări într-un singur produs cu răsfoire, repară diacriticele stricate ale exportului, sare duplicatele identice, semnalează numele dublate, ordonează cu cele mai noi creații primele, sortează pe categorii, curăță metadatele ascunse (inclusiv GPS), scrie fiecare poză în două mărimi (1600 + miniatura de 640) și injectează produsele direct în `date.js`, cu copie de siguranță. Reper măsurat: 152 de imagini → 66 de produse în 18 secunde.

Urmează partea cu gust, singura care ia timp (30–90 de minute): categorisesc vizual necategorizatele, rescriu textele pe tonul premium al site-ului, aleg coperta reală și pozele celor trei colecții, propun 2–3 exemple „înainte/după", și pun deoparte pozele cu chipuri de clienți sau copii — acelea se publică doar cu confirmarea voastră. Primești înapoi: `date.js` populat + folderul `poze/` complet (cu `mici/` inclus).

## Partea ta, la final — urcarea pe site

Atenție la o limită reală: interfața web GitHub acceptă maximum ~100 de fișiere per încărcare, iar arhiva va aduce sute. Două căi bune:

**Calea recomandată — GitHub Desktop (o dată instalat, pentru totdeauna comod):** instalezi aplicația de pe desktop.github.com, îi dai Clone la depozitul site-ului, copiezi peste el fișierele primite de la mine (date.js + folderul poze), iar în aplicație scrii un mesaj scurt la Commit și apeși Push. Cinci minute, oricâte fișiere.

**Calea fără instalări — web, în tranșe:** urci `date.js` normal, apoi folderul `poze` în valuri de cel mult ~90 de fișiere per Commit.

GitHub Pages reîmprospătează site-ul în circa un minut după ultimul commit. Verificarea finală o facem împreună pe linkul live.

## Cronometrul estimat al zilei

Export → depozit temporar: 10 min (tu) · descărcare la mine: 1–3 min · motorul: sub 1 min · curatoriere: 30–90 min (eu) · urcare: 5–15 min (tu) · Pages: 1 min. **Total realist: o după-amiază liniștită, cu site-ul viu la finalul ei.**

## Anexă: arhive mari (1000+ fișiere, câțiva GB)

**Transferul către mine.** Interfața web GitHub refuză fișierele peste 25 MB — la arhive cu video, depozitul temporar se încarcă obligatoriu cu **GitHub Desktop** (acceptă fișiere până la 100 MB). Clipurile individuale peste 100 MB: mi le trimiți direct în chat sau le lăsăm deoparte. Spațiul meu de lucru: ~9 GB — arhive până la ~4 GB trec dintr-o singură clonare; peste, lucrez în valuri (procesez, șterg sursa, repet), transparent pentru tine.

**Ce face motorul cu volumul (ritmuri măsurate).** Poze: ~90 ms/bucată cu tot cu miniatură, amprentare și curățarea metadatelor — 1000 de poze ≈ 2 minute. Video: transcodare automată la 720p pregătit de web (≈11× mai mic; pornire instant la redare) în ritm de 2 secunde de clip pe secundă de lucru — de exemplu 100 de clipuri a câte 30s ≈ 25 de minute de motor, rulate în valuri — plus **cadru-afiș** extras automat, ca fiecare produs-video să aibă poză reală în galerie.

**Judecata la scară.** Nu privesc 1000 de poze una câte una: motorul categorisește după texte, iar pentru rest folosesc **planșele de triaj** — grile numerotate de câte 48 de miniaturi (unelte: planse.py). 1000 de poze = ~21 de planșe; de privit integral am nevoie doar de necategorizate plus sondaje pe categorii. Textele: păstrez autenticul postărilor, curățat; rescriu pe tonul premium doar vitrina (colecțiile, evidențiatele).

**Site premium, nu arhivă.** Pe Pages intră selecția curatoriată (ținta: tot situl sub ~1 GB, cu clipurile deja transcodate mărunt); restul creațiilor rămân acasă pe Facebook, către care site-ul trimite elegant. Eu propun lista finală cu planșele în mână — tu tai și adaugi.
