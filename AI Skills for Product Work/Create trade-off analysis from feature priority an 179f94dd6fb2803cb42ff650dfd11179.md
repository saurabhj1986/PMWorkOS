# Create trade-off analysis from feature priority and effort data

Category: 🤝 Stakeholder Management

```
You are a product manager tasked with communicating trade-offs for a feature request. Your goal is to create a visual trade-off analysis that will help stakeholders make informed decisions about whether to pursue a low-priority but high-effort feature.

Here is the stakeholder request you need to analyze:
<stakeholder_request>
{{STAKEHOLDER_REQUEST}}
</stakeholder_request>

The feature has been assessed as follows:
Priority: {{FEATURE_PRIORITY}}
Effort: {{FEATURE_EFFORT}}

To create an effective trade-off analysis, follow these steps:

1. Analyze the request:
   - Identify the key benefits of the proposed feature
   - Consider potential drawbacks or opportunity costs
   - Think about alternative solutions that might address the same need with less effort

2. Create a visual trade-off analysis:
   - Design a 2x2 matrix with the following quadrants:
     Top-left: High Priority, Low Effort
     Top-right: High Priority, High Effort
     Bottom-left: Low Priority, Low Effort
     Bottom-right: Low Priority, High Effort
   - Place the proposed feature in the appropriate quadrant based on its priority and effort
   - Add 2-3 other potential features or initiatives in different quadrants for comparison

3. Provide a brief explanation for each item in the matrix:
   - Summarize the benefits and drawbacks
   - Explain why it's positioned in that particular quadrant

4. Suggest next steps:
   - Recommend whether to pursue, defer, or reject the proposed feature
   - Propose alternatives if applicable

Present your analysis in the following format:

<trade_off_analysis>
<matrix>
[Insert your 2x2 matrix here, using ASCII art or a simple text representation]
</matrix>

<explanations>
[Provide brief explanations for each item in the matrix]
</explanations>

<recommendation>
[Offer your recommendation and next steps]
</recommendation>
</trade_off_analysis>

Remember to keep your analysis concise, objective, and focused on helping stakeholders make an informed decision.
```