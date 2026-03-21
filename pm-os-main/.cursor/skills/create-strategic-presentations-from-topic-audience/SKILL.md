---
name: create-strategic-presentations-from-topic-audience
description: "Create strategic presentations from topic, audience and time inputs. Category: 🗣️ Presentation & Communication"
---

# Create strategic presentations from topic, audience and time inputs


## Required Inputs

Before proceeding, ensure you have:
- **target audience**: Request this from the user if not provided
- **presentation topic**: Request this from the user if not provided
- **time constraint**: Request this from the user if not provided


## Instructions

You are a brilliant management consultant tasked with preparing a slide deck/presentation on a given topic. You're in the early stages, and while you're working towards making a recommendation, you're still in the process of determining what recommendation to make and who it is for. Your goal is to develop a strategic presentation framework that will guide you through this process.

You will be provided with the following inputs:
<presentation_topic>{{PRESENTATION_TOPIC}}</presentation_topic>
<target_audience>{{TARGET_AUDIENCE}}</target_audience>
<time_constraint>{{TIME_CONSTRAINT}}</time_constraint>

Follow these steps to develop your presentation framework:

1. Strategic Foundation:
   a. Conduct an Audience Analysis:
      - Create a detailed matrix addressing power dynamics, technical expertise levels, known biases, historical context, preferred communication styles, and political considerations for the {{TARGET_AUDIENCE}}.
      - Based on this analysis, determine the appropriate technical depth, level of supporting evidence, tone, and areas requiring extra context.

   b. Define the Presentation Purpose:
      - Clearly state the primary objective (decision, information, or persuasion).
      - Outline required outcomes, success metrics, and next steps post-presentation.
      - Based on the purpose and {{TIME_CONSTRAINT}}, determine the presentation length, balance of data vs. narrative, and required supporting materials.

2. Narrative Architecture:
   a. Implement the SCQA Framework:
      - Situation: Describe a non-controversial, recognizable situation related to the {{PRESENTATION_TOPIC}}.
      - Complication: Introduce tension that makes the status quo untenable.
      - Question: Frame the problem that emerges from the complication.
      - Answer: Provide your core recommendation or hypothesis.

   b. Apply the Pyramid Principle Structure:
      - For each major point in your answer, create a pyramid with:
        - Top Level: Core recommendation/finding
        - Supporting Level 1: Primary justifications
        - Supporting Level 2: Data, evidence, and examples
      - Evaluate the logical flow and independence of arguments for each pyramid.

3. Slide Development:
   a. Use the Slide Selection Framework to choose appropriate layouts:
      - Chart Slides: For clear data points, trends, or quantitative comparisons.
      - Subtitle Slides: For complex concepts or qualitative arguments.
      - Table Slides: For comparing multiple attributes or mixing qualitative and quantitative data.

   b. Implement Design Principles:
      - Apply visual hierarchy using appropriate font sizes and emphasis.
      - Ensure content density follows the 30-second rule.
      - Use visual elements purposefully and consistently.

4. Quality Assurance:
   - Verify the SCQA flow, pyramid logic, and supporting evidence.
   - Check data accuracy, calculation validity, and source citations.
   - Test for the 30-second rule compliance, visual consistency, and message clarity.

5. Preparation & Delivery:
   - Outline a plan to master the content deeply and prepare for likely questions.
   - Based on the {{TARGET_AUDIENCE}} analysis, note how you would adjust technical depth, pace, and interaction points.

Present your framework in the following format:
<framework>
1. Strategic Foundation
   [Include your audience analysis and presentation purpose definition]

2. Narrative Architecture
   [Present your SCQA framework and Pyramid Principle structure]

3. Slide Development
   [Outline your slide selection strategy and design principles]

4. Quality Assurance
   [List key points for review]

5. Preparation & Delivery
   [Provide notes on content mastery and delivery adaptation]
</framework>

Remember to tailor your framework to the specific {{PRESENTATION_TOPIC}}, {{TARGET_AUDIENCE}}, and {{TIME_CONSTRAINT}}. Your goal is to create a comprehensive yet flexible guide that will help you develop a compelling and effective presentation.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear

**Build the deck:** Once you have the framework and slide outline, use the **frontend-slides** skill to produce a styled, single-file HTML presentation from it.
