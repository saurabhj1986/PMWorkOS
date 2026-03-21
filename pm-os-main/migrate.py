#!/usr/bin/env python3
"""PM OS Migration Tool — upgrade to a new release without losing your work.

Run from the NEW project directory, pointing at the OLD one:

    python3 migrate.py /path/to/old-pm-os-project

Flags:
    --dry-run   Show what would happen without making changes
    --verbose   Print every file operation
    --force     Skip confirmation prompt
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Baseline manifest — injected at release time by generate-manifest.py
# ---------------------------------------------------------------------------

# --- BEGIN BASELINE MANIFEST (auto-generated, do not edit) ---
BASELINE_VERSION = "1.1.0"
USER_OWNED_DIRS = ["Context/", "Work/", ".cursor/hooks/state/"]
SYSTEM_OWNED_DIRS = ["Knowledge/", "Templates/", "plugins/", ".cursor/rules/", ".cursor/commands/", "docs/", "Workflows/", "external-skills/"]
SYSTEM_OWNED_FILES = ["README.md", "feedback-config.md", "VERSION", ".claude-plugin/marketplace.json", ".cursor-plugin/marketplace.json", ".cursor/mcp.json"]
BASELINE_MANIFEST = {
    ".claude-plugin/marketplace.json": "6fda69effcb5dc17eea5894c539b15cd2d6904ba88094abe7612bc8e69b38e2e",
    ".cursor/commands/feedback.md": "c48ece780c30383976a63c23938b9bc487b98c539dd2ae3d73d4d9264d4f9792",
    ".cursor/commands/framework.md": "a5ac4b445fb8157c24131abb96663fa3bf80ca4aa7d70d7a56fa3a35fe1ef94e",
    ".cursor/commands/help.md": "7ef012f4692270ff517e19b7c908dfe414f0a59f13caacb1d4e71aabd5525300",
    ".cursor/commands/skill.md": "0ee03908d3dbfb412382ed8fb5499cd071166a8616aafe7fd3cde038efcb07ab",
    ".cursor/commands/start.md": "a12aa12cdf212d1764816f43d6dda0b57a500f7f181df77f245aa5e155467d88",
    ".cursor/commands/status.md": "6cf03d43b9ca9e8690b4a4c1d6194c5247a14962033e5fd84eaef1a377f13f07",
    ".cursor/commands/testimonial.md": "79d20822a4f34bb2e7bf636d32a0af0e1bbd5e30606ab251f2faf3d8e238d8f5",
    ".cursor/commands/workflow/assumptions.md": "19131da53f1b2734dc609de6ffce27339bbb4476d811a377c7074c6471d8dfe8",
    ".cursor/commands/workflow/decisions.md": "87e9d6ed53baafff3cf999552c0cdc701fa617ecb4582627a7c6ad6495547e17",
    ".cursor/commands/workflow/meeting.md": "1d92fc12820065f944c4b9ac9706862eb80a225ddf081674487a9095de34324e",
    ".cursor/commands/workflow/opportunity.md": "e5bb73ffe81867555f9056f14d48ab607456dc59b81e0ea7285de1169e8405aa",
    ".cursor/commands/workflow/research.md": "316b026245535a5f2be304e2fca1cb8f426852fbdc4552c71f15f76f6c17763c",
    ".cursor/commands/workflow/stakeholder.md": "296d524d0c9a8144587925ba31ab8de7b84dffacaa2210022220927038d8074a",
    ".cursor/commands/workflow/strategy.md": "d6d458ede0593511c87c484d0a922b06f9324b5cd6c98952324467e330ba346e",
    ".cursor/mcp.json": "b3e030aa6d19e9c2e62b5090557561c7122913386f6bac28f214f5e3749f212c",
    ".cursor/rules/pm-os-core-rules.mdc": "9621e6cbdc0fa58bfa26c60359121a4234622e2910b18e1ab136331680ac894b",
    ".cursor/rules/pm-os-mode-invariant.mdc": "ee8cb459c0091feee1f26f082841d216f866aa13e27d8e83fa0df8da80e99c38",
    ".cursor/rules/pm-os-routing-rule.mdc": "6d7438f70c42abf6a46240e7d66506ec1055ad6a3d5e44fa8e081dd8afba151c",
    ".cursor/rules/pm-os-self-rebrief.mdc": "38ab1f535b7c577ae1f55a1efeb99f45c03d20a8d7a07fbfe31c9c7a42e5b697",
    ".cursor/skills/analyse-resume-and-train-a-skill/SKILL.md": "65ab77c2a5a2f918a93917892bfb7ecba437fc8f0bff229760d30ef55b140190",
    ".cursor/skills/analyze-and-reframe-software-features-or-projects/SKILL.md": "0b3e8f1a46be64c83d3dcd936ab84a68f456d7415b462cfdbe38e542beb1a9c6",
    ".cursor/skills/analyze-conversation-transcripts-to-extract-struct/SKILL.md": "0f47d227dfc338946e411904df3e0d8bfd144a43eddcd98f0c95c4434db34c08",
    ".cursor/skills/analyze-product-decisions-from-anthropological-res/SKILL.md": "cc2614682fc3a7c8ba14122389b92f3bae17b4bc427ed7afab317b6b6ecd95d7",
    ".cursor/skills/analyze-product-design-from-context-and-screenshot/SKILL.md": "93af15ad8e6a86cc5ada9a64987d1f1cc13de201483d5019b606358a707ab999",
    ".cursor/skills/analyze-root-causes-and-consequences-from-a-questi/SKILL.md": "b02a61ca53747e9fba5674c64779aaec8bddd1f3e7a0981b1989e0fa62697448",
    ".cursor/skills/apply-frameworks-to-product-challenges-based-on-us/SKILL.md": "e216733f0e3541af3eb051fdce979bcf798f40991fa48deb69cca2b8e937c305",
    ".cursor/skills/balance-competitive-parity-with-strategic-differen/SKILL.md": "b6047f61b796339f605dc8bc92bbd7a94bd740481181fcd32b6df8ecc0387125",
    ".cursor/skills/breadboard-reflection/SKILL.md": "f857810a2e29e8292f6bf2b1068148820149b070543f9041074d851f41c01948",
    ".cursor/skills/breadboarding/SKILL.md": "e2dc957672a1d54f783614ec6c1e3f3aadaaf4e105a3039b79b81fff81033bc5",
    ".cursor/skills/bridge-strategy-vision-to-actionable-quarterly-ux/SKILL.md": "545cc255805e2816ca51f86d98abc04938ab15766e6455234d454f93d7ac13b6",
    ".cursor/skills/build-compelling-pm-work-samples-that-land-intervi/SKILL.md": "519409a265f1fd82bdf5273bea94c1d600699d0c19a9fe24f8fe2a8bf146e1c3",
    ".cursor/skills/build-feature-impact-models-from-kpis-and-assumpti/SKILL.md": "ff69f167c4bf32108ace8a1eec96cfef11ab13700cb3302dee7eb9c0a5e45370",
    ".cursor/skills/build-intrinsic-motivation-through-conversational/SKILL.md": "e5907609fe849b5f63375c044f86baf29a65957b781567b9f7eda387f224bad9",
    ".cursor/skills/build-ruthless-skill-mastery-from-vague-goals-to-m/SKILL.md": "e37d47b4822aad0dc9df1a93a42770c1ada47f9ccd78929b9e0639d5aacbd35a",
    ".cursor/skills/choose-1-target-opportunity-from-the-ost/SKILL.md": "6b4264e1a891411dfd7d114cffc5e7e1ee15c13fe18ac28a9c526123a786f3d1",
    ".cursor/skills/classify-decisions-as-reversible-or-permanent-from/SKILL.md": "876c4c2b3971f23f98e416753ce498461c9060f690f59067207448e790c28fe3",
    ".cursor/skills/clean-up-raw-interview-transcripts/SKILL.md": "af9055e5fbacc89d94d3fa1fa439ce2cf06f7203aa747058982ffb08e1a94cf0",
    ".cursor/skills/close-the-feedback-loop-from-launch-to-next-iterat/SKILL.md": "d54f048747d81027c78a5dda66b8e2d8abe25e74f8c2d9cfe704aff33b3b50d0",
    ".cursor/skills/convert-research-into-durable-competitive-moats/SKILL.md": "e2a2672307ef9f0d3b74a7a6fb5a044ae7ff29e4209ad37b9ff3e641857de0c5",
    ".cursor/skills/convert-ui-screenshots-into-structured-json-descri/SKILL.md": "cf71c1f8e99d35641e66b56c238688d6596509096f3486c7fdcbccc2bea6a6f1",
    ".cursor/skills/convert-work-experiences-into-compelling-star-stor/SKILL.md": "92cea745a9bc1252494e45291e00782f4afcf0d2701e0b7ef876e30ea51de707",
    ".cursor/skills/create-12-compelling-ctas-from-4-proven-copywritin/SKILL.md": "31af5f0d00fe6e15abd2dca81e0f52d93a33e6510a498fc246ea83a013577dd3",
    ".cursor/skills/create-4-unique-interface-descriptions-from-a-sing/SKILL.md": "21ac58e88c0a3a5042e7a60a8e3fb213c15df90e39c2ee58b723fcab79d146b8",
    ".cursor/skills/create-a-business-flywheel-from-company-successes/SKILL.md": "b1e8455fe8f924c0b1bee9a9eb3f7e8a1bbdfb19986202d382738d46ab179eb6",
    ".cursor/skills/create-a-clickable-prototype-from-image-descriptio/SKILL.md": "621e7cc7b13d2c4e87307909017900c304b37f416dfe8951756e95e59c2d2e01",
    ".cursor/skills/create-a-focused-app-design-foundation-from-projec/SKILL.md": "ee561ae94de57a45aee59a6ad364ddb1890eefd1ce8dbeca16fb089b59b673b0",
    ".cursor/skills/create-a-limit-based-product-strategy-from-problem/SKILL.md": "29a5daba4a2a9ae5458545857e050ef77c6cca3a4e16961c06e5d2e814cfc5e8",
    ".cursor/skills/create-a-reinforcing-sequence-from-unstructured-it/SKILL.md": "c14231e689a2f162479b849b07cf32c7762cd9e56d14be7bd95fb331be064cbf",
    ".cursor/skills/create-a-skill-mastery-system-from-acquisition-pro/SKILL.md": "7e4b9949d66cc4adfae941d9cb4b14c26b65e9d6c862e3f2d4d1cbc4195b20be",
    ".cursor/skills/create-a-structured-product-strategy-from-product/SKILL.md": "bb97f08d13b2e969a4a6032fb3b378df3f3197ce11cdedba8a16736eddf12e3a",
    ".cursor/skills/create-actionable-business-strategies-from-expert/SKILL.md": "a5173668785afe7f2124644946580e5a5a7f038d71ef26d00e41d58e6e4e4924",
    ".cursor/skills/create-actionable-customer-interview-guides-from-r/SKILL.md": "82131bba96c13214f87e3a841760faade67cfd16460ff47483f6bdeb89abb12b",
    ".cursor/skills/create-actionable-research-briefs-from-problem-sta/SKILL.md": "21a566feed91ee5b62f0b65d27860ef681ca4e12288d1a849ae7ad47267b3e67",
    ".cursor/skills/create-actionable-user-research-decisions-from-pro/SKILL.md": "2fc6d8b0ce659005cbb3e10109ecd8ee35c20018e221fb610732b45e51821810",
    ".cursor/skills/create-balanced-product-requirements-from-structur/SKILL.md": "950e344d403579ed6420365356af8516dd43357b09692b78ce7ea5278608335b",
    ".cursor/skills/create-compelling-executive-decks-from-quick-dirty/SKILL.md": "fe97ab45c87efdb5f317f9c5066a3faf2db9bd43e3fc32169813c9ac26140cfb",
    ".cursor/skills/create-compelling-presentation-narratives-from-con/SKILL.md": "964f7df7f6239f8299c451626b0a1470571083e42b06d3ac7f6d3c13823feae4",
    ".cursor/skills/create-compelling-presentations-from-5-step-storyt/SKILL.md": "7c4e5d3c912342bfd720f4cb2722c33214d07e7da9faf7773db85b6f4c708291",
    ".cursor/skills/create-compelling-presentations-from-structured-co/SKILL.md": "a1b97f4fd1904f2b0a7ae75b55e9cd33bebdd7b6afeaa32e5993c002708ea447",
    ".cursor/skills/create-compelling-product-strategy-review-from-dra/SKILL.md": "2a32da2080f59518552be6af1650ada12f6e16bc79654bbac4661e2cf00af492",
    ".cursor/skills/create-compelling-slide-decks-from-problem-stateme/SKILL.md": "5fdbd1e30b9844a438760da42d90428660eb8c7128bf7897fda1987d2aa804d5",
    ".cursor/skills/create-comprehensive-growth-strategy-from-user-inp/SKILL.md": "95bdc802898b41254094551ed2fae2d8c01bea162fb09bcfedf6dbedc097230b",
    ".cursor/skills/create-comprehensive-prds-from-industry-and-featur/SKILL.md": "44fd2640054259c6404e28594d03a2a47247cdd7d9d850d33bf2e189c1046850",
    ".cursor/skills/create-comprehensive-prds-from-product-information/SKILL.md": "ffb0c26648fe5200a5a478fd64bce357cb6328fd9f7187cd3e02da8f6f86f7f4",
    ".cursor/skills/create-crisis-communication-plan-from-outage-detai/SKILL.md": "36c7dc8982c813c0dfb9754166d2952887ad81a90a676b52e3b313935cf7a24e",
    ".cursor/skills/create-demo-narrative-showing-user-goals/SKILL.md": "875b57b618e46e836b1eb082af4df280d11f49ed5070621e0604ead8da99e734",
    ".cursor/skills/create-detailed-project-plans-from-project-briefs/SKILL.md": "405e73290d3a003c7bac21b5cca5867a16d7b180d6e58b0c73f76bc783beefc7",
    ".cursor/skills/create-effective-customer-interview-guides-for-any/SKILL.md": "3a73e561f31468d39561422e2eab151bc832782841af36def8d4ca4950ba2b20",
    ".cursor/skills/create-effective-remote-miro-workshops-from-transc/SKILL.md": "85a394d15f276ad7ca868fb4b049a015a66107a85ef6df9d8ddcf837beae42db",
    ".cursor/skills/create-empathy-maps/SKILL.md": "09326411ddcead11686abb82b1ebb87b6fa7a61e12bcf6e9b547907104906d4b",
    ".cursor/skills/create-expert-product-strategies-from-task-specifi/SKILL.md": "eb7813f12d67068ea04f7174b5f747059231c473bebaa0cafeed452bd26fb428",
    ".cursor/skills/create-mece-analysis-and-logical-tree-from-list-it/SKILL.md": "1486c368adad796e0664f6e88eb00333d63ca0bbf5aaa425b817c8a487e6f107",
    ".cursor/skills/create-optimized-sql-queries-from-requirements-and/SKILL.md": "210dae686918b73d26559ce3ee5ff9640c3c077b5d8d33c085584d8b188915a3",
    ".cursor/skills/create-personalized-adhd-motivation-plans-from-cli/SKILL.md": "862ea42345b206b1c4d1324f8d5b0347a375e03d72f6fd52ea20b2a067dab4b1",
    ".cursor/skills/create-personalized-career-guidance-from-career-th/SKILL.md": "15566589aff555794c3588ccd53dc1a972403c0a4065b87576dcae9411a2ab49",
    ".cursor/skills/create-personalized-learning-experiences-from-ai-t/SKILL.md": "ec3113df04b713c74d95c7332dc026541763b9eb55bae47c9fccb4c7845cf623",
    ".cursor/skills/create-positioning-statements-from-competitive-ana/SKILL.md": "d7ae01178c5d55e2aa747171c5f5700eaccc4316a0adeb1c56208a3f82c4f05c",
    ".cursor/skills/create-proto-persona-profiles-from-user-research-a/SKILL.md": "1c0c8c9cac873194f744114998d8c842304b704f3041f1a87bae2af50c65ad45",
    ".cursor/skills/create-strategic-presentations-from-topic-audience/SKILL.md": "8c433532c858c8054a512784bbf5c686c784b244ad3e80f9b139f3abfc0ed66b",
    ".cursor/skills/create-structured-conversation-summaries-from-meet/SKILL.md": "bb7fcf167aa7461f915ddef72854473a009de47b6ca32e9bd48969e98b8f3649",
    ".cursor/skills/create-structured-decision-journals-from-decisions/SKILL.md": "491315ce764ccb322576a1f483dc63ef0694c7b56dcd4478ea7beef3c79cac2a",
    ".cursor/skills/create-structured-interview-notes-from-transcript/SKILL.md": "08b71c784109e3a576a7e2124606786fa3cec09a514d1b0b5f7cec46955a21fc",
    ".cursor/skills/create-structured-meeting-summaries-from-meeting-t/SKILL.md": "d293cef3c46a4a98c2c5a5d7c92a67a1d7a89870e4101ca43867fcd77a804181",
    ".cursor/skills/create-structured-product-hypotheses-from-product/SKILL.md": "1d4e450dd2cb29c75437243362cf9c5e80bba952b82af21c0a69a6116b424be2",
    ".cursor/skills/create-structured-task-sequences-from-unorganized/SKILL.md": "a623ab1d5abe36bd276791c8faf3604d6d6a8c31a3d3058512598eec9f47fcd8",
    ".cursor/skills/create-technical-architecture-brief-from-product-r/SKILL.md": "0d55e2260e083165a8e3863667674512e5954b285101b9d89239f6d8a2aaf7c3",
    ".cursor/skills/create-trade-off-analysis-from-feature-priority-an/SKILL.md": "defb5bc50d3ef012ed8c239ce21707fa26b2efada6542288b9d9011af89f4cd6",
    ".cursor/skills/create-user-stories-from-initiative-requirements/SKILL.md": "2b5a363552091d130953cde6bf7da52df2ece3fb83586f8bfaf29047f33d4c4b",
    ".cursor/skills/create-user-stories-with-gherkin-acceptance-criter/SKILL.md": "41e95acef851155ce64f680ebdd05f7e47ccc164a5f8e12fa8d2f01b66b01bbb",
    ".cursor/skills/create-visionary-press-releases-from-product-visio/SKILL.md": "30734012b00ca8a1ee1360a2677027dfe5eee74ad610819520c56e44eaa25e37",
    ".cursor/skills/create-winning-strategies-from-industry-trends-and/SKILL.md": "8cd76d48a495af4fbe98dc83f2ca24ea0520b51d337da7b30a890cbf106ef40b",
    ".cursor/skills/defend-scope-with-time-cost-tradeoff-analysis/SKILL.md": "ddc48049004accf21ee85bd13a80c01626034a04310337f9f88c4c7c88797332",
    ".cursor/skills/define-clear-decision-rights-using-davci/SKILL.md": "638e22dc99e3e6225fdcf9697e33d8380299c4b8e37543bd9f745cb0ccbebf7f",
    ".cursor/skills/define-market-opportunities-from-jobs-to-be-done-m/SKILL.md": "ecd1ef2616630a784296c539da7b76ce80494d48d84c8ed55ed7adecd163dc38",
    ".cursor/skills/define-measurable-success-metrics-for-design-decis/SKILL.md": "06ec8f8880f8ebcced33f955617d0108a4e0f35b1730bb1a2285602ebb891bd1",
    ".cursor/skills/defining-the-niche-from-user-input/SKILL.md": "4bd82aa893291ae5d7185d31ac28d6c570a10889db57f481b56a51d3b140069d",
    ".cursor/skills/design-balanced-solutions-for-edge-cases-in-produc/SKILL.md": "0cc1a33b13d03b1041408bead6402411848deec60067c088108b05c6f1914668",
    ".cursor/skills/design-event-tracking-schemas-from-ui-and-metrics/SKILL.md": "11d2a5d4a0ff9d1bb88f472374bfee222a41ce2a7c25ad2fa7f587d2a3918a3d",
    ".cursor/skills/design-robust-experiments-from-goals-and-systems/SKILL.md": "11533fed148e2ef53b6cff0d31675d1dff13e2e19bbaa064228918d0e6d676e2",
    ".cursor/skills/design-workshop-activities-from-problem-and-partic/SKILL.md": "821a889fc0d1121dd630ad5c55d0074dc8e57aeba2fa3aaf57c50b244395608e",
    ".cursor/skills/diagnose-competitive-advantages-and-build-defensib/SKILL.md": "3e5b15b692ea64e74dca2ef0d334fb24aee0955f1e5ad582321ce96c69d1ae18",
    ".cursor/skills/diagnose-metric-drops-with-rigorous-stepwise-decom/SKILL.md": "071892d518f1e90551e88fe4173e4afe3dbba1c140be0901e125dea72961497a",
    ".cursor/skills/difficult-conversation-script-5-step-framework/SKILL.md": "dc3966f3137ebcaadfabbe358aef22609e1ec78e8fb7c061ad89986930704496",
    ".cursor/skills/discover-your-personal-superpowers/SKILL.md": "7737dd1028f22430f891f839a2178102a78e5145c525bf7de6f3fd68a4089ac2",
    ".cursor/skills/dual-mode-ai-coding-assistant-staff-eng-intern/SKILL.md": "f5877ff1d0f4577e512f9be277c4ec10f61f2214dd73eee95043cf83ba20ec55",
    ".cursor/skills/enhance-leadership-presence-from-meeting-performan/SKILL.md": "e35f33a9c4feeea8dc850155988da0169b86d975c11c6cd69334849e3d513a1c",
    ".cursor/skills/evaluate-ai-product-solutions-from-recommendation/SKILL.md": "925c97b51919c0e1c587e6bd44399eb8b22c54e01769d7cc8fc67f180a77e3b5",
    ".cursor/skills/executive-presence-update-review/SKILL.md": "61312bf76d9c66f97e23fa006ceb9b658ac69ec3856dcaed58694972d32e6582",
    ".cursor/skills/extract-customer-insights-from-interview-transcrip/SKILL.md": "2af0a683082f00fab2dab326f60ce60835fae63e789945c3a578d1d29bbedf39",
    ".cursor/skills/extract-signal-from-slack-thread-chaos/SKILL.md": "dd0150fd8ec273bd8894371124858c66180e4c9bf87688776137effa2b991e62",
    ".cursor/skills/find-the-strategic-crux/SKILL.md": "558385e3a7bd262ee3c79b010ab4ea3b4b88d15bff7472038fe111f6802d0fd5",
    ".cursor/skills/frame-problems-before-jumping-to-solutions/SKILL.md": "1afb3142f00d206038eed4810dbf96b0c76526c877142eb4f57d8fcd0c1c7d8d",
    ".cursor/skills/frame-the-problem-statement-based-on-the-conversat/SKILL.md": "2826c178b9a8a1e50216c34f871b9e6b406b3d15799698b52dcb958aaaf308ba",
    ".cursor/skills/frontend-slides/SKILL.md": "543ba1ad766967bc770953f752285856e2a027148cde97607373a624fc0a252e",
    ".cursor/skills/frontend-slides/STYLE_PRESETS.md": "985f63e54fe8bd1cde15dce0c60dc3a64f877e83d1308626d4b7e91c6d4876b0",
    ".cursor/skills/generate-a-detailed-customer-journey-map-based-on/SKILL.md": "c912404e58045b86d600bb81edd56dfe4e8e724096e30a49a6608ad0d5ab2a65",
    ".cursor/skills/generate-comprehensive-use-cases-from-user-input-f/SKILL.md": "be1354f6e89fedfc7e8770c6f66798e0690a346060f3effe4a48e1f986625323",
    ".cursor/skills/generate-comprehensive-ux-edge-cases-from-product/SKILL.md": "3d673a08168e202c39f3b1692dd5f2c7d37e65019dc3c5a865766701983cca69",
    ".cursor/skills/generate-creative-solutions-from-de-bonos-lateral/SKILL.md": "067840044951d213b54c078de23f15407c1af612231741116f0c211ba3ef3a6a",
    ".cursor/skills/generate-creative-solutions-from-metaphorical-thin/SKILL.md": "b5f1d98e1e410af8d50c46dac70767afacf06effe8f4c42c6be5f06423ee6e28",
    ".cursor/skills/generate-disruptive-strategies-from-what-if-brains/SKILL.md": "1251b93ddf2910b57933947f8ddd7807f51656a019d4632ea4cd09d745364c63",
    ".cursor/skills/generate-effective-meeting-agendas-from-meeting-de/SKILL.md": "cbe669d3a4a087dcc228c8742a0451d25090717900ef2a6672c94cf3e7d57c77",
    ".cursor/skills/generate-growth-projects-using-pioneer-migrator-se/SKILL.md": "03c69f868f7c7b08c40ad91e64507a93a333cc15ff4cfc396d1c54671c6920cf",
    ".cursor/skills/generate-influence-strategies-from-cialdinis-7-pri/SKILL.md": "861fdbb99ba76985c2d240550a433993701d3e29d0b2aea2938e0bd81f50b905",
    ".cursor/skills/generate-innovative-ideas-from-project-parameters/SKILL.md": "8f35faa21ae3f1cbdc9e24663e44e4b1ec38dcfea0e72bce053ca6b211e3fb9c",
    ".cursor/skills/generate-innovative-ideas-from-structured-brainsto/SKILL.md": "8f4b9687c8259f92f36e8d24df8ab7404462c9ab6aea73e350fef35c0b4df7bb",
    ".cursor/skills/generate-innovative-product-ideas-from-structured/SKILL.md": "1a4c4c3931115cfe00401af796c70b0b8e70eeb656e391ac5a1dea23881a6ad0",
    ".cursor/skills/generate-market-requirements-documents-from-strate/SKILL.md": "f18150e3e51788bc62ac3bb77468d359623b9de6199d26164fbed7a82b15b87e",
    ".cursor/skills/generate-offbeat-questions-from-any-topic/SKILL.md": "8e9061dddc94a7d313c6e33d337b7b06d20214f47346c80a2a4849f6fb9b0c7a",
    ".cursor/skills/generate-product-assumptions-from-core-strategy-in/SKILL.md": "5884aac1dc5f87083c165d2e54b754893be9808f125d9b2584a0afa4204ad676",
    ".cursor/skills/generate-realistic-jtbd-interview-transcripts/SKILL.md": "9872751e894ecd462142b2555092fd27d7f07b0134f8cb032efb9030fa45cb03",
    ".cursor/skills/generate-startup-ideas-from-user-responses/SKILL.md": "9fd323ee9094fdb5fbd293bd2d250e0c20088644ec90e6013962248adc9d80c9",
    ".cursor/skills/generate-strategic-moves-from-swot-analysis-across/SKILL.md": "eae64182fdbc849fe11372e6cc3b0acd7038522d3833331836520dc039fcb6e2",
    ".cursor/skills/generate-structured-requirements-from-conversation/SKILL.md": "bf80b51297278a4a0e816b138a88a12bd764d93861d673c5c087bdc518b4cecd",
    ".cursor/skills/generate-structured-requirements-from-design-asset/SKILL.md": "7ae59e79de238c998628a6c4c7524d3ec1e519277ed64f61febce7f367b907ad",
    ".cursor/skills/generate-thorough-self-questioning-analysis-from-s/SKILL.md": "592a0f258e5ee1edca0b27322bcf0548440c775e2a7b2614bdf5d9e10384ecf2",
    ".cursor/skills/generate-user-friendly-affordances-and-signifiers/SKILL.md": "c4c84af49be364d9c16672b095c58fdba78c1bde2cd426437274ab2ffd9f66f5",
    ".cursor/skills/get-structured-engineering-solutions-for-a-problem/SKILL.md": "e9bf1c1cf44d1fd24826887bf09c7cf6a87620805585571819e9e009339751e8",
    ".cursor/skills/ideal-customer-profile-icp-representative-for-prod/SKILL.md": "aad38b203105ccaa3d9ecece37ff286d8c5a4d7df04bf5e9753e42e0d2fe44a2",
    ".cursor/skills/identify-apps-aha-moment-from-user-data-and-app-de/SKILL.md": "ef66ad9f1e0a6c71299de4b578822bdb8446f40365b63b65b85e705759d6b966",
    ".cursor/skills/identify-critical-flaws-in-product-requirements-to/SKILL.md": "af3794eae1aba10ca4186e05fa77e08ac9c44b6d7437e73b61dccdf0c44310e1",
    ".cursor/skills/identify-flawed-solutions-from-customer-problem-an/SKILL.md": "128b54bfd5fa76960f802486fae99916e77a9d921063525efc0462f7750818bf",
    ".cursor/skills/identify-potential-hidden-agendas/SKILL.md": "c915e7bbd9cb05f3412a965cc7acb6f42ff356c5ad3d8ef3a247df87c03813b3",
    ".cursor/skills/improve-feature-results-analysis-from-draft-to-fin/SKILL.md": "552214828f6919db5d3030027a1f20da392250fc6cf02dc400de989f01d664f1",
    ".cursor/skills/improve-ux-terminology-in-product-requirements/SKILL.md": "d5b77571ad37b656647492512a53bb77c26cd6dfb2c0b9e17ad53a4b63c241d9",
    ".cursor/skills/interactive-intake-to-gather-ost-inputs/SKILL.md": "0f9a8143774ce9a40c84fb2e75486910e0c77c57e2a57f83cc16e016ff7d90ae",
    ".cursor/skills/life-design-mapping-exercise/SKILL.md": "f6da7170e192cfa75b693ea9c92c539e27b87c7d8472a26693329e729b8d0ab6",
    ".cursor/skills/make-confident-decisions-using-the-gut-check-proto/SKILL.md": "0a654550225ea527a16c235fe45acb82fc558665b3c855d8af8abe6a5efa9f82",
    ".cursor/skills/make-stakeholder-decisions-using-toc-thinking-proc/SKILL.md": "cfb28d5ce93b70f69b02466136a5946be939706f6b5d23d23511277f87f09ed4",
    ".cursor/skills/map-power-dynamics-before-meetings/SKILL.md": "b03807ce2437738fc227f8f1e125b5ab9c218e0f945a4ebfa38ac32d4fa14659",
    ".cursor/skills/map-value-chain-components-from-end-user-needs-to/SKILL.md": "7938444cad1973a5612886eb3cc49db39a871b4d035e583508f3212f55fd2446",
    ".cursor/skills/master-complex-skills-faster-with-expert-learning/SKILL.md": "27de6783a2b7eb4c142e4ea05367d88a6149b3cab9a7fbff796389065216f81e",
    ".cursor/skills/master-office-politics-with-machiavellian-strategy/SKILL.md": "986006709f409aecb9591d926bfc99a34a4717e06d20fb70c209d373821a4183",
    ".cursor/skills/master-pm-interviews-from-resume-to-offer/SKILL.md": "0b0edd2747f70b5c7d93dbb371264f06de7fd4f951f98d72417f9f6dfe4e25b5",
    ".cursor/skills/message-framing-comms-plan-designer/SKILL.md": "cd1916b1ae9d4e95a0756ecee4e19a3cc54ab1a14b9733ffc6f73f31c8b21ca7",
    ".cursor/skills/motivation-journal/SKILL.md": "90cfeec222bf9095f619deec6a02d73f01ce9b38f88ee7d1659b60601aa1d88e",
    ".cursor/skills/netmba-competitor-analysis/SKILL.md": "5cb4617160bf75413582ec27ad605c401046aaad49d80ec91207c948f04ebfcb",
    ".cursor/skills/predict-future-product-opportunities-from-market-i/SKILL.md": "b9a626149c2f8774b704b69e707c7edea01c23506597572dae5d71a40dd2f064",
    ".cursor/skills/preparing-for-a-challenging-meeting-with-stakehold/SKILL.md": "184889044c942a50f4907f2ee98e9013eb7fb5ddf43637336f342233b2269b7e",
    ".cursor/skills/prioritize-bugs-against-work-in-progress/SKILL.md": "7b453e5b836b2766c72e7d6b5a1351c511c2d252171ace084d53e66791f3fb02",
    ".cursor/skills/prioritize-opportunities-in-opportunity-space/SKILL.md": "27d7cefab980f3c80fc510801c1955f930decefc66c2e4687b9fbaab6abf2396",
    ".cursor/skills/prioritize-requirements-with-clear-p0-p1-p2-framew/SKILL.md": "752a18f79ca6b78255779e053a5786d7e3e663d7e47a31e1ded7f3a7b7f24c76",
    ".cursor/skills/prioritize-risky-assumptions-for-rapid-validation/SKILL.md": "8d8396072edf41e6c5f06f28d45e3adb6ab59fd9990f53972f2c1e81c932dbbc",
    ".cursor/skills/product-design-analyzer/SKILL.md": "a21634799041be8bd3ca0f433dbef2ffbb68e7b06354301762f29b375dfc5e6c",
    ".cursor/skills/reconcile-conflicting-stakeholder-requirements-int/SKILL.md": "9bfeb7c5d388b63c35158b22574cfbe1d91abf0b820376ce50f2f8f8ba7f5147",
    ".cursor/skills/reduce-churn-from-customer-data-and-exit-survey-an/SKILL.md": "20f21ea6b1ac3d7cde0d2a44edee34f78576d5b8629c6373e065f2eaa146dfb6",
    ".cursor/skills/reduce-friction-in-multi-step-workflows/SKILL.md": "35f439f3a587b0a9342748f0379ace5a99bb601d56d63ae6c3d698c7019427f8",
    ".cursor/skills/run-effective-product-refinement-sessions/SKILL.md": "e9bbfd61bd4e763c841e9b981637ac82ae3d9245314b811e290e8b3ce87eb5ee",
    ".cursor/skills/shaping/SKILL.md": "320b95226ed609a532282fb1a4f0652836a0d2fb1aa2af7e289e083a69f2d5f1",
    ".cursor/skills/simplify-products-through-via-negativa-analysis/SKILL.md": "72666d2e55be290059a5ac429a8f427528b576e5ac2feff63e10068654749f52",
    ".cursor/skills/size-product-feature-impact-from-metrics-and-usage/SKILL.md": "6b8fd48bde37fc051c25e7814b5b84be555b7ea35b232fb6598e07bc075236f7",
    ".cursor/skills/skill-browser/SKILL.md": "77c6d21bfa6476c4e5a7f93a74d2b9a21767025ef015976cd69e4a3652800b7e",
    ".cursor/skills/stakeholder-powerinterest-influence-map/SKILL.md": "0cdc6aee1f5efed380e6a0a5e07cfa54597247fa17eb77223c9a3b89d35f6bf5",
    ".cursor/skills/stakeholder-risk-review-for-a-featureprd/SKILL.md": "47e68dcd2874e353781f6c8397a66699a40e6d548c37b65a007cb8af9baff3ec",
    ".cursor/skills/strategy-kernel-extraction-from-context/SKILL.md": "f7401bc95fbc3af6dc75e23add14a281ccf3300d913d5049f4a907c2d50b8201",
    ".cursor/skills/structure-complex-problems-into-actionable-recomme/SKILL.md": "daf74637b37f95afd6552495b1e297c4f97e0b3081ba9d13eae9a924f063650c",
    ".cursor/skills/structure-exec-feedback-without-context-into-actio/SKILL.md": "2467d247ae4f9f57b1cf68c16a67eb63afdaa5ad9e599a89078c15cdd488800f",
    ".cursor/skills/surface-moo-most-obvious-stakeholder-objections-be/SKILL.md": "4c4b6bcd5f549bd55e662271d2bc2bfccb83de8279ece71ab665915d469398a9",
    ".cursor/skills/synthesize-fragmented-user-research-into-coherent/SKILL.md": "97851076eb1bb2decd774eb01faf011834680b3c1b80c6152188e1a6f12931d8",
    ".cursor/skills/synthesize-post-launch-feedback-into-v2-improvemen/SKILL.md": "2abd6ad99707a04eb05a3ef59010e56af1964ebdc545a199625907164498d40b",
    ".cursor/skills/take-control-of-your-week-from-chaos-to-three-prio/SKILL.md": "dd512c62dba475d8e19708beafd1db45a5296991f8e31bcae714c51305d55210",
    ".cursor/skills/transform-11s-from-status-meetings-into-high-impac/SKILL.md": "742e0b11d76feb313a8e4c183547e2c747d568980d6a4f9b251cc07e3b7fd9f7",
    ".cursor/skills/transform-competitive-analysis-into-winning-positi/SKILL.md": "1c88a8fda486ff6a6374dbc65428870b58796a54d0da03a31ca0a501eaeac21d",
    ".cursor/skills/transform-complex-text-into-clear-pyramid-structur/SKILL.md": "775c61645595a8538285463e3b49469dd18fc8ce493f181e374b9545630f8a36",
    ".cursor/skills/transform-input-into-an-opportunity-solution-tree/SKILL.md": "7a7215772383a3ddc7c219ab14b73b0d76743ee09e0dff5966fd2caeb7c5dfe3",
    ".cursor/skills/transform-interview-data-into-clustered-jtbd-force/SKILL.md": "26873d83435a2057aa808892e0140a803acd357673a2831bb40266cb7fb1a8fe",
    ".cursor/skills/transform-interview-transcripts-into-actionable-jo/SKILL.md": "201c2ec601441cf58b7f72d5b376803e02f86277dbdc464128f04272e20356bf",
    ".cursor/skills/transform-leadership-intuition-into-data-driven-re/SKILL.md": "fbcbffc7cbcefb01cabeb2fc466417cfc3ec9009d9414fde72777181355c203d",
    ".cursor/skills/transform-low-frequency-users-into-power-users-wit/SKILL.md": "60eda2d54520da6654009e8396b16c712d4d94b75f40f29c400524c7be82c176",
    ".cursor/skills/transform-messy-content-into-clear-skimmable-writi/SKILL.md": "89353459aae4685700dd024a77367dc04db950693504b6d0bb31454b78424df0",
    ".cursor/skills/transform-nps-feedback-into-prioritized-customer-e/SKILL.md": "b4a5a1a7542bcb2e6c6cef4244b52890a28eabce261aded27b5c0a3d9788ce16",
    ".cursor/skills/transform-onboarding-flows-from-product-data-into/SKILL.md": "78d5d4e02dd66716bce69d75956f5a5f4093700923ba9f5f9da647653f6d8b7e",
    ".cursor/skills/transform-pm-context-into-actionable-design-constr/SKILL.md": "6efbcac02f6764c42dbf056203f07054a22102abfc43fecafb471fa479eacbfa",
    ".cursor/skills/transform-product-ideas-into-detailed-sketch-descr/SKILL.md": "ba5ac7a3449f3df051759015403a1a5d78ba1b7902bedff3d08969e16850fe41",
    ".cursor/skills/transform-scattered-meeting-plans-into-focused-sta/SKILL.md": "c98e592012e7e2b43a593e2d700ab015d87499278c696f6b712f96a9fd9d2cd0",
    ".cursor/skills/transform-scenarios-into-strategic-action-plans-us/SKILL.md": "ef9593129efcb0c4a344614e34dea2693630430043bf0d88bbaf6e1ff22dc2ab",
    ".cursor/skills/transform-shallow-personas-into-actionable-user-pr/SKILL.md": "3db29e9d6e69e680e455536a5992965f879e54405978983fbf671f1e6121f09a",
    ".cursor/skills/transform-startup-struggles-into-focused-action-fr/SKILL.md": "57a6cb026d3dc509bd4f652702d2bbf91d59a99ecb696ad66a1b0fe445ef1aec",
    ".cursor/skills/transform-support-tickets-into-actionable-product/SKILL.md": "82a659d8343e0683e5965cfeea90c364fe118718986000263257d75b52be4a64",
    ".cursor/skills/transform-survey-responses-into-actionable-product/SKILL.md": "85acb7d52fce6c9fd007dc907adf57bff4f3fe8d893dfd5d33d8a8383e0ab5e4",
    ".cursor/skills/transform-task-lists-into-optimized-project-plans/SKILL.md": "6691a083e5ebc8862c32b2180351e24cf6d2a96d3f7673ce24bfea0ca22b7e19",
    ".cursor/skills/transform-todo-lists-and-calendars-into-top-5-pm-a/SKILL.md": "8eb51e1f7f8d6dde94c205f5b7c74c623f2333e1fc9eca8f834fe40921852c56",
    ".cursor/skills/transform-user-concerns-into-empowering-mindset-sh/SKILL.md": "d7ac72eb7068ef7caa99482786f2e58d4713a8970f4e677fa0b14d9e68f6d961",
    ".cursor/skills/transform-vague-stakeholder-briefs-into-concrete-p/SKILL.md": "d17a639a9f62e35dd3cb5c2f4b52ce397f5d96d28f3bd4f648c6eeee6b642dfb",
    ".cursor/skills/transform-vision-statements-into-actionable-quarte/SKILL.md": "01966cba335737ab9bf2154548ebe716111a0ba4db2d77522076ea019c852b21",
    ".cursor/skills/transform-your-resume-into-an-interview-winning-ap/SKILL.md": "f2c113e308f7e6d477ace3ca35c1e3cd1b10a260dbf4d1a530f1c0a026103e47",
    ".cursor/skills/translate-technical-explanations-into-stakeholder/SKILL.md": "7e0c46a2e6c3e0ddb449658cd63f085b4166471748962f5b42a05b90fbb2c6d1",
    ".cursor/skills/turn-interviews-into-nownextlater-visionroadmap/SKILL.md": "6637ee35d8139fa69f56f9b46efd1f6d6355806290aafd99e5cfa488a278dc0a",
    ".cursor/skills/validate-aging-research-insights-before-reusing/SKILL.md": "f16128d091c13a81b0286c75942625b4e5e85f26f5c2bac4d8e7a00cd85cc987",
    ".cursor/skills/work-backwards-from-a-product-assumption-to-identi/SKILL.md": "ae42cb783356a4e03e54dbdc475f4913ac3d2a22e74cbf1ec85e250efd0df323",
    ".cursor/skills/write-status-updates-that-people-actually-read-and/SKILL.md": "b4abfd12b9f939930bfae5bf62a598415083b0964a31b1aaafadc646334bac40",
    ".cursor/skills/write-testable-acceptance-criteria-for-ui/SKILL.md": "f5792f8e0667ef443d677ee64bc2d9cf6ad547a6b351985926bb31c8162e6311",
    ".cursor-plugin/marketplace.json": "c4fdc5c86e7c5dfad0859271cb23bdb714f77780ebed29bec8c40ada91a7f9e7",
    ".gitignore": "7fd899fe9decf6243866003d8581b072681ff369bf964c2e3550a559aaa3b23b",
    "AGENTS.md": "1db064432ca132e9dd638f87adb8889cc8d829e5512a2dd9d28ac748cb33a2f3",
    "Context/COMPANY.md": "7721dce6674b28a553800c159d3dc8c2514ca3ed849891fb7a33351f99461606",
    "Context/CONSTRAINTS.md": "da1b28fc05d54d4e94acb98edfc8df0ee067fa0a636e255218d8bb2b16840a5b",
    "Context/GOALS.md": "b1261e61b3b07cc9dc9a9b8508eb477a669d7d19184a7de736208e86572822ca",
    "Context/PRODUCTS.md": "b014d9440ad2ecdf7dc916e6f5278efa062e7735ecf18c3d0b756e424644aa33",
    "Context/TEAM.md": "28fbbf30a912cca298d534ca31ca2b697f094e392c149b6b5bb9e995c29afa4e",
    "Knowledge/Frameworks/build/intercom-product-management.md": "1a2ef773db5f685ceb348f9ebeaeac55fec6d26eb7842ba006060f1b83bb418b",
    "Knowledge/Frameworks/build/must.md": "00bb1a8f825b3c83ea59f7387226d7bbb69bc836ff8395f0cd0561522320517f",
    "Knowledge/Frameworks/build/product-alignment-framework.md": "5f2c292f63970b9c7bd6a2d659b8cc081f0f80730e702e04e32e0df1f1f27629",
    "Knowledge/Frameworks/build/rage.md": "05de235f06578f2b7b7b2c3aaec2d6102b204a560acbead9e778ccfee069053d",
    "Knowledge/Frameworks/build/rice-prioritisation.md": "36d2d699a9e7b47f6ecaa060b9f58d0f1c8589359bf342e45aaa7882f35b66cd",
    "Knowledge/Frameworks/build/shapeup.md": "54a4f45913d290fa82293ec95a52081aa1c64e3c884a250fd78ad413e046697c",
    "Knowledge/Frameworks/build/stakeholder-scoring.md": "0fe8c963fa8fb18f977f44b3cb622371c93a1ef1948c9e0a56e0af02a4f3781a",
    "Knowledge/Frameworks/build/theme-based-roadmap-framework.md": "d045d48a10ecf4a3dfc776c2b85c7a453d36096dc93f4fbde8798e4cb1127bf6",
    "Knowledge/Frameworks/discovery/404-test.md": "5a98c18d510efd6e5d2c39c862dcabaf922f66ca5ec1eb6863c34e7db6031cce",
    "Knowledge/Frameworks/discovery/ads-history.md": "30d29b674ebfd335a9435bb4bdbafcf327f012a6c2594a80658fe0713672a04c",
    "Knowledge/Frameworks/discovery/after-framework-by-itamar-gilad.md": "a76873dfb5cab51c250ece45bf08d2c473314554cb1799851e07343a408c69d3",
    "Knowledge/Frameworks/discovery/aha-competitor-analysis.md": "22ef7522ba42db867b84950539ebd95dcd3f11e3b2c71e10993529eb6fad8cd5",
    "Knowledge/Frameworks/discovery/assessing-product-opportunities.md": "e24422bdff2f8ff54474aeaec789e35fd407d1d1d77954974b84a8bd24e0ea43",
    "Knowledge/Frameworks/discovery/assumption-mapping.md": "202aa33885f86d2acb63d5f188ee0cb3842ba7393b160302cfa263e06014f56b",
    "Knowledge/Frameworks/discovery/blog-post-driven-development.md": "48c68631a849d3689b0c06fccc63d73c5836a2712854b8cb04ac88b7254578df",
    "Knowledge/Frameworks/discovery/boomerang-dry-wallet.md": "cebc1512fbab24e5b76b6afe819bf3fceebdd489388a9ec4d59956f0e30f350a",
    "Knowledge/Frameworks/discovery/buffer-competitor-analysis.md": "f718d10030a997f196949663f51a0e91fb78328742d0a08bc852cf6ae8903e71",
    "Knowledge/Frameworks/discovery/buy-a-feature.md": "c9398c0937003128e33889129ad23221579c5fae5f3e2f435950f55d62b7b75c",
    "Knowledge/Frameworks/discovery/circles.md": "6545923a105487a1f9b5b00e62b6d47eb83487747e11bea138e23fccbef14b0e",
    "Knowledge/Frameworks/discovery/conjoint-analysis.md": "362ef9d93abb74990fa1cae323f55007e8f126fcd646f3df8aed1aef20777366",
    "Knowledge/Frameworks/discovery/consequence-scanning.md": "f95821356670e3dc6306f304cab26dc5f401f9d5407c83ebe400c265f962558c",
    "Knowledge/Frameworks/discovery/customer-journey-map.md": "1390beda67c1f055b299e4b5cd3ed12b87861ae9b4328c4536ac0c3358701481",
    "Knowledge/Frameworks/discovery/customer-problem-stack-rank.md": "0a353b4e86d8f70e4a3422d79e077ee27ecf96d2a87c424e202215146121c816",
    "Knowledge/Frameworks/discovery/customer-support-analysis.md": "7d4c7d141ec31a52c56aaafedce4ac1de0b8545e0be9f65cc6ed487afcefb73c",
    "Knowledge/Frameworks/discovery/design-sprint.md": "4cd4df017855b75842440e631a2109cf4096cf573d71a5eafbed2f5d73af1a01",
    "Knowledge/Frameworks/discovery/discussion-forums.md": "46ff45da758ea0347fdaf8ae00241c43e6bc5aab89c9f68b2f3249aaf9fbee48",
    "Knowledge/Frameworks/discovery/drift-s-tracer-bullet.md": "2260f80477ce2aefe67a424908c61acac1ec483636814bc7e1c00c70a127a232",
    "Knowledge/Frameworks/discovery/email-campaign.md": "caa1e6abee935c73b215a1b092d171e14b5a166ad22e03827cde1faa59123c51",
    "Knowledge/Frameworks/discovery/family-tree.md": "82f0bfecdf2a27930c173b4c756b07ea677125a8dc172ee5866f0156965a17de",
    "Knowledge/Frameworks/discovery/feature-stub.md": "6ad7324c7f4234d3e0d278937bf1f3423477b311099ffbc751c859062014d45d",
    "Knowledge/Frameworks/discovery/find-the-watering-hole.md": "82a6cab3e1ee0134c0defaeb601449fc69662f9485e292a44d0f7b579dceff5d",
    "Knowledge/Frameworks/discovery/five-people-who-are-in.md": "27256972047cf21c7405ecf4609c7970d2e934384e2ba28f884efb3a70a316ec",
    "Knowledge/Frameworks/discovery/high-hurdle.md": "7a1ae60eff40a79041e8ef366b0ce602b05799c3959e065742dea4fbb2c086ab",
    "Knowledge/Frameworks/discovery/iceberg-canvas.md": "4b1d6102d5fb413f8241f284ed7912ce283087df46db90d4de1bcf5351ec168d",
    "Knowledge/Frameworks/discovery/intercom-job-stories.md": "66a60e036f335b15931dfdb73a2cdae0c9f95c746c8c94d75d678f504d4fadd4",
    "Knowledge/Frameworks/discovery/interview.md": "21e2a9d8e75342bd92da5a44d41717ce99c3394cc489183324b43457c33cebaf",
    "Knowledge/Frameworks/discovery/itamar-gilad-s-prioritisation-wheel.md": "713295a3b41ffeb70e3a2f710c0d0d1942c3c4ecf3a196cf32062482187f1c65",
    "Knowledge/Frameworks/discovery/jobs-to-be-done-moesta-christensen.md": "9e4e4caa69db56f3655603fd89a802e361cd24af4c12377e386bad2d34136c2c",
    "Knowledge/Frameworks/discovery/jobs-to-be-done-odi-ulwick.md": "d2436a753a19cbb8af249cfc20b8312edb3a71aad1f7ca7739614ebe3c78f709",
    "Knowledge/Frameworks/discovery/lean-canvas.md": "e1d8a639c96656377f55e28413386ed41eb9076f7374ed97e991e7b7874624fa",
    "Knowledge/Frameworks/discovery/lean-product-playbook.md": "68c54c876aa307f4c2a2274697ce7bf91490d13eaa3430c86dcc7763d630a7dc",
    "Knowledge/Frameworks/discovery/lean-ux-canvas.md": "d3a355a80709574b9304234f1b7251b8696fe98575fbb54f14b721e2a9f1fc7c",
    "Knowledge/Frameworks/discovery/link-tracking.md": "cf2a03f072386fb50da85d7bafd0c7a3812dff9b7b5fe1f930ec66b8e2e2569f",
    "Knowledge/Frameworks/discovery/maze-question-bank.md": "2ebfb5c41083ef1d2d99b27194cabf230fbd1681293b95451e5f13945926b93c",
    "Knowledge/Frameworks/discovery/mousetrap-product-framework.md": "ca7d87ff4a8c8503712d509391bdb567c531399523c5d567e870a81613daff5f",
    "Knowledge/Frameworks/discovery/ncredible-framework.md": "fabcad13155cc52a61988d29c0f2427de83dabcfbb018f0cb99e8cafeb2dc6ed",
    "Knowledge/Frameworks/discovery/netmba-competitor-analysis.md": "996387d627a2771739dd970362e2eedbbded932f63cc15ebaeb6184ade2e0955",
    "Knowledge/Frameworks/discovery/online-ad.md": "3c055acc5cbfa3d35d2d167d997b650913cfaa4410837936faf15b9acd065b22",
    "Knowledge/Frameworks/discovery/opportunity-solution-tree.md": "357b97b9e1b6ab0d1ee6a3a8ee685e0f17c9eac44c7c1beed0669812c53ab094",
    "Knowledge/Frameworks/discovery/outcome-driven-innovation.md": "e93b80f1fd475ccb0d9a3fd0a59e07462c13e823fd08429ca57dcbd21e21b5d0",
    "Knowledge/Frameworks/discovery/pretotyping.md": "aa3948bbf660dd983925e430236b68ccd3d700c0640119fc363704d4cbe709a3",
    "Knowledge/Frameworks/discovery/product-field.md": "e14cfd6a78c3c3a043458ce6ac0bd236363f0ccd9bc66941e6d945cd27b5e6e2",
    "Knowledge/Frameworks/discovery/product-kata.md": "3ffe942ce9a6049679eeb92b1799093f7290dedd70a89456115c2dd92d84ddc7",
    "Knowledge/Frameworks/discovery/product-opportunity-evaluation-matrix-poem.md": "46246e2367039f98d9f60d7d8ada843ebaefca80cfcc91aecaa4ac00f299063c",
    "Knowledge/Frameworks/discovery/radical-product-canvas.md": "21f20503072d9fb6e3b150ae82f73e22143c62bc753268e8e65e3b3c8b32d991",
    "Knowledge/Frameworks/discovery/reframing-canvas.md": "a84cf4dcd41cdde847fc2395efe485e4f3dcaa7b67742d0426a96293b93fd5fa",
    "Knowledge/Frameworks/discovery/reframing-checklist.md": "3003ea5a63c337fa93fa62a0df89120f7ab7c466a1367d5a9f1383ee538bdbf0",
    "Knowledge/Frameworks/discovery/sales-force-feedback.md": "5a283882b1999b3048802d6cce98c9ad7d06b450056b25e294d5a7608b324192",
    "Knowledge/Frameworks/discovery/simple-landing-page.md": "3dbf18e4f9c24d2b8ed71453234e94596766108417942c9b7e7a8c66d9d70470",
    "Knowledge/Frameworks/discovery/single-feature-mvp.md": "84e64e86b4bd065bfb117d6fc42f511b4d497324f383f76afcbc940eed7e9b9d",
    "Knowledge/Frameworks/discovery/social-media-campaign.md": "bce23ffa28753d6fa2d7d91147e039744db6d0b35349bafff0cf4b0997a3bbce",
    "Knowledge/Frameworks/discovery/speed-boat.md": "7d710b102980390a5c6d6c728eaaf19976aa3ec37174f5ddee8abd590a2fd000",
    "Knowledge/Frameworks/discovery/storyboard.md": "89f0a98f978e568b490068b12e73985be6ce8f3f7d1fef3dfd02d02788730531",
    "Knowledge/Frameworks/discovery/strategy-kernel.md": "e9ad61b6175c798e1cea75c2d0bda3577353d72bea2bbec743f40d81e51eda83",
    "Knowledge/Frameworks/discovery/survey.md": "25b6bac3556654f095322f01cef60aedd090a85beb7e0c823de3fd8089a8b954",
    "Knowledge/Frameworks/discovery/testing-product-ideas.md": "2d8cb0e00dbdaa36c58c6c5e352aa7c655c580ed33c56289060f1771535f5c52",
    "Knowledge/Frameworks/discovery/the-jtbd-market-definition-canvas.md": "0675acbe9a175d1185c2aed0c0c93a835b99ad923013ac86a4cfdf756cc78cae",
    "Knowledge/Frameworks/discovery/the-product-gtm-canvas.md": "b80f32ef58221feeb42f6b36068bf349bc0f33eac165061ccd05c6dcb7a6202e",
    "Knowledge/Frameworks/discovery/thoughtful-execution-framework-by-spotify-via-teresa-torres.md": "58c891f77132a2b037fe72049ad23e52e75e11c3e9215c59379aeeb584e3ded7",
    "Knowledge/Frameworks/discovery/tree-testing.md": "ff6b396b4557d0ea1e921f5b3894d998e0b445ee43d5be1e47d77865ed8cfd82",
    "Knowledge/Frameworks/discovery/triberank-prioritisation.md": "680081f5cf4ba92466e35158df1ae7e3c1e051225aea22b17ad64dfd71d73334",
    "Knowledge/Frameworks/discovery/typeform-product-playbook.md": "d8d2b13aa7e445840cae627c874e4a6b56adc150880a3b66342125f57d8a23c2",
    "Knowledge/Frameworks/discovery/unusual-ventures-field-guide.md": "ddbdfb86bb0d6f09c6f6407b16c22a8ee2fae5c91a71fbeb89454107c2412aa2",
    "Knowledge/Frameworks/discovery/user-clock-sketching.md": "9343a477420c51ada54da7240bb6c8e66042d37cb7ca9c4ad47b24f301ec1c35",
    "Knowledge/Frameworks/discovery/user-story-mapping.md": "bee6edc5642d07d6912decd00ba71c928087a5f8d8a849dc626163e42b7a39ba",
    "Knowledge/Frameworks/discovery/value-proposition-canvas.md": "78ae314793c4209a7118304c39c927d714635ffcef1a26fa052998447b55938f",
    "Knowledge/Frameworks/discovery/wardley-mapping.md": "74982f262ec03c2bf537ef95219402e939b7872ea915466332493b9e7b749420",
    "Knowledge/Frameworks/grow/data-hierarchy-map.md": "39bc19ddbefd6c3ab9aa468db005436b9d80192478071230713a5f13ad33aec5",
    "Knowledge/Frameworks/grow/four-fits-framework.md": "40468ff799cf544a6caefe391ce6953a743cf592f2235410c09ef8d14a98ce0a",
    "Knowledge/Frameworks/grow/glee.md": "2f94862db5897adad08e6c6f199a107bc7a1704f12e44a004ef938695700baa7",
    "Knowledge/Frameworks/grow/gtm-prototyping.md": "358a1be31ce7b187458548939ff689837d75f7b296ecaf405fc4372cb6b8ce1d",
    "Knowledge/Frameworks/grow/hooked-model.md": "9cf2769d52dfeb83c6c63bfb84d6c00a6bca1e8e254aaae919aebf83a4060410",
    "Knowledge/Frameworks/grow/north-star-metric.md": "c0d207825fcc7c4de5d69b4b5a7913a867244a5c7ddfb9108d918a94470cd747",
    "Knowledge/Frameworks/grow/produx-labs-strategies-for-growth.md": "4c8009e9e9ce0b6fb7bcb311f45e91ca59839c6e80b954a7eb71c03ec62ad1f0",
    "Knowledge/Frameworks/grow/strategy-metric-tactic-framework.md": "ea9952d9f6cf77692ea05524ab13bc8b87163fb311299fae6ce8ae6d694384df",
    "Knowledge/Frameworks/validation/a-b-test.md": "8230a3a854f08153cec4e526950d6567f6b5be9884e15d5b029e8528bb3706c5",
    "Knowledge/Frameworks/validation/a-day-in-the-life.md": "51bb2f09f1a649acfe0e4928c79f2411a48309160e85687bee2c36b0fe2cc371",
    "Knowledge/Frameworks/validation/bayesian-analysis-of-market-experiments.md": "738371d939bc398a2d0e8eb527eae0fa8a92a45888f14bc1ca63c552a757a56d",
    "Knowledge/Frameworks/validation/card-sorting.md": "5849785193f42348683530520b60c3e1d76a8bef580a07915128cac03f2f5207",
    "Knowledge/Frameworks/validation/cd3.md": "beac4793b1fe3a36b2553b21777ac7a5e65b9375fac6ddce5262f9fab0266e1a",
    "Knowledge/Frameworks/validation/clickable-prototype.md": "8e923da54cf7616b92fc778bfec27772c53b2de99e38aa868f301ac264a96c67",
    "Knowledge/Frameworks/validation/cold-calling.md": "f2d116202af5945032048d1251e2ca23e195b18907dcb84d57ec7a4622f51e8e",
    "Knowledge/Frameworks/validation/comprehension-test.md": "c672f0bc9f94d48b74607ac3dabd83252df6c6ff66944a4ffe2b5a02bc11696d",
    "Knowledge/Frameworks/validation/concierge.md": "390dfe9073f2da8edcc5e65a28290119b98d8549ba6dabeaffeaf6eeef4cf3c3",
    "Knowledge/Frameworks/validation/crowdfunding.md": "8220cd7eed0b0bae027b7d7f584439246f1bb095ed6739b82182719c8a80e2b9",
    "Knowledge/Frameworks/validation/experience-based-roadmap.md": "d20a0e28a91de3293843d6604f6b8c24352eb02c81599f2c2986795ebaae9659",
    "Knowledge/Frameworks/validation/explainer-video.md": "b0366f7e2f9a22e9ef8cf52c2b9cdff176b8ab576ddddb7fe807f80ba32d855c",
    "Knowledge/Frameworks/validation/first-click-test.md": "0a6d52ea171e35c2f784e345fe7c4c37b4b29aff308854d3de099581f725c6ea",
    "Knowledge/Frameworks/validation/five-second-test.md": "72218869173e5480ffc14425a9644d498d8f2b52c58e9564a811753f92684e8f",
    "Knowledge/Frameworks/validation/gabor-granger-survey.md": "aefd6cfb66bf4120e18e58907f4d203758dd14548386f7d7f5a73b47487b469e",
    "Knowledge/Frameworks/validation/game-thinking.md": "10ae6f0bcc5566885adcb843e4af7faee84eed6128099490d1976c531ed3df91",
    "Knowledge/Frameworks/validation/gist-planning.md": "577a86a0380019cac3eb7ccbf1c1e2e1e70c3d696b86e52f68dd3f20e213262f",
    "Knowledge/Frameworks/validation/impersonator.md": "a604616c4bab7377fba48518f802b873529fe44f1aa70dd427e17aca263c2585",
    "Knowledge/Frameworks/validation/kano-model.md": "40480f86286efaf1f7aee9a5f40f17eb155dd0939e0a6d19a6bae870a37f6737",
    "Knowledge/Frameworks/validation/letter-of-intent.md": "e51f8a1deb1e2be6b762a438807f6b1b7f4b92cae406d170ff8ec7b62a0117c2",
    "Knowledge/Frameworks/validation/mash-up.md": "268b25ac0883e73f1634c44713898fcfa7cee1ab7d199c8d61f1b9cde92a992b",
    "Knowledge/Frameworks/validation/micro-surveys.md": "3eb61648fa1ce55779c6f774174920f6f7033bdf8a2206db88fbefd0bf87686e",
    "Knowledge/Frameworks/validation/paper-prototype.md": "7faeea6124a29ad9cb924c452a612ad9ba6f6263282adfbd25b43c11f04171d5",
    "Knowledge/Frameworks/validation/presale.md": "c35103ff58da5224859dd60dcdb67227186fda01f65f1d7afa32007420de8bcd",
    "Knowledge/Frameworks/validation/product-market-fit-survey-sean-ellis-test.md": "7d8fcb82bcf1496e96802d25889b8d0181fefa5c3ab8ff45926fee36abe93879",
    "Knowledge/Frameworks/validation/product-strategy-canvas.md": "c06a42cc5ef3e9784c35c54b76bbb36c8b83af06e5f878b96ed62e78150b1508",
    "Knowledge/Frameworks/validation/product-vision-board.md": "ec8ce29d6124c69251319be3b8ebe844f0852c5e09eb4aa8b7b34cc838569a73",
    "Knowledge/Frameworks/validation/sell-the-future.md": "df733496662a07ae0f823d193d76d013f472cc52957054992d54bbd74b2aa97d",
    "Knowledge/Frameworks/validation/takeaway-test.md": "74284a5036a8c6e662178c249b6b7a957252a5c5ada9423ed1301e856639c769",
    "Knowledge/Frameworks/validation/usability-test.md": "134b9fde0192db30a0966718eed4ffb009035f139f66f53d446105862723bc7b",
    "Knowledge/Frameworks/validation/van-westendorp-price-sensitivity-meter.md": "198fc90a4225c20d5bcda33a73002856a7e5d81388996d139680c97581a11494",
    "Knowledge/Frameworks/validation/wizard-of-oz.md": "1cfcae5313f60dbe77b0d90008e143ef1272f68c0314c4a6cc227e9f265ab8ab",
    "Knowledge/Frameworks/validation/working-backwards.md": "a6c07644fe2fe1ccdc1db0aadb8e8bc0c323e5a9c1b17f854e78e18ed34602c1",
    "Knowledge/INDEX.md": "51bf096791e949641ccb38fc261c995ee53407d39a2cd742a111df89178159ef",
    "Knowledge/Interview-Questions/README.md": "e3605238faceb63db4e2e5145a918a33f9d6215162438452380f404e20800ca7",
    "Knowledge/Interview-Questions/competitive-landscape/Are there other products services you've considere.md": "03d0dd87cf791a584ff1c96eed1cf4d042c0da378795ac638ee91dc46b26bf09",
    "Knowledge/Interview-Questions/competitive-landscape/Are you aware of any new products services enterin.md": "65a822341af6adcb036b610727fe1ef40f21c398046f2c538e3ba6b822bd0dac",
    "Knowledge/Interview-Questions/competitive-landscape/How do you keep informed about new products servic.md": "91ed9f7b03d6e65a8c68b853ebc4b3568d106e217dadbcac4d7d21220017a9b2",
    "Knowledge/Interview-Questions/competitive-landscape/How does our product service compare to others you.md": "cd74bba9bf19d748dc13a43d73527cd60060a91745d720f1b09ac7060f052361",
    "Knowledge/Interview-Questions/competitive-landscape/How would you rate the overall performance of thes.md": "4259543afec7f00ec1ca19cc16c3323cb815fe5b86484b00102aefda4288eee9",
    "Knowledge/Interview-Questions/competitive-landscape/What could convince you to switch from your curren.md": "75c8321c7eb8dc840391306472e86f4ee37e2a481816c02bf93134b5ec97d312",
    "Knowledge/Interview-Questions/competitive-landscape/What do these competing products services do bette.md": "00bd2e888b6e8f9b2884d26872b658b404bd00d250fbbb6f42f8d227b0bed7fb",
    "Knowledge/Interview-Questions/competitive-landscape/What do these competing products services do worse.md": "b050ed85167d1109af6d43845d58e5ea1109fc69f12679776591f3fa936cc367",
    "Knowledge/Interview-Questions/competitive-landscape/What features stand out to you in these competing.md": "1c5d808b434219669a8c990c29310b1c9bd0e96c847b0d92cb4b494908673bf2",
    "Knowledge/Interview-Questions/competitive-landscape/Why did you choose your current product service ov.md": "aaeca00984a06d41e60d6d35b0c7e5744dc68198c16d12d21f48fecf1eb8e5da",
    "Knowledge/Interview-Questions/customer-needs-and-goals/Are there aspects of your lifestyle or work that y.md": "ad691af0aeda8de9887c312b1b92815762d99e7d6d7bffa234face56ebe0fb81",
    "Knowledge/Interview-Questions/customer-needs-and-goals/Are there tasks or activities you procrastinate on.md": "033d3631767928706179c8c3d1c8144eeb8e5f579157417cc0cddcad2fb3e953",
    "Knowledge/Interview-Questions/customer-needs-and-goals/Can you describe a recent situation where you face.md": "16c46f7ba9f09cbc72e17c676d3eabb4245fb259571c72c0d92fdd4878ddb0d6",
    "Knowledge/Interview-Questions/customer-needs-and-goals/Can you think of a situation where your needs were.md": "de3333f579176976f98a9b83832822bd493397d37cc3738a7f06300de0f19ff7",
    "Knowledge/Interview-Questions/customer-needs-and-goals/How are you currently dealing with these problems.md": "a5ce87fa0e27df856fbf8f9ef81d4dd48f2e9537cc9999efda7e01e19fe7ed79",
    "Knowledge/Interview-Questions/customer-needs-and-goals/How have your needs or goals changed over time.md": "33b975f3a0397197e8a47a61f35fca10b987693531a387b077ee892e53c75ed8",
    "Knowledge/Interview-Questions/customer-needs-and-goals/How important is solving this problem to you.md": "bbd2d3c01d6f169adb4f9c0bb00ec06bffaca30ad4f5565e23a27645f16cf13b",
    "Knowledge/Interview-Questions/customer-needs-and-goals/How often do these problems occur.md": "7070be1d1494b5afdde72768eab62364724cecc2d237a165e09950d62fab3ff5",
    "Knowledge/Interview-Questions/customer-needs-and-goals/If you could wave a magic wand, what would you wis.md": "34dd21c484c76c07aa8686c37d0bb4fc158f72896f2d45647decc2f88340509b",
    "Knowledge/Interview-Questions/customer-needs-and-goals/Is there anything you find unnecessarily complicat.md": "c4774c545247b6f0955e53e846af94d87eb5200fc68ac5b28036226270a4e1a8",
    "Knowledge/Interview-Questions/customer-needs-and-goals/What are some of your aspirations or ambitions for.md": "c5af5ac848b3b10b9f1fa260e9ad34d2eeb5092ee47a63876face8e67af80042",
    "Knowledge/Interview-Questions/customer-needs-and-goals/What could change in your life if these problems w.md": "4f0412aecc610c2c9ba509964c18f84d0a799d7fea511b87eb9f4396a3728a6c",
    "Knowledge/Interview-Questions/customer-needs-and-goals/What goals are you trying to achieve.md": "4abc9f88883e8ac683c071f327f1216727f1daeda3d5f61d3bf20f78c8d3dbc4",
    "Knowledge/Interview-Questions/customer-needs-and-goals/What is one thing you wish you had more time for.md": "19c4a4341a34c5caeb4fcca47bfe4647f2bb011826bc86e0d58a608cf30cdbdd",
    "Knowledge/Interview-Questions/customer-needs-and-goals/What is the impact of these problems on your work.md": "4ced3353c6dc6b99fa8e92c2a7b9f6e07c7f12ec13319c15733ec5a0b93166fb",
    "Knowledge/Interview-Questions/customer-needs-and-goals/What part of your work life do you wish was easier.md": "369cd3c3467e866904676902b556b155c62ab0c22fbc55263516f31b0e961fd0",
    "Knowledge/Interview-Questions/customer-needs-and-goals/What problems are you facing that hinder these goa.md": "556dce42bb1e0983031d49891903dc0f6a55c56e17f691f48ccd576ffae5ec15",
    "Knowledge/Interview-Questions/customer-needs-and-goals/What software, tools, or products do you wish exis.md": "acb22f9278189a13b344e5e59ceee3ff96cd172919a397c1b7ae26bb571db2b4",
    "Knowledge/Interview-Questions/customer-needs-and-goals/What solutions have you tried in the past.md": "0b9485a16b30a2a594dfcfda927015fca91460531caf7469e6bba3b69b7cba36",
    "Knowledge/Interview-Questions/customer-needs-and-goals/Why were these solutions unsatisfactory.md": "006b45c95a87a93fc1e4abc23b31a339106aee025c5776acc3395503636c77db",
    "Knowledge/Interview-Questions/customer-profile/Can you describe your role and responsibilities.md": "94e76b01ca3ebe46104c49016e56426127ec05a2fd5b31fb1f8793aed8d471ab",
    "Knowledge/Interview-Questions/customer-profile/Can you share some personal values or principles t.md": "1de987054c1bf47961b26bca0a08ebd1b2fa0da8df5f5f1f8d8086662312f176",
    "Knowledge/Interview-Questions/customer-profile/Can you tell me about a product or service that ha.md": "c5dc8c39eebe7010e3c9ff22572915084a44d25526a9bfbcd91b6c8be0dc44bd",
    "Knowledge/Interview-Questions/customer-profile/How do you define success in your position.md": "7fa5c35a019d134dd9593a818775c14da56ba1d395b1161fc80f9fbf75ceae08",
    "Knowledge/Interview-Questions/customer-profile/How do you measure your personal growth or success.md": "67e155aa7c5225214d784053095be76b00b568637a97f020c38fe04973a21f99",
    "Knowledge/Interview-Questions/customer-profile/How do you prefer to learn about new products or s.md": "b780a3b4b5d1d4db1edda8edb01d39b70cc20973059b2357e8c2de3f757de768",
    "Knowledge/Interview-Questions/customer-profile/How does a typical day look for you.md": "e37416d46b180cee8302ba9043752341fb5cdf63120e95596dc97942a8e2e51c",
    "Knowledge/Interview-Questions/customer-profile/How familiar are you with [your product service ar.md": "53bd3e4466e365f5e18b1ea263702dd7466c0d670eb4c0fd8acc65bb7b9d235b",
    "Knowledge/Interview-Questions/customer-profile/How long have you been in your current role.md": "64c7581f61c2fd82d5b0147bdb0acb7f84d926d744adc1c7199b278d76bc0e43",
    "Knowledge/Interview-Questions/customer-profile/How tech-savvy would you consider yourself.md": "775486c68c30791224b94c8fa8fce3558084fac03bc5415d6f67c376ab692812",
    "Knowledge/Interview-Questions/customer-profile/How would you describe your risk appetite when it.md": "adf0a5c8040dbc7b00c06edec854812ee4ffe85499fe0369d613b545373f9f4f",
    "Knowledge/Interview-Questions/customer-profile/What blogs, magazines, or news sources do you freq.md": "19ee2b5b8a82c63a329e8e35d36634fd667df0ddc5cef6d10394a6e0a3cf9dc7",
    "Knowledge/Interview-Questions/customer-profile/What hobbies or interests do you have outside of w.md": "903912785ffaab4a3908246b3f287d01da8c80e4d26d8c8896d5af9cd5bf5418",
    "Knowledge/Interview-Questions/customer-profile/What industry trends concern you the most.md": "b15fdae117ac9aba95fff8f0cae50817f2c3006fef24b17ddc756287d25f1db9",
    "Knowledge/Interview-Questions/customer-profile/What skills or tools do you use most in your job.md": "5264f20c4dd62da875d093425e378be241ca52db10be6ff857640444777635ce",
    "Knowledge/Interview-Questions/customer-profile/What social media platforms do you use regularly.md": "44844865cd7265df88a5c743cea4666b39667af06234ccffa113727e96b40e87",
    "Knowledge/Interview-Questions/customer-profile/What's the best way for companies to reach out to.md": "f36fd3f391928f885d01056f768d0bf0765b06c9238314fa358b4d59f27d5405",
    "Knowledge/Interview-Questions/customer-profile/What's the biggest challenge you face in your role.md": "d23659c7d778ffd51b10f67967c71c11e4ff84fbfec09b8179d8318fcf7674dc",
    "Knowledge/Interview-Questions/customer-profile/What's your educational background.md": "a7756568843edbf638c14fe6fbd20739148e4fa1b7322f092ae8282f6f20a52d",
    "Knowledge/Interview-Questions/customer-profile/What's your preferred method of communication.md": "2300a86823999439d88b26032e09ac7deb045b14c7867dd61ea116311ec68f7b",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/Do you prefer one-time purchases, subscriptions, o.md": "93d295bd56be336b1d1631ea52668408c92231ae0e0863778f48a8c7c392b625",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/Do you read reviews before purchasing a product se.md": "4a82d2302f5bb54b40efc1b46e1d700bc86e90a0901294174e53a98ac8d4eaab",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/Do you typically try out free trials before commit.md": "f9d99ec8a32665087827e0067c021fddf18c19f0ac8b10d61225fe5ba91d8ed7",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/Have you ever regretted purchasing a product servi.md": "314d25bd7008447b8c1b418fc59de077870a2b86d1118a6afe9ed2e4cabf456a",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/How did you find out about the product service you.md": "169a9b3d439db8697eba0b4b29f62687f439b7822e7411828d81fedb653ad80d",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/How do you usually research a product service befo.md": "cca083bec77855d7f1872a84c493563d057449974f7a83b579c2a0deb7406ac9",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/How long did it take from when you discovered the.md": "7bbbafc88378e268b7a2892cc6ea2fad374952987865fd2acb9565c384855f87",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/How much are you currently paying for this product.md": "82b4e0a58531914bae928b85ef66c5f5a98288d6863c01a8f7f26fc1b4cd5f7c",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/If you had unlimited resources, what product servi.md": "7f218756b3d845ae16edb5648cd9d9622dbb104736b7d46c27fa267aa4eff958",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/What factors did you consider when deciding to use.md": "21288f23a771d7a2ebe8dde1be4e9588ec559a5889b012ebb8fe68c2eb66e2cd",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/What factors would prevent you from trying a new p.md": "4b5c128847b97c57e9e4ecaac5259546e01d2af4788cb729114b42c008d06154",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/What is the most you have ever spent on a product.md": "e10fbdfd9e3f01a08676c5ca644cb24a68c022913d26a283bdb07db3077c9882",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/What is your budget for products services like thi.md": "2ce934d0b844f2af279f2f0cbeb8667915fa79ce4820cd4646756c842f9834c2",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/What motivated you to try it.md": "04ea349760f4893b6b5550f9f63d73a3654d27af1fedbbf0f1c20a55712df6ce",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/What value do you expect to get from the price you.md": "a44e19371fe6317d3efec98e80a47496dd48244ae590b952193cc317dd716128",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/What would make you switch to a new product servic.md": "48bd3673656b3b30eff0c1192e6b38f40dbe51b51c078b84992df6e20d14ff13",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/What would you need to see from a product service.md": "03554cef79ff03377c5953415c9b84fc44999faf6656eb471fd6bc0c9033ac70",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/What, if any, loyalty programs do you participate.md": "34b1805b001bdd3e2b0c70e03c34e069e95a2a36b79e2a199c0d34c2b06db954",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/Who is involved in the decision-making process.md": "afc7308744db627a655fc17e7c2ca0eb1d5ee49d7cfd23d88711989f36048ec2",
    "Knowledge/Interview-Questions/decision-making-and-purchase-process/Would you be willing to pay more for a better solu.md": "ddbe7107832efde96f2ff23c18adf00aa70ab110defc04202e1a238d2d8becf1",
    "Knowledge/Interview-Questions/ideation-and-feedback/Are there any features we proposed that you don't.md": "3afac68d806cce09c4d6e0bcfa15080ab014647b7bcf28b6b09523c86a256ea0",
    "Knowledge/Interview-Questions/ideation-and-feedback/How likely are you to recommend our proposed produ.md": "cce1f49afd284d169f65ff930d20ec5df3c2093602622054217ffbef34fcef1d",
    "Knowledge/Interview-Questions/ideation-and-feedback/How much would you be willing to pay for our propo.md": "d7d77bec483ca1b31e44599a82a0f60992557edcdc9095346ac5acd6cb94e1c7",
    "Knowledge/Interview-Questions/ideation-and-feedback/How would our proposed solution make your life eas.md": "84bdf5ebaaaab4b258b28b13ffea850aff52ae91bf2b341bf929ae266fe0f9e7",
    "Knowledge/Interview-Questions/ideation-and-feedback/How would you suggest we improve our proposed solu.md": "54f5d72ddb92e4f49e480fbb4f1f01ca51fa87aff78d68696bd69d0596f9634b",
    "Knowledge/Interview-Questions/ideation-and-feedback/If we could create a perfect product service for y.md": "b7cb81cac2e3d9edb80e0bd93acf159bcb0b30b53ac9705f6c759c10df1818ab",
    "Knowledge/Interview-Questions/ideation-and-feedback/If you could change one thing about our proposed s.md": "9f398ceaa12a816495f2a1c19d40991e3bc6e46cb4f071ede71bc4803645eb40",
    "Knowledge/Interview-Questions/ideation-and-feedback/Is there anything about our proposed solution that.md": "aef1662dae8778ea2f7d763abeb425b3d57801e28d1f0e0e41b6d2f3dd917193",
    "Knowledge/Interview-Questions/ideation-and-feedback/What is your initial impression of our proposed pr.md": "d4a626a6fb3fd6f71230e0817fd144e6e4941c8a267fc7e244a87c32553a6d39",
    "Knowledge/Interview-Questions/ideation-and-feedback/Would you be willing to try a prototype of our pro.md": "d77ddccfda577b2a8d75f347cc73ba1ac32ca9a19e21156d8345da1a74f5be1e",
    "Knowledge/Interview-Questions/product-usage-and-experience/Are there any features of the product service you.md": "f70b6850f73b5dadcefeaa2c35e5efc98d20aa66ad608e1cb5efa3ae75039abb",
    "Knowledge/Interview-Questions/product-usage-and-experience/Are you currently using any product or service to.md": "58688b0ce51e7d9607c85a0e8318ca75ecc20a0711121583c27f403aa2c17595",
    "Knowledge/Interview-Questions/product-usage-and-experience/Can you share an instance where the product servic.md": "09c27410638f61fab924ad8f362cc2005eea39c9a744f79bbd04a9b4638cedfd",
    "Knowledge/Interview-Questions/product-usage-and-experience/Can you walk me through how you use this product o.md": "f8c08835c51ee3c5454d5bc038f04bc0b4b5e4ae9f2437a7e5a81e97fe6c180e",
    "Knowledge/Interview-Questions/product-usage-and-experience/Do you foresee yourself continuing to use this pro.md": "803ead32063ef60ac8b5b2f254e0c59b98277f5e42bba291dcef05c4562fb83b",
    "Knowledge/Interview-Questions/product-usage-and-experience/Have you encountered any issues or bugs when using.md": "1c4f48b34e16c7809264d30b8a1cd4eccc21f676e3ff8987c8e704367157b577",
    "Knowledge/Interview-Questions/product-usage-and-experience/Have you stopped using a product or service recent.md": "997a5fc681457bff8ef5063e162bba0a84ba024c643d9c796ca09abf95dc3f26",
    "Knowledge/Interview-Questions/product-usage-and-experience/How do you feel when you use this product or servi.md": "01756ba8a3c20056a7b49bfd63a425b43ddf4b2b53606880aef4eb14b483663e",
    "Knowledge/Interview-Questions/product-usage-and-experience/How does the product service fit into your daily r.md": "2d15e39cbfa9d6558287562ed2fee471644e691e1b4b1c6b7db137f93cd98d3f",
    "Knowledge/Interview-Questions/product-usage-and-experience/How intuitive do you find the product service to u.md": "2de9635e441b8d378806f0ec8d64c85d0993c43e0bf71466d24f700ea9af3695",
    "Knowledge/Interview-Questions/product-usage-and-experience/How often do you use this product or service.md": "d57bf77c9cea38b31c463e39c5a5e212fed88c74d46c309ba3bc11a45973d1cc",
    "Knowledge/Interview-Questions/product-usage-and-experience/How would you improve the product or service you'r.md": "824812849bf321ec4f46d3bd4e74948d9cccf7e2baf79df84b9f43c15436db0b",
    "Knowledge/Interview-Questions/product-usage-and-experience/If you could, would you go back to a time before u.md": "375413d05e2cc06626df5026fb1078d1c5bafcc55814a11c2dfa841732c24eba",
    "Knowledge/Interview-Questions/product-usage-and-experience/What do you dislike or what frustrates you about t.md": "77a5f3cf12cb00d5a455cf39bb096d142bb693ce839c4708b2926f72f554e4b2",
    "Knowledge/Interview-Questions/product-usage-and-experience/What do you like about this product service.md": "a74bfb9fa35200f526d2f5466bb2b5200e9f911d6a425f059e67960cbf2f4626",
    "Knowledge/Interview-Questions/product-usage-and-experience/What features do you wish the product or service h.md": "f3dca531366a7f3e8cb1d9268065bcb34ca544913e6835c70e3291476354a466",
    "Knowledge/Interview-Questions/product-usage-and-experience/What is one thing you wish you knew before startin.md": "a3a297684814f1b4cd789aa8c467e2f96dac77cd84f998b9d9ba74a0e27a8def",
    "Knowledge/Interview-Questions/product-usage-and-experience/What was your first impression of the product serv.md": "2b9d33cf4c454dfbfbaaf71e0a21542e94246353624b4ae06319bb8ce80420f2",
    "Knowledge/Interview-Questions/product-usage-and-experience/What, if anything, do you find unique or different.md": "9077e2e653d2d0628239fc5ca3426fd4d0d190f3f6a1c849bc07321cef20d7ba",
    "Knowledge/Metrics/README.md": "e03a1bf743d1891b419ab477329fd2c600a689c8f733d7ebdd4b980b4e995fc4",
    "Knowledge/Metrics/north-star-examples/airbnb.md": "cf0268bbbf14137159c1da832b90c0633bb01c012c0502ec29ab89a18cdc0787",
    "Knowledge/Metrics/north-star-examples/airtable.md": "fbcedbb3a3e39e50c2835e03099726cdc5d3769f33f57dabbb0bc3461c2deee3",
    "Knowledge/Metrics/north-star-examples/amplitude.md": "2223c80f9c3417523ada8c968140186a8fecc8c8c35e1550f84b495c11a1cd0c",
    "Knowledge/Metrics/north-star-examples/asana.md": "90128de7180dfe0229fbf8a1023601aa7e31a7c742ef5df6138d2f2df9ef0e95",
    "Knowledge/Metrics/north-star-examples/blue-apron.md": "89c9eab4f248ac576d3cddbce1cfa030a7cef93ebd5570834ba811ecae17f30a",
    "Knowledge/Metrics/north-star-examples/calm.md": "23c56acec5bcf8844e40d33c1b728670ab1ae358fccee02061ea6accf5c29fcd",
    "Knowledge/Metrics/north-star-examples/cameo.md": "09d8a9c55a2f0f2b4d5f9021cf7479740be0a2824ebceab7439f1b5f177524c4",
    "Knowledge/Metrics/north-star-examples/casper.md": "86f5b20f75f0bfa816b71648df3f34000adf4c3039b61faeb90ef887d16f0948",
    "Knowledge/Metrics/north-star-examples/coda.md": "e623a51f2d9ccfdd1f941b5cd5ce321199a1bb00b4ed3d2d9a00ba39d24c50f5",
    "Knowledge/Metrics/north-star-examples/coinbase.md": "ba8348b40ddd7fda34085b6124f23f3d09a409aec8300e3ddb478172a4c172b6",
    "Knowledge/Metrics/north-star-examples/dropbox.md": "c72c473b318251b8af4e1fa527e7dbab1de10f61150c34fda4958077ef8f5a8a",
    "Knowledge/Metrics/north-star-examples/duolingo.md": "ec82df025b318141fa2876e8957bb45004cd81e696079ec0c8a3beda7bccb1c0",
    "Knowledge/Metrics/north-star-examples/eventbrite.md": "b3167239d7389bd927456d21ff99305b42f1ffd0b5fb5bf04f4c3da6def44a65",
    "Knowledge/Metrics/north-star-examples/facebook.md": "10daf5b1e85733300f9424d66f741fb9830f58bc76099ccab3dac9fa1c4a779b",
    "Knowledge/Metrics/north-star-examples/figma.md": "799263331cad9608bdd70b8108a736d5bc6c6e329d27004d8fb1f60dc6aef76b",
    "Knowledge/Metrics/north-star-examples/github.md": "e971610b03e19132b1c1a011c6d3c5bde5a3da8414c9bec486c482e2b3c569e0",
    "Knowledge/Metrics/north-star-examples/hims.md": "6ebb70c48734786768a82fe8c911bf6a83c5829f2a1b5c9478c52f7551e62fd6",
    "Knowledge/Metrics/north-star-examples/hubspot.md": "81c45cedf6e0cfaa015ff67f7876e77623f190061d51892568878069d7bace97",
    "Knowledge/Metrics/north-star-examples/instagram.md": "4fc9db7c6c05d50b413a552031d84b7d1ab8615cbdca14333bb72eb03404dbb9",
    "Knowledge/Metrics/north-star-examples/jira.md": "289f809b4df7b619a2338e57c144ff34f397c7297780c35b8f5898be34531707",
    "Knowledge/Metrics/north-star-examples/loom.md": "b0f82b499c6251a8d7ea3dcce6fe339283aa6dd28b2daf6e83a179e801dbe727",
    "Knowledge/Metrics/north-star-examples/lyft.md": "327cb960778cbc52fef9d7dd6a0ffa7f52e3923f9ebe44f35aa8a0f1032464bf",
    "Knowledge/Metrics/north-star-examples/miro.md": "f6e9addc2a55e92ced095a341a584597bfe55822a119cb533f0b3cb96f3bbeaf",
    "Knowledge/Metrics/north-star-examples/netflix.md": "a8e04faa8fb8bc54a812dbbd519c5fd9de6f3bf182687727b9c548eabea7bee0",
    "Knowledge/Metrics/north-star-examples/notion.md": "cb6c6dc7fe18ace214599bbdf773cb59d640c444f38678bcf6d2e4a077ea7a3e",
    "Knowledge/Metrics/north-star-examples/patreon.md": "09029b6b1774a294f70a7b2c3bf6351acf407b58e3e88a7a30ab47c0cac4cd36",
    "Knowledge/Metrics/north-star-examples/pinterest.md": "bc6343baa8d9a3d34c5d2efde7c3b02936715bc99f224f0bc7f05b6df95d2553",
    "Knowledge/Metrics/north-star-examples/plaid.md": "d1d6c5c8f621903458cd581b75244a448871414155332de98e97658c26451d82",
    "Knowledge/Metrics/north-star-examples/robinhood.md": "138bedece276b38ca3f93b6f1416682c855dcdb86bfd50dab1cb7b6ef3464f71",
    "Knowledge/Metrics/north-star-examples/shopify.md": "e8ae2e51aa7a0bba57a835bebe0341818d9a7c841495a7b7512fae3048f0e3f3",
    "Knowledge/Metrics/north-star-examples/slack.md": "a0fc8be5792a214320e36f1f9471a37de238e54036c86eb8c6f6ce23d7c770f3",
    "Knowledge/Metrics/north-star-examples/snapchat.md": "de780f75beb01d1238e2f4258b43905546b796c760f40f75d5dcbc4ca8419193",
    "Knowledge/Metrics/north-star-examples/spotify.md": "a257a14f4a3910071e185a60e5bf575e0c04280e49ef924282d055544b818067",
    "Knowledge/Metrics/north-star-examples/strava.md": "c21d8240abe0fbfee3b669e03860e60d7424acba0393b17ccfaf05c4e0ec08d0",
    "Knowledge/Metrics/north-star-examples/substack.md": "eb6fbd5513494d6e6450cb34300dc4b5552c91cb8b3c655640f8c6372d982634",
    "Knowledge/Metrics/north-star-examples/superhuman.md": "3963fcf2f3fe7391e0699533de154510de1e40a66ddf5d42da360e5dd00939d6",
    "Knowledge/Metrics/north-star-examples/tinder.md": "e956465f19840e2c86e17fafca46faad38a873da5b4db756164411fcc65dc5eb",
    "Knowledge/Metrics/north-star-examples/twitch.md": "e2432d6862fdd5217d32a7c1f759ecdffd8e66aebf2d5bd685f47bc4ca2543ee",
    "Knowledge/Metrics/north-star-examples/twitter.md": "aff64c17c6bfa309bbf9e1c353170b338b512a66234a5d4bcf888fd0caf72c9a",
    "Knowledge/Metrics/north-star-examples/uber.md": "61cc1b128c45d521644b60f4f2079d758d87f2ca48e97ea149b91027344e3596",
    "Knowledge/Metrics/north-star-examples/webflow.md": "56d8af7a21b294452fad9d728dbcb131f93a52eebfd45d71240f2bffd4757a4a",
    "Knowledge/PM Tasks/Active Interviewing Researching Interviewers for a.md": "5e247faf975c0f62043a972cd53a055dd55ddab28890f0088e472b7010f7926d",
    "Knowledge/PM Tasks/Annual Review.md": "a2840b5c9044b507adccdbb3ed48378fb9f88683acbfbcd70f5bb0f8b8a2210b",
    "Knowledge/PM Tasks/Cornerstone Challenge Meeting.md": "3b8a218aad6bf89764d0533f8d10b90acc3850a680dba3e05c3a03e1bcfd32ea",
    "Knowledge/PM Tasks/Cross Training Product Sense.md": "6b2619ed8b7cf74e7c41cdb62f29ef87561bff34238f127129f7355dbcbf39a2",
    "Knowledge/PM Tasks/Cross-Dept Insight Exchange.md": "a9ee53fe3a054d7a329cc24b96164675b59a3e8c356bb294d1956cd4868adf4b",
    "Knowledge/PM Tasks/Decision Tree for Quitting.md": "45833e61656f697524574a6a1b232ca258c539fdb8f5c931e0d324d399198ba9",
    "Knowledge/PM Tasks/Facing a Tough Situation.md": "d50cd3db4d14833378f3d7c85240c0d0e9442b178cc89c748a4ed9403dce5d15",
    "Knowledge/PM Tasks/Goal Practice For Better Product Sense.md": "099056eb9af88410ce31cb51ef1cc82081157da29192821d5f4aa03998425b5f",
    "Knowledge/PM Tasks/Identify Key User Actions Without Analytics.md": "393de1ca6be0d9b5d0047af7098177c08beabd9faf452466b8cb013a1c648fc0",
    "Knowledge/PM Tasks/Improve Your Writing Clarity In Just 1 Prompt.md": "97ea1e4d6fe0c4807544b0c909ddebd16435c88238ccb8c3aaf9de95c32caec6",
    "Knowledge/PM Tasks/Inner vs Outer Scorecard.md": "35b173dc51d74df2e7507413f5ba6955009dff732c733f77028b4a83e213e187",
    "Knowledge/PM Tasks/PM Portfolio Drafting.md": "66f591964ca7a025f656afa8a677182f44354197c39a0b18aecc041ece515c27",
    "Knowledge/PM Tasks/Personal Growth Pulse Check.md": "e1afc358415323fa347a29775f298a945e0eb29210eace6fcc9eddce14055546",
    "Knowledge/PM Tasks/Product Teardown.md": "d50d9a5189ed90f20b20bd4a71e35d3ecc50d88a8c3f87a6c43210f7e2bba7c0",
    "Knowledge/PM Tasks/Product or Feature.md": "479b67f58a90e78fc778b941a8d469301cf960c4fe8010f8c7c6c707c17530d0",
    "Knowledge/PM Tasks/Progressive PRD System.md": "c76b0e9a1141f230074a854f24dc026ae030568881571d249d3d694652cea29f",
    "Knowledge/PM Tasks/README.md": "f4d6ac4359ed9e70289bc6511a2ee3becd8e62162e53323b33d10aedc6b9fee9",
    "Knowledge/PM Tasks/Rapid Impact Sizing.md": "b1670e40e6731f0248bdc66c49daf86045706f8ada80b6602078fb31b2f3bdfb",
    "Knowledge/PM Tasks/ReActS Reverse-Engineer from Actions to Strategy E.md": "ae77004ea5a80b39cc4c3b70a386b8855add85bb23389aba454f5ee3b61eb0f6",
    "Knowledge/PM Tasks/Reframe Wizard What's your problem.md": "131ac75e21123b065bf29eef70e6f42c53ebfceb7475a1c49a4ae16e5e1cf53b",
    "Knowledge/PM Tasks/Simple, Pragmatic Vision Crafting.md": "c367a8a4fa0e22955e81ac177e3207282847eb9652793a02e1955d7e1ad486c9",
    "Knowledge/PM Tasks/Speak Their Language.md": "c73b5ea63e3a115d6028de4a88c700780673585672d28345af29ca1a79936f01",
    "Knowledge/PM Tasks/Switch Between Tasks Meetings Better.md": "6f8f68339c1e5445b258c200158ce33a240af94609eae85caade39f898c67144",
    "Knowledge/PM Tasks/Value Validation Project Approach for Job Search.md": "575a41f359d4a48df1596ae78881d953e4f386727d87df2a308eda1b3f828b4c",
    "Knowledge/PM Tasks/What’s Your Skip Level.md": "5fc2f1e9541477867153babf04b961cde68cbf1fb0f49fbbd52d1258acb1d30b",
    "Knowledge/PM Tasks/Write Like an Amazonian.md": "528cc925bfc708f11dfa17e541c9441ca807e053e4dc7bf5400969b0380ee8bf",
    "Knowledge/Prioritization/4D Roadmap.md": "a6a265741a70725c5550491a1f720bb152f6005814e6f740ee6c161eab10ad18",
    "Knowledge/Prioritization/Barbell Strategy.md": "a940113f9c0f5e5c34fd2621e985d49be26016865eefa663634fd6321c887a5b",
    "Knowledge/Prioritization/Charcuterie Board.md": "f1a9b70472d402ead274e1b38534c04edb72d75d904302edf47ad5a550a0f124",
    "Knowledge/Prioritization/Competition As Obstacle To Extreme Success.md": "87c3be360e7ab4e7af5415b89602d00319a2c71cd6219e6afe49e944db939a36",
    "Knowledge/Prioritization/Exploit the Eigenquestion.md": "73a7f0c724927b12c6e2ab9b393c00e4d3b472081e14182ee93d2d7ab8cc38a6",
    "Knowledge/Prioritization/Flywheel.md": "f21e7cb17cfb1591b5bd31f11eda4d0d8b09b06103f9a6ccd7c646582791e028",
    "Knowledge/Prioritization/From Thinking To Feeling.md": "fb9f4912d627bd3d0ef498690dbd06bed0bd64de2e8fb6f31636c3fffa895a45",
    "Knowledge/Prioritization/Hierarchy of Engagement.md": "c8d0e604384ef2f202c9e3d6dfb1408cad652869641b50df2fc38ebd6f0c6ad2",
    "Knowledge/Prioritization/Naval's Lion Strategy.md": "5054b8f6c3400db48e4abac864da1e195eb6a5261f97fc2ca0f9194eec6a3f78",
    "Knowledge/Prioritization/Post PMF Strategy by Reforge.md": "b0eb55b5bdd9b2ec3cc4c56ae5de205a1f58d3163fe650e8d38b67cc4bf1324d",
    "Knowledge/Prioritization/Quick Wins First.md": "82142a65e83086122998525e1e4ec580f4c14ca559a033b281d2a48da6354dfa",
    "Knowledge/Prioritization/Steady the Ship.md": "55483915150ea9ab0a9eb9f12f5279679cb2a5abae3ab77ec1df27d7ac4c8a09",
    "Knowledge/Prioritization/TOWS.md": "80e87424b4086eb689f6d68d16c7ab4ef9d646d2139114f96c2325ab7feeee5c",
    "Knowledge/Prioritization/The Wardley Cycle.md": "b59a08e1f6af543f9e592bbf4f39aa4f9f3875be1e58760f25f82a24040e5555",
    "Knowledge/Prioritization/The Wedge.md": "a5534f4778a7a42b8011a11c9c9ef47ff070f3d33b6f14cf0ae0eb18360da6ee",
    "Knowledge/Prioritization/aarrr-metrics-prioritization.md": "1d007c3195770c8f28d82221374de7e3f71b865ae789172c9b71022eda7f5fc1",
    "Knowledge/Prioritization/bang-for-the-buck.md": "cd2a002dc0d1fc854c36b7ae7f299e500c610f2fea093e3d2d986efecc792924",
    "Knowledge/Prioritization/brice.md": "792f27ee9687dc04ab2a77fff9145c4754da6d88ca4a5e2eb41415be11ff2839",
    "Knowledge/Prioritization/buy-a-feature.md": "19a9017b15b22aaf7fc0e189b1e7774015868c97fd1ef7be79b170995f5cead2",
    "Knowledge/Prioritization/cd3.md": "b023bdf0cc691c28853d5aee34f4f043fd7285f58b0cc06cb778fb0768b24b73",
    "Knowledge/Prioritization/customer-problem-stack-rank.md": "8c76b56ccbf2862d2d292b93d6d9cc74b1f2684866a506049e1a52d1c942ea0d",
    "Knowledge/Prioritization/dhm-model.md": "9503662aeb827d8430bcf01359386e3573ca4d2a64d3368a6b6ff2c527f04e08",
    "Knowledge/Prioritization/feature-buckets.md": "ed313dd0edc433520e4be9c917c84d12db13b1b4835b5653c952c5afcefc11d7",
    "Knowledge/Prioritization/gist.md": "5c7e8b48fadafe69b00a5d1ca1e86c97a01b5dcaf8ec28980d7a8ed210f0833b",
    "Knowledge/Prioritization/ian-mcallister’s-framework.md": "477a70850bfe554e7d98d34beeadcf97bfd51850144151ef4a620274656e221e",
    "Knowledge/Prioritization/ice.md": "b6e24df9536b70413625159e093e0985ce8e37acac426768c53e78c5226a63c7",
    "Knowledge/Prioritization/interrelationship-diagram.md": "e83f9000cfcf461b8cb170bbbd02c069b2b52daf1404f606f9cb110f9567a9fa",
    "Knowledge/Prioritization/kano.md": "7abf397225fd0f784de992630a75a7b7c40aac8db4c7c59c57be192088283659",
    "Knowledge/Prioritization/kepner-tregoe-matrix.md": "d799888aadb7bb597d4d51f9582a4a9314d96a3f80b6fd4e98906307d9e580ff",
    "Knowledge/Prioritization/kj-method.md": "9ffbdd8f81e5dc49b82a82aa50e1da40cca8e4949d249e92d348bfe58b0d403c",
    "Knowledge/Prioritization/kpi-tree.md": "ddefbaf5ee011164e0d5de65a716b45afcea1faea9703518677a6cfe52418b31",
    "Knowledge/Prioritization/lean-product-playbook.md": "311b2f31880b1b862618ce78abf756e992bdfa419c4853a7c224e8324d09fff1",
    "Knowledge/Prioritization/must.md": "ce7e28b3d6e83e2dec6118745bd0f5b088006764284e7d08432451f502148e87",
    "Knowledge/Prioritization/north-star-metric-framework.md": "1e81940b9fcd2a3af1590af8e83fff146e416a556d4f2cd626f03dbc024a5dec",
    "Knowledge/Prioritization/opportunity-scoring.md": "a274817dc65385ec205a887528d290dfe140cd43ebbbf20475ec12cf807758b3",
    "Knowledge/Prioritization/opportunity-solution-tree.md": "51780855cd3d887372941a16467e9ffeab285ae5c951fa5906407e4b2394d8ef",
    "Knowledge/Prioritization/pivot-triggers.md": "932c5b7673eea9f5692a228f967381fa488b3d5191e783c84b10358e02557e04",
    "Knowledge/Prioritization/poem.md": "027071a211a57a512ad3b6095d0e06f7f1a157cd39c2f69b8266219eb926a6c6",
    "Knowledge/Prioritization/prune-the-product-tree.md": "2728d8cd3c750007af18add5de65641f2e83735095fae4d5f5e0b0e6d5d2f2f2",
    "Knowledge/Prioritization/quality-function-deployment.md": "e977eae018feb88d91567ba4072936c172c5168b129417067583a1420e18c4bd",
    "Knowledge/Prioritization/rice.md": "df78ee60b3676cb6a1f803c868f9eb411d2da5bba0f4fc4340b7229777b5221a",
    "Knowledge/Prioritization/scorecard.md": "c0d4175d52f10c546cca881cc773e15bcf5148a137f7506ed4f39acf821744f5",
    "Knowledge/Prioritization/speed-boat.md": "6a4c3f8af22d961ff2cc5f9d4f9db6b0aa671a5a6a83e31ec4a14caedc07014b",
    "Knowledge/Prioritization/story-mapping.md": "34f003dc445aa1f73946e45dd7141e4a9bd816d485b027b22bc63b5a43ea370b",
    "Knowledge/Prioritization/strategy-metric-tactic.md": "7939b5988144d9a01cf285c64e132cb0044fb3fce990d8cced29cce34b542a4f",
    "Knowledge/Prioritization/systemico-model.md": "2c00b91f6ae488cf24fab6f141413accd4a9b26fa345db31d8a3458ea2c6429e",
    "Knowledge/Prioritization/theme-screening.md": "1513af56318d9d4238f633b1ad54838a9c5c787832634c5f45c4f914a75a759a",
    "Knowledge/Prioritization/unusual-vc’s-4-important-lists.md": "257fa6d68098bfaf12a0b74df04622624230fc6dd5f91a2a9d7bbe62fc53c308",
    "Knowledge/Prioritization/value-vs-risk.md": "0a7c73d8b3b656891e9774833cd0f86d60c611000b62b768f746009fb3e2a4c7",
    "Knowledge/Prioritization/w-framework.md": "87d871d7b737ef85fd3923bfd00edfe0c3d2aede3e7cac21cbde8497a579d8aa",
    "Knowledge/Resources/Lenny-Newsletter/INDEX.md": "1389e45c245e3d1071842ab1818e4ab96fd952b04b52e4414680a4d57d6cf66b",
    "Knowledge/Resources/README.md": "06bb8484cb0cdcaecf6510806d5190aa39e63172813e458325662ed1368ac47d",
    "Knowledge/Resources/ai-tools/Be a good, not a bad product manager.md": "1c1e6c8bc9f4bf7903440f5ebc9869a9e97c5821ac6779a347bf4884d9a33053",
    "Knowledge/Resources/ai-tools/Best decision making GPT.md": "028691338bd29548316b40b63192271fcc67cee5e3c2b491e88592ebb86c821e",
    "Knowledge/Resources/ai-tools/Craft great surveys.md": "692f7c3508c46441c484dea2a5d142ddbb4d9a36fd21929fbcec617a7807d1fe",
    "Knowledge/Resources/ai-tools/Discover your strategy with Richard Rumelt.md": "e50695fce9f23fefddbc1ff3ea35ebf65ba8bdb3c858341e6e07cd0f0ea8e594",
    "Knowledge/Resources/ai-tools/Get better at complexity, autonomy, and throughput.md": "0560480f7663e9ee376802891ea8a0cd78eb538386cbf1c6472b94026700552b",
    "Knowledge/Resources/ai-tools/Make a plan on a page like John Cutler.md": "7505e398cc1f618d6da0eba85b29fe6058fd4647a874ca0074a4baed2f28b90a",
    "Knowledge/Resources/ai-tools/README.md": "1b9581b180dddb69472e079bf18250fe07bb25059221aa6ad8c1fbe1d6f3c405",
    "Knowledge/Resources/ai-tools/TAM SAM SOM calculator.md": "57aad1c6035d1972f1d2049cd6b6a3b9492f3c1f50296d94370a606714d955af",
    "Knowledge/Resources/ai-tools/Write PRDs.md": "eb0dccfa48e4988d4b0048f29a818944d69702c7b8e6c4e74237fe1b23ca7a15",
    "Knowledge/Resources/ai-tools/Write like an Amazonian.md": "88e782b4bbf94bc813af17f44c8c4a4682ed9a99db096a1f51a7370a437744e0",
    "README.md": "db67135f1630b2c73d8a732a4c2ffa295c90577ead81ea289da6bbc9d156184e",
    "Templates/README.md": "932c798935330513d2be1b0661e213c2f47f04c0d29653246bd266203171c13f",
    "Templates/amazon-prfaq.md": "33ec5336facdc8bff180c58dc2ef9369864e4c5c98f316974782082bd0b6048f",
    "Templates/feature-prd.md": "7790549bba9566ce46867aab1673cefacd1f4ad6082e225615607e3c27651340",
    "Templates/intercom-intermission.md": "8241531bbcdb0d20540d347e72e808ea911ff7d09f69149ea5a152f7a0c08403",
    "Templates/kevin-yien-prd.md": "b6b8975a378197eea6d784f00b0dcf42d08968e4bc9aa748b596a8ea780c8c1d",
    "Templates/lean-ux-canvas.md": "627f5ccd973bf2acbf33402a62c4edf688bf9ebcd7d5de7cd5ff83df63b027a6",
    "Templates/lenny-1-pager.md": "d3c59654f77908333b4cf3656090b34cfa492ae0c9fa739dffc8e6f227b10ced",
    "Templates/shape-up-pitch.md": "bfda233fb8a65eebc7919e4ec370b28bc1e3eeb1697d6c6e52b0bcf4fe6210ee",
    "VERSION": "59854984853104df5c353e2f681a15fc7924742f9a2e468c29af248dce45ce03",
    "Work/Drills/drill-log.md": "4d04f8fa489394acad30c3b798345eeb9663f451ae7decd13c69d5645c51fc06",
    "Workflows/assumption-mapping.md": "1a89a4ee7b1f213d3ef6d6cb3d869c0653cbb079c7c341d41273b236bc62422b",
    "Workflows/core-strategy-development.md": "8696479fe94b8df31f783ade53f9bb0d120846f16725ce3d89ce1979d814566c",
    "Workflows/make-great-decisions.md": "dc13ca8b4cdf760fa5f186e874e3a8d7fa5a1fa9462e3f38b43799eed66fbd89",
    "Workflows/meeting-mastery.md": "7c250300f24bb6054c2922646aa20e994911a197fd99b323922a6cd8d250e3e8",
    "Workflows/opportunity-mapping.md": "7ece7934e5000339d5924ed449ee531d35dbdff48886d30fb3c7de48dab7f012",
    "Workflows/research-to-feature.md": "bba223e6e6c55178be6b3e4f0528bbc3fa3198db9b07499f2013f1b133b83051",
    "docs/rules-brief.md": "f279344859973cd54944fe7b9831c31fa3f2bd27859a5a35b9eeaeb5f6e2a2bf",
    "external-skills/README.md": "240170a7206ff1fef74f4a49bb06275c7e04227972e0448020664621ab8532c8",
    "external-skills/registry.json": "381e68addc54fcf47c18b9f95b1133950273c2a0212af4d482fd66df7f619044",
    "external-skills/update.sh": "2fce02c0d75c93c64b2c0cea8a7a6ee6c921d7b46c173ba7263acec4fa6e04d6",
    "feedback-config.md": "5782547f991735fcaf6d72d43cb19ec334047bb8f268ab8a74563a7e9bc88b49",
    "plugins/core/commands/feedback.md": "860b4f3a4d2ddd2fec3d14633023d2d16a75005aae2b7a58c33a8be1c57a658f",
    "plugins/core/commands/framework.md": "523dc544527c875ffba41d5a575262b3cd9266124ed0085dc3402cd33c27ab1a",
    "plugins/core/commands/help.md": "0cf1075c02c1c97197325d0f40ba554eac9f5445533a2721085eebf84d211dd8",
    "plugins/core/commands/skill.md": "ab93f4a7526364d50ae74a7754aab1b626d4eefed00da315585f1d556409ff9b",
    "plugins/core/commands/start.md": "363b9e85984250c2c6e41c40ec0f98a202cf7849d473b90cf89d55a9412f17f3",
    "plugins/core/commands/status.md": "a0756047707bd17f40e683920e94958fcc3b1ec39d53b3cb5eee230e7a1fc95b",
    "plugins/core/commands/testimonial.md": "7978a79715a205cd8052ba6c3a5a21f78a52b8d08251ef088fdda01791f9237e",
    "plugins/pm-workflows/.claude-plugin/plugin.json": "312417818a209af8e22cd55228e0705798348defb0d2b5424b70e789c43857eb",
    "plugins/pm-workflows/.cursor-plugin/plugin.json": "9e6484d3058f6a852f33561f9e7460efc547f832303b88742ae8dda35df6fc19",
    "plugins/pm-workflows/CLAUDE.md": "a18c3d38c6a6a38a071453ca2d9faf7c39fb54d985145fd5c74e9bcf7ad432c2",
    "plugins/pm-workflows/agents/context-manager.md": "e48368972c0f44af3e90ecdc11a80930cc1d0f90e6bfb791c63e33ebb68a6e72",
    "plugins/pm-workflows/agents/knowledge-librarian.md": "556e3bdf02602303408ac9217e2cfae6496032b5c3b9abcbd88f2637b13c1064",
    "plugins/pm-workflows/agents/pm-workflows.md": "f73224842409d97c3b54e09b3254543b16f662231ee155999659a96597a31053",
    "plugins/pm-workflows/commands/workflows/assumption-mapping.md": "e00e0a8c95fee3f36495df04bc144fcc94f422dd6513c5ed0dad17476389e857",
    "plugins/pm-workflows/commands/workflows/core-strategy-development.md": "50b1edb15c3e245540b979dab7b81a8618f3d2a30355d24bb6e92339a1970eff",
    "plugins/pm-workflows/commands/workflows/make-great-decisions.md": "93b3f112d2646b46e7bde53a7679721e3806a8966dcf94ab0dbff5e2f910005d",
    "plugins/pm-workflows/commands/workflows/meeting-mastery.md": "c4a5da74ba79f4bd0b5cd5346c780915abf7dee8c5f359b83f9255bcd8c482c3",
    "plugins/pm-workflows/commands/workflows/opportunity-mapping.md": "98c724898f93c49d3576ae4e8aa8e8add3538d951bd9ee4cce2d9d26655281e1",
    "plugins/pm-workflows/commands/workflows/research-to-feature.md": "2d8e2a2ebc3f1124de3f9d0c73d556df1f514f040185f0d34d677d20bc979b2f",
    "plugins/pm-workflows/commands/workflows/stakeholder-copilot.md": "ca467bba7d016e6b396e4fb16be7aa07a1a7fe54153a400e23ec34e89431244f"
}
# --- END BASELINE MANIFEST ---

MERGE_REQUIRED_FILES = ["AGENTS.md", ".gitignore"]
MERGE_REQUIRED_DIRS = [".cursor/skills/"]
MERGE_REQUIRED_JSON = ["external-skills/registry.json"]

AGENTS_LEARNED_HEADER = "## Learned User Preferences"
AGENTS_WORKSPACE_HEADER = "## Learned Workspace Facts"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def hash_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def read_version(project: Path) -> str | None:
    vf = project / "VERSION"
    if vf.exists():
        return vf.read_text().strip()
    return None


def parse_version(v: str) -> tuple[int, int, int]:
    m = re.match(r"^(\d+)\.(\d+)\.(\d+)$", v)
    if not m:
        return (0, 0, 0)
    return int(m.group(1)), int(m.group(2)), int(m.group(3))


def compare_versions(a: str, b: str) -> int:
    va, vb = parse_version(a), parse_version(b)
    if va < vb:
        return -1
    if va > vb:
        return 1
    return 0


def is_under(path: str, dirs: list[str]) -> bool:
    for d in dirs:
        if path == d.rstrip("/") or path.startswith(d if d.endswith("/") else d + "/"):
            return True
    return False


def classify_file(rel_path: str) -> str:
    if is_under(rel_path, USER_OWNED_DIRS):
        return "user_owned"
    if rel_path in MERGE_REQUIRED_FILES:
        return "merge_required"
    if rel_path in MERGE_REQUIRED_JSON:
        return "merge_required"
    if is_under(rel_path, MERGE_REQUIRED_DIRS):
        return "merge_required"
    if is_under(rel_path, SYSTEM_OWNED_DIRS):
        return "system_owned"
    if rel_path in SYSTEM_OWNED_FILES:
        return "system_owned"
    return "unknown"


# ---------------------------------------------------------------------------
# Merge functions
# ---------------------------------------------------------------------------

def extract_learned_sections(agents_text: str) -> tuple[str, list[str], list[str]]:
    """Split AGENTS.md into (body_before_learned, user_pref_bullets, workspace_fact_bullets)."""
    pref_idx = agents_text.find(AGENTS_LEARNED_HEADER)
    if pref_idx == -1:
        return agents_text, [], []

    body = agents_text[:pref_idx].rstrip()

    after_headers = agents_text[pref_idx:]
    pref_bullets = []
    fact_bullets = []

    ws_idx = after_headers.find(AGENTS_WORKSPACE_HEADER)
    if ws_idx == -1:
        pref_section = after_headers[len(AGENTS_LEARNED_HEADER):]
        fact_section = ""
    else:
        pref_section = after_headers[len(AGENTS_LEARNED_HEADER):ws_idx]
        fact_section = after_headers[ws_idx + len(AGENTS_WORKSPACE_HEADER):]

    for line in pref_section.strip().splitlines():
        stripped = line.strip()
        if stripped.startswith("- ") and stripped != "---":
            pref_bullets.append(stripped)
        elif stripped == "---":
            continue

    for line in fact_section.strip().splitlines():
        stripped = line.strip()
        if stripped.startswith("- ") and stripped != "---":
            fact_bullets.append(stripped)

    return body, pref_bullets, fact_bullets


def splice_agents_md(new_agents: str, old_pref: list[str], old_facts: list[str]) -> str:
    """Take the new baseline AGENTS.md body and merge in user's learned bullets."""
    _, new_pref, new_facts = extract_learned_sections(new_agents)
    body, _, _ = extract_learned_sections(new_agents)

    merged_pref = list(new_pref)
    for b in old_pref:
        if b not in merged_pref:
            merged_pref.append(b)

    merged_facts = list(new_facts)
    for b in old_facts:
        if b not in merged_facts:
            merged_facts.append(b)

    sections = [body, "", "---", "", AGENTS_LEARNED_HEADER, ""]
    sections.extend(merged_pref)
    sections.extend(["", "---", "", AGENTS_WORKSPACE_HEADER, ""])
    sections.extend(merged_facts)
    sections.append("")

    return "\n".join(sections)


