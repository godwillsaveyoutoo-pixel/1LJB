/* =========================
   Wiskunde Quest – topics.js
   Topics + subtopics + icons
   (GEEN state, GEEN logica)
========================= */

/* =========================
   ICON FRAME
========================= */
function iconFrame(svgInner) {
  return `
  <svg viewBox="0 0 320 160" aria-hidden="true">
    <rect x="8" y="8" width="304" height="144" rx="18"
          fill="#f7fafc" stroke="#e5e7eb"/>
    ${svgInner}
  </svg>`;
}
const TOPIC_SVG_DIR = "assets/svg/";

function iconImg(file, x, y, w, h, opacity = 1) {
  const href = `${TOPIC_SVG_DIR}${file}`;
  return `
    <image
      href="${href}" xlink:href="${href}"
      x="${x}" y="${y}" width="${w}" height="${h}"
      opacity="${opacity}"
      preserveAspectRatio="xMidYMid meet"
    />
  `;
}
function iconMeanSingle() {
}
/* =========================
   ICONS
========================= */
function iconInhoudSingle() {
  return iconFrame(`
    <g>
      ${iconImg("thermos-thermo-svgrepo-com.svg", 110, 8, 100, 135, 1)}

    </g>
  `);
}

function iconGrafiekenSingle() {
  return iconFrame(`
    <g>
      ${iconImg("presentation-chart-graph-svgrepo-com.svg", 110, 8, 110, 145, 1)}
    </g>
  `);
}

function iconMeanSingle() {
  return iconFrame(`
    <g>
      ${iconImg("meanandmedian.svg", 80, -10, 160, 160, 1)}
    </g>
  `);
}
function iconMassaSingle() {
  return iconFrame(`
    <g>
      ${iconImg("scale-weight-svgrepo-com.svg", 110, 22, 90, 125, 1)}
    </g>
  `);
}
function iconChart() {
  return iconFrame(`
    <g transform="translate(40,26)">
      <rect x="0" y="0" width="240" height="108" rx="14"
            fill="#fff" stroke="#cbd5e1" stroke-width="3"/>
      <rect x="44" y="56" width="24" height="44" rx="6"
            fill="rgba(37,99,235,.25)"/>
      <rect x="92" y="32" width="24" height="68" rx="6"
            fill="rgba(37,99,235,.40)"/>
      <rect x="140" y="72" width="24" height="28" rx="6"
            fill="rgba(37,99,235,.18)"/>
      <rect x="188" y="40" width="24" height="60" rx="6"
            fill="rgba(37,99,235,.32)"/>
    </g>
  `);
}

function iconDots() {
  return iconFrame(`
    <g transform="translate(38,26)">
      <rect x="0" y="0" width="244" height="108" rx="14"
            fill="#fff" stroke="#cbd5e1" stroke-width="3"/>
      <circle cx="48" cy="78" r="10" fill="rgba(37,99,235,.25)"/>
      <circle cx="84" cy="54" r="10" fill="rgba(37,99,235,.35)"/>
      <circle cx="122" cy="64" r="10" fill="rgba(37,99,235,.18)"/>
      <circle cx="160" cy="42" r="10" fill="rgba(37,99,235,.45)"/>
      <circle cx="200" cy="70" r="10" fill="rgba(37,99,235,.25)"/>
    </g>
  `);
}

function iconWeight() {
  return iconFrame(`
    <g transform="translate(76,22)">
      <rect x="52" y="32" width="112" height="96" rx="18"
            fill="#fff" stroke="#cbd5e1" stroke-width="3"/>
      <text x="108" y="88" text-anchor="middle"
            font-size="20" font-weight="900" fill="#2563eb">
        kg
      </text>
    </g>
  `);
}

function iconFractionsSingle() {
  return iconFrame(`
    <g>
      ${iconImg("fractions.svg", 110, 8, 100, 135, 1)}
    </g>
  `);
}

function iconPercentSingle() {
  return iconFrame(`
    <g>
      ${iconImg("percentage-sticker-svgrepo-com.svg", 110, 8, 100, 135, 1)}  
    </g>
  `);
}

function iconLinesSingle() {
  return iconFrame(`
    <g >
      ${iconImg("ruler.svg", 110, 8, 100, 135, 1)}
    </g>
  `);
}

function iconAngleSingle() {
  return iconFrame(`
    <g>
      ${iconImg("angle-svgrepo-com.svg", 110, 8, 100, 135, 1)}
    </g>
  `);
}

function iconClockSingle() {
  return iconFrame(`
  ${iconImg("alarm-clock-svgrepo-com.svg", 110, 8, 100, 135, 1)}
    </g>
  `);
}

function iconPodium() {
  return iconFrame(`
    <g >
      ${iconImg("podium.svg", 110, 8, 100, 135, 1)}
    </g>
  `);
}

