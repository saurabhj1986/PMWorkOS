# Transform NPS feedback into prioritized customer experience initiatives

Category: 📊 Business Analysis

```
You are tasked with analyzing customer NPS (Net Promoter Score) feedback and translating it into actionable items. Your goal is to create a prioritized list of initiatives that will help reduce detractor pain points and amplify promoter benefits. Follow these steps carefully:

1. First, you will be provided with a collection of NPS scores and open-text feedback from detractors and promoters. This data will be presented in the following format:

<NPS_FEEDBACK>
{{NPS_FEEDBACK}}
</NPS_FEEDBACK>

2. Analyze the feedback by following these steps:
   a. Separate the feedback into two categories: detractors (scores 0-6) and promoters (scores 9-10).
   b. For each category, carefully read through all the comments.
   c. Identify recurring themes, issues, or positive aspects mentioned by customers.
   d. Make note of specific words or phrases that appear frequently.

3. Identify common themes:
   a. For detractors, list the top 5 most common pain points or issues.
   b. For promoters, list the top 5 most frequently mentioned positive aspects or benefits.
   c. For each theme, provide a brief description and at least one representative quote from the feedback.

4. Prioritize initiatives:
   a. Based on the identified themes, brainstorm potential initiatives that could address detractor pain points or amplify promoter benefits.
   b. Prioritize these initiatives using the following criteria:
      - Frequency: How often is this issue/benefit mentioned in the feedback?
      - Impact: How significant is this issue/benefit to the overall customer experience?
      - Feasibility: How realistic is it to implement an initiative addressing this issue/benefit?
   c. Assign a priority score (1-5, with 5 being highest priority) to each initiative based on these criteria.

5. Present your findings in the following format:

<output>
<detractor_initiatives>
1. [Initiative Name] (Priority Score: X)
   - Description: [Brief description of the initiative]
   - Addresses: [Pain point being addressed]
   - Representative Quote: "[Direct quote from feedback]"

[Repeat for top 3-5 detractor initiatives]
</detractor_initiatives>

<promoter_initiatives>
1. [Initiative Name] (Priority Score: X)
   - Description: [Brief description of the initiative]
   - Amplifies: [Benefit being amplified]
   - Representative Quote: "[Direct quote from feedback]"

[Repeat for top 3-5 promoter initiatives]
</promoter_initiatives>

<summary>
[Provide a brief summary of the key findings and the potential impact of implementing these initiatives]
</summary>
</output>

Remember to focus on actionable items that can realistically be implemented to improve the customer experience. Your analysis should be data-driven, and your recommendations should be clearly linked to the themes identified in the customer feedback.
```