def merge_gitignore(old_text: str, new_text: str) -> str:
    old_lines = old_text.strip().splitlines()
    new_lines = new_text.strip().splitlines()
    seen = set()
    merged = []
    for line in new_lines:
        merged.append(line)
        seen.add(line)
    for line in old_lines:
        if line not in seen:
            merged.append(line)
            seen.add(line)
    return "\n".join(merged) + "\n"


def merge_registry(old_json: dict, new_json: dict) -> dict:
    new_ids = {s["id"] for s in new_json.get("sources", [])}
    merged = dict(new_json)
    merged_sources = list(new_json.get("sources", []))
    for source in old_json.get("sources", []):
        if source["id"] not in new_ids:
            merged_sources.append(source)
    merged["sources"] = merged_sources
    return merged


def find_user_skills(old_skills_dir: Path, baseline_skill_paths: set[str]) -> list[str]:
    """Return folder names of user-installed skills (not in the baseline)."""
    if not old_skills_dir.is_dir():
        return []
    user_skills = []
    for entry in sorted(old_skills_dir.iterdir()):
        if not entry.is_dir():
            continue
        skill_manifest_key = f".cursor/skills/{entry.name}/SKILL.md"
        if skill_manifest_key not in baseline_skill_paths:
            user_skills.append(entry.name)
    return user_skills


