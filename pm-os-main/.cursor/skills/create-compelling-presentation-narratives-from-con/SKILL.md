---
name: create-compelling-presentation-narratives-from-con
description: "Create compelling presentation narratives from conversation transcripts. Category: 🗣️ Presentation & Communication"
---

# Create compelling presentation narratives from conversation transcripts


## Required Inputs

Before proceeding, ensure you have:
- **target audience**: Request this from the user if not provided
- **presentation topic**: Request this from the user if not provided
- **conversation transcripts**: Request this from the user if not provided


## Instructions

You are tasked with writing out the full narrative of a presentation that will be turned into a slide deck. This presentation should follow a 3-arc structure and end with a request for buy-in on the proposed approach. Your goal is to create a compelling narrative based on the provided conversation transcripts, tailored to the specific presentation topic and target audience.

You will be given the following inputs:

<conversation_transcripts>
{{CONVERSATION_TRANSCRIPTS}}
</conversation_transcripts>

<presentation_topic>
{{PRESENTATION_TOPIC}}
</presentation_topic>

<target_audience>
{{TARGET_AUDIENCE}}
</target_audience>

Follow these steps to create the presentation narrative:

1. Carefully read and analyze the conversation transcripts. Look for key themes, important points, and relevant data that align with the presentation topic.

2. Structure your narrative into three main arcs:
   a. Arc 1: Introduction and Problem Statement
   b. Arc 2: Proposed Solution or Approach
   c. Arc 3: Benefits and Implementation

3. For each arc, create a narrative that incorporates the following elements:
   a. Key points from the conversation transcripts
   b. Relevant data or examples
   c. Transitions between ideas
   d. Engagement hooks for the target audience

4. Throughout the narrative, ensure that the content is tailored to the target audience, using appropriate language, examples, and level of detail.

5. For the final part of Arc 3, craft a compelling request for buy-in. This should summarize the key benefits of the proposed approach and clearly state what you're asking the audience to do or approve.

6. Use a conversational yet professional tone throughout the narrative, making it engaging and easy to follow.

7. Include placeholders for potential visual aids or data visualizations that could enhance the presentation, using [VISUAL] tags.

8. Aim for a narrative that would translate into approximately 10-15 slides when converted into a deck.

Present your output in the following format:

<presentation_narrative>
<arc1>
[Write the narrative for Arc 1: Introduction and Problem Statement]
</arc1>

<arc2>
[Write the narrative for Arc 2: Proposed Solution or Approach]
</arc2>

<arc3>
[Write the narrative for Arc 3: Benefits and Implementation, including the buy-in request]
</arc3>
</presentation_narrative>

Remember to maintain a logical flow throughout the narrative, ensuring that each arc builds upon the previous one and leads naturally to the buy-in request at the end.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear

**Build the deck:** The narrative is written for ~10–15 slides. Use the **frontend-slides** skill to turn it into a styled HTML presentation: split the narrative into slide content and choose a visual style.
