# TrustReply — what is this?

A portfolio demo built for an interview with **Harvey AI**. Harvey is a
legal AI company; I'm interviewing for a Data Product Management role
supporting their new Head of Trust, Josh McKibben. This app is a working
sketch of the kind of product I'd build for him on day one.

**Live demo:** https://trustreply-demo.vercel.app/

## The problem it solves

When a law firm wants to buy AI from Harvey, their security team sends a
questionnaire — typically 200–500 questions about Harvey's security,
privacy, compliance, AI safety, data handling, and infrastructure. Today
this is a soul-crushing manual process: analysts copy-paste answers from
old responses, chase engineers for evidence, ping customers for
clarifications, and stall deals for weeks.

TrustReply is the platform that automates that work. Every approved
answer becomes reusable evidence. Every audit finding becomes a control.
Every customer interaction makes the next one faster. It's a compounding
loop: more usage → more evidence → faster responses → bigger deals.

## What you're looking at

Five tabs — only the first two are built. The other three are
intentional placeholders so you can see the shape of the full product.

- **Tab 1 — Trust Dashboard.** The "state of the world" view. KPIs,
  an 8-stage flow diagram showing how a real questionnaire moves from
  inbox to delivery (Latham & Watkins · CAIQ v4 · 261 questions), the
  customer questionnaire tracker, and the Common Control Framework grid.

- **Tab 2 — Mission Control.** The "what's happening right now" view.
  Live anomaly feed (click an alert → expand → dispatch an agent), the
  6 sub-agents that keep the trust function running (each with its own
  Trust Index scorecard), and one-click customer briefings.

- **Tabs 3–5** are stubs for the TrustReply Agent (the AI that actually
  drafts answers), the Snowflake data model, and a "How I built this"
  tab covering design tradeoffs and open questions for Josh.

## Things to notice

- **Trust Index badges.** Every AI output has a composite trust score
  (confidence × accuracy × freshness × benchmark). Hover any badge to
  see the breakdown. This is the heart of the product — Josh's #1
  question about any AI-generated answer is "should I trust this?", and
  the badge is the answer.

- **The compounding loop.** Note the dashed callout below the pipeline.
  Stage 8 outputs become Stage 5 inputs. That feedback loop is the
  business model — analysts get faster every quarter without hiring.

- **Real customers, real schemas.** Every customer name, questionnaire
  format (CAIQ, SIG), and control code is real. Only the data is fake.

## Stack

React 19 + Vite + Tailwind v4, deployed on Vercel. ~2,000 lines of mock
data and ~3,000 lines of React. Built end-to-end with Claude Code in a
handful of evenings.

---

Built by **Saurabh Jhaveri** · for **Josh McKibben**, Head of Trust @ Harvey AI
