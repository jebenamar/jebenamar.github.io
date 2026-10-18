(() => {
"use strict";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

/* ================= DATA ================= */
const JOBS = [
  { c: "Groupe Agrica", d: "Depuis mars 2019", role: "Lead développeur", p: "Assurance agricole", tags: ["drupal", "js"], open: true,
    r: ["Application Nuxt.js de monitoring des flux et de gestion des rejeux de flux",
        "Refonte du site agrica.fr : Drupal headless + front Next.js",
        "Application Next.js de gestion des échanges entre partenaires, authentification Keycloak",
        "Initialisation des configurations Maven, Jenkins et SonarQube des 3 nouveaux projets",
        "Création du site public, du site privé et d'un module de vente de produits d'assurance (portail partenaire)"],
    s: ["Nuxt.js", "Next.js", "Drupal 8 → 11", "Keycloak", "Jenkins", "SonarQube", "Maven"] },
  { c: "Renault Dacia UK", d: "Oct. 2018 · 3 mois", role: "Développeur Back / Front", p: "E-commerce de vente de voitures neuves", tags: ["symfony", "js"],
    r: ["Services du tunnel d'achat pour le front Angular", "Service d'import de stock", "Corrections d'anomalies front Angular"], s: ["Symfony 4", "Angular 4"] },
  { c: "Groupe-e", d: "Juin 2018 · 2 mois", role: "Lead développeur", p: "Fournisseur d'électricité — groupe-e.ch", tags: ["drupal"],
    r: ["Module d'estimation d'installation de panneaux photovoltaïques", "Corrections des retours clients"], s: ["Drupal 8", "Twig", "jQuery"] },
  { c: "Generali — Agences digitales", d: "Fév. 2018 · 2 mois", role: "Lead développeur Drupal", p: "Création de sites par agence", tags: ["drupal"],
    r: ["Analyse et chiffrage du besoin", "Mise en place de l'environnement de développement", "Routing personnalisé nom-agence/ville", "Module de fil d'Ariane personnalisé", "Développement backend"], s: ["Drupal 8", "Twig"] },
  { c: "Crédit Agricole", d: "Oct. 2017 · 4 mois", role: "Développeur", p: "Refonte du site credit-agricole.com", tags: ["symfony"],
    r: ["Développement backend", "Moteur de recherche"], s: ["eZ Platform", "Solr"] },
  { c: "CEDEO", d: "Janv. 2017 · 6 mois", role: "Développeur", p: "Refonte de enviedesalledebain.fr", tags: ["drupal"],
    r: ["Moteur de recherche", "Service de prise de rendez-vous", "Import du catalogue vers Elasticsearch"], s: ["Drupal 8", "Elasticsearch"] },
  { c: "Siblu", d: "Mars 2016 · 9 mois", role: "Développeur", p: "Achat et location de mobile homes — siblu.fr", tags: ["drupal"],
    r: ["Intranet social pour les membres des villages", "Refonte du site siblu.fr", "Web services de l'application mobile (Fun-pass)"], s: ["Drupal 7"] },
  { c: "Nestlé — Vittel", d: "Sept. 2015 · 2 mois", role: "Développeur", p: "Jeu en ligne Vittel × Kung Fu Panda 3", tags: ["drupal"],
    r: ["Module Cropyt (upload d'images)", "Site mobile"], s: ["Drupal 7"] },
  { c: "Picwic", d: "Août 2015 · 2 mois", role: "Développeur", p: "E-commerce de jouets", tags: ["symfony", "ecom"],
    r: ["Bundle des retours", "Bundle des remboursements"], s: ["Symfony 2", "Twig"] },
  { c: "Alice Délice", d: "Juin 2015 · 2 mois", role: "Lead développeur", p: "Refonte e-commerce alicedelice.com", tags: ["ecom"],
    r: ["Module de click & collect", "Support technique"], s: ["Prestashop 1.5", "Google Maps"] },
  { c: "McCover", d: "Mars 2015 · 3 mois", role: "Lead développeur", p: "E-commerce mccover.com", tags: ["ecom"],
    r: ["Module de livraison", "Module de paiement", "Support technique"], s: ["Prestashop 1.6"] },
  { c: "Des sols et des murs", d: "Fév. 2015 · 1 mois", role: "Développeur", p: "E-commerce dessolsetdesmurs.com", tags: ["ecom"],
    r: ["Module de calcul de quantité de peinture", "Refonte de la home page"], s: ["Prestashop 1.6"] },
  { c: "Guitel", d: "Janv. 2015 · 1 mois", role: "Développeur", p: "E-commerce guitel.fr", tags: ["ecom"],
    r: ["Import des clients, adresses et commandes"], s: ["Prestashop 1.5"] },
  { c: "BMW", d: "2 mois", role: "Développeur", p: "bmw.fr — page de contact", tags: ["symfony"],
    r: ["Bundle de contact", "Corrections des retours clients"], s: ["Symfony 2"] },
  { c: "Autodistribution", d: "11 mois", role: "Lead développeur", p: "Refonte de autodistribution.fr", tags: ["symfony"],
    r: ["Moteur de recherche avec Google Maps", "Import / export des fichiers de tarifs", "Gestion des événements"], s: ["Symfony 1.4", "Oracle"] },
  { c: "SMI — Mutuelle", d: "Sept. 2011 · 6 mois", role: "Lead développeur", p: "smi-mut.com et fastt-mut.com", tags: ["symfony"],
    r: ["Intégration du plugin sfAtosPayment", "Backend", "Import / export des fichiers de tarifs"], s: ["Symfony 1.4"] },
  { c: "Jaeger-LeCoultre", d: "Juil. 2011 · 3 mois", role: "Lead développeur", p: "Refonte de jaeger-lecoultre.com", tags: ["symfony"],
    r: ["Intégration de sfGuardUser", "Gestion de contenu", "Module contact relié à un web service"], s: ["Symfony 1.4"] },
  { c: "Croquetteland", d: "Juin 2011 · 1 mois", role: "Développeur", p: "E-commerce croquetteland.com", tags: ["ecom"],
    r: ["Intégration des templates", "Surcharge de la liste produits"], s: ["Magento 1.4"] },
  { c: "SIA", d: "Mai 2011 · 1 mois", role: "Développeur", p: "Refonte de sia-homefashion.fr", tags: ["ecom"],
    r: ["Carrousel de la home page", "Import de l'historique de commandes", "Surcharge de la liste produits"], s: ["Magento 1.4"] },
  { c: "Mucim-Stanislas", d: "Avr. 2011 · 1 mois", role: "Développeur", p: "mucimstanislas.fr", tags: ["symfony"],
    r: ["Module d'estimation de devis"], s: ["Symfony 1.0"] },
  { c: "1001 Libraires", d: "Juin 2010 · 11 mois", role: "Développeur", p: "Refonte de 1001libraires.com", tags: ["ecom"],
    r: ["Analyse et chiffrage des tâches", "Import des catégories, widgets", "Moteur de recherche Antidote", "Rédaction et exécution des cas de test"], s: ["Magento 1.4"] },
  { c: "France Équipement", d: "Janv. 2010 · 5 mois", role: "Développeur", p: "Pièces moto — franceequipement.com", tags: ["symfony", "ecom"],
    r: ["Gestion multilingue fr / de", "Envoi de mails (contact, création de compte)", "Tests et corrections"], s: ["Symfony 1.0"] },
  { c: "Merck", d: "Oct. 2009 · 20 mois", role: "Lead développeur", p: "eoperations.msd.com", tags: ["other"],
    r: ["Import / export de données", "Intégration LDAP", "Rédaction des spécifications techniques"], s: ["ActiveCollab", "Smarty"] },
  { c: "Kap'stages", d: "Juin 2009 · 7 mois", role: "Développeur", p: "Refonte de kapstages.com", tags: ["symfony"],
    r: ["Backend de gestion des inscriptions", "Module de statistiques", "Recherche Zend Lucene"], s: ["Symfony 1.2"] },
];
const FILTERS = { all: "Tout", drupal: "Drupal", js: "Next / Nuxt / JS", symfony: "Symfony / eZ", ecom: "E-commerce", other: "Autres" };
const SKILLS = [
  { n: "Drupal (7 · 8 · 9 · 10 · 11 · headless)", v: 92, d: "Sites institutionnels, modules custom, mode découplé" },
  { n: "Next.js · Nuxt.js", v: 82, d: "React & Vue, front découplé, applications métier" },
  { n: "PHP · Symfony (1 → 4)", v: 88, d: "Back-end, bundles, API, e-commerce" },
  { n: "DevOps · CI/CD", v: 78, d: "Maven, Jenkins, SonarQube, environnements de dev" },
  { n: "Keycloak · SSO", v: 70, d: "Authentification centralisée des applications partenaires" },
  { n: "Analyse & conception", v: 88, d: "Analyse des besoins, chiffrage, spécifications techniques" },
];
const ORBITS = { r1: ["Next.js", "Nuxt.js", "Drupal"], r2: ["Symfony", "Keycloak", "Vue.js", "React"], r3: ["Jenkins", "Sonar", "Maven", "Elastic", "Prestashop", "Magento"] };
const ROLES = ["Lead développeur", "Expert Drupal headless", "Next.js & Nuxt.js", "Symfony depuis la v1.0", "CI/CD Jenkins · Sonar"];
const STACK1 = ["Drupal headless", "Next.js", "Nuxt.js", "Symfony", "Keycloak", "Jenkins", "SonarQube"];
const STACK2 = ["Expert Drupal", "15+ ans", "Agrica", "Monitoring de flux", "CI/CD", "Keycloak SSO"];

/* ================= BOOT ================= */
const boot = $("#boot");
const bootLines = ["$ ssh jeb@cv.local", "› chargement du profil… <span class=ok>OK</span>", "› montage : drupal-headless, next.js, nuxt.js… <span class=ok>OK</span>",
  "› authentification keycloak… <span class=ok>AUTH OK</span>", "› pipeline jenkins + sonar… <span class=ok>PASSED</span>", "› lancement de l'interface ▮"];
let bootDone = false;
const endBoot = () => { if (bootDone) return; bootDone = true; boot.classList.add("done"); setTimeout(() => boot.remove(), 1000); };
if (reduced || sessionStorageGet("booted")) { boot.remove(); bootDone = true; }
else {
  bootLines.forEach((l, i) => { const p = document.createElement("p"); p.innerHTML = l; p.style.animationDelay = (i * 0.22) + "s"; boot.appendChild(p); });
  setTimeout(endBoot, bootLines.length * 220 + 450);
  addEventListener("keydown", endBoot, { once: true });
  boot.addEventListener("click", endBoot);
  sessionStorageSet("booted", "1");
}
function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

/* ================= THEME ================= */
const themeBtn = $("#themeBtn");
const setTheme = t => { document.documentElement.dataset.theme = t; themeBtn.textContent = t === "dark" ? "☾" : "☀"; try { localStorage.setItem("theme", t); } catch (e) {} };
let saved = null; try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
const toggleTheme = () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
themeBtn.addEventListener("click", toggleTheme);

/* ================= RENDER ================= */
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fillTrack = (el, items) => { const html = items.map(t => `<span>${esc(t)}</span>`).join(""); el.innerHTML = html + html; };
fillTrack($("#mq1"), STACK1); fillTrack($("#mq2"), STACK2);

$("#skillList").innerHTML = SKILLS.map(s => `<div class="skill reveal"><h4>${esc(s.n)}<small>${s.v}%</small></h4><div class="bar"><i data-w="${s.v}"></i></div><p>${esc(s.d)}</p></div>`).join("");
Object.entries(ORBITS).forEach(([id, items]) => {
  const ring = $("#" + id);
  items.forEach((t, i) => {
    const holder = document.createElement("div");
    holder.style.cssText = `position:absolute;inset:0;transform:rotate(${(360 / items.length) * i}deg)`;
    holder.innerHTML = `<span style="transform:translate(-50%,-50%) rotate(${-(360 / items.length) * i}deg)"><em>${esc(t)}</em></span>`;
    ring.appendChild(holder);
  });
});

const tl = $("#timeline");
JOBS.forEach(j => {
  const el = document.createElement("article");
  el.className = "job reveal" + (j.open ? " open" : "");
  el.dataset.tags = j.tags.join(" ");
  el.innerHTML = `<div class="tilt" tabindex="0" role="button" aria-expanded="${!!j.open}">
    <header><h3>${esc(j.c)}</h3><time>${esc(j.d)}</time></header>
    <div class="meta">${esc(j.role)} — ${esc(j.p)}</div>
    <div class="more"><div><ul>${j.r.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
    <div class="chips">${j.s.map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>
    <span class="toggle">${j.open ? "− réduire" : "+ détails"}</span></div>`;
  const card = el.firstElementChild;
  const toggle = () => { const o = el.classList.toggle("open"); card.setAttribute("aria-expanded", o); $(".toggle", el).textContent = o ? "− réduire" : "+ détails"; };
  card.addEventListener("click", toggle);
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
  tl.appendChild(el);
});

const filtersEl = $("#filters");
filtersEl.innerHTML = Object.entries(FILTERS).map(([k, v]) => {
  const n = k === "all" ? JOBS.length : JOBS.filter(j => j.tags.includes(k)).length;
  return `<button type="button" data-f="${k}" aria-pressed="${k === "all"}">${v}<sup>${n}</sup></button>`;
}).join("");
filtersEl.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $$("button", filtersEl).forEach(x => x.setAttribute("aria-pressed", x === b));
  const f = b.dataset.f;
  $$(".job").forEach(j => j.classList.toggle("hidden", f !== "all" && !j.dataset.tags.split(" ").includes(f)));
  onScroll();
});

