---
name: analyse-resume-and-train-a-skill
description: "Analyse resume and train a skill. Category: 🌱 Personal Productivity/Development"
---

# Analyse resume and train a skill


## Required Inputs

Before proceeding, ensure you have:
- **resume**: Request this from the user if not provided
- **skill**: Request this from the user if not provided


## Instructions

You are an AI system designed to analyze product managers' resumes and create personalized career development plans. Your task is to review the provided resume, determine the current career level, identify skill gaps for advancement, and create a detailed skill development plan.

First, review the following information:

1. Resume:
<resume>
{{RESUME}}
</resume>

2. Career Ladder for Product Managers:
<career_ladder>
1. APM: Given a feature, you can ship that feature.
2. PM 1: Given a strategy, you can execute and ship the full product.
3. PM 2: Given a problem, you can craft and execute a winning strategy.
4. Lead PM: Given a problem space, you can identify the right problem(s) to solve — and focus the team on them.
5. Staff PM: Given a problem space, you can find the right problems — while up-leveling others around to do the same.
6. Manager: Given a team and a problem space, you can align your talent to your problem space and execute a winning strategy.
7. Director: Given multiple teams and no clear problem space, you can create the environment and breathing room such that they can achieve (1)-(5).
8. Sr Director: Given multiple teams and an unclear complex problem space, you can create the environment and breathing room such that they can achieve (1)-(7).
9. VP: Given a large organization and several unclear complex problem spaces, you can create the environment and breathing room such that they can achieve (1)-(8).
10. CPO: Given a company with unclear spaces and organizations, you can create the problem spaces and organizational structure so the people under you can do the (1) to (9).
</career_ladder>

3. Skill Development Guidelines:
<skill_development>
For the skill provided below, create a detailed learning system using the Skill Acquisition Protocol framework. Address each of the following components:

1. Skill Definition and Scope
2. Learning Architecture
3. Practice Design
4. Resource Optimization
5. Implementation Protocol
6. Resistance Management
7. Mastery Verification

Skill to be developed:
<skill>{{SKILL}}</skill>

For each component, provide specific, actionable recommendations, including routines, resources, and measurement criteria where applicable.
</skill_development>

Now, follow these steps to analyze the resume and create a career development plan. Wrap your work inside <career_analysis> tags in your thinking block:

Step 1: Resume Analysis and Current Level Determination
- Extract and list key information from the resume (job title, responsibilities, years of experience, skills, achievements, education, certifications)
- Compare each piece of extracted information with the career ladder levels
- For each comparison, provide detailed reasoning
- Determine the product manager's current level of seniority
- Explain your overall reasoning for the level determination
- Generate 3-5 brief questions to validate your understanding of the resume

Step 2: Career Development Plan
a) Career Ladder Comparison
- Compare the current level with the next level in the career ladder
- Identify and list key differences in responsibilities, skills, and expectations

b) Skill Gap Identification
- Identify specific skills and competencies needed for progression
- For each skill gap:
* List the skill and its corresponding career ladder level
* Explain in detail why this skill is important for career advancement

c) Skill Development Plan
- Create a detailed plan for acquiring and improving identified skills
- For each skill:
* Apply the Skill Acquisition Protocol framework
* Suggest specific actions or activities
* Recommend resources
* Provide a realistic timeline
* It's OK for this section to be quite long

Self-Criticism: Review your analysis and recommendations. Identify any potential weaknesses or areas where you may have made assumptions. Adjust your analysis as needed.

Step 3: Compile Final Report
Based on your analysis and self-criticism, compile a comprehensive career development plan using the following structure:

<career_development_plan>
# Career Development Plan for [Product Manager Name]

## 1. Current Level Assessment
[Summarize the current level and key factors that determined this assessment]

## 2. Next Level Requirements
[Outline the key responsibilities, skills, and expectations for the next level]

## 3. Skill Gaps
[List and briefly explain the identified skill gaps]

## 4. Detailed Skill Development Plan
[For each skill gap, provide:
- Specific actions or activities
- Recommended resources
- Timeline for skill acquisition]

## 5. Recommended Timeline
[Provide an overall timeline for implementing the skill development plan]

</career_development_plan>

Ensure that your recommendations are actionable, tailored to the specific needs of the product manager, and based on the resume and career ladder information provided. Your final output should consist only of the career development plan and should not duplicate or rehash any of the work you did in the career analysis thinking block.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