def find_modified_baseline_files(old_root: Path, old_manifest: dict[str, str]) -> list[str]:
    """Find Zone B files the user modified (hash differs from old manifest)."""
    modified = []
    for rel_path, expected_hash in old_manifest.items():
        zone = classify_file(rel_path)
        if zone != "system_owned":
            continue
        old_file = old_root / rel_path
        if old_file.exists():
            actual = hash_file(old_file)
            if actual != expected_hash:
                modified.append(rel_path)
    return modified


def find_user_created_entries(old_root: Path, baseline_paths: set[str]) -> list[str]:
    """Find top-level files/folders in old project not present in the baseline."""
    user_entries = []
    known_dirs = set()
    for p in baseline_paths:
        top = p.split("/")[0]
        known_dirs.add(top)
    for special in [".cursor", ".claude-plugin", ".cursor-plugin", ".git", ".obsidian",
                    ".DS_Store", "_internal", "migrate.py", "VERSION"]:
        known_dirs.add(special)

    for entry in sorted(old_root.iterdir()):
        name = entry.name
        if name in known_dirs:
            continue
        if name.startswith("."):
            continue
        user_entries.append(name)
    return user_entries


# ---------------------------------------------------------------------------
# Read manifest from an old migrate.py
# ---------------------------------------------------------------------------