$("#year").textContent = new Date().getFullYear();

/* ================= PHOTO FLIP ================= */
const photo = $("#photoFlip");
const flipPhoto = () => {
  const on = photo.classList.toggle("flipped");
  photo.setAttribute("aria-pressed", on);
  $(".flip-hint span", photo).textContent = on ? "version illustrée" : "version photo";
};
photo.addEventListener("click", flipPhoto);
photo.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipPhoto(); } });

/* ================= TYPEWRITER ================= */
const typed = $("#typed");
if (reduced) typed.textContent = ROLES[0];
else (function type(i = 0, ch = 0, del = false) {
  const word = ROLES[i % ROLES.length];
  typed.textContent = word.slice(0, ch);
  if (!del && ch === word.length) return setTimeout(() => type(i, ch, true), 1700);
  if (del && ch === 0) return setTimeout(() => type(i + 1, 0, false), 250);
  setTimeout(() => type(i, ch + (del ? -1 : 1), del), del ? 35 : 75);
})();

/* ================= REVEAL + COUNTERS ================= */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target; el.classList.add("in"); io.unobserve(el);
  $$("[data-count]", el).forEach(countUp);
  $$(".bar i", el).forEach(b => b.style.width = b.dataset.w + "%");
}), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
$$(".reveal").forEach(el => io.observe(el));
function countUp(el) {
  const target = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now(), dur = reduced ? 1 : 1600;
  (function step(t) { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(target * (1 - Math.pow(1 - k, 4))) + suf; if (k < 1) requestAnimationFrame(step); })(t0);
}