/* =========================
   TOPICS
========================= */
const TOPICS = [
  {
    id: "inhoud",
    title: "Inhoud",
    icon: iconInhoudSingle(),
    subtopics: {
      basic: { title: "Basis", levels: ["easy","normal","hard"] },
      convert: { title: "Herleiden", levels: ["easy","normal","hard"] },
      factor10: { title: "10× / 100× / 1000×", levels: ["easy","normal","hard"] },
      maatbeker: { title: "Maatbeker lezen", levels: ["easy","normal","hard"] },
      ratio: { title: "Verhoudingstabel", levels: ["easy","normal","hard"] },
      story: { title: "Vraagstukken", levels: ["easy","normal","hard"] },
      schatting: { title: "Schatten", levels: ["easy","normal","hard"] },
      mass: { title: "Water ↔ massa", levels: ["easy","normal","hard"] },
      compare: { title: "Vergelijken", levels: ["easy","normal","hard"] },
      error: { title: "Juist of fout", levels: ["easy","normal","hard"] }
    }
  },
  {
    id: "grafieken",
    title: "Grafieken",
    icon: iconGrafiekenSingle(),
    subtopics: {
      bar_read: { title: "Staafdiagram aflezen", levels: ["easy","normal","hard"] },
      bar_compare: { title: "Staafdiagram vergelijken", levels: ["easy","normal","hard"] },
      bar_sum: { title: "Staafdiagram sommen", levels: ["easy","normal","hard"] },
      pie_read: { title: "Cirkeldiagram aflezen", levels: ["easy","normal","hard"] },
      pie_truth: { title: "Cirkeldiagram: juist of fout", levels: ["easy","normal","hard"] },
      pie_percent: { title: "Cirkeldiagram in %", levels: ["easy","normal","hard"] },
      line_read: { title: "Lijngrafiek aflezen", levels: ["easy","normal","hard"] },
      line_compare: { title: "Lijngrafiek trends", levels: ["easy","normal","hard"] }

    }
  },
  {
    id: "gemmid",
    title: "Gemiddelde & mediaan",
    icon: iconMeanSingle(),
    subtopics: {
      median: { title: "Mediaan", levels: ["easy","normal","hard"] },
      mean: { title: "Gemiddelde", levels: ["easy","normal","hard"] }
    }
  },
  {
    id: "massa",
    title: "Massa",
    icon: iconMassaSingle(),
    subtopics: {
  unit_choice: { title: "Eenheid kiezen", levels: ["easy","normal","hard"] },
  convert: { title: "Herleiden", levels: ["easy","normal","hard"] },
  ratio: { title: "Verhoudingstabel", levels: ["easy","normal","hard"] },
  context: { title: "Context & vraagstukken", levels: ["easy","normal","hard"] },
  error: { title: "Juist of fout", levels: ["easy","normal","hard"] }
}

  },
  {
    id: "breuken",
    title: "Breuken",
    icon: iconFractionsSingle(),
    subtopics: {
      simplify: { title: "Vereenvoudigen", levels: ["easy","normal","hard"] },
      fraction_of: { title: "Breuk van een getal", levels: ["easy","normal","hard"] },
      read_fraction: { title: "Aflezen", levels: ["easy","normal","hard"] },
      complement: { title: "Aanvullen tot 1", levels: ["easy","normal","hard"] },
      compare: { title: "Vergelijken", levels: ["easy","normal","hard"] },
      fraction_click: { title: "Breuk kiezen", levels: ["easy","normal","hard"] }
    }
  },
  {
    id: "procent",
    title: "Procent",
    icon: iconPercentSingle(),
    subtopics: {
      percent_of: { title: "Procent van", levels: ["easy","normal","hard"] },
      discount: { title: "Korting", levels: ["easy","normal","hard"] },
      increase: { title: "Verhoging", levels: ["easy","normal","hard"] },
      complement: { title: "Aanvullen tot 100%", levels: ["easy","normal","hard"] },
      compare: { title: "Vergelijken", levels: ["easy","normal","hard"] },
      error: { title: "Fouten herkennen", levels: ["easy","normal","hard"] }
    }
  },
  {
    id: "lijnen",
    title: "Lijnen",
    icon: iconLinesSingle(),
    subtopics: {
      relations: { title: "Relaties (∥ ⟂ ×)", levels: ["easy","normal","hard"] },
      meten: { title: "Lijnstukken meten", levels: ["easy","normal"] }
    }
  },
  {
    id: "hoeken",
    title: "Hoeken",
    icon: iconAngleSingle(),
    subtopics: {
      angle_type: { title: "Soorten hoeken", levels: ["easy","normal"] },
      measure: { title: "Hoeken berekenen", levels: ["easy","normal","hard"] },
      geo_meet: { title: "Hoeken meten (geodriehoek)", levels: ["easy","normal","hard"] }
    }
  },
  {
    id: "tijd",
    title: "Tijd",
    icon: iconClockSingle(),
    subtopics: {
      clock_read: { title: "Klok lezen", levels: ["easy","normal","hard"] },
      convert: { title: "Herleiden", levels: ["easy","normal","hard"] },
      time_add: { title: "Eindtijd", levels: ["easy","normal","hard"] },
      time_sub: { title: "Begintijd / duur", levels: ["easy","normal","hard"] }
    }
  },
  {
    id: "global",
    title: "Quest Run",
    icon: iconPodium(),
    subtopics: {
      mix: { title: "Mix", levels: ["normal","hard"] }
    }
  }
];

/* =========================
   EXPORTS
========================= */
window.TOPICS = TOPICS;
window.getTopic = (id) => TOPICS.find(t => t.id === id) || null;
