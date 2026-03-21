---
name: skill-browser
description: "Browse, search, and discover PM skills. Use when user asks 'what skills are available', 'show me skills for X', 'list skills', or needs help finding the right skill. Category: 🔧 System"
---

# Skill Browser: Discover PM Skills

Use this skill when the user wants to:
- Browse all available skills
- Search for skills by keyword or category
- Find the right skill for a specific task
- See what's available in a category
- Get suggestions for what to work on

## Instructions

When the user asks about skills, follow this process:

### 1. Understand the request

If user says:
- **"What skills are available?"** or **"List all skills"** → Show category overview
- **"Show me [category] skills"** → Filter by category  
- **"I need help with [task]"** → Search and suggest relevant skills
- **"What can I do with these skills?"** → Show popular workflows

### 2. Extract categories from all skills

Read skill files from `.cursor/skills/` and extract categories from the description field.

Categories found in skills:
- 🔍 **User Research** - Interview guides, synthesis, JTBD analysis
- 🎯 **Product Strategy** - Vision, roadmaps, positioning, competitive analysis
- 📊 **Business Analysis** - PRDs, metrics, data analysis, impact sizing
- 🤝 **Stakeholder Management** - Communication, alignment, conflict resolution
- 🎨 **Design & UX** - UI analysis, prototyping, design systems
- 💡 **Decision Making** - Frameworks, tradeoff analysis, prioritization
- 🌱 **Personal Productivity/Development** - Focus, planning, career growth
- 📢 **Presentation & Communication** - Decks, storytelling, executive updates
- 📅 **Project Management** - Planning, execution, coordination
- 💭 **Ideation & Innovation** - Brainstorming, creative thinking
- 🔧 **Technical Collaboration** - Engineering partnership, architecture
- ⛳ **Job Search** - Interviews, work samples, career transitions

### 3. Present skills based on request type

#### For "list all skills" or "what's available":

Present a category overview with counts:

```markdown
# 📚 PM Skills Library (186 Skills)

## By Category

### 🔍 User Research (15 skills)
Customer interviews, transcript analysis, research synthesis, JTBD analysis, persona creation

### 🎯 Product Strategy (22 skills)
Product vision, roadmaps, competitive analysis, opportunity mapping, strategic positioning

### 📊 Business Analysis (28 skills)
PRDs, metrics analysis, impact sizing, data analysis, requirement prioritization

### 🤝 Stakeholder Management (18 skills)
Stakeholder alignment, conflict resolution, influence strategies, communication plans

### 🎨 Design & UX (12 skills)
UI analysis, prototyping, design critique, user flows, edge case generation

### 💡 Decision Making (16 skills)
Decision frameworks, tradeoff analysis, prioritization, risk assessment

### 🌱 Personal Productivity/Development (14 skills)
Weekly planning, focus strategies, career development, skill building

### 📢 Presentation & Communication (12 skills)
Executive decks, storytelling, stakeholder updates, meeting facilitation

### 📅 Project Management (11 skills)
Project planning, milestone tracking, execution strategies, coordination

### 💭 Ideation & Innovation (10 skills)
Brainstorming, creative techniques, innovation frameworks

### 🔧 Technical Collaboration (8 skills)
Engineering partnership, technical specs, architecture planning

### ⛳ Job Search (6 skills)
PM interviews, work samples, resume building, interview prep

---

**How to use:**
- Just ask naturally: "I need to prepare for customer interviews"
- Or browse by category: "Show me all User Research skills"
- Or search: "Find skills for stakeholder management"
```

#### For "show me [category] skills":

List all skills in that category with brief descriptions:

```markdown
# 🔍 User Research Skills (15 total)

1. **Create actionable customer interview guides**
   - Create interview guides from research topics
   - Uses Mom Test and Continuous Discovery principles

2. **Extract customer insights from transcripts**
   - Analyze interviews using JTBD framework
   - Identify pushes, pulls, habits, anxieties

3. **Clean up raw interview transcripts**
   - Transform messy transcripts into readable format
   - Prepare for analysis

4. **Synthesize fragmented user research**
   - Turn scattered insights into coherent themes
   - Find patterns across multiple interviews

5. **Transform interview data into clustered JTBD forces**
   - Map interview insights to forces diagram
   - Visualize pushes, pulls, habits, anxieties

[Continue for all in category...]

---

**Related categories you might need:**
- 📊 Business Analysis (for turning insights into PRDs)
- 🎯 Product Strategy (for turning research into strategy)
```

#### For "I need help with [task]":

Use semantic search to find relevant skills, then present:

```markdown
# Skills for "[task]"

I found 3 highly relevant skills:

## 1. [Skill Name] ⭐ Best Match
**What it does:** [Description]
**When to use:** [Scenarios]
**Requires:** [Inputs needed]

## 2. [Skill Name]
**What it does:** [Description]
**When to use:** [Scenarios]

## 3. [Skill Name]
**What it does:** [Description]
**When to use:** [Scenarios]

---

**Want to use one?** Just say: "Use [skill name]" or describe what you need and I'll trigger it automatically.

**Want more options?** Ask to see the full [category] category.
```

#### For "what can I do?" or "what should I work on?":

```markdown
# 🎯 Suggested Skills Based on Your Context

## Right Now (Immediate Impact)

**If you have customer interviews coming up:**
- 🔍 Create effective customer interview guides
- 🔍 Extract customer insights from transcripts

**If you need to write a PRD:**
- 📊 Create comprehensive PRDs from product information
- 📊 Generate structured requirements from design assets

**If you're dealing with stakeholders:**
- 🤝 Reconcile conflicting stakeholder requirements
- 🤝 Prepare for challenging stakeholder meetings

## This Week (High Value)

**Strategy work:**
- 🎯 Create structured product strategy from context
- 🎯 Transform input into opportunity solution tree

**Decision making:**
- 💡 Make confident decisions using gut check protocol
- 💡 Create trade-off analysis from feature priorities

## This Month (Career Growth)

**Build your portfolio:**
- ⛳ Build compelling PM work samples
- ⛳ Master PM interviews from resume to offer

---

**Tell me what you're working on** and I'll suggest the most relevant skills.
```

### 4. Implementation Details

**To list all skills:**
1. List all directories in `.cursor/skills/`
2. Read each `SKILL.md` file
3. Extract `name`, `description`, `category` from frontmatter
4. Group by category
5. Present in organized format

**To search skills:**
1. Get user query
2. Use `SemanticSearch` across all SKILL.md files in `.cursor/skills/`
3. Rank by relevance
4. Present top 3-5 with context

**To filter by category:**
1. List all skills
2. Filter where category matches requested category
3. Present with full descriptions

## Example Interactions

### Example 1: General Browse
```
User: "What skills are available?"