def read_old_manifest(old_root: Path) -> tuple[dict[str, str] | None, str | None]:
    """Attempt to read BASELINE_MANIFEST and BASELINE_VERSION from old migrate.py."""
    old_migrate = old_root / "migrate.py"
    if not old_migrate.exists():
        return None, None

    content = old_migrate.read_text()
    manifest_match = re.search(r"^BASELINE_MANIFEST\s*=\s*(\{.*?\})\s*$", content, re.DOTALL | re.MULTILINE)
    version_match = re.search(r'^BASELINE_VERSION\s*=\s*"([^"]+)"', content, re.MULTILINE)

    if not manifest_match:
        return None, None

    try:
        manifest = json.loads(manifest_match.group(1))
    except json.JSONDecodeError:
        return None, None

    version = version_match.group(1) if version_match else None
    return manifest, version


# ---------------------------------------------------------------------------
# Migration engine
# ---------------------------------------------------------------------------

class MigrationReport:
    def __init__(self):
        self.mode = "normal"
        self.old_version = None
        self.new_version = None
        self.context_files: list[str] = []
        self.work_files: list[str] = []
        self.hook_state_files: list[str] = []
        self.user_skills: list[str] = []
        self.agents_prefs_carried: list[str] = []
        self.agents_facts_carried: list[str] = []
        self.registry_sources_added: list[str] = []
        self.gitignore_lines_added: list[str] = []
        self.user_created_entries: list[str] = []
        self.modified_baseline_files: list[str] = []
        self.new_baseline_zone_a_files: list[str] = []
        self.warnings: list[str] = []
        self.errors: list[str] = []

    def print_summary(self):
        print("\n" + "=" * 60)
        if self.mode == "legacy":
            print("MIGRATION SUMMARY (legacy mode — no conflict detection)")
        else:
            print(f"MIGRATION SUMMARY ({self.old_version} -> {self.new_version})")
        print("=" * 60)

        def section(title, items):
            if items:
                print(f"\n{title} ({len(items)}):")
                for item in items:
                    print(f"  {item}")

        section("Context files copied", self.context_files)
        section("Work files copied", self.work_files)
        section("Hook state files copied", self.hook_state_files)
        section("User-installed skills migrated", self.user_skills)
        section("AGENTS.md preferences carried over", self.agents_prefs_carried)
        section("AGENTS.md workspace facts carried over", self.agents_facts_carried)
        section("External skill sources added", self.registry_sources_added)
        section("Gitignore entries added", self.gitignore_lines_added)
        section("User-created files/folders copied", self.user_created_entries)
        section("New baseline files added to your folders", self.new_baseline_zone_a_files)

        if self.modified_baseline_files:
            print(f"\n⚠ Modified baseline files detected ({len(self.modified_baseline_files)}):")
            print("  These files were part of the original baseline but you modified them.")
            print("  The new version's files are used. Review if you want to re-apply changes:")
            for f in self.modified_baseline_files:
                print(f"    {f}")

        if self.warnings:
            print(f"\nWarnings ({len(self.warnings)}):")
            for w in self.warnings:
                print(f"  {w}")

        if self.errors:
            print(f"\nErrors ({len(self.errors)}):")
            for e in self.errors:
                print(f"  {e}")

        total = (len(self.context_files) + len(self.work_files) +
                 len(self.hook_state_files) + len(self.user_skills))
        print(f"\nTotal items migrated: {total}")
        print("=" * 60)


