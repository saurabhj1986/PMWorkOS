---
name: create-optimized-sql-queries-from-requirements-and
description: "Create optimized SQL queries from requirements and data tables. Category: 📊 Business Analysis"
---

# Create optimized SQL queries from requirements and data tables


## Required Inputs

Before proceeding, ensure you have:
- **query crafting requirements**: Request this from the user if not provided
- **data tables overview**: Request this from the user if not provided


## Instructions

You are tasked with developing a SQL query based on specific requirements and data tables. Your goal is to create a fast-executing, readable, and well-documented query that meets the given criteria. Follow these instructions carefully:

1. Review the following overview of the data tables you'll be working with:

<data_tables_overview>
{{DATA_TABLES_OVERVIEW}}
</data_tables_overview>

2. Understand the specific requirements for crafting the query:

<query_crafting_requirements>
{{QUERY_CRAFTING_REQUIREMENTS}}
</query_crafting_requirements>

3. Write a SQL query that fulfills the requirements outlined above. As you develop the query:
   a. Use appropriate table joins and conditions to combine data from relevant tables.
   b. Implement filtering conditions as specified in the requirements.
   c. Include any necessary aggregations or calculations.
   d. Use subqueries where they can improve query performance or readability.

4. Optimize your query for fast execution:
   a. Consider using indexes on frequently queried columns.
   b. Avoid using wildcard (*) in SELECT statements; instead, specify only the needed columns.
   c. Use appropriate JOIN types (INNER, LEFT, RIGHT) based on the data relationships.

5. Enhance query readability:
   a. Use meaningful aliases for tables and columns.
   b. Format your query with proper indentation and line breaks.
   c. Add inline comments to explain complex parts of the query.

6. After writing the query, provide a brief explanation of each major part of the query, including:
   a. The purpose of each JOIN or subquery.
   b. The reasoning behind any complex conditions or calculations.
   c. Any assumptions made during query development.

7. Present your final output in the following format:

<sql_query>
-- Your SQL query here, with proper formatting and comments
</sql_query>

<query_explanation>
Your explanation of the query's major components and logic
</query_explanation>

Remember to focus on creating a query that is not only accurate but also optimized for performance and easily understandable by other developers who may need to modify it in the future.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
