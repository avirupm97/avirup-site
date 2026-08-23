import type { CaseStudy } from '../../types/case'

/**
 * Kombai design variation case study. Written up from the working notes.
 * Internal numbers — absolute cohort sizes and daily signup counts — are
 * deliberately left out; only relative movement is published.
 */
export const improveDesign: CaseStudy = {
  slug: 'improve-design',
  domain: 'Agentic AI workflows',
  title: 'Improve Design: giving “make a few variants” some dials',
  tagline:
    'Users wanted alternatives to compare, but “make variants” told the agent nothing about what should change. So we parameterised the ask instead of guessing the answer.',
  readingTime: '3 min read',
  sections: [
    {
      id: 'context',
      title: 'Context',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Kombai lets users generate designs with AI before any code is written. Once a design existed, people almost always wanted more than one version of it — something to compare against, so they could pick the strongest direction rather than accept the first output.',
        },
        {
          kind: 'paragraph',
          text: 'The underlying intent was never “make multiple versions”. It was “make this design better, and show me the options”.',
        },
      ],
    },
    {
      id: 'initiative',
      title: 'Initiative',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Improve the design variation workflow so users could generate higher-quality alternatives without needing to know how to prompt like a designer.',
        },
      ],
    },
    {
      id: 'user-problem',
      title: 'The user problem',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Users wanted variations, but the request was always underspecified. When someone asked the agent to “make a few variants”, the agent understood that multiple versions were wanted — and nothing about which kind of improvement was wanted.',
        },
        {
          kind: 'paragraph',
          text: 'The harder half of the problem was that users often did not know either. They could tell a design was not landing, but not whether the issue was layout, hierarchy, density, colour, typography, motion or how it behaved on a smaller screen.',
        },
        {
          kind: 'quote',
          text: 'Leaving people to prompt their way through design iteration only works if they already think like designers.',
        },
      ],
    },
    {
      id: 'product-insight',
      title: 'Product insight',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The gap was not generation capability. The agent could produce endless alternatives. What was missing was structure around what “better” meant for this design.',
        },
        {
          kind: 'paragraph',
          text: '“Make variants” can reasonably mean rearranging the layout, simplifying the visual structure, fixing hierarchy, adjusting content density, softening or intensifying the colour treatment, reworking typography, adding or dialling back interactions, or adapting for a different device size. Picked at random, most of those produce something different rather than something better.',
        },
      ],
    },
    {
      id: 'what-we-launched',
      title: 'What we launched',
      blocks: [
        {
          kind: 'paragraph',
          text: 'We shipped an agent skill for design variation. When a user asked for variants without much context, the agent asked which dimension to iterate on rather than improvising:',
        },
        {
          kind: 'list',
          items: [
            {
              lead: 'Structure',
              text: 'rearrange the layout, simplify the design, fix hierarchy, adjust content density.',
            },
            {
              lead: 'Style',
              text: 'soften or intensify the colour treatment, improve typography.',
            },
            {
              lead: 'Interactions',
              text: 'add or reduce animation and motion.',
            },
            {
              lead: 'Responsiveness',
              text: 'adapt the design across device sizes.',
            },
          ],
        },
        {
          kind: 'paragraph',
          text: 'That turned an open-ended prompt into a guided iteration loop: the user chose the kind of improvement, and the agent generated alternatives that were intentional along that axis and therefore actually comparable.',
        },
      ],
    },
    {
      id: 'why-an-ai-problem',
      title: 'Why this was an AI workflow problem',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The agent had to translate a vague improvement goal into specific design operations. There is no deterministic rule for “this version is better” — it depends on the design, the content and the user’s taste.',
        },
        {
          kind: 'paragraph',
          text: 'Without structured guidance the agent produced superficial or arbitrary differences. With parameterised dimensions, each variation had a stated reason to exist, which made comparison possible instead of overwhelming.',
        },
      ],
    },
  ],
}
