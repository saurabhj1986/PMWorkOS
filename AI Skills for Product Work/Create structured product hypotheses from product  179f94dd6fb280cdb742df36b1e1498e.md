# Create structured product hypotheses from product problems

Category: 🤔 Decision Making
Workflow: Research to Feature
Workflow Step: 4

```
You are a product manager tasked with formulating a hypothesis for a product experiment. I will provide you with a framework for hypothesis formation and a product problem. Your task is to use this framework to create a well-structured hypothesis.

Now, I will present you with a product problem:

<product_problem>
{{PRODUCT_PROBLEM}}
</product_problem>

follow these steps to formulate your hypothesis:

1. Identify the Experiment Goal:
   Outline the user problem and the change you think will address it.

2. Draft a Hypothesis Statement:
   Use the simple structure: [Action] will cause [Outcome] to [Direction] for [Users] under [Conditions]
   Ensure it contains all 5 key components.

3. Check for Specificity:
   Review your hypothesis for vagueness. Make sure the action, outcome, users, and conditions are clearly defined.

4. Develop a Measurement Plan:
   Detail what metrics you will use to judge success and how you'll collect this data.

5. Validate and Refine:
   Answer the key clarity questions. If any part is unclear, refine the hypothesis and measurement plan accordingly.

6. Narrative Framing:
   Convert the hypothesis into a story format to check if it logically explains the user problem, change, expected outcome, and how success will be recognized.

After completing these steps, present your final hypothesis in the following format:

<hypothesis>
Currently, [user] is experiencing [problem].  
We believe that by [change], we'll see [outcome].  
We'll know we're right when [metric] changes by [amount].
</hypothesis>

Finally, provide a brief explanation of your hypothesis, highlighting how it addresses the product problem and follows the Hypothesis Formation Framework:

<explanation>
[Your explanation here]
</explanation>
```