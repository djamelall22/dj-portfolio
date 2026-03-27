(function () {
  const video = document.getElementById("about-video");
  const btn = document.getElementById("video-play-btn");
  const icon = document.getElementById("play-icon");
  if (!video || !btn) return;

  // Déclenche quand .ab1 est visible au scroll
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        video.classList.add("ready");
        observer.disconnect();
      }
    },
    { threshold: 0.4 },
  );
  observer.observe(video.closest(".ab1"));

  // Clic = play avec son + cache le bouton
  btn.addEventListener("click", () => {
    video.muted = false;
    video.play();
    icon.classList.add("hidden");
  });

  // Si la vidéo se termine, réaffiche le bouton play
  video.addEventListener("ended", () => {
    icon.classList.remove("hidden");
  });
})();
/* ── LOADER (CSS-only, no GSAP needed) ──────────────── */
const ldBar = document.getElementById("ldBar");
const ldPct = document.getElementById("ldPct");
const loader = document.getElementById("loader");
let prog = 0;
const ti = setInterval(() => {
  prog += Math.random() * 14 + 2;
  if (prog >= 100) prog = 100;
  ldBar.style.width = prog + "%";
  ldPct.textContent = String(Math.floor(prog)).padStart(3, "0");
  if (prog >= 100) {
    clearInterval(ti);
    setTimeout(introAnim, 350);
  }
}, 75);

function introAnim() {
  loader.classList.add("hide");
  setTimeout(() => {
    loader.style.display = "none";
  }, 1100);
  setTimeout(() => {
    document.querySelector(".hero-tag").classList.add("visible");
    const spans = document.querySelectorAll(".hero-title .ln span");
    spans.forEach((s, i) =>
      setTimeout(() => s.classList.add("visible"), i * 120),
    );
    setTimeout(
      () => document.querySelector(".hero-foot").classList.add("visible"),
      500,
    );
    setTimeout(
      () => document.getElementById("nav").classList.add("visible"),
      400,
    );
  }, 400);
}

/* ── SCROLL REVEAL ──────────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ── CURSOR ─────────────────────────────────────────── */
const $cur = document.getElementById("cur");
const $ring = document.getElementById("cur-ring");
let mx = -200,
  my = -200,
  rx = -200,
  ry = -200;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
(function tick() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  $cur.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
  $ring.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;
  requestAnimationFrame(tick);
})();
const hoverEls = document.querySelectorAll("a,button,.tag,.sk-card,.pr-step");
hoverEls.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    $cur.style.width = "20px";
    $cur.style.height = "20px";
    $ring.style.transform = `translate(${rx - 18}px,${ry - 18}px) scale(1.6)`;
  });
  el.addEventListener("mouseleave", () => {
    $cur.style.width = "10px";
    $cur.style.height = "10px";
    $ring.style.transform = `translate(${rx - 18}px,${ry - 18}px) scale(1)`;
  });
});

