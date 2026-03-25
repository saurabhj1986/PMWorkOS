/**
 * create-harvey-slides.mjs
 *
 * Creates the Saurabh Jhaveri → Harvey AI pitch deck in Google Slides.
 *
 * SETUP (one-time):
 *   1. Go to https://console.cloud.google.com/
 *   2. Create a project → Enable "Google Slides API"
 *   3. OAuth 2.0 Credentials → Desktop App → Download JSON
 *   4. Save as scripts/credentials.json
 *   5. node scripts/create-harvey-slides.mjs
 *      (opens browser for auth on first run, saves token to scripts/token.json)
 *
 * Run:
 *   node scripts/create-harvey-slides.mjs
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH       = path.join(__dirname, 'token.json');
const SCOPES = ['https://www.googleapis.com/auth/presentations'];

// ── Colour palette ────────────────────────────────────────────────────────────
const NAVY   = { red: 0.051, green: 0.106, blue: 0.165 };  // #0d1b2a
const PANEL  = { red: 0.039, green: 0.098, blue: 0.184 };  // #0a192f
const WHITE  = { red: 0.941, green: 0.957, blue: 0.973 };  // #f0f4f8
const MUTED  = { red: 0.553, green: 0.663, blue: 0.769 };  // #8da9c4
const CYAN   = { red: 0.220, green: 0.741, blue: 0.973 };  // #38bdf8
const BORDER = { red: 0.220, green: 0.741, blue: 0.973 };  // same, low alpha

// ── Size helpers (EMU) ────────────────────────────────────────────────────────
const W = 9144000;   // slide width  (10 in)
const H = 5143500;   // slide height (5.63 in)
const pt = n => ({ magnitude: n * 12700, unit: 'EMU' });
const emu = n => ({ magnitude: n, unit: 'EMU' });

function rgb(c, alpha = 1) {
  return alpha < 1
    ? { rgbColor: c }   // Google Slides doesn't support per-object alpha in text easily; use as is
    : { rgbColor: c };
}

function solid(c) { return { solidFill: { color: { rgbColor: c } } }; }

function textStyle(opts = {}) {
  return {
    bold:            opts.bold       ?? false,
    fontSize:        opts.size       ? { magnitude: opts.size, unit: 'PT' } : undefined,
    foregroundColor: opts.color      ? { opaqueColor: { rgbColor: opts.color } } : undefined,
    fontFamily:      opts.font       ?? 'Inter',
    letterSpacing:   opts.tracking   ? { magnitude: opts.tracking, unit: 'PT' } : undefined,
  };
}

function addBox(requests, id, x, y, w, h) {
  requests.push({
    createShape: {
      objectId:  id,
      shapeType: 'RECTANGLE',
      elementProperties: {
        pageObjectId: requests._slideId,
        size:     { width: emu(w), height: emu(h) },
        transform: { scaleX: 1, scaleY: 1, translateX: x, translateY: y, unit: 'EMU' },
      },
    },
  });
}

function styleBox(requests, id, fillColor, strokeAlpha = 0) {
  requests.push({
    updateShapeProperties: {
      objectId:        id,
      shapeProperties: {
        shapeBackgroundFill: { solidFill: { color: { rgbColor: fillColor } } },
        outline: strokeAlpha > 0
          ? { outlineFill: { solidFill: { color: { rgbColor: BORDER }, alpha: 0.3 } }, weight: pt(0.75) }
          : { outlineFill: { solidFill: { color: { rgbColor: fillColor } } } },
      },
      fields: 'shapeBackgroundFill,outline',
    },
  });
}

function addText(requests, id, text, opts = {}) {
  requests.push({
    insertText: { objectId: id, text },
  });
  requests.push({
    updateTextStyle: {
      objectId:  id,
      textRange: { type: 'ALL' },
      style:     textStyle(opts),
      fields:    'bold,fontSize,foregroundColor,fontFamily',
    },
  });
  if (opts.align) {
    requests.push({
      updateParagraphStyle: {
        objectId:     id,
        textRange:    { type: 'ALL' },
        style:        { alignment: opts.align },
        fields:       'alignment',
      },
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

function slide1(slideId, requests) {
  requests._slideId = slideId;

  // Background
  addBox(requests, `${slideId}_bg`, 0, 0, W, H);
  styleBox(requests, `${slideId}_bg`, NAVY);

  // Eyebrow
  addBox(requests, `${slideId}_eyebrow`, W * 0.25, H * 0.08, W * 0.5, pt(28).magnitude);
  styleBox(requests, `${slideId}_eyebrow`, NAVY);
  addText(requests, `${slideId}_eyebrow`, 'CONFIDENTIAL · FOR JOSH @ HARVEY AI',
    { size: 8, color: CYAN, bold: true, tracking: 2, align: 'CENTER' });

  // Name
  addBox(requests, `${slideId}_name`, W * 0.2, H * 0.2, W * 0.6, pt(80).magnitude);
  styleBox(requests, `${slideId}_name`, NAVY);
  addText(requests, `${slideId}_name`, 'Saurabh Jhaveri',
    { size: 48, bold: true, color: WHITE, align: 'CENTER' });

  // Subtitle
  addBox(requests, `${slideId}_sub`, W * 0.2, H * 0.45, W * 0.6, pt(56).magnitude);
  styleBox(requests, `${slideId}_sub`, NAVY);
  addText(requests, `${slideId}_sub`, 'Building Data Infrastructure for Security & Trust',
    { size: 18, color: MUTED, align: 'CENTER' });

  // Tags row
  const tags = ['13+ Years', 'Data Platforms & BI', 'Product Management', 'SnowPro Core', 'SOC 2 / ISO 27001'];
  const tagW = W * 0.14;
  const tagStart = (W - (tags.length * tagW + 4 * 120000)) / 2;
  tags.forEach((t, i) => {
    const id = `${slideId}_tag${i}`;
    addBox(requests, id, tagStart + i * (tagW + 120000), H * 0.63, tagW, pt(22).magnitude);
    styleBox(requests, id, { red: 0.14, green: 0.74, blue: 0.97 * 0.07, blue: 0.097 }, true);
    addText(requests, id, t, { size: 8, color: CYAN, align: 'CENTER' });
  });

  // Contact
  addBox(requests, `${slideId}_contact`, W * 0.25, H * 0.83, W * 0.5, pt(24).magnitude);
  styleBox(requests, `${slideId}_contact`, NAVY);
  addText(requests, `${slideId}_contact`,
    'saurabhj86@gmail.com  ·  linkedin.com/in/saurabh-jhaveri',
    { size: 9, color: MUTED, align: 'CENTER' });
}

function slide2(slideId, requests) {
  requests._slideId = slideId;

  const halfW = W / 2;

  // Left panel
  addBox(requests, `${slideId}_lbg`, 0, 0, halfW, H);
  styleBox(requests, `${slideId}_lbg`, NAVY);

  // Right panel
  addBox(requests, `${slideId}_rbg`, halfW, 0, halfW, H);
  styleBox(requests, `${slideId}_rbg`, PANEL);

  // --- LEFT ---
  addBox(requests, `${slideId}_llabel`, 60000, H * 0.07, halfW - 120000, pt(18).magnitude);
  styleBox(requests, `${slideId}_llabel`, NAVY);
  addText(requests, `${slideId}_llabel`, 'MY EXPERIENCE',
    { size: 7, color: CYAN, bold: true, tracking: 2 });

  addBox(requests, `${slideId}_lhead`, 60000, H * 0.13, halfW - 120000, pt(44).magnitude);
  styleBox(requests, `${slideId}_lhead`, NAVY);
  addText(requests, `${slideId}_lhead`, 'What I've Delivered',
    { size: 26, bold: true, color: WHITE });

  const exps = [
    ['Compliance data lake — 0 → 1',
      'Built ESG Data Hub for Fortune 500 — 14 governed metrics, full audit lineage'],
    ['Policy orchestration across systems',
      'Led SOX-compliant data lineage automation at Intuit — 30+ automated pipelines'],
    ['Audit readiness (SOC 2, ISO 27001)',
      '~500 UAT test cases, <4% defect rate, authored governed metric PRDs'],
    ['Data accuracy & trust at scale',
      'Resolved $80M in unallocated trades at Allianz ($337B AUM)'],
  ];

  exps.forEach(([heading, detail], i) => {
    const y = H * 0.28 + i * H * 0.165;

    // Cyan accent bar
    const barId = `${slideId}_lbar${i}`;
    addBox(requests, barId, 60000, y, 38000, pt(34).magnitude);
    styleBox(requests, barId, CYAN);

    // Heading
    const hId = `${slideId}_lh${i}`;
    addBox(requests, hId, 120000, y, halfW - 180000, pt(22).magnitude);
    styleBox(requests, hId, NAVY);
    addText(requests, hId, heading, { size: 11, bold: true, color: CYAN });

    // Detail
    const dId = `${slideId}_ld${i}`;
    addBox(requests, dId, 120000, y + pt(22).magnitude + 30000, halfW - 180000, pt(20).magnitude);
    styleBox(requests, dId, NAVY);
    addText(requests, dId, detail, { size: 9, color: MUTED });
  });

  // --- RIGHT ---
  addBox(requests, `${slideId}_rlabel`, halfW + 60000, H * 0.07, halfW - 120000, pt(18).magnitude);
  styleBox(requests, `${slideId}_rlabel`, PANEL);
  addText(requests, `${slideId}_rlabel`, "WHAT I'D BUILD AT HARVEY",
    { size: 7, color: CYAN, bold: true, tracking: 2 });

  addBox(requests, `${slideId}_rhead`, halfW + 60000, H * 0.13, halfW - 120000, pt(44).magnitude);
  styleBox(requests, `${slideId}_rhead`, PANEL);
  addText(requests, `${slideId}_rhead`, 'The Infrastructure for Trust',
    { size: 26, bold: true, color: WHITE });

  const features = [
    ['🗄️  Compliance Data Lake',
      'Centralized audit logs, retention policies, SOC 2 / ISO 27001 evidence — always audit-ready'],
    ['🛡️  Policy Orchestration',
      'Automated data handling — retention, encryption, access controls, regional residency per customer'],
    ['📊  Trust Dashboards',
      'Real-time compliance posture, incident SLAs, audit readiness scores for enterprise clients'],
    ['🚀  Scale for Growth',
      'Infrastructure for 1K → 10K+ customers — trust as a competitive moat, not a bottleneck'],
  ];

  features.forEach(([name, desc], i) => {
    const y = H * 0.28 + i * H * 0.165;

    const nId = `${slideId}_rn${i}`;
    addBox(requests, nId, halfW + 60000, y, halfW - 120000, pt(22).magnitude);
    styleBox(requests, nId, PANEL);
    addText(requests, nId, name, { size: 11, bold: true, color: WHITE });

    const dId = `${slideId}_rd${i}`;
    addBox(requests, dId, halfW + 60000, y + pt(22).magnitude + 30000, halfW - 180000, pt(20).magnitude);
    styleBox(requests, dId, PANEL);
    addText(requests, dId, desc, { size: 9, color: MUTED });
  });
}

function slide3(slideId, requests) {
  requests._slideId = slideId;

  addBox(requests, `${slideId}_bg`, 0, 0, W, H);
  styleBox(requests, `${slideId}_bg`, NAVY);

  addBox(requests, `${slideId}_label`, W * 0.3, H * 0.06, W * 0.4, pt(18).magnitude);
  styleBox(requests, `${slideId}_label`, NAVY);
  addText(requests, `${slideId}_label`, 'PROOF POINTS', { size: 7, color: CYAN, bold: true, tracking: 2, align: 'CENTER' });

  addBox(requests, `${slideId}_head`, W * 0.2, H * 0.12, W * 0.6, pt(44).magnitude);
  styleBox(requests, `${slideId}_head`, NAVY);
  addText(requests, `${slideId}_head`, 'Numbers That Speak', { size: 30, bold: true, color: WHITE, align: 'CENTER' });

  const cards = [
    { icon: '💰', stat: '$80M',  label: 'Unallocated Trades Resolved',  sub: 'Root-cause to fix at Allianz — $337B AUM' },
    { icon: '📋', stat: '~500',  label: 'UAT Test Cases Authored',      sub: '<4% defect rate, governed metric PRDs' },
    { icon: '📐', stat: '14',    label: 'Governed ESG Metrics',         sub: '0 → 1 data lake for Fortune 500' },
    { icon: '⚙️',  stat: '30+',  label: 'Automated Pipelines',          sub: 'SOX-compliant lineage at Intuit' },
  ];

  const cardW = W * 0.2;
  const gap   = W * 0.025;
  const startX = (W - 4 * cardW - 3 * gap) / 2;
  const cardY  = H * 0.32;
  const cardH  = H * 0.52;

  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    const bgId = `${slideId}_cb${i}`;
    addBox(requests, bgId, x, cardY, cardW, cardH);
    styleBox(requests, bgId, PANEL, 1);

    const iconId = `${slideId}_ci${i}`;
    addBox(requests, iconId, x + cardW * 0.3, cardY + cardH * 0.05, cardW * 0.4, pt(30).magnitude);
    styleBox(requests, iconId, PANEL);
    addText(requests, iconId, c.icon, { size: 20, align: 'CENTER' });

    const statId = `${slideId}_cs${i}`;
    addBox(requests, statId, x + 60000, cardY + cardH * 0.28, cardW - 120000, pt(44).magnitude);
    styleBox(requests, statId, PANEL);
    addText(requests, statId, c.stat, { size: 28, bold: true, color: CYAN, align: 'CENTER' });

    const lblId = `${slideId}_cl${i}`;
    addBox(requests, lblId, x + 60000, cardY + cardH * 0.52, cardW - 120000, pt(28).magnitude);
    styleBox(requests, lblId, PANEL);
    addText(requests, lblId, c.label, { size: 9, bold: true, color: WHITE, align: 'CENTER' });

    const subId = `${slideId}_csu${i}`;
    addBox(requests, subId, x + 60000, cardY + cardH * 0.70, cardW - 120000, pt(24).magnitude);
    styleBox(requests, subId, PANEL);
    addText(requests, subId, c.sub, { size: 8, color: MUTED, align: 'CENTER' });
  });
}

function slide4(slideId, requests) {
  requests._slideId = slideId;

  addBox(requests, `${slideId}_bg`, 0, 0, W, H);
  styleBox(requests, `${slideId}_bg`, NAVY);

  addBox(requests, `${slideId}_label`, W * 0.3, H * 0.06, W * 0.4, pt(18).magnitude);
  styleBox(requests, `${slideId}_label`, NAVY);
  addText(requests, `${slideId}_label`, 'DAY 1 THINKING', { size: 7, color: CYAN, bold: true, tracking: 2, align: 'CENTER' });

  addBox(requests, `${slideId}_head`, W * 0.15, H * 0.12, W * 0.7, pt(44).magnitude);
  styleBox(requests, `${slideId}_head`, NAVY);
  addText(requests, `${slideId}_head`, 'My 90-Day Plan at Harvey', { size: 30, bold: true, color: WHITE, align: 'CENTER' });

  const phases = [
    {
      phase: 'DAYS 1–30 · LISTEN',
      title: 'Understand the Gaps',
      items: [
        'Shadow engineering, legal & compliance teams',
        'Audit current data handling & retention policies',
        'Map trust pain points for top 10 enterprise clients',
        'Define "audit-ready" for Harvey\'s current stage',
      ],
    },
    {
      phase: 'DAYS 31–60 · BUILD',
      title: 'Ship the Foundation',
      items: [
        'Deliver v1 compliance data lake schema & ingestion',
        'Automate SOC 2 evidence collection pipelines',
        'Launch internal trust dashboard (posture + SLAs)',
        'Author governed data PRDs with engineering sign-off',
      ],
    },
    {
      phase: 'DAYS 61–90 · SCALE',
      title: 'Make Trust a Moat',
      items: [
        'Roll out client-facing audit readiness scorecard',
        'Implement per-customer regional residency controls',
        'Establish incident SLA tracking & response playbook',
        'Present 6-month roadmap to leadership',
      ],
    },
  ];

  const colW   = W * 0.28;
  const colGap = W * 0.03;
  const startX = (W - 3 * colW - 2 * colGap) / 2;
  const colY   = H * 0.30;
  const colH   = H * 0.62;

  phases.forEach((p, i) => {
    const x = startX + i * (colW + colGap);

    const bgId = `${slideId}_pb${i}`;
    addBox(requests, bgId, x, colY, colW, colH);
    styleBox(requests, bgId, PANEL, 1);

    const phId = `${slideId}_pp${i}`;
    addBox(requests, phId, x + 80000, colY + H * 0.03, colW - 160000, pt(16).magnitude);
    styleBox(requests, phId, PANEL);
    addText(requests, phId, p.phase, { size: 7, color: CYAN, bold: true, tracking: 1.5 });

    const tId = `${slideId}_pt${i}`;
    addBox(requests, tId, x + 80000, colY + H * 0.09, colW - 160000, pt(28).magnitude);
    styleBox(requests, tId, PANEL);
    addText(requests, tId, p.title, { size: 14, bold: true, color: WHITE });

    p.items.forEach((item, j) => {
      const itemId = `${slideId}_pi${i}_${j}`;
      addBox(requests, itemId, x + 80000, colY + H * 0.19 + j * H * 0.12, colW - 160000, pt(24).magnitude);
      styleBox(requests, itemId, PANEL);
      addText(requests, itemId, `→ ${item}`, { size: 8.5, color: MUTED });
    });
  });
}

function slide5(slideId, requests) {
  requests._slideId = slideId;

  addBox(requests, `${slideId}_bg`, 0, 0, W, H);
  styleBox(requests, `${slideId}_bg`, PANEL);

  addBox(requests, `${slideId}_eyebrow`, W * 0.2, H * 0.08, W * 0.6, pt(18).magnitude);
  styleBox(requests, `${slideId}_eyebrow`, PANEL);
  addText(requests, `${slideId}_eyebrow`, 'WHY HARVEY · WHY NOW · WHY ME',
    { size: 7, color: CYAN, bold: true, tracking: 2, align: 'CENTER' });

  addBox(requests, `${slideId}_quote`, W * 0.1, H * 0.2, W * 0.8, pt(80).magnitude);
  styleBox(requests, `${slideId}_quote`, PANEL);
  addText(requests, `${slideId}_quote`,
    '"Enterprise clients don\'t just buy AI — they buy trust in the AI.\nI\'ve spent 13 years building the infrastructure that makes that trust\nprovable, auditable, and scalable."',
    { size: 16, color: WHITE, align: 'CENTER' });

  addBox(requests, `${slideId}_body`, W * 0.15, H * 0.57, W * 0.7, pt(52).magnitude);
  styleBox(requests, `${slideId}_body`, PANEL);
  addText(requests, `${slideId}_body`,
    'I\'ve built compliance data lakes from scratch, automated SOX-grade lineage at Intuit, and resolved $80M in data integrity failures at scale. I\'m ready to bring that same rigor — and ownership — to Harvey\'s data infrastructure.',
    { size: 11, color: MUTED, align: 'CENTER' });

  addBox(requests, `${slideId}_contact`, W * 0.25, H * 0.82, W * 0.5, pt(22).magnitude);
  styleBox(requests, `${slideId}_contact`, PANEL);
  addText(requests, `${slideId}_contact`,
    'saurabhj86@gmail.com  ·  linkedin.com/in/saurabh-jhaveri',
    { size: 10, color: CYAN, align: 'CENTER' });
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH + MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function getAuthClient() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌  Missing scripts/credentials.json\n');
    console.error('Steps:');
    console.error('  1. https://console.cloud.google.com/ → New Project');
    console.error('  2. APIs & Services → Enable "Google Slides API"');
    console.error('  3. Credentials → Create OAuth 2.0 Client ID (Desktop App)');
    console.error('  4. Download JSON → save as scripts/credentials.json');
    console.error('  5. Re-run: node scripts/create-harvey-slides.mjs\n');
    process.exit(1);
  }

  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = creds.installed || creds.web;
  const oAuth2 = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3333');

  if (fs.existsSync(TOKEN_PATH)) {
    oAuth2.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
    return oAuth2;
  }

  // First-run: open browser for consent
  const authUrl = oAuth2.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
  console.log('\n🔐  Open this URL in your browser to authorise:\n');
  console.log(`  ${authUrl}\n`);

  const code = await new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const qs = new URL(req.url, 'http://localhost:3333').searchParams;
      res.end('<h2>Authorised ✓ You can close this tab.</h2>');
      server.close();
      resolve(qs.get('code'));
    }).listen(3333);
  });

  const { tokens } = await oAuth2.getToken(code);
  oAuth2.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log('✅  Token saved to scripts/token.json\n');
  return oAuth2;
}

async function main() {
  const auth   = await getAuthClient();
  const slides = google.slides({ version: 'v1', auth });

  // 1. Create blank presentation
  const pres = await slides.presentations.create({
    requestBody: { title: 'Saurabh Jhaveri — Harvey AI Pitch' },
  });
  const presId = pres.data.presentationId;
  console.log(`📑  Created presentation: ${presId}`);

  // 2. Get the default blank slide id
  const presData    = await slides.presentations.get({ presentationId: presId });
  const defaultSlide = presData.data.slides[0].objectId;

  // 3. Create 4 more slides (we'll reuse the existing one as slide 1)
  const addSlideReqs = [2, 3, 4, 5].map(() => ({ createSlide: { insertionIndex: 99 } }));
  const addRes = await slides.presentations.batchUpdate({
    presentationId: presId,
    requestBody: { requests: addSlideReqs },
  });

  const newSlideIds = addRes.data.replies.map(r => r.createSlide.objectId);
  const slideIds = [defaultSlide, ...newSlideIds];

  // 4. Build all requests
  const reqs = [];
  reqs._slideId = slideIds[0];

  // Clear default content on each slide
  for (const sid of slideIds) {
    const fresh = await slides.presentations.get({ presentationId: presId });
    const sd    = fresh.data.slides.find(s => s.objectId === sid);
    if (sd?.pageElements) {
      for (const el of sd.pageElements) {
        reqs.push({ deleteObject: { objectId: el.objectId } });
      }
    }
  }

  [slide1, slide2, slide3, slide4, slide5].forEach((fn, i) => {
    fn(slideIds[i], reqs);
  });

  // 5. Execute
  await slides.presentations.batchUpdate({
    presentationId: presId,
    requestBody:    { requests: reqs },
  });

  console.log(`\n✅  Done! Open your presentation:\n`);
  console.log(`  https://docs.google.com/presentation/d/${presId}/edit\n`);
}

main().catch(err => {
  console.error('\n❌  Error:', err.message || err);
  process.exit(1);
});
