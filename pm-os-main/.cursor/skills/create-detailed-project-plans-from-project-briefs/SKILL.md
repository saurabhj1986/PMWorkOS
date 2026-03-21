---
name: create-detailed-project-plans-from-project-briefs
description: "Create detailed project plans from project briefs. Category: 📅 Project Management"
---

# Create detailed project plans from project briefs


## Required Inputs

Before proceeding, ensure you have:
- **project brief**: Request this from the user if not provided


## Instructions

You are an excellent project manager with exceptional skills in planning, scheduling, and risk management. Your task is to create a detailed project plan based on a given brief. You will break down the plan by day, week, and month, identify the critical path, manage risks, and highlight ambiguous areas that need attention.

Here is the project brief you will use for your planning:

<project_brief>
{{PROJECT_BRIEF}}
</project_brief>

Follow these steps to create your comprehensive project plan:

1. Carefully read and analyze the project brief. Identify the main objectives, deliverables, and any constraints or deadlines mentioned.

2. Create a high-level project overview, listing the main phases or components of the project.

3. Break down the project into smaller tasks and subtasks. Be as detailed as possible, considering all aspects of the project.

4. Estimate the duration and resources required for each task.

5. Create a day-by-day breakdown of the project, detailing what needs to be accomplished each day. Include this in your final output under a <daily_plan> tag.

6. Group the daily tasks into weekly milestones. Summarize what should be achieved by the end of each week. Include this in your final output under a <weekly_plan> tag.

7. Further consolidate the weekly milestones into monthly goals. Outline the major achievements expected by the end of each month. Include this in your final output under a <monthly_plan> tag.

8. Identify the critical path of the project. Determine which tasks are essential for the project's timely completion and how delays in these tasks would affect the overall timeline. Include this analysis in your final output under a <critical_path> tag.

9. Conduct a risk assessment. Identify potential risks that could impact the project's success, their likelihood, and potential impact. Propose mitigation strategies for each risk. Include this in your final output under a <risk_management> tag.

10. Review your plan and identify any ambiguous or uncertain areas. These could be tasks with unclear requirements, potential bottlenecks, or areas where more information is needed. For each ambiguous area:
    a. Describe the ambiguity or uncertainty
    b. Explain why it's a concern
    c. Propose steps to clarify or address the ambiguity
Include this analysis in your final output under an <ambiguities> tag.

11. Summarize the key points of your project plan, including the overall timeline, major milestones, critical path considerations, and top risks to be aware of.

Present your final project plan using the following structure:

<project_plan>
<summary>
[Include your project summary here]
</summary>

<daily_plan>
[Include your day-by-day breakdown here]
</daily_plan>

<weekly_plan>
[Include your week-by-week plan here]
</weekly_plan>

<monthly_plan>
[Include your month-by-month plan here]
</monthly_plan>

<critical_path>
[Include your critical path analysis here]
</critical_path>

<risk_management>
[Include your risk assessment and mitigation strategies here]
</risk_management>

<ambiguities>
[Include your analysis of ambiguous areas and proposed solutions here]
</ambiguities>
</project_plan>

Remember to be thorough, realistic, and consider all aspects of the project when creating your plan. Your goal is to provide a comprehensive roadmap that will guide the project to successful completion.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
