const SAVE_KEY = "scalyLegacySave_v4";
const TUTORIAL_KEY = "scalyLegacyTutorialSeen_v1";
const STARTING_CASH = 1800;

let state = { money: STARTING_CASH, season: 1, nextId: 1, snakes: [], shop: [] };

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function moneyFmt(n) { return "$" + Math.round(n).toLocaleString(); }
function toast(msg) {
  const root = document.getElementById("toastRoot");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function emptyGenes(species) {
  const g = {};
  Object.keys(SPECIES[species].loci).forEach(locus => { g[locus] = ["+", "+"]; });
  return g;
}
function alleleRank(a) { return a === "+" ? 0 : 1; }
function normalizePair(pair) {
  const p = pair.slice();
  p.sort((a, b) => alleleRank(b) - alleleRank(a) || String(a).localeCompare(String(b)));
  return p;
}
function locusState(pair) {
  const mutants = pair.filter(a => a !== "+");
  if (!mutants.length) return "wt";
  if (mutants.length === 1) return "het";
  return "super";
}
function isVisual(species, genes, locus) {
  const def = SPECIES[species].loci[locus];
  const st = locusState(genes[locus] || ["+", "+"]);
  if (def.type === "recessive") return st === "super";
  return st === "het" || st === "super";
}

function phenotype(species, genes) {
  const sp = SPECIES[species];
  const parts = [];
  const used = {};
  (sp.combos || []).forEach(c => {
    const ok = Object.entries(c.when).every(([locus, need]) => {
      const st = locusState(genes[locus] || ["+", "+"]);
      if (need === "super") return st === "super";
      if (need === "vis") return isVisual(species, genes, locus);
      return false;
    });
    if (ok) { parts.push(c.label); Object.keys(c.when).forEach(k => used[k] = true); }
  });
  Object.keys(sp.loci).forEach(locus => {
    if (used[locus]) return;
    const def = sp.loci[locus];
    const pair = genes[locus] || ["+", "+"];
    const st = locusState(pair);
    if (st === "wt") return;
    const alleleId = pair.find(a => a !== "+");
    const al = def.alleles[alleleId];
    if (!al) return;
    if (def.type === "recessive" && st === "super") parts.push(al.label);
    if (def.type !== "recessive" && st === "het") parts.push(al.label);
    if (def.type !== "recessive" && st === "super") parts.push((al.super && al.super.label) || ("Super " + al.label));
  });
  const hets = [];
  Object.keys(sp.loci).forEach(locus => {
    const def = sp.loci[locus];
    if (def.type !== "recessive") return;
    const pair = genes[locus] || ["+", "+"];
    if (locusState(pair) === "het") {
      const alleleId = pair.find(a => a !== "+");
      hets.push("het " + def.alleles[alleleId].label);
    }
  });
  let name = parts.length ? parts.join(" ") : "Normal";
  if (hets.length) name += " (" + hets.join(", ") + ")";
  return name;
}

function visualTags(species, genes) {
  const tags = { melanin: 0.72, red: 0.45, yellow: 0.4, pattern: 0.8, contrast: 0.4, hue: "", eye: "dark", patternStyle: "blotch", speckle: 0, piebald: 0 };
  const sp = SPECIES[species];
  Object.keys(sp.loci).forEach(locus => {
    const def = sp.loci[locus];
    const pair = genes[locus] || ["+", "+"];
    const st = locusState(pair);
    if (st === "wt") return;
    const alleleId = pair.find(a => a !== "+");
    const al = def.alleles[alleleId];
    if (!al) return;
    let src = null;
    if (def.type === "recessive" && st === "super") src = al.tags;
    if (def.type !== "recessive" && st === "het") src = al.het;
    if (def.type !== "recessive" && st === "super") src = al.super;
    if (!src) return;
    Object.entries(src).forEach(([k, v]) => {
      if (k === "label" || k === "problem") return;
      if (typeof v === "number" && typeof tags[k] === "number") tags[k] = v;
      else tags[k] = v;
    });
  });
  return tags;
}

function problems(species, genes) {
  const notes = [];
  const sp = SPECIES[species];
  Object.keys(sp.loci).forEach(locus => {
    const def = sp.loci[locus];
    const pair = genes[locus] || ["+", "+"];
    const st = locusState(pair);
    const alleleId = pair.find(a => a !== "+");
    if (!alleleId) return;
    const al = def.alleles[alleleId];
    if (st === "het" && al.het && al.het.problem) notes.push(al.het.problem);
    if (st === "super" && al.super && al.super.problem) notes.push(al.super.problem);
    if (st !== "wt" && al.problem) notes.push(al.problem);
  });
  return notes;
}

function snakeSVG(species, genes) {
  const t = visualTags(species, genes);
  const body = SPECIES[species].body;
  const base = body === "king" ? [20, 70, 30] : body === "hognose" ? [150, 90, 40] : body === "corn" ? [170, 80, 35] : body === "garter" ? [40, 90, 30] : [28, 50, 24];
  const r = Math.round(40 + 160 * t.red);
  const g = Math.round(50 + 140 * t.yellow);
  const b = Math.round(30 + 40 * (1 - t.melanin));
  const dark = `rgb(${Math.round(20 * t.melanin)},${Math.round(16 * t.melanin)},${Math.round(12 * t.melanin)})`;
  const fill = t.hue === "lavender" ? `rgb(${140 + r / 4},${110},${170})` : t.hue === "green" ? `rgb(${80},${140 + g / 3},${70})` : `rgb(${r},${g},${b})`;
  const eye = t.eye === "pink" ? "#e07080" : t.eye === "blue" ? "#7eb6e8" : "#1a120c";
  const spots = [];
  const n = t.patternStyle === "stripe" || t.patternStyle === "tessera" ? 1 : 7;
  for (let i = 0; i < n; i++) {
    const x = 46 + i * 28;
    if (t.pattern < 0.12) break;
    if (t.patternStyle === "stripe") spots.push(`<rect x="40" y="78" width="200" height="${10 + 16 * t.pattern}" rx="6" fill="${dark}" opacity="0.85"/>`);
    else if (t.patternStyle === "web") spots.push(`<path d="M${x} 70 l18 16 l-18 16 l-8 -16 z" fill="${dark}" opacity="0.8"/>`);
    else spots.push(`<ellipse cx="${x}" cy="86" rx="${14 * t.pattern + 4}" ry="${10 * t.pattern + 3}" fill="${dark}" opacity="0.8"/>`);
  }
  if (t.piebald) spots.push(`<rect x="120" y="62" width="70" height="48" rx="16" fill="#f4f1ea"/>`);
  const snout = body === "hognose" ? `<path d="M250 78 q18 8 8 16" stroke="#5a4030" stroke-width="3" fill="none"/>` : "";
  return `<svg viewBox="0 0 280 150" class="snake-svg" aria-hidden="true">
    <rect width="280" height="150" fill="#10161c"/>
    <ellipse cx="150" cy="92" rx="118" ry="28" fill="${fill}"/>
    ${spots.join("")}
    <circle cx="236" cy="78" r="16" fill="${fill}"/>
    <circle cx="242" cy="74" r="3.2" fill="${eye}"/>
    ${snout}
    <text x="8" y="18" fill="#8b9cb3" font-size="10">${body}</text>
  </svg>`;
}

function geneSummary(s) {
  const sp = SPECIES[s.species];
  const bits = [];
  Object.keys(sp.loci).forEach(locus => {
    const pair = s.genes[locus] || ["+", "+"];
    if (locusState(pair) === "wt") return;
    const names = pair.filter(a => a !== "+").map(a => sp.loci[locus].alleles[a].label);
    bits.push(names.join("/") + ":" + pair.join("/"));
  });
  return bits.join(" · ") || "wild-type";
}

function makeSnake(species, sex, genes, source) {
  const id = state.nextId++;
  const s = {
    id, species, sex,
    genes: genes || emptyGenes(species),
    name: species.split(" ")[0] + "-" + id,
    age: source === "hatch" ? 0 : rand(1, 3),
    source: source || "shop",
    sireId: null, damId: null,
    founders: [id], ancestors: [id],
    inbredLevel: "none", inbredLabel: "Founder / unrelated stock"
  };
  s.pheno = phenotype(species, s.genes);
  s.value = snakeValue(s);
  s.problems = problems(species, s.genes);
  return s;
}

function snakeValue(s) {
  let v = SPECIES[s.species].basePrice;
  const sp = SPECIES[s.species];
  Object.keys(sp.loci).forEach(locus => {
    const def = sp.loci[locus];
    const st = locusState(s.genes[locus] || ["+", "+"]);
    if (def.type === "recessive") {
      if (st === "super") v += sp.basePrice * 1.8;
      else if (st === "het") v += sp.basePrice * 0.45;
    } else if (st === "super") v += sp.basePrice * 2.2;
    else if (st === "het") v += sp.basePrice * 1.15;
  });
  if ((s.pheno || "").includes("Blue-Eyed") || (s.pheno || "").includes("Yeti")) v += 180;
  else if ((s.pheno || "").includes("Snow")) v += 100;
  return Math.max(20, Math.round(v));
}

function randomGenes(species, forceVisual) {
  const g = emptyGenes(species);
  const loci = Object.keys(SPECIES[species].loci);
  if (!forceVisual && Math.random() < 0.36) return g;
  const n = Math.random() < 0.16 ? 2 : 1;
  loci.slice().sort(() => Math.random() - 0.5).slice(0, n).forEach(locus => {
    const def = SPECIES[species].loci[locus];
    const allele = pick(Object.keys(def.alleles));
    if (def.type === "recessive") g[locus] = Math.random() < 0.55 || forceVisual ? [allele, allele] : [allele, "+"];
    else g[locus] = Math.random() < 0.14 ? [allele, allele] : [allele, "+"];
    g[locus] = normalizePair(g[locus]);
  });
  return g;
}

function gamete(pair) { return pair[Math.random() < 0.5 ? 0 : 1]; }
function combineLocus(a, b) { return normalizePair([a, b]); }

function breedChildGenes(male, female) {
  const genes = {};
  Object.keys(SPECIES[male.species].loci).forEach(locus => {
    genes[locus] = combineLocus(gamete(male.genes[locus]), gamete(female.genes[locus]));
  });
  return genes;
}

function predictOutcomes(male, female) {
  const loci = Object.keys(SPECIES[male.species].loci).filter(locus => {
    return locusState(male.genes[locus]) !== "wt" || locusState(female.genes[locus]) !== "wt";
  });
  if (!loci.length) return { Normal: 1 };
  const counts = {};
  const n = loci.length > 5 ? 2400 : 800;
  for (let i = 0; i < n; i++) {
    const genes = emptyGenes(male.species);
    loci.forEach(locus => { genes[locus] = combineLocus(gamete(male.genes[locus]), gamete(female.genes[locus])); });
    const ph = phenotype(male.species, genes);
    counts[ph] = (counts[ph] || 0) + 1;
  }
  const out = {};
  Object.keys(counts).forEach(k => out[k] = counts[k] / n);
  return out;
}

function pairRelationship(male, female) {
  if (female.sireId === male.id || female.damId === male.id || male.sireId === female.id || male.damId === female.id) {
    return { level: "close", title: "Parent × offspring", detail: "Close inbreed. Hidden harmful alleles are much more likely to pair.", coef: 0.25, offspringLabel: "Close inbred (parent × offspring)" };
  }
  if (male.sireId && female.sireId && male.sireId === female.sireId && male.damId && female.damId && male.damId === female.damId) {
    return { level: "close", title: "Full siblings", detail: "Same sire and dam. High risk of stacking hidden problems.", coef: 0.25, offspringLabel: "Close inbred (full siblings)" };
  }
  if ((male.sireId && (male.sireId === female.sireId || male.sireId === female.damId)) || (male.damId && (male.damId === female.sireId || male.damId === female.damId))) {
    return { level: "moderate", title: "Half siblings", detail: "They share one parent. Plan an outcross later.", coef: 0.125, offspringLabel: "Line-bred (half siblings)" };
  }
  const shared = (male.founders || []).filter(id => (female.founders || []).includes(id));
  if (shared.length) return { level: "mild", title: "Same founder line", detail: "They share " + shared.length + " founder animal(s). Mild line-breeding.", coef: 0.0625, offspringLabel: "Line-bred (shared founder)" };
  return { level: "none", title: "Unrelated pair", detail: "No shared parents or founders in this colony.", coef: 0, offspringLabel: "Outcross" };
}

function applyLineage(child, male, female, rel) {
  child.sireId = male.id;
  child.damId = female.id;
  child.founders = Array.from(new Set([].concat(male.founders || [], female.founders || []))).slice(0, 24);
  child.ancestors = Array.from(new Set([male.id, female.id].concat(male.ancestors || [], female.ancestors || []))).slice(0, 32);
  child.inbredLevel = rel.level;
  child.inbredLabel = rel.offspringLabel;
  if (rel.coef >= 0.25) child.value = Math.round(child.value * 0.88);
  child.problems = problems(child.species, child.genes);
  return child;
}

function generateShopStock() {
  const list = [];
  const names = Object.keys(SPECIES);
  for (let i = 0; i < 12; i++) {
    const sp = pick(names);
    const s = makeSnake(sp, Math.random() < 0.5 ? "male" : "female", randomGenes(sp, Math.random() < 0.45), "shop");
    s.price = Math.round(s.value * (0.95 + Math.random() * 0.25));
    list.push(s);
  }
  ["Corn Snake", "Ball Python", "Western Hognose", "California Kingsnake", "Eastern Hognose", "Southern Hognose"].forEach((sp, i) => {
    const s = makeSnake(sp, i % 2 ? "female" : "male", emptyGenes(sp), "shop");
    s.price = Math.round(SPECIES[sp].basePrice * 0.9);
    list.push(s);
  });
  state.shop = list;
}

function showView(name) {
  ["home", "shop", "collection", "breed", "genes", "advice"].forEach(v => {
    document.getElementById("view-" + v).classList.toggle("hidden", v !== name);
  });
  if (name === "shop") renderShop();
  if (name === "collection") renderCollection();
  if (name === "breed") fillBreed();
  if (name === "home") renderHome();
  if (name === "genes") renderGeneIndex();
}
function updateHeader() {
  document.getElementById("money").textContent = moneyFmt(state.money);
  document.getElementById("snakeCount").textContent = state.snakes.length;
  document.getElementById("season").textContent = state.season;
}
function cardHTML(s, mode) {
  const badge = s.inbredLevel && s.inbredLevel !== "none" ? `<span class="badge inbred">${s.inbredLevel === "close" ? "Close inbred" : "Line-bred"}</span>` : (s.source === "hatch" ? `<span class="badge outcross">Outcross</span>` : "");
  const warn = (s.problems || []).length ? `<div class="warn">${s.problems[0]}</div>` : "";
  return `<div class="card">
    <div class="visual-box">${snakeSVG(s.species, s.genes)}</div>
    <div class="card-title">${s.pheno}</div>
    <div><span class="badge">${s.species}</span><span class="badge ${s.sex}">${s.sex}</span><span class="badge">Age ${s.age}</span>${badge}</div>
    <div class="gene-tag">${geneSummary(s)}</div>
    ${warn}
    <div class="price">${moneyFmt(mode === "shop" ? s.price : s.value)}</div>
    <div class="actions">
      ${mode === "shop"
        ? `<button class="primary" onclick="buySnake(${s.id})">Buy</button><button onclick="showDetail(${s.id},'shop')">View</button>`
        : `<button onclick="showDetail(${s.id},'collection')">Details</button><button class="danger" onclick="sellSnake(${s.id})">Sell</button>`}
    </div>
  </div>`;
}
function renderShop() {
  const filter = document.getElementById("shopSpeciesFilter").value;
  let list = state.shop;
  if (filter) list = list.filter(s => s.species === filter);
  document.getElementById("shopGrid").innerHTML = list.map(s => cardHTML(s, "shop")).join("") || "<p>No stock matches.</p>";
}
function renderCollection() {
  const sp = document.getElementById("collSpeciesFilter").value;
  const sex = document.getElementById("collSexFilter").value;
  let list = state.snakes.filter(s => (!sp || s.species === sp) && (!sex || s.sex === sex));
  document.getElementById("collectionGrid").innerHTML = list.map(s => cardHTML(s, "collection")).join("") || "<p>No snakes yet. Buy your first animals in the Shop.</p>";
}
function renderHome() {
  document.getElementById("homeStats").innerHTML = `Cash <strong>${moneyFmt(state.money)}</strong> · Snakes <strong>${state.snakes.length}</strong> · Season ${state.season}`;
  document.getElementById("speciesList").innerHTML = Object.keys(SPECIES).map(sp => {
    const n = Object.values(SPECIES[sp].loci).reduce((a, l) => a + Object.keys(l.alleles).length, 0);
    return `<li><strong>${sp}</strong> <em>(${SPECIES[sp].sci})</em> — ${n} alleles</li>`;
  }).join("");
}
function renderGeneIndex() {
  document.getElementById("geneIndex").innerHTML = Object.keys(SPECIES).map(sp => {
    const loci = SPECIES[sp].loci;
    const rows = Object.keys(loci).map(locus => {
      const def = loci[locus];
      const alleles = Object.values(def.alleles).map(a => a.label).join(", ");
      return `<li><strong>${alleles}</strong> — ${def.type}${Object.keys(def.alleles).length > 1 ? " (same locus)" : ""}</li>`;
    }).join("");
    const lines = (SPECIES[sp].lines || []).map(l => `<li>${l}</li>`).join("");
    return `<h3>${sp}</h3><ul>${rows}</ul>${lines ? `<p>Lines, not genes:</p><ul>${lines}</ul>` : ""}`;
  }).join("");
}
function fillSpeciesSelects() {
  const opts = Object.keys(SPECIES).map(sp => `<option value="${sp}">${sp}</option>`).join("");
  ["shopSpeciesFilter", "collSpeciesFilter", "breedSpecies"].forEach(id => {
    const el = document.getElementById(id);
    const first = el.querySelector("option").outerHTML;
    el.innerHTML = first + opts;
  });
}
function buySnake(id) {
  const idx = state.shop.findIndex(s => s.id === id);
  if (idx < 0) return;
  const s = state.shop[idx];
  if (state.money < s.price) { toast("Not enough money."); return; }
  state.money -= s.price;
  state.shop.splice(idx, 1);
  const owned = makeSnake(s.species, s.sex, s.genes, "bought");
  owned.name = s.name; owned.age = s.age; owned.value = s.value; owned.price = undefined;
  owned.founders = [owned.id]; owned.ancestors = [owned.id];
  state.snakes.push(owned);
  updateHeader(); renderShop(); saveGame(false);
  toast("Purchased " + owned.pheno + " " + owned.species);
}
function sellSnake(id) {
  const idx = state.snakes.findIndex(s => s.id === id);
  if (idx < 0) return;
  const s = state.snakes[idx];
  state.money += s.value;
  state.snakes.splice(idx, 1);
  updateHeader(); renderCollection(); saveGame(false);
  toast("Sold for " + moneyFmt(s.value));
}
function refreshShopStock() {
  if (state.money < 25) { toast("Need $25 to refresh."); return; }
  state.money -= 25;
  generateShopStock();
  updateHeader(); renderShop(); saveGame(false);
}
function showDetail(id, from) {
  const pool = from === "shop" ? state.shop : state.snakes;
  const s = pool.find(x => x.id === id);
  if (!s) return;
  const probs = (s.problems || []).map(p => `<p class="warn">${p}</p>`).join("");
  document.getElementById("modalRoot").innerHTML = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal"><button class="close" onclick="closeModal()">×</button>
      <h2>${s.pheno}</h2>
      <p><span class="badge">${s.species}</span> <span class="badge ${s.sex}">${s.sex}</span></p>
      <div class="visual-box tall">${snakeSVG(s.species, s.genes)}</div>
      <p class="fine">Generated reference from this animal's genes. Not a photo of a specific snake.</p>
      <h3>Genetics</h3><p class="gene-tag">${geneSummary(s)}</p>
      <h3>Pedigree</h3><p>${s.inbredLabel}</p>
      <p class="fine">Sire #${s.sireId || "—"} · Dam #${s.damId || "—"} · Founders ${(s.founders || []).join(", ")}</p>
      ${probs}
      <p>${SPECIES[s.species].note}</p>
      <p><strong>${moneyFmt(from === "shop" ? s.price : s.value)}</strong></p>
    </div></div>`;
}
function closeModal() { document.getElementById("modalRoot").innerHTML = ""; }

function fillBreed() {
  const sp = document.getElementById("breedSpecies").value;
  const maleSel = document.getElementById("breedMale");
  const femaleSel = document.getElementById("breedFemale");
  maleSel.innerHTML = ""; femaleSel.innerHTML = "";
  if (!sp) { document.getElementById("breedPreview").style.display = "none"; return; }
  state.snakes.filter(s => s.species === sp && s.sex === "male").forEach(s => maleSel.insertAdjacentHTML("beforeend", `<option value="${s.id}">#${s.id} ${s.pheno}</option>`));
  state.snakes.filter(s => s.species === sp && s.sex === "female").forEach(s => femaleSel.insertAdjacentHTML("beforeend", `<option value="${s.id}">#${s.id} ${s.pheno}</option>`));
  if (!maleSel.options.length) maleSel.innerHTML = "<option value=''>No males</option>";
  if (!femaleSel.options.length) femaleSel.innerHTML = "<option value=''>No females</option>";
  updateBreedPreview();
}
function updateBreedPreview() {
  const male = state.snakes.find(s => s.id === +document.getElementById("breedMale").value);
  const female = state.snakes.find(s => s.id === +document.getElementById("breedFemale").value);
  const box = document.getElementById("breedPreview");
  if (!male || !female) { box.style.display = "none"; return; }
  box.style.display = "block";
  const rel = pairRelationship(male, female);
  const outcomes = predictOutcomes(male, female);
  const rows = Object.entries(outcomes).sort((a, b) => b[1] - a[1]).map(([ph, p]) => {
    const pct = (p * 100).toFixed(1);
    return `<tr><td>${ph}</td><td>${pct}%</td><td><div class="prob-bar"><div class="prob-fill" style="width:${pct}%"></div></div></td></tr>`;
  }).join("");
  const bits = [];
  Object.keys(SPECIES[male.species].loci).forEach(locus => {
    const def = SPECIES[male.species].loci[locus];
    const lm = male.genes[locus], lf = female.genes[locus];
    if (locusState(lm) === "wt" && locusState(lf) === "wt") return;
    const alleleNames = Object.values(def.alleles).map(a => a.label).join(" / ");
    bits.push(`<strong>${alleleNames}</strong> (${def.type}${Object.keys(def.alleles).length > 1 ? ", one locus" : ""}): ${lm.join("/")} × ${lf.join("/")}`);
  });
  document.getElementById("punnettExplain").innerHTML =
    `<div class="${rel.level === "none" ? "kin-ok" : "kin-warn"}"><strong>${rel.title}</strong><br>${rel.detail}</div>` +
    (bits.join("<br>") || "Both parents are wild-type for modeled genes.");
  document.getElementById("outcomeTable").innerHTML = `<table><tr><th>Phenotype</th><th>Chance</th><th></th></tr>${rows}</table>`;
  document.getElementById("malePreview").innerHTML = snakeSVG(male.species, male.genes);
  document.getElementById("femalePreview").innerHTML = snakeSVG(female.species, female.genes);
}
function doBreed() {
  const male = state.snakes.find(s => s.id === +document.getElementById("breedMale").value);
  const female = state.snakes.find(s => s.id === +document.getElementById("breedFemale").value);
  if (!male || !female) return;
  const rel = pairRelationship(male, female);
  if (rel.level === "close" || rel.level === "moderate") {
    if (!confirm(rel.title + ". " + rel.detail + " Breed anyway?")) return;
  }
  const [lo, hi] = SPECIES[male.species].clutch;
  const n = rel.level === "close" ? rand(lo, Math.max(lo, hi - 2)) : rand(lo, hi);
  const clutch = [];
  for (let i = 0; i < n; i++) {
    const child = makeSnake(male.species, Math.random() < 0.5 ? "male" : "female", breedChildGenes(male, female), "hatch");
    clutch.push(applyLineage(child, male, female, rel));
  }
  showClutch(clutch, male, female);
}
function showClutch(clutch, male, female) {
  window._clutch = clutch;
  window._clutchKept = clutch.map(() => false);
  const cards = clutch.map((s, i) => `<div class="card" id="clutch-${i}">${snakeSVG(s.species, s.genes)}<div class="card-title">${s.pheno}</div><span class="badge ${s.sex}">${s.sex}</span><div class="price">${moneyFmt(s.value)}</div><div class="actions"><button class="primary" onclick="keepHatch(${i})">Keep</button><button onclick="sellHatch(${i})">Sell</button></div></div>`).join("");
  document.getElementById("modalRoot").innerHTML = `<div class="modal-overlay"><div class="modal wide"><h2>${clutch.length} hatchlings</h2><p>${male.pheno} × ${female.pheno}</p><div class="grid">${cards}</div><div class="actions"><button class="primary" onclick="keepAll()">Keep remaining</button><button onclick="sellAll()">Sell remaining</button><button onclick="closeModal();renderCollection();">Done</button></div></div></div>`;
}
function keepHatch(i) {
  if (window._clutchKept[i]) return;
  state.snakes.push(window._clutch[i]);
  window._clutchKept[i] = true;
  const card = document.getElementById("clutch-" + i);
  if (card) card.querySelector(".actions").innerHTML = "<em>Kept</em>";
  updateHeader(); saveGame(false);
}
function sellHatch(i) {
  if (window._clutchKept[i]) return;
  state.money += window._clutch[i].value;
  window._clutchKept[i] = true;
  const card = document.getElementById("clutch-" + i);
  if (card) card.querySelector(".actions").innerHTML = "<em>Sold</em>";
  updateHeader(); saveGame(false);
}
function keepAll() { window._clutch.forEach((_, i) => keepHatch(i)); }
function sellAll() { window._clutch.forEach((_, i) => sellHatch(i)); }
function advanceSeason() {
  state.season++;
  state.snakes.forEach(s => s.age++);
  const upkeep = state.snakes.length * 8;
  state.money = Math.max(0, state.money - upkeep);
  generateShopStock();
  updateHeader(); saveGame(false);
  toast("Season " + state.season + (upkeep ? " — upkeep " + moneyFmt(upkeep) : ""));
  if (!document.getElementById("view-shop").classList.contains("hidden")) renderShop();
}

function migrateSnake(s) {
  if (!s || !SPECIES[s.species]) return null;
  const g = emptyGenes(s.species);
  Object.keys(s.genes || {}).forEach(k => {
    if (Array.isArray(s.genes[k])) g[k] = normalizePair(s.genes[k]);
  });
  s.genes = g;
  s.pheno = phenotype(s.species, s.genes);
  s.problems = problems(s.species, s.genes);
  if (!s.founders) s.founders = [s.id];
  if (!s.ancestors) s.ancestors = [s.id];
  return s;
}
function saveGame(manual) {
  const payload = { version: 4, savedAt: new Date().toISOString(), money: state.money, season: state.season, nextId: state.nextId, snakes: state.snakes, shop: state.shop };
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  document.getElementById("saveStatus").textContent = (manual ? "Saved " : "Auto-saved ") + new Date().toLocaleTimeString();
  if (manual) toast("Game saved in this browser.");
}
function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    state.money = data.money;
    state.season = data.season || 1;
    state.nextId = data.nextId || 1;
    state.snakes = (data.snakes || []).map(migrateSnake).filter(Boolean);
    state.shop = (data.shop || []).map(migrateSnake).filter(Boolean);
    if (!state.shop.length) generateShopStock();
    document.getElementById("saveStatus").textContent = "Loaded save";
    return true;
  } catch (err) { return false; }
}
function newGame() {
  if (!confirm("Start a new game? This deletes the v4 save in this browser.")) return;
  localStorage.removeItem(SAVE_KEY);
  state = { money: STARTING_CASH, season: 1, nextId: 1, snakes: [], shop: [] };
  generateShopStock();
  updateHeader(); renderHome(); showView("home"); saveGame(false);
  toast("New game — $1,800 and no snakes.");
}

