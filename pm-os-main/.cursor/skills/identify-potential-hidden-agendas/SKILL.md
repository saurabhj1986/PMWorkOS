---
name: identify-potential-hidden-agendas
description: "Identify potential hidden agendas. Category: 🤝 Stakeholder Management"
---

# Identify potential hidden agendas


## Required Inputs

Before proceeding, ensure you have:
- **situation description**: Request this from the user if not provided
- **stakeholders list**: Request this from the user if not provided


## Instructions

You are tasked with identifying potential hidden agendas of stakeholders in a given situation. Your goal is to analyze the situation objectively and provide insights into possible underlying motivations that may not be immediately apparent. Follow these steps carefully:

1. First, review the situation description:
<situation>
{{SITUATION_DESCRIPTION}}
</situation>

2. Next, consider the list of stakeholders involved:
<stakeholders>
{{STAKEHOLDERS_LIST}}
</stakeholders>

3. For each stakeholder, analyze their potential hidden agendas by considering the following:
   a. Their official or stated position in the situation
   b. Their potential personal or professional interests
   c. Historical context or past behaviors, if available
   d. Relationships with other stakeholders
   e. Possible benefits or drawbacks for them in different outcomes

4. Consider various factors that might influence hidden agendas, such as:
   - Financial interests
   - Power dynamics
   - Reputation management
   - Career advancement
   - Ideological beliefs
   - Personal relationships
   - Organizational politics

5. For each stakeholder, provide your analysis in the following format:
   <stakeholder_analysis>
   <stakeholder_name>[Name of the stakeholder]</stakeholder_name>
   <official_position>[Brief description of their official stance or role]</official_position>
   <potential_hidden_agenda>[Your analysis of their possible hidden agenda]</potential_hidden_agenda>
   <supporting_factors>[List key factors that support your analysis]</supporting_factors>
   </stakeholder_analysis>

6. After analyzing all stakeholders, provide a brief summary of the overall situation and how the potential hidden agendas might interact or conflict with each other.

7. Present your findings in a clear, organized manner, using the XML tags provided for each section of your analysis.

Remember to:
- Base your analysis on the information provided and reasonable inferences
- Avoid unfounded speculation or biased assumptions
- Consider multiple possibilities for each stakeholder
- Be objective and impartial in your assessment

Begin your analysis now, starting with the first stakeholder in the list.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
