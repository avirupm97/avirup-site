import type { CaseStudy } from '../../types/case'

/**
 * Kombai retention case study. Written up from the working notes. Internal
 * numbers — absolute churn rates, targets and plan prices — are deliberately
 * left out; only relative movement is published.
 */
export const reduceSubscriptionCancellation: CaseStudy = {
  slug: 'reduce-subscription-cancellation',
  domain: 'PLG work',
  title: 'Reducing subscription cancellation rate',
  tagline:
    'Kombai was losing subscribers far faster than a healthy benchmark. Diagnosing why turned it into a credit-efficiency problem, not a pricing one.',
  readingTime: '6 min read',
  sections: [
    {
      id: 'context',
      title: 'Context',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Kombai’s monthly subscription cancellation rate was running higher than a healthy SaaS benchmark. For the business, this was a severe retention problem.',
        },
        {
          kind: 'paragraph',
          text: 'The goal was to understand why users were cancelling and bring cancellation back in line with that benchmark.',
        },
      ],
    },
    {
      id: 'initiative',
      title: 'Initiative',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Reduce subscription cancellation rate by diagnosing cancellation reasons, improving credit efficiency, and creating retention paths for users who were about to cancel.',
        },
      ],
    },
    {
      id: 'problem-breakdown',
      title: 'Problem breakdown',
      blocks: [
        { kind: 'paragraph', text: 'I broke cancellation down into two types:' },
        {
          kind: 'list',
          items: [
            { lead: 'Active cancellation', text: 'user-driven cancellation.' },
            {
              lead: 'Passive cancellation',
              text: 'cancellation caused by payment failures.',
            },
          ],
        },
        {
          kind: 'paragraph',
          text: "Most of Kombai's cancellations were active cancellations, so the focus became understanding why paying users were choosing to cancel.",
        },
      ],
    },
    {
      id: 'when-users-cancelled',
      title: 'When users cancelled',
      blocks: [
        {
          kind: 'paragraph',
          text: 'We looked at cancellation timing and found two major windows:',
        },
        {
          kind: 'list',
          items: [
            {
              text: "The largest cancellation cluster happened between day 30 and day 45 after a user's first subscription purchase.",
            },
            {
              text: 'The next major cluster happened between day 60 and day 90.',
            },
          ],
        },
        {
          kind: 'paragraph',
          text: "This suggested the issue was not immediate buyer's remorse. Users were getting some value early, but not enough ongoing value to justify renewal.",
        },
      ],
    },
    {
      id: 'usage-pattern',
      title: 'Usage pattern',
      blocks: [
        {
          kind: 'paragraph',
          text: 'For users cancelling between day 30 and day 45, we saw a common usage pattern:',
        },
        {
          kind: 'list',
          items: [
            { text: 'Heavy usage in the first week after buying the subscription.' },
            { text: 'Much flatter usage for the rest of the month.' },
          ],
        },
        {
          kind: 'paragraph',
          text: 'On deeper analysis, this appeared to be related to credit consumption. Kombai subscriptions include a fixed number of credits based on the user’s plan. Once users finish credits, they can either top up or wait until the next renewal date.',
        },
        {
          kind: 'paragraph',
          text: 'Users were consuming credits quickly, then becoming less active for the rest of the billing cycle. That reduced perceived value and made renewal less likely.',
        },
      ],
    },
    {
      id: 'product-insight',
      title: 'Product insight',
      blocks: [
        {
          kind: 'paragraph',
          text: 'In the AI tools market, users are already paying for products like Cursor, Claude Code, Codex, and other AI coding tools. Some of those products can subsidize usage more aggressively than Kombai can. Kombai could not simply compete by offering unlimited or heavily subsidized credits.',
        },
        {
          kind: 'quote',
          text: 'If users can do more work with fewer credits, they are more likely to keep using Kombai through the month and renew.',
        },
        { kind: 'paragraph', text: 'The retention strategy became:' },
        {
          kind: 'list',
          items: [
            { text: 'Help users stretch credits further.' },
            { text: 'Make cheaper usage paths visible.' },
            {
              text: 'Preserve lower-intent users through downgrade or pause options instead of losing them completely.',
            },
          ],
        },
      ],
    },
    {
      id: 'what-we-changed',
      title: 'What we changed',
      blocks: [],
      subsections: [
        {
          id: 'default-auto',
          title: '1. Changed default model selection to Auto',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Kombai offers ensemble models and chooses the best model for a task. Historically, expensive models were often used, which increased credit burn. We changed the default model to Auto.',
            },
            {
              kind: 'paragraph',
              text: 'For each message, Kombai detects whether a cheaper model can handle the task effectively. If the task is simple, the system can route it to a cheaper model instead of using a high-cost model unnecessarily.',
            },
          ],
        },
        {
          id: 'cheaper-models',
          title: '2. Added cheaper direct model options',
          blocks: [
            {
              kind: 'paragraph',
              text: 'We added cheaper model options alongside frontier models. The premium models cost many times more credits per message than the cheaper ones, which could handle easier tasks at a fraction of the burn. Also, newer, cheaper models are getting better. ',
            },
            {
              kind: 'paragraph',
              text: 'This gave users direct control over credit burn. It also helped build a clearer mental model:',
            },
            {
              kind: 'list',
              items: [
                { text: 'Higher-end models are available when needed.' },
                { text: 'Cheaper models can be used for simpler tasks.' },
                { text: 'Selecting expensive models burns credits faster.' },
              ],
            },
          ],
        },
        {
          id: 'smart-model-suggestions',
          title: '3. Added smart model suggestions.',
          blocks: [
            {
              kind: 'paragraph',
              text: 'If users ended up spending lot of credits per turn or give explicit feedback on too much credit usage, we offered model recommendations. This made them aware of alternative models and enabled them to make more informed decisions of the kind of models to use.',
            },
          ],
        },
        {
          id: 'downgrade-offer',
          title: '4. Added a downgrade save offer',
          blocks: [
            {
              kind: 'paragraph',
              text: 'For users attempting to cancel, we introduced an option to downgrade to a lower-priced plan or a lite plan. This plan was not part of the main pricing page and was shown only as a cancellation-save option.',
            },
            {
              kind: 'paragraph',
              text: 'The goal was to retain price-sensitive or low-usage users who still saw some value in Kombai but did not want to continue on their existing plan.',
            },
          ],
        },
        {
          id: 'pause-option',
          title: '5. Added a pause option',
          blocks: [
            {
              kind: 'paragraph',
              text: 'If users did not choose the downgrade option, we offered the ability to pause their subscription. This gave users a way to temporarily stop usage instead of fully cancelling, preserving the relationship and creating an opportunity to reactivate them later.',
            },
          ],
        },
      ],
    },
    {
      id: 'why-this-worked',
      title: 'Why this worked',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The first set of changes addressed the root product issue: users were burning through credits too quickly and then becoming inactive before renewal. By making Auto the default and exposing cheaper model options, users could send more messages per fixed credit budget and better understand how model choice affected credit consumption.',
        },
        {
          kind: 'paragraph',
          text: 'The second set of changes addressed cancellation intent directly. Some users did not need a full cancellation; they needed a cheaper plan or a pause. Giving them those options reduced avoidable churn.',
        },
      ],
    },
  ],
}
