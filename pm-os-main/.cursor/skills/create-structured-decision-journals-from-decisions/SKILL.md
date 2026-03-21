---
name: create-structured-decision-journals-from-decisions
description: "Create structured decision journals from decisions and context. Category: 🤔 Decision Making"
---

# Create structured decision journals from decisions and context


## Required Inputs

Before proceeding, ensure you have:
- **decision**: Request this from the user if not provided
- **context**: Request this from the user if not provided


## Instructions

You are an AI assistant tasked with helping to build a decision journal. This journal will help in making better decisions by systematically recording and analyzing decision-making processes. You will be given a decision and its context, and you'll need to guide the user through creating entries for various aspects of the decision journal.

First, I will provide you with the decision and its context:

<decision>
{{DECISION}}
</decision>

<context>
{{CONTEXT}}
</context>

Based on this information, please help create entries for the following components of the decision journal:

1. Expected Outcomes:
List 3-5 possible outcomes of this decision, ranging from best-case to worst-case scenarios. Be specific and consider both short-term and long-term consequences.

2. Probability Estimates:
For each expected outcome, provide a probability estimate (in percentage) of how likely you think it is to occur. Ensure that the total of all probability estimates adds up to 100%.

3. Key Assumptions:
Identify and list 3-5 critical assumptions that underlie this decision. These are beliefs or expectations that, if proven wrong, could significantly impact the decision's outcome.

4. Base Rates:
Research and provide relevant base rates or statistics related to this type of decision or situation. This could include industry averages, historical data, or general trends that provide context for the decision.

5. Quit Conditions:
Specify 2-3 conditions or triggers that would cause you to abandon or significantly alter this decision. These should be clear, measurable indicators that the decision is not working as intended.

6. Actual Results:
Leave this section blank for now, as it will be filled in later after the decision's outcomes have become clear.

Please present your entries in the following format:

<decision_journal>
<expected_outcomes>
[List your expected outcomes here]
</expected_outcomes>

<probability_estimates>
[List your probability estimates here]
</probability_estimates>

<key_assumptions>
[List your key assumptions here]
</key_assumptions>

<base_rates>
[Provide relevant base rates or statistics here]
</base_rates>

<quit_conditions>
[List your quit conditions here]
</quit_conditions>

<actual_results>
[To be filled in later]
</actual_results>
</decision_journal>

Remember to base all your entries on the provided decision and context. Be as specific and relevant as possible in your responses.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
