import type { CaseStudy } from '../../types/case'

/**
 * Kombai visitor-to-activation case study. Written up from the working notes.
 * Internal numbers — daily traffic, cohort sizes and absolute conversion rates
 * — are deliberately left out; only relative movement is published.
 */
export const visitorToActivation: CaseStudy = {
  slug: 'visitor-to-activation',
  domain: 'PLG work',
  title: 'Improving website visitor to activation journey',
  readingTime: '5 min read',
  sections: [
    {
      id: 'context',
      title: 'Context',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Kombai was an AI product for frontend engineering and design, available as an extension that users could download into their code editor. Users discovering us through our website and wanting to try us out had to install Kombai as an extension into their code editors.',
        },
      ],
    },
    {
      id: 'initiative',
      title: 'Initiative',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Improve website conversions by getting users to try out Kombai.',
        },
      ],
    },
    {
      id: 'problem-breakdown',
      title: 'Problem breakdown',
      blocks: [
        {
          kind: 'paragraph',
          text: 'People did reach the website and clicked install. But they didn’t sign up. We ran experiments to measure whether signup page content or the signup flow (install first, signup later) had issues, but conversion remained low.',
        },
      ],
    },
    {
      id: 'product-insight',
      title: 'Product insight',
      blocks: [
        {
          kind: 'paragraph',
          text: 'During this time, code editors like Cursor, VS Code and Antigravity were going through an evolution. Instead of an AI coding agent being a side extension, the experience evolved to bring the AI agents as the main focus. Editors were becoming AI native. Unlike conventional code editors, these editors did not have extensive extension support. This meant these users could not install Kombai. This brought our website conversion down.',
        },
        {
          kind: 'paragraph',
          text: 'The website flow asked users to download the extension first and sign up afterwards. So primary CTA click was healthy while signups were down. This was because of low extension support.',
        },
        {
          kind: 'paragraph',
          text: 'So the strategy became: introduce a new product form factor and promote it as a means to try out Kombai.',
        },
      ],
    },
    {
      id: 'what-we-changed',
      title: 'What we changed',
      blocks: [],
      subsections: [
        {
          id: 'desktop-app',
          title: '1. Launched Kombai app for MacOS, Windows, and Linux.',
          blocks: [
            {
              kind: 'paragraph',
              text: 'This removed the barrier for users to try out Kombai. The new form factor could be installed across OS and had inherent retention properties.',
            },
          ],
        },
        {
          id: 'download-cta',
          title: '2. Changed the primary CTA from Install Kombai to Download Kombai',
          blocks: [
            {
              kind: 'paragraph',
              text: 'This allowed users to download Kombai as an app on their desktop. We also implemented auto OS detection so the primary CTA read “Download Kombai for MacOS” for Mac users while Windows users saw “Download Kombai for Windows”.',
            },
          ],
        },
        {
          id: 'faster-signup',
          title: '3. Added faster signup options',
          blocks: [
            {
              kind: 'paragraph',
              text: 'We added a Google sign-in prompt on page visit, and broadened SSO to Apple, GitHub, Microsoft and LinkedIn. The point was to make account creation feel familiar and near-zero effort.',
            },
          ],
        },
        {
          id: 'post-download-guide',
          title: '4. Guided users to install the app post download',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Unlike installing the extension, which required just one click, installing an app after download took several steps — and they differed across OS. To guide users through this, we redirected them to a post-download page with guided steps on how to install the app.',
            },
          ],
        },
        {
          id: 'mobile-recovery',
          title: '5. Built a mobile recovery flow',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Mobile visitors cannot install the Kombai extension or the app on their phones. Rather than lose them, we gave them three options: save a calendar reminder to install the app along with the download link, schedule an email containing the download link for later from desktop, or request that email to be sent right away.',
            },
          ],
        },
        {
          id: 'email-follow-up',
          title: '6. Kept the install path alive over email',
          blocks: [
            {
              kind: 'paragraph',
              text: 'The onboarding sequence already ran a welcome email plus product onboarding emails. We added the install link to every footer, so the activation path was never more than one click away.',
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
          text: 'The new form factor removed friction at the first major commitment point. SSO made signups easy, the download guide page helped bring more installs, mobile users got a link for later, and onboarding emails preserved the path. This increased our website conversions to benchmark numbers.',
        },
      ],
    },

  ],
}
