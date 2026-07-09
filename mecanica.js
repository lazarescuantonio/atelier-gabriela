/* ═══ mecanica.js — logica site-ului (nu necesită modificări) ═══ */
/* ==================================================================
   De aici în jos e mecanica site-ului — nu necesită modificări.
   ================================================================== */
(function(){
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const catDe = id => CATEGORII.find(c => c.id === id);

  /* --- contact: completează automat toate linkurile --- */
  $$('[data-contact="messenger"]').forEach(a => { a.href = CONFIG.messenger; a.target="_blank"; a.rel="noopener"; });
  $$('[data-contact="facebook"]').forEach(a => { a.href = CONFIG.facebook; });
  $$('[data-contact="telefon"]').forEach(a => {
    if (CONFIG.telefon && CONFIG.telefon.trim()) {
      a.href = "tel:" + CONFIG.telefon.replace(/\s+/g, "");
      const t = $('[data-contact-text="telefon"]', a);
      if (t) t.textContent = "Sună-ne: " + CONFIG.telefon;
      a.hidden = false; /* butonul stă ascuns în HTML; apare doar când numărul e completat */
    }
  });
  $$('[data-contact="whatsapp"]').forEach(a => {
    if (CONFIG.whatsapp && CONFIG.whatsapp.trim()) {
      a.href = "https://wa.me/" + CONFIG.whatsapp.replace(/\D/g, "");
      a.hidden = false;
    }
  });
  $$('[data-contact="instagram"]').forEach(a => {
    if (CONFIG.instagram && CONFIG.instagram.trim()) {
      a.href = "https://instagram.com/" + CONFIG.instagram.trim().replace(/^@/, "");
      a.hidden = false;
    }
  });
  /* adresa + harta Google, încărcată DOAR la atingerea vizitatorului */
  if (CONFIG.adresa && CONFIG.adresa.trim()) {
    $("#cardHarta").hidden = false;
    $("#hartaAdresa").textContent = CONFIG.adresa.trim();
    const q = encodeURIComponent(CONFIG.adresa.trim());
    $("#hartaLink").href = "https://www.google.com/maps/search/?api=1&query=" + q;
    $("#hartaIncarca").addEventListener("click", () => {
      $("#hartaCadru").innerHTML =
        '<iframe title="Harta atelierului pe Google Maps" loading="lazy" referrerpolicy="no-referrer" src="https://www.google.com/maps?q=' + q + '&output=embed"></iframe>';
    });
  }
    if (CONFIG.oras && CONFIG.oras.trim()) {
    $$('[data-contact-text="oras"]').forEach(el => el.textContent = CONFIG.oras);
  }

  /* --- poze pe cardurile mari de colecție --- */
  Object.entries(CONFIG.fotoColectii).forEach(([id, cale]) => {
    if (!cale) return;
    const vitrina = $('[data-foto-colectie="' + id + '"]');
    if (vitrina) vitrina.innerHTML = '<img src="' + cale + '" alt="' + (catDe(id)?.nume || "") + '" loading="lazy">';
  });

  /* --- galerie: filtre, căutare, loturi --- */
  const filtre = $("#filtre"), grila = $("#grilaGalerie");
  const stare = $("#galerieStare"), btnMaiMulte = $("#btnMaiMulte"), campCautare = $("#campCautare");
  const LOT = 12; /* câte piese se arată dintr-un foc; restul, la cerere */
  let filtruActiv = "toate", termenCautare = "", vizibile = LOT, listaCurenta = [];
  const normalizeaza = t => (t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  function butonFiltru(id, nume){
    const b = document.createElement("button");
    b.className = "filtru"; b.type = "button"; b.textContent = nume;
    b.dataset.filtru = id;
    b.setAttribute("aria-pressed", id === filtruActiv ? "true" : "false");
    b.addEventListener("click", () => setFiltru(id));
    return b;
  }
  filtre.append(butonFiltru("toate", "Toate"));
  /* apar doar categoriile care au cel puțin un produs — cele goale stau ascunse */
  CATEGORII.filter(c => PRODUSE.some(p => p.cat === c.id))
           .forEach(c => filtre.append(butonFiltru(c.id, c.nume)));

  function setFiltru(id){
    filtruActiv = id;
    $$(".filtru", filtre).forEach(b => b.setAttribute("aria-pressed", b.dataset.filtru === id ? "true" : "false"));
    vizibile = LOT;
    deseneazaGalerie();
    /* adresa reflectă filtrul -> mama poate trimite direct linkul unei colecții */
    history.replaceState(null, "", "#" + (id === "toate" ? "galerie" : id));
  }

  /* toate elementele media ale unui produs: pozele (una sau o listă) + videoclipul */
  function mediaProdus(p){
    const poze = !p.foto ? [] : (Array.isArray(p.foto) ? p.foto : [p.foto]);
    const m = poze.map(src => ({ tip: "foto", src }));
    if (p.video) m.push({ tip: "video", src: p.video });
    return m;
  }

  function pictogramaCategorie(p){
    const c = catDe(p.cat);
    return '<svg aria-hidden="true"><use href="#' + (c ? c.icon : "ic-scanteie") + '"/></svg>';
  }

  /* miniatura de pe cardul din galerie: prima poză, sau clipul, sau pictograma */
  function miniatura(p){
    const m = mediaProdus(p);
    const prima = m.find(x => x.tip === "foto") || m[0];
    if (!prima) return pictogramaCategorie(p);
    if (prima.tip === "video")
      return '<video src="' + prima.src + '" muted playsinline preload="metadata"></video>';
    return '<img src="' + prima.src + '" alt="' + p.nume + '" loading="lazy">';
  }

  function insignaMedia(p){
    const m = mediaProdus(p);
    const areVideo = m.some(x => x.tip === "video");
    if (m.length > 1)
      return '<span class="piesa-badge"><svg><use href="#' + (areVideo ? "ic-play" : "ic-foto") + '"/></svg>' + m.length + '</span>';
    if (areVideo)
      return '<span class="piesa-badge"><svg><use href="#ic-play"/></svg>video</span>';
    return "";
  }

  function cardPiesa(i){
    const p = PRODUSE[i], c = catDe(p.cat);
    const card = document.createElement("button");
    card.className = "piesa"; card.type = "button";
    card.setAttribute("aria-haspopup", "dialog");
    card.dataset.index = i;
    const pret = (CONFIG.AFISEAZA_PRETURI && p.pret) ? '<span class="piesa-pret">' + p.pret + '</span>' : "";
    card.innerHTML =
      '<span class="piesa-foto ' + (c ? c.tinta : "tinta-ceara") + '">' + miniatura(p) + insignaMedia(p) + '</span>' +
      '<span class="piesa-info">' +
        '<span class="piesa-cat">' + (c ? c.nume : "") + '</span>' +
        '<h3>' + p.nume + '</h3>' + pret +
      '</span>';
    /* cardul folosește miniatura (poze/mici/...), cu revenire tăcută la poza mare */
    const img = card.querySelector(".piesa-foto img");
    if (img) {
      const mare = img.getAttribute("src");
      const mica = mare.replace(/([^\/]+)$/, "mici/$1");
      img.addEventListener("error", () => { img.src = mare; }, { once: true });
      img.src = mica;
    }
    card.addEventListener("click", () => deschideVitrina(i));
    return card;
  }

  function deseneazaGalerie(){
    grila.innerHTML = "";
    listaCurenta = PRODUSE
      .map((p, i) => ({ p, i }))
      .filter(x => !x.p.ascuns)
      .filter(x => filtruActiv === "toate" || x.p.cat === filtruActiv)
      .filter(x => {
        if (!termenCautare) return true;
        const c = catDe(x.p.cat);
        return normalizeaza(x.p.nume + " " + x.p.desc + " " + (c ? c.nume : "")).includes(termenCautare);
      })
      .map(x => x.i);

    if (!listaCurenta.length) {
      grila.innerHTML =
        '<div class="gol-galerie"><strong>Nicio piesă nu se potrivește căutării.</strong>' +
        'Încearcă alt cuvânt — sau, și mai bine, <a href="' + CONFIG.messenger +
        '" target="_blank" rel="noopener">scrie-ne</a>: exact asta facem, personalizăm după ideea ta.</div>';
      stare.textContent = "0 piese";
      btnMaiMulte.hidden = true;
      return;
    }
    listaCurenta.slice(0, vizibile).forEach(i => grila.append(cardPiesa(i)));
    stare.textContent = listaCurenta.length === 1 ? "1 piesă" : listaCurenta.length + " piese";
    const ramase = listaCurenta.length - Math.min(vizibile, listaCurenta.length);
    btnMaiMulte.hidden = ramase <= 0;
    if (ramase > 0) btnMaiMulte.textContent = "Arată încă " + ramase;
  }
  deseneazaGalerie();

  /* --- căutare cu răgaz scurt, fără diacritice --- */
  let cronometruCautare;
  campCautare.addEventListener("input", () => {
    clearTimeout(cronometruCautare);
    cronometruCautare = setTimeout(() => {
      termenCautare = normalizeaza(campCautare.value.trim());
      vizibile = LOT;
      deseneazaGalerie();
    }, 160);
  });

  /* --- lotul următor, la cerere --- */
  btnMaiMulte.addEventListener("click", () => { vizibile += LOT; deseneazaGalerie(); });

  /* --- linkuri din carduri de colecție → aplică filtrul potrivit --- */
  $$("[data-filtru]").forEach(a => a.addEventListener("click", () => setFiltru(a.dataset.filtru)));

  /* --- transformări: poza clientului vs. produsul lucrat --- */
  if (Array.isArray(TRANSFORMARI) && TRANSFORMARI.length) {
    $("#transformari").hidden = false;
    const grilaT = $("#grilaTransformari");
    const cadru = (cale, alt) => cale
      ? '<img src="' + cale + '" alt="' + alt + '" loading="lazy">'
      : '<svg aria-hidden="true"><use href="#ic-foto"/></svg>';
    TRANSFORMARI.forEach(t => {
      const fig = document.createElement("figure");
      fig.className = "transformare aparitie";
      fig.innerHTML =
        '<div class="trans-pereche">' +
          '<div class="trans-cadru"><span class="trans-eticheta">Poza primită</span>' +
            '<div class="trans-foto">' + cadru(t.inainte, "Imaginea trimisă de client") + '</div></div>' +
          '<span class="trans-sageata" aria-hidden="true"><svg><use href="#ic-sageata"/></svg></span>' +
          '<div class="trans-cadru"><span class="trans-eticheta eticheta-dupa">Lucrat de Gabriela</span>' +
            '<div class="trans-foto">' + cadru(t.dupa, "Produsul realizat în atelier") + '</div></div>' +
        '</div>' +
        (t.text ? '<figcaption>' + t.text + '</figcaption>' : '');
      grilaT.append(fig);
    });
  }

  /* --- lightbox cu răsfoire (mai multe poze / video pe produs) --- */
  const vitrina = $("#vitrina");
  const btnInapoi = $("#vitrinaInapoi"), btnInainte = $("#vitrinaInainte"), contor = $("#vitrinaContor");
  let mediaCurent = [], pasMedia = 0, produsCurent = null, indexCurent = -1;

  function arataMedia(){
    const zona = $("#vitrinaFoto");
    if (!mediaCurent.length) { zona.innerHTML = pictogramaCategorie(produsCurent); }
    else {
      const m = mediaCurent[pasMedia];
      zona.innerHTML = m.tip === "video"
        ? '<video src="' + m.src + '" controls playsinline></video>'
        : '<img src="' + m.src + '" alt="' + produsCurent.nume + '">';
    }
    const multe = mediaCurent.length > 1;
    btnInapoi.hidden = btnInainte.hidden = !multe;
    contor.hidden = !multe;
    if (multe) contor.textContent = (pasMedia + 1) + " / " + mediaCurent.length;
  }

  function pasVitrina(dir){
    if (mediaCurent.length < 2) return;
    pasMedia = (pasMedia + dir + mediaCurent.length) % mediaCurent.length;
    arataMedia();
  }
  btnInapoi.addEventListener("click", () => pasVitrina(-1));
  btnInainte.addEventListener("click", () => pasVitrina(1));
  vitrina.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") pasVitrina(-1);
    if (e.key === "ArrowRight") pasVitrina(1);
  });
  /* glisare cu degetul prin poze, pe telefon și tabletă */
  let atingereX = null;
  const zonaMedia = $(".vitrina-media");
  zonaMedia.addEventListener("touchstart", e => {
    if (e.target.tagName === "VIDEO") return; /* nu deranjăm controalele video */
    atingereX = e.touches[0].clientX;
  }, { passive: true });
  zonaMedia.addEventListener("touchend", e => {
    if (atingereX === null) return;
    const dx = e.changedTouches[0].clientX - atingereX;
    if (Math.abs(dx) > 40) pasVitrina(dx < 0 ? 1 : -1);
    atingereX = null;
  }, { passive: true });

  function deschideVitrina(i){
    const p = PRODUSE[i], c = catDe(p.cat);
    produsCurent = p; indexCurent = i;
    const inLista = listaCurenta.includes(i);
    btnProdusAnt.hidden = btnProdusUrm.hidden = !inLista || listaCurenta.length < 2;
    mediaCurent = mediaProdus(p);
    pasMedia = 0;
    $("#vitrinaFoto").className = "vitrina-foto " + (c ? c.tinta : "tinta-ceara");
    arataMedia();
    $("#vitrinaCat").textContent = c ? c.nume : "";
    $("#vitrinaTitlu").textContent = p.nume;
    $("#vitrinaDesc").textContent = p.desc;
    const pretEl = $("#vitrinaPret");
    if (CONFIG.AFISEAZA_PRETURI && p.pret) { pretEl.textContent = p.pret; pretEl.hidden = false; }
    else pretEl.hidden = true;
    if (!vitrina.open) vitrina.showModal();
  }
  const btnProdusAnt = $("#produsAnterior"), btnProdusUrm = $("#produsUrmator");
  function pasProdus(dir){
    const poz = listaCurenta.indexOf(indexCurent);
    if (poz === -1 || listaCurenta.length < 2) return;
    deschideVitrina(listaCurenta[(poz + dir + listaCurenta.length) % listaCurenta.length]);
  }
  btnProdusAnt.addEventListener("click", () => pasProdus(-1));
  btnProdusUrm.addEventListener("click", () => pasProdus(1));

  $("#inchideVitrina").addEventListener("click", () => vitrina.close());
  vitrina.addEventListener("click", e => { if (e.target === vitrina) vitrina.close(); });
  vitrina.addEventListener("close", () => { $("#vitrinaFoto").innerHTML = ""; }); /* oprește video la închidere */

  /* --- meniu mobil --- */
  const meniuBtn = $("#meniuBtn"), nav = $("#navPrincipal");
  meniuBtn.addEventListener("click", () => {
    const deschis = nav.classList.toggle("deschis");
    meniuBtn.setAttribute("aria-expanded", deschis ? "true" : "false");
  });
  $$("a", nav).forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("deschis");
    meniuBtn.setAttribute("aria-expanded", "false");
  }));
  document.addEventListener("click", e => {
    if (nav.classList.contains("deschis") && !e.target.closest("header")) {
      nav.classList.remove("deschis");
      meniuBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* --- apariții la scroll --- */
  const miscareRedusa = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (miscareRedusa || !("IntersectionObserver" in window)) {
    $$(".aparitie").forEach(el => el.classList.add("vizibil"));
  } else {
    const obs = new IntersectionObserver(intrari => {
      intrari.forEach(x => { if (x.isIntersecting) { x.target.classList.add("vizibil"); obs.unobserve(x.target); } });
    }, { threshold: .12 });
    $$(".aparitie").forEach(el => obs.observe(el));
  }

  /* --- linkuri distribuibile pe categorie: /#botez, /#nunta, /#tablouri ... --- */
  function aplicaHashCategorie(laIncarcare){
    const h = decodeURIComponent(location.hash.slice(1));
    if (!CATEGORII.some(c => c.id === h)) return;
    setFiltru(h);
    $("#galerie").scrollIntoView({ behavior: (laIncarcare || miscareRedusa) ? "auto" : "smooth" });
  }
  window.addEventListener("hashchange", () => aplicaHashCategorie(false));
  aplicaHashCategorie(true);

  /* --- buton „înapoi sus" --- */
  const susBtn = $("#susBtn");
  susBtn.hidden = false; /* rămâne ascuns doar dacă JavaScript nu rulează */
  const arataSus = () => susBtn.classList.toggle("vizibil", window.scrollY > 600);
  window.addEventListener("scroll", arataSus, { passive: true });
  arataSus();
  susBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: miscareRedusa ? "auto" : "smooth" }));

  /* --- anul curent în subsol --- */
  $("#an").textContent = new Date().getFullYear();
})();
