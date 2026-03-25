/**
 * Harvey AI Pitch Deck — Google Apps Script
 *
 * HOW TO RUN (2 minutes):
 *   1. Go to https://script.google.com  (sign in with your Google account)
 *   2. Click "+ New project"
 *   3. Delete the default code, paste this entire file
 *   4. Click the ▶ Run button (or press Ctrl+R)
 *   5. Accept the permissions popup (it only needs Drive + Slides access)
 *   6. When done, check your Google Drive — the deck will be there!
 */

function createHarveyDeck() {

  // ── Create presentation ──────────────────────────────────────────────────
  var pres   = SlidesApp.create("Saurabh Jhaveri — Harvey AI Pitch");
  var slides = pres.getSlides();

  // Remove the default blank slide and create 5 fresh ones
  slides[0].remove();
  for (var i = 0; i < 5; i++) pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);

  var all = pres.getSlides();

  // ── Colour constants ─────────────────────────────────────────────────────
  var NAVY   = { r: 0.051, g: 0.106, b: 0.165 };
  var PANEL  = { r: 0.039, g: 0.098, b: 0.184 };
  var WHITE  = { r: 0.941, g: 0.957, b: 0.973 };
  var MUTED  = { r: 0.553, g: 0.663, b: 0.769 };
  var CYAN   = { r: 0.220, g: 0.741, b: 0.973 };
  var BLACK  = { r: 0.000, g: 0.000, b: 0.000 };

  var W = 720, H = 405; // slide dimensions in points

  function rgb(c)    { return c; }
  function fill(shape, c) {
    shape.getFill().setSolidFill(c.r * 255, c.g * 255, c.b * 255);
  }
  function border(shape, c) {
    shape.getBorder().getLineFill().setSolidFill(c.r * 255, c.g * 255, c.b * 255);
    shape.getBorder().setWeight(0.75);
  }
  function noBorder(shape) {
    shape.getBorder().setTransparent();
  }

  function box(slide, x, y, w, h) {
    return slide.insertShape(SlidesApp.ShapeType.RECTANGLE, x, y, w, h);
  }

  function label(slide, text, x, y, w, h, opts) {
    var shape = box(slide, x, y, w, h);
    fill(shape, opts.bg || NAVY);
    noBorder(shape);
    var tb = shape.getText();
    tb.setText(text);
    var style = tb.getTextStyle();
    style.setFontFamily("Arial");
    style.setFontSize(opts.size || 11);
    style.setForegroundColor(
      (opts.color || WHITE).r * 255,
      (opts.color || WHITE).g * 255,
      (opts.color || WHITE).b * 255
    );
    style.setBold(opts.bold || false);
    if (opts.align === "CENTER") {
      tb.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    }
    return shape;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ══════════════════════════════════════════════════════════════════════════
  (function buildSlide1(slide) {
    var bg = box(slide, 0, 0, W, H);
    fill(bg, NAVY); noBorder(bg);

    label(slide, "CONFIDENTIAL · FOR JOSH @ HARVEY AI",
      W*0.15, H*0.08, W*0.7, 18,
      { size: 7, color: CYAN, bold: true, bg: NAVY, align: "CENTER" });

    label(slide, "Saurabh Jhaveri",
      W*0.1, H*0.20, W*0.8, 52,
      { size: 42, bold: true, color: WHITE, bg: NAVY, align: "CENTER" });

    label(slide, "Building Data Infrastructure for Security & Trust",
      W*0.1, H*0.42, W*0.8, 30,
      { size: 16, color: MUTED, bg: NAVY, align: "CENTER" });

    // Tags
    var tags = ["13+ Years", "Data Platforms & BI", "Product Management", "SnowPro Core", "SOC 2 / ISO 27001"];
    var tagW = 100, tagH = 18, gap = 8;
    var totalW = tags.length * tagW + (tags.length - 1) * gap;
    var startX = (W - totalW) / 2;
    tags.forEach(function(t, i) {
      var s = box(slide, startX + i * (tagW + gap), H * 0.60, tagW, tagH);
      fill(s, { r: 0.05, g: 0.18, b: 0.28 });
      border(s, CYAN);
      var tb = s.getText(); tb.setText(t);
      tb.getTextStyle().setFontSize(7).setForegroundColor(CYAN.r*255, CYAN.g*255, CYAN.b*255).setFontFamily("Arial").setBold(true);
      tb.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    });

    label(slide, "saurabhj86@gmail.com  ·  linkedin.com/in/saurabh-jhaveri",
      W*0.15, H*0.83, W*0.7, 16,
      { size: 9, color: MUTED, bg: NAVY, align: "CENTER" });
  })(all[0]);


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — Experience vs. Harvey
  // ══════════════════════════════════════════════════════════════════════════
  (function buildSlide2(slide) {
    // Left panel
    var lbg = box(slide, 0, 0, W/2, H); fill(lbg, NAVY); noBorder(lbg);
    // Right panel
    var rbg = box(slide, W/2, 0, W/2, H); fill(rbg, PANEL); noBorder(rbg);
    // Divider
    var div = box(slide, W/2 - 0.5, 0, 1, H);
    div.getFill().setSolidFill(CYAN.r*255, CYAN.g*255, CYAN.b*255);
    div.getBorder().setTransparent();

    // LEFT heading
    label(slide, "MY EXPERIENCE", 24, H*0.06, W/2-48, 12,
      { size: 6.5, color: CYAN, bold: true, bg: NAVY });
    label(slide, "What I've Delivered", 24, H*0.12, W/2-48, 28,
      { size: 20, bold: true, color: WHITE, bg: NAVY });

    var exps = [
      ["Compliance data lake — 0 to 1",
       "Built ESG Data Hub for Fortune 500 — 14 governed metrics, full audit lineage"],
      ["Policy orchestration across systems",
       "Led SOX-compliant lineage automation at Intuit — 30+ automated pipelines"],
      ["Audit readiness (SOC 2, ISO 27001)",
       "~500 UAT test cases, <4% defect rate, authored governed metric PRDs"],
      ["Data accuracy & trust at scale",
       "Resolved $80M in unallocated trades at Allianz ($337B AUM)"],
    ];

    exps.forEach(function(e, i) {
      var y = H * 0.26 + i * H * 0.165;
      // Accent bar
      var bar = box(slide, 24, y, 3, 28); fill(bar, CYAN); noBorder(bar);
      label(slide, e[0], 32, y, W/2-56, 14,
        { size: 9, bold: true, color: CYAN, bg: NAVY });
      label(slide, e[1], 32, y + 15, W/2-56, 14,
        { size: 8, color: MUTED, bg: NAVY });
    });

    // RIGHT heading
    label(slide, "WHAT I'D BUILD AT HARVEY", W/2+24, H*0.06, W/2-48, 12,
      { size: 6.5, color: CYAN, bold: true, bg: PANEL });
    label(slide, "The Infrastructure for Trust", W/2+24, H*0.12, W/2-48, 28,
      { size: 20, bold: true, color: WHITE, bg: PANEL });

    var features = [
      ["Compliance Data Lake",
       "Centralized audit logs, retention policies, SOC 2 / ISO 27001 evidence — always audit-ready"],
      ["Policy Orchestration",
       "Automated data handling — retention, encryption, access controls, regional residency per customer"],
      ["Trust Dashboards",
       "Real-time compliance posture, incident SLAs, audit readiness scores for enterprise clients"],
      ["Scale for Growth",
       "Infrastructure for 1K to 10K+ customers — trust as a competitive moat, not a bottleneck"],
    ];

    features.forEach(function(f, i) {
      var y = H * 0.26 + i * H * 0.165;
      label(slide, f[0], W/2+24, y, W/2-48, 14,
        { size: 9, bold: true, color: WHITE, bg: PANEL });
      label(slide, f[1], W/2+24, y + 15, W/2-56, 14,
        { size: 8, color: MUTED, bg: PANEL });
    });
  })(all[1]);


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — Proof Points
  // ══════════════════════════════════════════════════════════════════════════
  (function buildSlide3(slide) {
    var bg = box(slide, 0, 0, W, H); fill(bg, NAVY); noBorder(bg);

    label(slide, "PROOF POINTS", W*0.3, H*0.05, W*0.4, 12,
      { size: 6.5, color: CYAN, bold: true, bg: NAVY, align: "CENTER" });
    label(slide, "Numbers That Speak", W*0.15, H*0.12, W*0.7, 32,
      { size: 24, bold: true, color: WHITE, bg: NAVY, align: "CENTER" });

    var cards = [
      { stat: "$80M",  label: "Unallocated Trades Resolved",  sub: "Root-cause to fix at Allianz — $337B AUM" },
      { stat: "~500",  label: "UAT Test Cases Authored",      sub: "<4% defect rate, governed metric PRDs"    },
      { stat: "14",    label: "Governed ESG Metrics",         sub: "0 to 1 data lake for Fortune 500"         },
      { stat: "30+",   label: "Automated Pipelines",          sub: "SOX-compliant lineage at Intuit"          },
    ];

    var cW = 140, cH = 160, gap = 16;
    var startX = (W - 4*cW - 3*gap) / 2;
    var cardY  = H * 0.30;

    cards.forEach(function(c, i) {
      var x = startX + i * (cW + gap);
      var card = box(slide, x, cardY, cW, cH);
      fill(card, PANEL); border(card, CYAN);

      label(slide, c.stat, x + 10, cardY + cH*0.08, cW - 20, 36,
        { size: 28, bold: true, color: CYAN, bg: PANEL, align: "CENTER" });
      label(slide, c.label, x + 10, cardY + cH*0.45, cW - 20, 24,
        { size: 8.5, bold: true, color: WHITE, bg: PANEL, align: "CENTER" });
      label(slide, c.sub, x + 8, cardY + cH*0.68, cW - 16, 28,
        { size: 7.5, color: MUTED, bg: PANEL, align: "CENTER" });
    });
  })(all[2]);


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — 90-Day Plan
  // ══════════════════════════════════════════════════════════════════════════
  (function buildSlide4(slide) {
    var bg = box(slide, 0, 0, W, H); fill(bg, NAVY); noBorder(bg);

    label(slide, "DAY 1 THINKING", W*0.3, H*0.05, W*0.4, 12,
      { size: 6.5, color: CYAN, bold: true, bg: NAVY, align: "CENTER" });
    label(slide, "My 90-Day Plan at Harvey", W*0.1, H*0.12, W*0.8, 32,
      { size: 24, bold: true, color: WHITE, bg: NAVY, align: "CENTER" });

    var phases = [
      {
        phase: "DAYS 1-30 · LISTEN",
        title: "Understand the Gaps",
        items: [
          "Shadow engineering, legal & compliance teams",
          "Audit current data handling & retention policies",
          "Map trust pain points for top 10 enterprise clients",
          "Define audit-readiness for Harvey's current stage",
        ],
      },
      {
        phase: "DAYS 31-60 · BUILD",
        title: "Ship the Foundation",
        items: [
          "Deliver v1 compliance data lake schema & ingestion",
          "Automate SOC 2 evidence collection pipelines",
          "Launch internal trust dashboard (posture + SLAs)",
          "Author governed data PRDs with engineering sign-off",
        ],
      },
      {
        phase: "DAYS 61-90 · SCALE",
        title: "Make Trust a Moat",
        items: [
          "Roll out client-facing audit readiness scorecard",
          "Implement per-customer regional residency controls",
          "Establish incident SLA tracking & response playbook",
          "Present 6-month data infrastructure roadmap",
        ],
      },
    ];

    var colW = 190, colH = 240, gap = 20;
    var startX = (W - 3*colW - 2*gap) / 2;
    var colY   = H * 0.28;

    phases.forEach(function(p, i) {
      var x = startX + i * (colW + gap);
      var card = box(slide, x, colY, colW, colH);
      fill(card, PANEL); border(card, CYAN);

      label(slide, p.phase, x + 10, colY + 10, colW - 20, 12,
        { size: 6.5, bold: true, color: CYAN, bg: PANEL });
      label(slide, p.title, x + 10, colY + 28, colW - 20, 18,
        { size: 12, bold: true, color: WHITE, bg: PANEL });

      p.items.forEach(function(item, j) {
        label(slide, "-> " + item, x + 10, colY + 55 + j * 42, colW - 20, 36,
          { size: 8, color: MUTED, bg: PANEL });
      });
    });
  })(all[3]);


  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — Close
  // ══════════════════════════════════════════════════════════════════════════
  (function buildSlide5(slide) {
    var bg = box(slide, 0, 0, W, H); fill(bg, PANEL); noBorder(bg);

    label(slide, "WHY HARVEY · WHY NOW · WHY ME",
      W*0.15, H*0.07, W*0.7, 12,
      { size: 6.5, color: CYAN, bold: true, bg: PANEL, align: "CENTER" });

    label(slide,
      '"Enterprise clients don\'t just buy AI -- they buy trust in the AI.\n' +
      'I\'ve spent 13 years building the infrastructure that makes\n' +
      'that trust provable, auditable, and scalable."',
      W*0.08, H*0.18, W*0.84, 72,
      { size: 15, color: WHITE, bg: PANEL, align: "CENTER" });

    // Divider line
    var line = box(slide, W*0.44, H*0.56, W*0.12, 1.5);
    fill(line, CYAN); noBorder(line);

    label(slide,
      "I've built compliance data lakes from scratch, automated SOX-grade lineage at Intuit,\n" +
      "and resolved $80M in data integrity failures at scale. I'm ready to bring\n" +
      "that same rigor -- and ownership -- to Harvey's data infrastructure.",
      W*0.1, H*0.60, W*0.8, 52,
      { size: 10, color: MUTED, bg: PANEL, align: "CENTER" });

    label(slide, "saurabhj86@gmail.com  ·  linkedin.com/in/saurabh-jhaveri",
      W*0.15, H*0.84, W*0.7, 16,
      { size: 9, bold: true, color: CYAN, bg: PANEL, align: "CENTER" });
  })(all[4]);

  // ── Done ─────────────────────────────────────────────────────────────────
  var url = "https://docs.google.com/presentation/d/" + pres.getId() + "/edit";
  Logger.log("Done! Open your deck: " + url);
  SlidesApp.getUi && SlidesApp.getUi().alert("Deck created!\n\n" + url);
  return url;
}
