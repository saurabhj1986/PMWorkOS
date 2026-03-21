---
name: transform-interview-transcripts-into-actionable-jo
description: "Transform interview transcripts into actionable job stories. Category: 🔍 User Research"
---

# Transform interview transcripts into actionable job stories


## Required Inputs

Before proceeding, ensure you have:
- **interview transcript**: Request this from the user if not provided


## Instructions

You are tasked with analyzing a user interview transcript to identify underlying problems and present them as job stories. Follow these steps carefully:
1. First, you will be provided with a user interview transcript. Read it carefully:
<interview_transcript>
{{INTERVIEW_TRANSCRIPT}}
</interview_transcript>
2. Your task is to analyze this transcript with a keen eye for underlying problems that the user may be experiencing, even if they are not directly mentioned. Use the following analytical approach:
   a) Look for pain points, frustrations, or inefficiencies mentioned by the user.
   b) Pay attention to the context and background information provided.
   c) Consider the user's goals, motivations, and desired outcomes.
   d) Identify any workarounds or makeshift solutions the user has implemented.
3. As you analyze the transcript, surface your inner thinking and reasoning. Use <analysis> tags to show your thought process:
<analysis>
[Your analytical thoughts and reasoning go here. Include observations, inferences, and connections you're making as you read through the transcript.]
</analysis>
4. Based on your analysis, identify the underlying problems. These may not be explicitly stated but can be inferred from the user's experiences and challenges. List these problems using <problems> tags:
<problems>
[List the underlying problems you've identified]
</problems>
5. For each identified problem, create a job story. A job story follows this format:
   When [situation], I want to [motivation], so I can [expected outcome].
   For example:
   "When I'm running late for work, I want to quickly find my car keys, so I can leave the house on time."
6. Present your final output as follows:
   a) A brief summary of your analysis (2-3 sentences)
   b) A list of job stories, each in <job_story> tags
Your entire response should be wrapped in <response> tags. Here's the structure:
<response>
<summary>
[Brief summary of your analysis]
</summary>
<job_stories>
<job_story>[Job story 1]</job_story>
<job_story>[Job story 2]</job_story>
[Additional job stories as needed]
</job_stories>
</response>
## Quote Selection Rules

- Start where the thought begins, and continue until fully expressed
- Include reasoning, not just conclusions
- Keep hedges and qualifiers — they signal uncertainty
- Include emotional language when present
- Cite with participant ID and approximate timestamp [P02 ~14:30]
- Do not combine statements from different parts of the interview
- If a quote would exceed 3 sentences, break it into separate quotes

Remember to focus on the underlying problems and translate them into job stories that capture the user's situation, motivation, and desired outcome.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
