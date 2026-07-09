#!/bin/bash
# ═══ Curățenia pozelor orfane — Atelier Gabriela ═══
# Rulează din folderul depozitului (atelier-gabriela).

if [ ! -d poze ] || [ ! -d .git ]; then
  echo "EROARE: nu ești în folderul depozitului. Deschide Git Bash ÎN folderul atelier-gabriela."
  exit 1
fi

echo "── aduc ultimele modificări de pe GitHub ──"
git pull

ORFANE="CITESTE.txt botez-creatie-handmade-679.jpg botez-creatie-handmade-687.jpg botez-creatie-handmade-688.jpg botez-creatie-handmade-689.jpg botez-creatie-handmade-691-afis.jpg botez-creatie-handmade-699.jpg botez-creatie-handmade-700.jpg botez-creatie-handmade-701.jpg botez-creatie-handmade-703.jpg botez-creatie-handmade-712.jpg botez-frumoasa-sa-va-fie-dimineata-ziua-si-via-711-afis.jpg botez-pasiune-710-afis.jpg botez-pentru-luca-georgian-382-afis.jpg mot-astazi-au-spus-da-460-afis.jpg mot-sa-va-poarte-noroc-600-1.jpg mot-sa-va-poarte-noroc-600-2.jpg mot-sa-va-poarte-noroc-600-3.jpg necategorizat-creatie-handmade-608-afis.jpg necategorizat-creatie-handmade-646.jpg necategorizat-creatie-handmade-678.jpg necategorizat-creatie-handmade-690.jpg necategorizat-creatie-handmade-692.jpg necategorizat-creatie-handmade-702-afis.jpg necategorizat-creatie-handmade-713.jpg necategorizat-creatie-handmade-714.jpg necategorizat-pentru-un-mare-da-447-afis.jpg necategorizat-pregatite-pentru-biserica-de-suflet-612-afis.jpg necategorizat-prezent-585-1.jpg necategorizat-prezent-585-2.jpg necategorizat-prezent-585-3.jpg nunta-casa-de-piatra-mirilor-73-afis.jpg nunta-creatie-handmade-535-1.jpg nunta-creatie-handmade-535-2.jpg nunta-creatie-handmade-535-3.jpg nunta-creatie-handmade-621-afis.jpg nunta-creatie-handmade-645.jpg nunta-creatie-handmade-657.jpg nunta-creatie-handmade-658.jpg nunta-creatie-handmade-659.jpg nunta-creatie-handmade-669.jpg nunta-creatie-handmade-681.jpg nunta-creatie-handmade-682.jpg nunta-creatie-handmade-693.jpg nunta-e-o-binecuvantare-sa-ai-in-preajma-oamen-84-afis.jpg nunta-fa-din-fiecare-zi-o-amintire-frumoasa-670-afis.jpg nunta-la-multi-ani-impreuna-596-1.jpg nunta-la-multi-ani-impreuna-596-2.jpg nunta-la-multi-ani-impreuna-596-3.jpg nunta-la-multi-ani-impreuna-596-4.jpg nunta-la-multi-ani-sanatosi-si-binecuvantati-111.jpg paste-creatie-handmade-709.jpg"

sterse=0
for f in $ORFANE; do
  [ -f "poze/$f" ] && rm "poze/$f" && sterse=$((sterse+1))
  [ -f "poze/mici/$f" ] && rm "poze/mici/$f"
done
echo "── fișiere șterse local: $sterse (plus perechile din mici) ──"

git add -A
git commit -m "curatenie: poze orfane sterse"
git push
echo "═══ GATA: curățenia e pe GitHub ═══"
