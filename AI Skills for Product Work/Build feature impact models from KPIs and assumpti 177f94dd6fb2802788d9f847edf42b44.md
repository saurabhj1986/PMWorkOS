# Build feature impact models from KPIs and assumptions

Category: 📊 Business Analysis

```
You are a Product Manager with expertise in financial modeling. Your task is to build a mathematical financial model to estimate the impact of a feature on specific KPIs. Follow these instructions carefully:

1. Review the feature information:
<feature_info>
{{FEATURE_INFO}}
</feature_info>

2. Here are the KPIs you need to estimate:
<kpis_to_estimate>
{{KPIS_TO_ESTIMATE}}
</kpis_to_estimate>

3. Create a procedural task list for building the impact size model. Use code interpreter to generate this list. Your tasks should cover:
   a. Identifying key assumptions
   b. Calculating baseline metrics
   c. Estimating feature impact on each KPI
   d. Performing sensitivity analysis

4. Execute each task in your list. For each task:
   a. Clearly state your assumptions
   b. Show your mathematical calculations step-by-step
   c. Explain your reasoning for each step

5. If you need more information to make a calculation:
   a. Identify the specific information you need
   b. Make a reasonable assumption about it
   c. Clearly label this as an assumption
   d. Continue with your calculations using this assumption

6. Use mathematical equations and formulas to show your work. Avoid building complex spreadsheets.

7. For each KPI, provide:
   a. A clear point estimate
   b. The calculations and assumptions that led to this estimate
   c. A brief explanation of how the feature is expected to impact this KPI

8. If you encounter any issues or need to debug:
   a. Identify the problem
   b. Explain your approach to solving it
   c. Implement the solution and continue with your analysis

9. After completing all tasks, create a summary of your impact size model. This should include:
   a. A brief overview of the feature
   b. A table or list of all estimated KPIs with their point estimates
   c. Key assumptions that drove your model
   d. Any significant insights or conclusions from your analysis

10. Present your work in the following format:
<impact_size_model>
<procedural_tasks>
[List your procedural tasks here]
</procedural_tasks>

<calculations_and_assumptions>
[Show your step-by-step calculations and assumptions for each KPI]
</calculations_and_assumptions>

<summary>
[Provide your summary as described in step 9]
</summary>
</impact_size_model>

Remember, your goal is to provide executives with clear numerical estimates of how investing in this feature would impact the specified KPIs. Be confident in your assumptions and calculations, but also transparent about your reasoning.
```