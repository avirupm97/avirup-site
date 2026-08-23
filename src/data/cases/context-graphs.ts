import type { CaseStudy } from '../../types/case'

/**
 * Kombai Context Graphs case study. Written up from the working notes. This one
 * is deliberately framed as an AI-quality and trust story — the beta had no
 * clean quantified business metric, so none is claimed here.
 */
export const contextGraphs: CaseStudy = {
  slug: 'context-graphs',
  domain: 'Agentic AI workflows',
  title: 'Context Graphs: teaching the agent what already exists',
  tagline:
    'Users didn’t just want code that worked. They wanted code that fit their architecture. That meant the agent had to understand relationships between frontend entities, not just find similar text.',
  readingTime: '6 min read',
  sections: [
    {
      id: 'context',
      title: 'Context',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Kombai builds AI agents for frontend engineering and design. A recurring complaint from users was that AI coding agents struggled to reuse existing components correctly.',
        },
        {
          kind: 'paragraph',
          text: 'People wanted generated code that fit their existing frontend architecture, design system and component library. What they often got instead was duplicate components, ignored design tokens, missing styling context, or code lifted from files nobody had touched in a year.',
        },
      ],
    },
    {
      id: 'initiative',
      title: 'Initiative',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Improve AI-generated frontend code by helping the agent understand and reuse what the user already has — components, hooks, design tokens, external packages and Storybook examples.',
        },
        {
          kind: 'list',
          items: [
            {
              lead: 'Launch',
              text: 'Kombai indexed the current project in the background rather than adding a graph UI to learn.',
            },
            {
              lead: 'Sequencing',
              text: 'components, hooks and props first; then tokens and CSS files; then Storybook and external NPM package indexing.',
            },
            {
              lead: 'Where it stands',
              text: 'framed as an AI quality and trust improvement — the strongest signal was fewer follow-up prompts asking the agent to reuse existing code.',
            },
          ],
        },
      ],
    },
    {
      id: 'user-problem',
      title: 'The user problem',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Take something as small as “add a red submit button”. A typical agent could pick a button out of an old or unused file, miss the token that actually controls the red, fail to spot the design-system button entirely, miss that the right component lives inside an external NPM package — or simply write a new one.',
        },
        {
          kind: 'quote',
          text: 'Users did not just want working code. They wanted code that matched their existing architecture and design system.',
        },
        {
          kind: 'paragraph',
          text: 'Every one of those misses left cleanup work behind, and cleanup work is what erodes trust in an agent.',
        },
      ],
    },
    {
      id: 'why-retrieval-wasnt-enough',
      title: 'Why existing retrieval wasn’t enough',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Many AI coding tools lean heavily on text or vector retrieval. That is useful, but it can miss how frontend code entities relate to each other.',
        },
        {
          kind: 'paragraph',
          text: 'A codebase is not a bucket of text. Components, hooks, props, design tokens, CSS files, variants, package imports and rendered UI states all have relationships. If retrieval only finds similar-looking text, the agent can easily miss the actual source of truth for how a component is meant to be used.',
        },
      ],
    },
    {
      id: 'what-we-launched',
      title: 'What we launched',
      blocks: [
        {
          kind: 'paragraph',
          text: 'We built Context Graphs — a structured map of frontend entities and the relationships between them: components, hooks, props, design tokens, CSS and styling relationships, external component libraries, Storybook examples, and visual variants and rendered states.',
        },
        {
          kind: 'paragraph',
          text: 'That let the agent know more than “a button exists”:',
        },
        {
          kind: 'list',
          items: [
            { text: 'where the design-system button actually lives.' },
            { text: 'what props it accepts, and which variant to use — say variant="danger".' },
            { text: 'which tokens and styles apply to it.' },
            { text: 'how it renders visually.' },
            {
              text: 'whether the source of truth is the repo, an external package, or Storybook.',
            },
          ],
        },
      ],
    },
    {
      id: 'keeping-it-invisible',
      title: 'Keeping it invisible',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The obvious product instinct was to build a graph surface but the user value here was better agent output, not graph management.',
        },
        {
          kind: 'paragraph',
          text: 'So Kombai indexed the project in the background when users installed it and started using code mode. Context Graphs were discoverable for people who wanted them, but the payoff showed up in generation quality rather than in another surface to learn.',
        },
        {
          kind: 'paragraph',
          text: 'The rollout order followed the same logic — solve for what people reuse most:',
        },
        {
          kind: 'list',
          items: [
            {
              lead: 'Components, hooks and props first',
              text: 'the most frequently reused frontend entities, so the largest share of the problem.',
            },
            {
              lead: 'Tokens and CSS next',
              text: 'reuse without styling context still produced off-system UI.',
            },
            {
              lead: 'Storybook and external packages after',
              text: 'many companies keep their component library and tokens outside the current repo entirely.',
            },
          ],
        },
      ],
    },
    {
      id: 'why-an-ai-problem',
      title: 'Why this was an AI workflow problem',
      blocks: [
        {
          kind: 'paragraph',
          text: 'This was never just code search. The agent had to infer intent, retrieve the right existing component, understand how that component fits the surrounding codebase, apply the correct props, tokens and conventions, and then choose not to create a duplicate.',
        },
        {
          kind: 'paragraph',
          text: 'That chain of judgement is what a keyword index cannot do on its own. Better context was what let the agent make the correct generation decision.',
        },
      ],
    },
    {
      id: 'evaluation',
      title: 'How we evaluated it',
      blocks: [
        {
          kind: 'paragraph',
          text: 'We ran manual review of internal threads alongside bulk eval testing, against one question: did the agent reuse the correct existing component, with the right props, nested components and styling context, instead of producing a duplicate or a generic implementation?',
        },
        {
          kind: 'list',
          items: [
            { text: 'Whether the agent selected the correct existing component.' },
            { text: 'Whether it used the right props and nested components.' },
            { text: 'Whether it respected tokens, CSS and styling conventions.' },
            { text: 'Whether it avoided creating duplicates.' },
            {
              text: 'Whether users needed fewer follow-ups asking it to reuse existing code.',
            },
          ],
        },
      ],
    },
    {
      id: 'tradeoffs',
      title: 'The tradeoffs',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Cost was the first one. Indexing a codebase typically consumed around 150 credits, sometimes closer to 200 on larger repos. Because the indexing was foundational to output quality, we chose not to charge it to the user’s account — Kombai absorbed it, and engineering used cheaper models where they were good enough for the job.',
        },
        {
          kind: 'paragraph',
          text: 'Freshness was the second, and we did not solve it in the beta. Refreshing a Context Graph was user-triggered, which meant the agent could occasionally reason from stale project context. Richer graphs made reuse better and the freshness gap more expensive at the same time.',
        },
        {
          kind: 'paragraph',
          text: 'Users also wanted more granular control over how graph items should be reused in their specific codebase, which is why we added contextgraph.md — a custom instructions file where teams could teach the agent their own reuse rules.',
        },
      ],
    },
    {
      id: 'why-this-worked',
      title: 'Why this worked',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Generated code started feeling native to the user’s product rather than dropped in beside it. Fewer duplicates, correct variants and tokens, less manual correction after generation — and less of the follow-up prompting where users had to point the agent back at code that already existed.',
        },
        {
          kind: 'paragraph',
          text: 'External package indexing drew the strongest feedback in user interviews. Several people called out that pulling component libraries and tokens from outside the repo was something they hadn’t seen elsewhere.',
        },
      ],
    },
  ],
}
