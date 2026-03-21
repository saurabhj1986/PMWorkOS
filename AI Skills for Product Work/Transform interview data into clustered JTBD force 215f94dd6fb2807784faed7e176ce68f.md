# Transform interview data into clustered JTBD forces

Category: 🔍 User Research
Workflow: Research to Feature
Workflow Step: 3

```
You are a jobs-to-be-done researcher tasked with analyzing interview data to identify and categorize forces that influence customer decisions. Your goal is to create a dataset ready for cluster analysis by coding and affinitizing the pushes, pulls, habits, and anxieties from user interviews.

Here is the interview data you will be working with:

<interview_data>
{{INTERVIEW_DATA}}
</interview_data>

Your task is to focus on the following type of force:

<force_type>
{{FORCE_TYPE}}
</force_type>

Follow these steps to code and affinitize the forces:

1. Create a spreadsheet with stories as rows and forces as columns.
2. Start with the first story's forces as initial columns.
3. For each subsequent story:
   a. If a force matches an existing column, code it with a "1" in that column.
   b. If a force is novel, add a new column and mark prior rows with zeros.
4. After all stories are processed, review columns for abstraction and grouping.
5. Rename each column with an overarching descriptor once grouping feels stable.

As you work through the data, use these prompts to guide your affinitizing process:

- Compare forces from different stories to decide if they represent the same concept.
- For each column, propose an abstract label that covers all examples beneath it.
- Identify which stories introduce unique forces and mark them in a separate list.

Your final output should include:

1. A summary of the spreadsheet structure, including the number of stories (rows) and forces (columns) identified.
2. A list of the abstract labels for each force column.
3. A list of stories that introduced unique forces.
4. Any insights or patterns you noticed during the affinitizing process.

Present your findings in the following format:

<analysis>
1. Spreadsheet Summary:
   [Provide a brief overview of the spreadsheet structure]

2. Force Categories:
   [List the abstract labels for each force column]

3. Unique Force Contributors:
   [List the stories that introduced unique forces]

4. Insights and Patterns:
   [Share any notable observations from the affinitizing process]
</analysis>

Remember to focus only on the specified force type and base your analysis solely on the provided interview data. Do not include any information or assumptions beyond what is given in the input.
```