const TUTORIAL_STEPS = [
  ["You start with cash, not snakes", "You begin with $1,800 and an empty rack. Buy captive-bred animals, breed a same-species pair, then keep what the project needs and sell the rest."],
  ["Shop", "Buy a male and a female of the same species. Normals are the cheap lesson. A visual or a het costs more because it already carries a gene. Each season refreshes stock."],
  ["Genes are loci", "Open Genes to see the catalog. If two names share a locus, they are alleles: Albino × Candy does not give 100% visuals. Motley and Stripe are one corn locus. Kahl and Sharp albino are different boa loci."],
  ["Breed", "The preview is a Punnett sample. Recessive visuals need two copies. Incomplete-dominant genes show with one copy; two copies are the super form. Blue-eyed leucistic is the super of the BEL complex, not a separate gene."],
  ["Looks are generated from the genes", "Each card is drawn from that animal's pigment and pattern tags. Albino, anery, snow, pastel, and piebald cannot share a picture. These are references, not photos of a real snake."],
  ["Inbreeding and problem genes", "Close relatives are flagged and must be confirmed. Spider-complex genes note a wobble. Super Cinnamon and Super Jungle note known problems. The game does not hide those."],
  ["Save stays in this browser", "Auto-save covers buys, sales, and seasons. New Game wipes this browser's v4 colony. Skip is always available, and Tutorial replays this."]
];
function closeTutorial() {
  try { localStorage.setItem(TUTORIAL_KEY, "1"); } catch (err) {}
  document.getElementById("tutorialRoot").classList.add("hidden");
  document.getElementById("tutorialRoot").innerHTML = "";
}
function renderTutorial(i) {
  const step = TUTORIAL_STEPS[i];
  const dots = TUTORIAL_STEPS.map((_, n) => `<span class="${n === i ? "on" : ""}"></span>`).join("");
  const root = document.getElementById("tutorialRoot");
  root.classList.remove("hidden");
  root.innerHTML = `<div class="tutorial-overlay"><div class="tutorial-card"><div class="tut-step">Tutorial ${i + 1} of ${TUTORIAL_STEPS.length}</div><h2>${step[0]}</h2><p>${step[1]}</p><div class="tut-dots">${dots}</div><div class="tut-actions"><button onclick="closeTutorial()">Skip</button>${i ? `<button onclick="renderTutorial(${i - 1})">Back</button>` : ""}${i < TUTORIAL_STEPS.length - 1 ? `<button class="primary" onclick="renderTutorial(${i + 1})">Next</button>` : `<button class="primary" onclick="closeTutorial()">Start breeding</button>`}</div></div></div>`;
}
function openTutorial(force) {
  let seen = false;
  try { seen = localStorage.getItem(TUTORIAL_KEY) === "1"; } catch (err) {}
  if (!force && seen) return;
  renderTutorial(0);
}
function init() {
  fillSpeciesSelects();
  if (!loadGame()) { generateShopStock(); document.getElementById("saveStatus").textContent = "Not saved"; }
  updateHeader(); renderHome(); showView("home");
  window.addEventListener("beforeunload", () => saveGame(false));
  openTutorial(false);
}
init();
