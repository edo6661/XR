import type { LegalDocument } from "./types";

export const websiteDisclaimer: LegalDocument = {
  slug: "website-disclaimer",
  title: "General Website Disclaimer",
  effectiveDate: "18 June 2026",
  preamble: [
    "This General Website Disclaimer applies to your use of the XR Summits websites and any information made available on them.",
  ],
  sections: [
    {
      number: "7.1",
      title: "Information only",
      blocks: [
        {
          type: "paragraph",
          text: "The content of the Website is provided for general information about XR Summits Sdn Bhd and its Events. While we make reasonable efforts to keep it accurate and up to date, we make no representation or warranty that it is complete, accurate, current or error-free. Programmes, speakers, prices, dates and other details may change without notice.",
        },
      ],
    },
    {
      number: "7.2",
      title: "No professional advice",
      blocks: [
        {
          type: "paragraph",
          text: "Nothing on the Website constitutes legal, financial, technical or other professional advice, and you should not rely on it as such. You should obtain independent professional advice before acting on any information found on the Website.",
        },
      ],
    },
    {
      number: "7.3",
      title: '"As is" and "as available"',
      blocks: [
        {
          type: "paragraph",
          text: 'The Website is provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we exclude all warranties, express or implied, including as to availability, fitness for a particular purpose, accuracy, reliability, security and non-infringement. We do not warrant that the Website will be uninterrupted, timely, secure, or free of viruses or other harmful components, and you are responsible for your own security and for backing up your own data.',
        },
      ],
    },
    {
      number: "7.4",
      title: "Availability",
      blocks: [
        {
          type: "paragraph",
          text: "We may change, suspend, restrict or withdraw all or part of the Website at any time without notice. We are not liable for any unavailability of the Website resulting from causes outside our reasonable control, including ISP, hosting, network, power or equipment failure, force majeure events, or maintenance.",
        },
      ],
    },
    {
      number: "7.5",
      title: "Third-party links and content",
      blocks: [
        {
          type: "paragraph",
          text: "The Website may link to, or display content from, third-party sites and services that we do not control. We are not responsible for their content, accuracy, availability, products, services or privacy practices, and a link does not imply endorsement. Your use of any third-party site is at your own risk and subject to that party's terms.",
        },
      ],
    },
    {
      number: "7.6",
      title: "Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the maximum extent permitted by law, we (and our directors, employees and agents) are not liable for any loss or damage — direct or indirect, foreseeable or otherwise — arising from your use of, or inability to use, the Website or any information on it, including any indirect, consequential, special or punitive loss, or any loss of profit, data or goodwill. You use the Website at your own risk. Nothing in this Disclaimer excludes liability that cannot be excluded under Malaysian law, including for death or personal injury caused by our negligence, or for fraud.",
        },
      ],
    },
    {
      number: "7.7",
      title: "Intellectual property",
      blocks: [
        {
          type: "paragraph",
          text: "All material on the Website is protected by intellectual property rights owned by or licensed to us, as set out in Section 1.10. You may not reuse it except as permitted there or with our written consent.",
        },
      ],
    },
    {
      number: "7.8",
      title: "Governing law",
      blocks: [
        {
          type: "paragraph",
          text: "This Disclaimer is governed by the laws of Malaysia, and any dispute is subject to the dispute-resolution provisions in Section 1.17.",
        },
      ],
    },
    {
      number: "7.9",
      title: "Contact",
      blocks: [
        {
          type: "paragraph",
          text: "If you have any question about this Disclaimer or the Website, contact us at register@xr-summits.com.",
        },
      ],
    },
  ],
};

export const COPYRIGHT_NOTICE = {
  heading: "Intellectual Property Notice",
  line1: "© 2026 XR Summits Sdn Bhd. All Rights Reserved.",
  line2:
    "XR Summits™, XR Asia Summit™, associated event names, logos, branding elements and promotional materials are trademarks and/or intellectual property of XR Summits Sdn Bhd.",
  line3:
    "All other trademarks, service marks, logos, product names, company names and registered marks appearing on this Website, Event materials or promotional content are the property of their respective owners and are used solely for identification purposes. No affiliation, sponsorship or endorsement is implied unless expressly stated.",
} as const;
