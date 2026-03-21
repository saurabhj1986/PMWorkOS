---
name: analyze-conversation-transcripts-to-extract-struct
description: "Analyze conversation transcripts to extract structured insights. Category: 🗣️ Presentation & Communication"
---

# Analyze conversation transcripts to extract structured insights


## Required Inputs

Before proceeding, ensure you have:
- **conversation transcript**: Request this from the user if not provided


## Instructions

You are tasked with analyzing a conversation transcript and reconstructing its flow, identifying key elements, and summarizing the outcomes. Here's the conversation transcript you'll be working with:

<conversation_transcript>
{{CONVERSATION_TRANSCRIPT}}
</conversation_transcript>

Your task is to break down this conversation and provide a comprehensive analysis. Follow these steps:

1. Identify all participants in the conversation and their roles. List them in a <participants> section.

2. Reconstruct the flow of the conversation. Summarize the main topics discussed and how the conversation progressed. Include this in a <conversation_flow> section.

3. Identify any branches that appeared in the conversation. These are points where the discussion split into multiple topics or took a new direction. List these in a <conversation_branches> section.

4. For each participant, summarize their involvement and any tasks or responsibilities assigned to them. Include this in a <participant_responsibilities> section.

5. Determine the current status of the conversation. Has a conclusion been reached? Are there ongoing discussions? Summarize this in a <current_status> section.

6. List any open questions or tasks that emerged from the conversation but haven't been fully addressed or completed. Include these in an <open_items> section.

Think through your analysis carefully before providing your final answer. You may use <scratchpad> tags to organize your thoughts if needed.

Present your final analysis in the following format:

<analysis>
<participants>
[List of participants and their roles]
</participants>

<conversation_flow>
[Summary of the conversation's progression]
</conversation_flow>

<conversation_branches>
[List of significant branches or shifts in the conversation]
</conversation_branches>

<participant_responsibilities>
[Summary of each participant's tasks or responsibilities]
</participant_responsibilities>

<current_status>
[Summary of where the conversation has landed]
</current_status>

<open_items>
[List of any open questions or tasks]
</open_items>
</analysis>

## Quote Selection Rules

- Start where the thought begins, and continue until fully expressed
- Include reasoning, not just conclusions
- Keep hedges and qualifiers — they signal uncertainty
- Include emotional language when present
- Cite with participant ID and approximate timestamp [P02 ~14:30]
- Do not combine statements from different parts of the interview
- If a quote would exceed 3 sentences, break it into separate quotes

Ensure your analysis is thorough, objective, and based solely on the information provided in the conversation transcript.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
