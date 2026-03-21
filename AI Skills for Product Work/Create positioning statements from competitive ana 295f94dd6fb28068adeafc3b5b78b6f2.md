# Create positioning statements from competitive analysis and value proposition

Category: 🎯 Product Strategy

```
You are an expert product marketer. Create a Geoffrey Moore–style positioning statement from the provided inputs. Return Markdown only (inside one fenced code block), no JSON.

Inputs (assume variable names in brackets):

Target Customer: [TARGET_CUSTOMER]

Unmet Needs: [UNMET_NEEDS]

Product Category: [PRODUCT_CATEGORY]

Benefits (Outcomes): [BENEFITS]

Competitive Landscape: [COMPETITIVE_LANDSCAPE: primary competitors, alternatives, status quo]

Task

Synthesize the inputs into a concise positioning statement that prioritizes outcomes over features, avoids jargon, and is specific and falsifiable.

Produce one canonical statement plus 2 concise variants optimized for different contexts:

Executive-readout (crisp, high-level)

Sales enablement (customer-centric, objection-aware)

Format (use this exact structure)
## Positioning Statement

**For** [TARGET_CUSTOMER]  
**who** [UNMET_NEEDS in one tight clause],  
**[PRODUCT NAME]** **is a** [PRODUCT_CATEGORY]  
**that** [BENEFITS as results the user achieves].

### Differentiation
**Unlike** [PRIMARY COMPETITOR / STATUS QUO], **[PRODUCT NAME]** **delivers** [clear, outcome-focused differentiation grounded in proof].

---

## Executive-Readout Variant
For [TARGET_CUSTOMER], **[PRODUCT NAME]** is a [PRODUCT_CATEGORY] that [top outcome]. Unlike [competitor/status quo], it [sharp differentiator].

## Sales Enablement Variant
When [TARGET_CUSTOMER] struggles with [UNMET_NEEDS], **[PRODUCT NAME]** helps them [BENEFITS]. Unlike [competitor/alternative], it [differentiator tied to buying criteria].

Constraints

Length: Canonical statement ≤ 60 words; each variant ≤ 35 words.

Voice: Clear, plain language; no buzzwords (e.g., “revolutionary,” “cutting-edge”).

Evidence hook: In Differentiation, reference a proof type (e.g., “validated by [metric/proof]”) without fabricating data.

Edge-Case Handling

If any input is missing or vague, infer minimally and wrap inferred text in [brackets].

If multiple customer segments/competitors are provided, pick the single highest-priority one and state the choice in a footnote.

Quality Check (apply before finalizing)

Specific audience?

Concrete need (pain, job-to-be-done, or desired outcome)?

Outcome-led benefits (no features)?

Clear “unlike X, we Y” contrast?

Testable and free of hype?

Output

One Markdown code block using the Format section above.

Include an optional single-sentence Footnote explaining any assumptions or prioritization decisions.
```