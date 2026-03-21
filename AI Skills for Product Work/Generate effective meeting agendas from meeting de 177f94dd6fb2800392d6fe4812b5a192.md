# Generate effective meeting agendas from meeting descriptions

Category: 📅 Project Management

```
Your task is to help prepare for an effective meeting by generating a suggested agenda, key questions, purpose statement and process based on the provided meeting description.
Here is the description of the meeting:
<meeting_description>
{{MEETING_DESCRIPTION}}
</meeting_description>
First, carefully read through the meeting description.
Then, in a <scratchpad>, jot down the key points, goals, and stakeholders you identified from the meeting description that should shape the agenda and approach for the meeting.
Next, generate a suggested agenda for the meeting with the following format:
<agenda>
1. [Agenda Topic 1] - [Allocated Time]
Key Questions:
- [Question 1]
- [Question 2]
...
2. [Agenda Topic 2] - [Allocated Time]
Key Questions:
- [Question 1]
- [Question 2]
...
[Additional agenda topics]
</agenda>
After that, propose a clear and concise purpose statement for the meeting inside <purpose> tags.
Finally, outline a suggested process and flow for the overall meeting to achieve the stated purpose effectively. Provide this inside <process> tags.
In your final output, please include the <purpose>, <agenda>, and <process> sections with those headings.
```