def _walk_no_symlinks(root: Path):
    """Walk a directory tree, skipping symlinks to avoid circular references."""
    for item in sorted(root.iterdir()):
        if item.is_symlink():
            continue
        if item.is_file():
            yield item
        elif item.is_dir():
            yield from _walk_no_symlinks(item)


def copy_tree(src: Path, dst: Path, report_list: list[str], verbose: bool, dry_run: bool):
    """Recursively copy src directory contents into dst, skipping symlinks."""
    if not src.is_dir():
        return
    for item in _walk_no_symlinks(src):
        if item.name == ".DS_Store":
            continue
        rel = item.relative_to(src)
        dest_file = dst / rel
        report_list.append(str(rel))
        if verbose:
            print(f"  COPY {rel}")
        if not dry_run:
            dest_file.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(item, dest_file)


def copy_file(src: Path, dst: Path, verbose: bool, dry_run: bool):
    if verbose:
        print(f"  COPY {src.name}")
    if not dry_run:
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)


def run_migration(old_root: Path, new_root: Path, dry_run: bool, verbose: bool) -> MigrationReport:
    report = MigrationReport()
    new_version = read_version(new_root) or BASELINE_VERSION
    report.new_version = new_version

    old_version = read_version(old_root)
    old_manifest, old_manifest_version = read_old_manifest(old_root)
    is_legacy = old_version is None or old_manifest is None

    if is_legacy:
        report.mode = "legacy"
        report.old_version = "pre-1.0"
        print("Your old project predates versioning. Running in safe mode.")
        print("(User data will be copied, but no conflict detection is possible.)\n")
    else:
        report.mode = "normal"
        report.old_version = old_version

        cmp = compare_versions(old_version, new_version)
        if cmp == 0:
            report.errors.append(f"Both projects are version {old_version}. Nothing to migrate.")
            return report
        if cmp > 0:
            report.warnings.append(
                f"Old project ({old_version}) is newer than new project ({new_version}). "
                "This looks like a downgrade."
            )

    baseline_paths = set(BASELINE_MANIFEST.keys())
    baseline_skill_paths = {p for p in baseline_paths if p.startswith(".cursor/skills/")}

    # -- Zone A: Context --
    print("Copying Context files...")
    old_ctx = old_root / "Context"
    new_ctx = new_root / "Context"
    if old_ctx.is_dir():
        for f in sorted(old_ctx.iterdir()):
            if f.is_file() and f.name != ".DS_Store":
                report.context_files.append(f.name)
                if verbose:
                    print(f"  COPY Context/{f.name}")
                if not dry_run:
                    shutil.copy2(f, new_ctx / f.name)

    new_ctx_files = {f.name for f in new_ctx.iterdir() if f.is_file()} if new_ctx.is_dir() else set()
    old_ctx_files = {f.name for f in old_ctx.iterdir() if f.is_file()} if old_ctx.is_dir() else set()
    for new_file in new_ctx_files - old_ctx_files:
        if new_file != ".DS_Store":
            report.new_baseline_zone_a_files.append(f"Context/{new_file}")

    # -- Zone A: Work --
    print("Copying Work files...")
    old_work = old_root / "Work"
    new_work = new_root / "Work"
    copy_tree(old_work, new_work, report.work_files, verbose, dry_run)

    # -- Zone A: Hook state --
    print("Copying hook state...")
    old_hooks = old_root / ".cursor" / "hooks" / "state"
    new_hooks = new_root / ".cursor" / "hooks" / "state"
    if old_hooks.is_dir():
        for f in sorted(old_hooks.iterdir()):
            if f.is_file() and f.name != ".DS_Store":
                report.hook_state_files.append(f.name)
                if verbose:
                    print(f"  COPY .cursor/hooks/state/{f.name}")
                if not dry_run:
                    new_hooks.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(f, new_hooks / f.name)

    # -- Zone C: Skills --
    print("Merging skills...")
    old_skills = old_root / ".cursor" / "skills"
    new_skills = new_root / ".cursor" / "skills"
    user_skills = find_user_skills(old_skills, baseline_skill_paths)
    for skill_name in user_skills:
        report.user_skills.append(skill_name)
        src_dir = old_skills / skill_name
        dst_dir = new_skills / skill_name
        if verbose:
            print(f"  COPY skill: {skill_name}/")
        if not dry_run:
            if dst_dir.exists():
                shutil.rmtree(dst_dir)
            shutil.copytree(src_dir, dst_dir, symlinks=True)

    # -- Zone C: AGENTS.md --
    print("Merging AGENTS.md...")
    old_agents = old_root / "AGENTS.md"
    new_agents = new_root / "AGENTS.md"
    if old_agents.exists() and new_agents.exists():
        old_text = old_agents.read_text()
        new_text = new_agents.read_text()

        _, old_prefs, old_facts = extract_learned_sections(old_text)
        _, new_prefs, new_facts = extract_learned_sections(new_text)

        prefs_to_carry = [b for b in old_prefs if b not in new_prefs]
        facts_to_carry = [b for b in old_facts if b not in new_facts]

        report.agents_prefs_carried = prefs_to_carry
        report.agents_facts_carried = facts_to_carry

        if prefs_to_carry or facts_to_carry:
            merged = splice_agents_md(new_text, old_prefs, old_facts)
            if not dry_run:
                new_agents.write_text(merged)

        if not is_legacy and old_manifest:
            agents_key = "AGENTS.md"
            if agents_key in old_manifest:
                old_body, _, _ = extract_learned_sections(old_text)
                expected_hash = old_manifest[agents_key]
                body_for_hash = old_agents.read_text()
                actual_hash = hash_file(old_agents)
                if actual_hash != expected_hash:
                    body_baseline, _, _ = extract_learned_sections(
                        (old_root / "AGENTS.md").read_text()
                    )
                    old_manifest_body_approx = old_body.strip()
                    if old_manifest_body_approx:
                        pass

    # -- Zone C: registry.json --
    print("Merging external-skills registry...")
    old_reg_path = old_root / "external-skills" / "registry.json"
    new_reg_path = new_root / "external-skills" / "registry.json"
    if old_reg_path.exists() and new_reg_path.exists():
        try:
            old_reg = json.loads(old_reg_path.read_text())
            new_reg = json.loads(new_reg_path.read_text())
            new_ids = {s["id"] for s in new_reg.get("sources", [])}
            user_sources = [s for s in old_reg.get("sources", []) if s["id"] not in new_ids]
            if user_sources:
                merged_reg = merge_registry(old_reg, new_reg)
                report.registry_sources_added = [s["id"] for s in user_sources]
                if not dry_run:
                    new_reg_path.write_text(json.dumps(merged_reg, indent=2, ensure_ascii=False) + "\n")
        except (json.JSONDecodeError, KeyError) as e:
            report.warnings.append(f"Could not merge registry.json: {e}")

    # -- Zone C: .gitignore --
    print("Merging .gitignore...")
    old_gi = old_root / ".gitignore"
    new_gi = new_root / ".gitignore"
    if old_gi.exists() and new_gi.exists():
        old_gi_text = old_gi.read_text()
        new_gi_text = new_gi.read_text()
        merged_gi = merge_gitignore(old_gi_text, new_gi_text)
        new_lines = set(new_gi_text.strip().splitlines())
        added = [l for l in old_gi_text.strip().splitlines() if l not in new_lines and l.strip()]
        report.gitignore_lines_added = added
        if added and not dry_run:
            new_gi.write_text(merged_gi)

    # -- Modified baseline files --
    if not is_legacy and old_manifest:
        print("Checking for modified baseline files...")
        report.modified_baseline_files = find_modified_baseline_files(old_root, old_manifest)

    # -- User-created entries --
    print("Checking for user-created files/folders...")
    user_entries = find_user_created_entries(old_root, baseline_paths)
    for entry_name in user_entries:
        report.user_created_entries.append(entry_name)
        src = old_root / entry_name
        dst = new_root / entry_name
        if dst.exists():
            report.warnings.append(
                f"'{entry_name}' exists in both old and new project. Skipped."
            )
            continue
        if verbose:
            print(f"  COPY user entry: {entry_name}")
        if not dry_run:
            if src.is_dir():
                shutil.copytree(src, dst, symlinks=True)
            else:
                shutil.copy2(src, dst)

    return report


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="PM OS Migration Tool — upgrade to a new release without losing your work.",
        epilog="Run from the NEW project directory, pointing at the OLD one.",
    )
    parser.add_argument(
        "old_project",
        type=Path,
        help="Path to your old pm-os project directory",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would happen without making any changes",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Print every file operation",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Skip confirmation prompt",
    )
    args = parser.parse_args()

    old_root = args.old_project.resolve()
    new_root = Path(__file__).resolve().parent

    if not old_root.is_dir():
        print(f"ERROR: '{old_root}' is not a directory.", file=sys.stderr)
        sys.exit(1)

    if not (new_root / "AGENTS.md").exists():
        print("ERROR: This script must be in the pm-os project root.", file=sys.stderr)
        sys.exit(1)

    if old_root == new_root:
        print("ERROR: Old and new project are the same directory.", file=sys.stderr)
        sys.exit(1)

    old_v = read_version(old_root)
    new_v = read_version(new_root) or BASELINE_VERSION
    is_legacy = old_v is None

    print("PM OS Migration Tool")
    print("-" * 40)
    print(f"Old project: {old_root}")
    if is_legacy:
        print("Old version: (none — pre-versioning)")
    else:
        print(f"Old version: {old_v}")
    print(f"New version: {new_v}")
    if args.dry_run:
        print("Mode: DRY RUN (no changes will be made)")
    print()

    if not args.force and not args.dry_run:
        try:
            answer = input("Proceed with migration? [y/N] ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            print("\nAborted.")
            sys.exit(0)
        if answer not in ("y", "yes"):
            print("Aborted.")
            sys.exit(0)
        print()

    report = run_migration(old_root, new_root, dry_run=args.dry_run, verbose=args.verbose)

    if report.errors:
        for e in report.errors:
            print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)

    report.print_summary()

    if args.dry_run:
        print("\nThis was a dry run. No files were changed.")
        print("Run again without --dry-run to apply.")


if __name__ == "__main__":
    main()