/* ── HAMBURGER ──────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;
function toggleMenu(force) {
  menuOpen = force !== undefined ? force : !menuOpen;
  hamburger.classList.toggle("open", menuOpen);
  mobileMenu.style.display = menuOpen ? "flex" : "none";
  requestAnimationFrame(() => mobileMenu.classList.toggle("open", menuOpen));
  document.body.style.overflow = menuOpen ? "hidden" : "";
}
hamburger.addEventListener("click", () => toggleMenu());
document
  .querySelectorAll(".mm-link")
  .forEach((l) => l.addEventListener("click", () => toggleMenu(false)));

/* ── PROCESS TILT ───────────────────────────────────── */
document.querySelectorAll(".pr-step").forEach((step) => {
  step.addEventListener("mousemove", (e) => {
    const r = step.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    step.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  step.addEventListener("mouseleave", () => {
    step.style.transform = "";
  });
});

/* ── HERO PARALLAX ──────────────────────────────────── */
window.addEventListener(
  "scroll",
  () => {
    const hero = document.querySelector(".hero-title");
    if (hero) hero.style.transform = `translateY(${window.scrollY * -0.18}px)`;
  },
  { passive: true },
);

/* ── I18N ───────────────────────────────────────────── */
const T = {
  en: {
    "hero-tag": "Frontend Developer  3D Artist  Graphic Designer",
    "hero-desc":
      "Frontend developer with the eye of a 3D artist and the precision of a graphic designer. I build interfaces where code meets craft.",
    "hero-scroll-lbl": "Scroll",
    "nl-about": "About",
    "nl-skills": "Skills",
    "nl-process": "Process",
    "nl-contact": "Contact",
    "sec-about": "About",
    "sec-skills": "Skills",
    "sec-process": "Process",
    "sec-contact": "Contact",
    "a-label": "01  About",
    "a-head": "Code.<br>Art.<br>Precision.",
    "a-p1":
      "I'm Djamel, a frontend developer based in Algeria. My hybrid background  3D artist, graphic designer, then developer  lets me think visually and execute technically.",
    "a-p2":
      "I design web experiences where every pixel is intentional, every animation meaningful, every interface tells a story.",
    "pr-d1":
      "Deep dive into the brief. Context, constraints, audience. No pixel is drawn before the idea is clear.",
    "pr-d2":
      "Sketches, wireframes, 3D block-outs in 3ds Max. The visual language is defined before the first line of code.",
    "pr-d3":
      "Clean semantic code. Animations choreographed with GSAP. Every interaction considered, every transition earned.",
    "pr-d4":
      "Polish, test, iterate. The difference between good and remarkable lives in the details most people never notice.",
    "ct-pre": "Let's build something together",
  },
  fr: {
    "hero-tag": "Développeur Frontend  Artiste 3D  Graphiste",
    "hero-desc":
      "Développeur frontend avec l'œil d'un artiste 3D et la précision d'un graphiste. Je construis des interfaces où le code rencontre l'art.",
    "hero-scroll-lbl": "Défiler",
    "nl-about": "À propos",
    "nl-skills": "Compétences",
    "nl-process": "Processus",
    "nl-contact": "Contact",
    "sec-about": "À propos",
    "sec-skills": "Compétences",
    "sec-process": "Processus",
    "sec-contact": "Contact",
    "a-label": "01  À propos",
    "a-head": "Code.<br>Art.<br>Précision.",
    "a-p1":
      "Je suis Djamel, développeur frontend basé en Algérie. Mon parcours hybride  artiste 3D, graphiste, puis développeur  me permet de penser visuellement et d'exécuter techniquement.",
    "a-p2":
      "Je conçois des expériences web où chaque pixel est intentionnel, chaque animation signifiante, chaque interface raconte quelque chose.",
    "pr-d1":
      "Immersion dans le brief. Contexte, contraintes, audience. Aucun pixel avant que l'idée soit claire.",
    "pr-d2":
      "Esquisses, wireframes, block-outs 3D dans 3ds Max. Le langage visuel est défini avant la première ligne de code.",
    "pr-d3":
      "Code propre et sémantique. Animations chorégraphiées avec GSAP. Chaque interaction réfléchie, chaque transition méritée.",
    "pr-d4":
      "Polissage, test, itération. La différence entre bon et remarquable réside dans les détails que la plupart ne remarquent jamais.",
    "ct-pre": "Construisons quelque chose ensemble",
  },
  ja: {
    "hero-tag": "フロントエンド開発者  3Dアーティスト  グラフィックデザイナー",
    "hero-desc":
      "3Dアーティストの目とグラフィックデザイナーの精度を持つフロントエンド開発者。コードとアートが交わるインターフェースを構築します。",
    "hero-scroll-lbl": "スクロール",
    "nl-about": "について",
    "nl-skills": "スキル",
    "nl-process": "プロセス",
    "nl-contact": "連絡",
    "sec-about": "について",
    "sec-skills": "スキル",
    "sec-process": "プロセス",
    "sec-contact": "連絡",
    "a-label": "01  について",
    "a-head": "コード.<br>アート.<br>精度.",
    "a-p1":
      "アルジェリアを拠点とするフロントエンド開発者、ジャメルです。3Dアーティスト、グラフィックデザイナー、そして開発者というハイブリッドな経歴が、視覚的思考と技術的実行を可能にします。",
    "a-p2":
      "すべてのピクセルに意図があり、すべてのアニメーションに意味があり、すべてのインターフェースが物語を語るウェブ体験を設計します。",
    "pr-d1":
      "ブリーフへの深い理解。コンテキスト、制約、オーディエンス。アイデアが明確になる前にピクセルは描かない。",
    "pr-d2":
      "スケッチ、ワイヤーフレーム、3ds Maxでの3Dブロックアウト。最初のコードの前にビジュアル言語を定義する。",
    "pr-d3":
      "クリーンで意味のあるコード。GSAPでコレオグラフされたアニメーション。すべてのインタラクションを深く考慮する。",
    "pr-d4":
      "磨き、テスト、反復。良いものと卓越したものの違いは、ほとんどの人が気づかない細部にある。",
    "ct-pre": "一緒に何か作りましょう",
  },
};
let lang = "en";
function setLang(l) {
  lang = l;
  ["en", "fr", "ja"].forEach((x) => {
    const d = document.getElementById("btn-" + x);
    const m = document.getElementById("m-btn-" + x);
    if (d) d.classList.toggle("on", x === l);
    if (m) m.classList.toggle("on", x === l);
  });
  const d = T[l];
  for (const [id, val] of Object.entries(d)) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val;
  }
  const mmLinks = document.querySelectorAll(".mm-link");
  const keys = ["nl-about", "nl-skills", "nl-process", "nl-contact"];
  mmLinks.forEach((link, i) => {
    link.textContent = d[keys[i]];
  });
  const hd = document.getElementById("hero-desc");
  hd.style.fontFamily =
    l === "ja" ? "'Noto Sans JP',sans-serif" : "'Syne',sans-serif";
  hd.style.fontWeight = l === "ja" ? "300" : "400";
  hd.style.fontSize = l === "ja" ? ".82rem" : ".94rem";
  ["pr-d1", "pr-d2", "pr-d3", "pr-d4"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.fontFamily =
      l === "ja" ? "'Noto Sans JP',sans-serif" : "'DM Mono',monospace";
    el.style.fontSize = l === "ja" ? ".72rem" : ".65rem";
  });
  const ah = document.getElementById("a-head");
  ah.style.fontFamily =
    l === "ja" ? "'Noto Sans JP',sans-serif" : "'Bebas Neue',sans-serif";
  ah.style.fontSize =
    l === "ja" ? "clamp(1.8rem,4vw,3.5rem)" : "clamp(2.5rem,5vw,5rem)";
}
