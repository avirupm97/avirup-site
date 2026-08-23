import type { CaseStudy } from '../../types/case'

/**
 * Kombai Improve UI case study. Written up from the working notes. Internal
 * numbers — absolute conversion rates, cohort sizes and credit grants — are
 * deliberately left out; only relative movement is published.
 */
export const improveUi: CaseStudy = {
  slug: 'improve-ui',
  domain: 'Agentic AI workflows',
  title: 'Improve UI: turning “make this beautiful” into a workflow',
  tagline:
    'New users arrived expecting Kombai to do something magical to their UI. The prompt was too vague to answer well — so we structured the ask instead of the answer.',
  readingTime: '5 min read',
  sections: [
    {
      id: 'context',
      title: 'Context',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Kombai builds AI agents for frontend engineering and design. One of the sharper business goals was free-to-paid conversion: few of the people signing up each day were becoming paying users.',
        },
        {
          kind: 'paragraph',
          text: 'The metric I was working with was did the first session create enough value to be worth paying for?',
        },
      ],
    },
    {
      id: 'initiative',
      title: 'Initiative',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Move new-signup to paid conversion up by giving new users a structured, high-intent first task instead of a blank prompt.',
        },
        {
          kind: 'list',
          items: [
            {
              lead: 'Starting point',
              text: 'Conversion was low, measured across daily signup cohorts.',
            },
            {
              lead: 'Where it stands',
              text: 'conversion moved up and trending towards benchmark within 2 months.',
            },
            {
              lead: 'How it was measured',
              text: 'daily cohorts, two months of pre-launch baseline against two months of post-launch performance.',
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
          text: 'Users understood the positioning: Kombai is an AI agent that specialises in frontend and design. So when they opened it against their own app, many expected something high-level and close to magical — make this beautiful, make this modern.',
        },
        {
          kind: 'paragraph',
          text: 'The problem is that there is no universal answer to “beautiful”. It depends on the kind of app, the existing design system, and the taste of the person asking. A vague prompt gave the agent nothing to anchor on, so it produced the most average possible answer.',
        },
        {
          kind: 'quote',
          text: 'The answer had to be contextual, visual and high-level — while still leaving the user enough control to steer it.',
        },
        {
          kind: 'paragraph',
          text: 'This mattered more than it looks, because it was happening during the exact window in which a new user decides whether the product is worth paying for.',
        },
      ],
    },
    {
      id: 'what-we-launched',
      title: 'What we launched',
      blocks: [
        {
          kind: 'paragraph',
          text: 'We shipped an agent skill called Improve UI. Rather than asking users to describe a design outcome, it asked them answerable questions: which pages do you want to improve, and which dimensions matter — layout, colour, spacing, typography, or are there any references to match against.',
        },
        {
          kind: 'paragraph',
          text: 'From there the skill ran a fixed workflow instead of improvising:',
        },
        {
          kind: 'list',
          items: [
            {
              lead: 'Understand the app',
              text: 'classify what it actually is — landing page, internal dashboard, ecommerce surface — because “better” means something different for each.',
            },
            {
              lead: 'Look at the real UI',
              text: 'inspect the running app through Kombai’s built-in browser rather than reasoning from code alone.',
            },
            {
              lead: 'Read the design system',
              text: 'pull the existing colours, typography, spacing, radii and shadows so proposals extend the system instead of replacing it.',
            },
            {
              lead: 'Diagnose, then confirm',
              text: 'name concrete issues tied to specific screens and components, and get the problem list agreed before designing anything.',
            },
            {
              lead: 'Propose three directions',
              text: 'each one complete — a representative screen, palette, typography, layout and navigation approach, and density — so the user chooses between coherent options rather than editing a single guess.',
            },
            {
              lead: 'Implement, then verify',
              text: 'build using the existing tokens, components and frontend patterns, then check the result back in the browser.',
            },
          ],
        },
      ],
    },
    {
      id: 'quality',
      title: 'Keeping the output out of slop territory',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The failure mode was well known before launch. Prompts like “make it clean and minimal” produced recognisable AI slop: gradient-heavy hero sections, one-column layouts, repeating product cards, stock-website furniture, and assets that no real product would ship.',
        },
        {
          kind: 'paragraph',
          text: 'So the skill was written to iterate against its own output and throw away the generic ideas before showing anything. Reviews judged each proposal on whether it was specific to the actual screen, whether it respected the existing tokens, and whether it was implementable — across typography, colour system, layout restructuring, personality, micro-interactions, asset realism and interactive states.',
        },
        {
          kind: 'paragraph',
          text: 'Alongside that, the product-side read was behavioural: did users start the flow, finish it inside their free credit budget, keep refining after the first output, and reach the paywall having seen something useful?',
        },
      ],
    },
    {
      id: 'why-this-worked',
      title: 'Why this worked',
      blocks: [
        {
          kind: 'paragraph',
          text: 'New users join with a fixed credit grant — enough for agent to deliver meaningful work. That is the entire budget in which the product has to prove itself. Improve UI was scoped to fit inside that window, which meant users hit real output rather than running dry mid-exploration.',
        },
        {
          kind: 'paragraph',
          text: 'It also converted a vague desire into concrete dimensions the user could steer. Structuring the ask, rather than trying to guess the answer, is what made the output useful early enough to matter.',
        },
        {
          kind: 'paragraph',
          text: 'The onboarding steps and funnel bore that out. Roughly a third of new signups tried Improve UI, and conversion among those users ran enough to explain the overall move. It was a high-intent, credit-optimized path: users reached the paywall having already seen the value.',
        },
      ],
    },
    {
      id: 'why-an-ai-problem',
      title: 'Why this was an AI problem',
      blocks: [
        {
          kind: 'paragraph',
          text: 'There is no deterministic rule for “make this UI better”. The agent had to reason across UI patterns, hold the context of the actual page, and generate something visually coherent rather than template-shaped — which is exactly the class of subjective, contextual judgement a rules engine cannot fake.',
        },
      ],
    },
  ],
}
