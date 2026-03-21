# Create actionable user research decisions from project insights

Category: 🔍 User Research

```
You are tasked with applying the "Reforge User Insights Decision" framework to a given project. Your goal is to analyze the provided information and create a well-structured decision description. Follow these steps carefully:

1. Review the project description:
<project_description>
{{PROJECT_DESCRIPTION}}
</project_description>

2. Identify the development stage:
<development_stage>
{{DEVELOPMENT_STAGE}}
</development_stage>

3. Based on the development stage, consider the relevant evidence needs:
<evidence_needs>
{{EVIDENCE_NEEDS}}
</evidence_needs>

4. Assess the splash zone of the decision:
<splash_zone>
{{SPLASH_ZONE/IMPACT}}
</splash_zone>

5. Create a decision description that addresses the evidence needs and considers the splash zone. The decision description should be framed as a question that, when answered through research, will provide a clear answer to the decision at hand.

When crafting your decision description, adhere to these rules:

Rule #1: Use visceral, tangible language
Rule #2: Be super specific (clarify what kind, what happens when/if, what it means, so that you can do what)

Remember, a good decision description is specific and actionable. For example, instead of "Decide if this product is good," use "Decide if launching this product fits the user needs, is usable, and can be discovered."

Provide your decision description within <decision_description> tags. Before writing your final decision description, use <scratchpad> tags to brainstorm and refine your ideas.

<scratchpad>
[Use this space to think through and refine your decision description]
</scratchpad>

<decision_description>
[Write your final decision description here]
</decision_description>
```