/* ================= SCROLL ================= */
const progress = $("#progress"), railFill = $("#railFill"), navLinks = $$("nav.top a[href^='#']");
function onScroll() {
  const h = document.documentElement;
  progress.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
  const r = tl.getBoundingClientRect();
  railFill.style.transform = `scaleY(${Math.max(0, Math.min(1, (innerHeight * 0.6 - r.top) / r.height))})`;
  let current = null;
  navLinks.forEach(a => { const s = $(a.getAttribute("href")); if (s && s.getBoundingClientRect().top < innerHeight * 0.4) current = a; });
  navLinks.forEach(a => a.classList.toggle("active", a === current && a.getAttribute("href") !== "#top"));
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* ================= CURSOR / TILT / MAGNET ================= */
if (finePointer && !reduced) {
  document.body.classList.add("has-cursor");
  const dot = $(".cur"), ring = $(".cur-ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
  (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
  document.addEventListener("pointerover", e => ring.classList.toggle("hover", !!e.target.closest("a,button,[role=button],input,textarea")));

  document.addEventListener("pointermove", e => {
    const card = e.target.closest(".tilt"); if (!card) return;
    const b = card.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    card.style.setProperty("--mx", x * 100 + "%"); card.style.setProperty("--my", y * 100 + "%");
    card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg)`;
  });
  $$(".tilt").forEach(c => c.addEventListener("pointerleave", () => c.style.transform = ""));

  $$(".magnetic").forEach(m => {
    m.addEventListener("pointermove", e => { const b = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.3}px,${(e.clientY - b.top - b.height / 2) * 0.4}px)`; });
    m.addEventListener("pointerleave", () => m.style.transform = "");
  });
}
// re-bind tilt reset for timeline cards created dynamically
$$(".job .tilt").forEach(c => c.addEventListener("pointerleave", () => c.style.transform = ""));

/* ================= STARFIELD ================= */
const cv = $("#stars"), ctx = cv.getContext("2d");
let W, H, pts = [], mouse = { x: -999, y: -999 };
function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = Math.min(90, Math.floor(W * H / 16000));
  pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .4 }));
}
resize(); addEventListener("resize", resize);
addEventListener("pointermove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
function draw() {
  ctx.clearRect(0, 0, W, H);
  const light = document.documentElement.dataset.theme === "light";
  const col = light ? "40,20,90" : "200,190,255";
  for (const p of pts) {
    if (!reduced) {
      p.x += p.vx; p.y += p.vy;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120) { p.x += dx / d * 1.6; p.y += dy / d * 1.6; }
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    }
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = `rgba(${col},.7)`; ctx.fill();
  }
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < 130) { ctx.strokeStyle = `rgba(${col},${(1 - d / 130) * .22})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
  }
  if (!reduced && !document.hidden) requestAnimationFrame(draw);
}
draw();
document.addEventListener("visibilitychange", () => { if (!document.hidden && !reduced) draw(); });

/* ================= TOAST / CONTACT ================= */
const toastEl = $("#toast"); let toastT;
const toast = msg => { toastEl.textContent = msg; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), 2600); };
const copyMail = () => {
  const mail = "jebenamar@gmail.com";
  (navigator.clipboard ? navigator.clipboard.writeText(mail) : Promise.reject()).then(() => toast("📋 Email copié !"), () => { location.href = "mailto:" + mail; });
};
$("#copyMail").addEventListener("click", copyMail);
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `${f.get("message")}\n\n— ${f.get("name")}`;
  location.href = `mailto:jebenamar@gmail.com?subject=${encodeURIComponent(f.get("subject"))}&body=${encodeURIComponent(body)}`;
  toast("✉️ Ouverture de votre messagerie…");
});

/* ================= CONFETTI / PARTY ================= */
const cf = $("#confetti"), cx = cf.getContext("2d");
function confetti() {
  if (reduced) return toast("🎉");
  cf.width = innerWidth; cf.height = innerHeight;
  const colors = ["#7c5cff", "#ff3d81", "#ffd23f", "#00e5c7", "#ffffff"];
  const parts = Array.from({ length: 220 }, () => ({ x: innerWidth / 2, y: innerHeight * .6, vx: (Math.random() - .5) * 18, vy: -Math.random() * 18 - 6, s: Math.random() * 8 + 4, c: colors[Math.random() * colors.length | 0], a: Math.random() * 6, va: (Math.random() - .5) * .4 }));
  let frames = 0;
  (function f() {
    cx.clearRect(0, 0, cf.width, cf.height);
    parts.forEach(p => { p.vy += .45; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; cx.save(); cx.translate(p.x, p.y); cx.rotate(p.a); cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore(); });
    if (++frames < 220) requestAnimationFrame(f); else cx.clearRect(0, 0, cf.width, cf.height);
  })();
}
function party() { confetti(); if (reduced) return; document.body.classList.add("party"); setTimeout(() => document.body.classList.remove("party"), 5000); toast("🕹️ Party mode activé !"); }
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let kIdx = 0;
addEventListener("keydown", e => { kIdx = (e.key.toLowerCase() === KONAMI[kIdx].toLowerCase()) ? kIdx + 1 : (e.key === KONAMI[0] ? 1 : 0); if (kIdx === KONAMI.length) { kIdx = 0; party(); } });

/* ================= COMMAND PALETTE ================= */
const pal = $("#palette"), palInput = $("#palInput"), palList = $("#palList");
const go = id => () => $(id).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
const CMDS = [
  { t: "Aller à la mission Agrica", k: "nav", run: go("#mission") },
  { t: "Voir les skills", k: "nav", run: go("#skills") },
  { t: "Voir le parcours", k: "nav", run: go("#experience") },
  { t: "Voir la formation", k: "nav", run: go("#formation") },
  { t: "Me contacter", k: "nav", run: go("#contact") },
  { t: "Copier l'email", k: "action", run: copyMail },
  { t: "Télécharger le CV (PDF)", k: "action", run: () => { const a = document.createElement("a"); a.href = "CV-Jbenamar.pdf"; a.download = ""; a.click(); } },
  { t: "Changer de thème", k: "action", run: toggleTheme },
  { t: "Imprimer cette page", k: "action", run: () => print() },
  { t: "Party mode 🎉", k: "fun", run: party },
];
let palSel = 0, palItems = CMDS;
function renderPal() {
  const q = palInput.value.trim().toLowerCase();
  palItems = CMDS.filter(c => c.t.toLowerCase().includes(q));
  palSel = Math.min(palSel, Math.max(0, palItems.length - 1));
  palList.innerHTML = palItems.map((c, i) => `<li class="${i === palSel ? "sel" : ""}" data-i="${i}">${esc(c.t)}<small>${c.k}</small></li>`).join("") || `<li>Aucun résultat</li>`;
}
const openPal = () => { pal.classList.add("open"); palInput.value = ""; palSel = 0; renderPal(); palInput.focus(); };
const closePal = () => pal.classList.remove("open");
const runPal = i => { const c = palItems[i]; if (!c) return; closePal(); c.run(); };
$("#openPalette").addEventListener("click", openPal);
addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.classList.contains("open") ? closePal() : openPal(); }
  if (!pal.classList.contains("open")) return;
  if (e.key === "Escape") closePal();
  if (e.key === "ArrowDown") { e.preventDefault(); palSel = (palSel + 1) % (palItems.length || 1); renderPal(); }
  if (e.key === "ArrowUp") { e.preventDefault(); palSel = (palSel - 1 + palItems.length) % (palItems.length || 1); renderPal(); }
  if (e.key === "Enter") { e.preventDefault(); runPal(palSel); }
});
palInput.addEventListener("input", () => { palSel = 0; renderPal(); });
palList.addEventListener("click", e => { const li = e.target.closest("li[data-i]"); if (li) runPal(+li.dataset.i); });
pal.addEventListener("click", e => { if (e.target === pal) closePal(); });
})();
