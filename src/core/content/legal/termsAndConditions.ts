import type { LegalDocument } from "./types";

export const termsAndConditions: LegalDocument = {
  slug: "terms",
  title: "Terms and Conditions",
  effectiveDate: "18 June 2026",
  preamble: [
    'These Terms and Conditions ("Terms") govern your access to and use of the XR Summits websites and your purchase of tickets, passes, sponsorship, exhibition space and other products or services from us.',
  ],
  sections: [
    {
      number: "1.1",
      title: "Who we are",
      blocks: [
        {
          type: "paragraph",
          text: 'In these Terms, "we", "us" and "our" mean XR Summits Sdn Bhd (Company Registration No. 1506516-A), a company incorporated in Malaysia, together with its subsidiaries and affiliates. "You" and "your" mean any person who accesses our websites or who buys, registers for, or otherwise deals with our products, services or events. "Website" means xr-summits.com and any related microsite or application operated by us. "Event" means any conference, summit, forum, exhibition, awards, hackathon, workshop or other activity organised by us.',
        },
      ],
    },
    {
      number: "1.2",
      title: "Acceptance of these Terms",
      blocks: [
        {
          type: "paragraph",
          text: "By accessing the Website, creating an account, or placing an order, you confirm that you have read, understood and agree to be bound by these Terms, together with our Privacy Policy, Data Collection Notice, Payment Disclaimer, Event Disclaimer, Refund Policy and General Website Disclaimer, all of which are incorporated by reference. If you do not agree, please do not use the Website or our services.",
        },
      ],
    },
    {
      number: "1.3",
      title: "Changes to these Terms",
      blocks: [
        {
          type: "paragraph",
          text: "We may update these Terms from time to time to reflect changes in our services, in industry practice, or in the law. The version published on the Website at the time you place an order applies to that order. Where the law requires a change to apply to existing orders, it will do so automatically. We encourage you to review these Terms each time you use the Website.",
        },
      ],
    },
    {
      number: "1.4",
      title: "Eligibility and accounts",
      blocks: [
        {
          type: "list",
          items: [
            "You may browse the Website regardless of age. To purchase tickets, register as a delegate, or enter into a sponsorship, exhibition or supplier arrangement, you must be at least 18 years old and have the legal capacity to enter into a binding contract.",
            "Certain Events, areas or sessions are restricted to attendees aged 18 and above. Where an age restriction applies, we may ask for identification and may refuse entry if it cannot be verified.",
            "If you register on behalf of a company or other organisation, you warrant that you are authorised to bind that organisation to these Terms.",
            "You are responsible for keeping your account credentials confidential and for all activity under your account. Please notify us promptly at register@xr-summits.com if you suspect any unauthorised use.",
            "You agree to provide information that is accurate, current and complete, and to keep it up to date.",
          ],
        },
      ],
    },
    {
      number: "1.5",
      title: "Orders, offer and acceptance",
      blocks: [
        {
          type: "paragraph",
          text: "Information on the Website is an invitation to treat and does not constitute a binding offer. When you submit a registration, booking or purchase order, that submission is your offer to buy. A binding contract is formed only when we issue a written confirmation or tax invoice accepting your order. We may decline or cancel an order before acceptance, including where an item is unavailable, where there is a pricing or description error, or where we suspect fraud or a breach of these Terms.",
        },
      ],
    },
    {
      number: "1.6",
      title: "Pricing and taxes",
      blocks: [
        {
          type: "list",
          items: [
            "All prices are stated in Malaysian Ringgit (MYR) unless otherwise specified, and are correct at the time of publication. We may change prices, withdraw promotions, or correct errors at any time before your order is accepted.",
            "Prices are exclusive of Sales and Service Tax (SST) unless stated otherwise. Where SST applies, it will be added and itemised on your invoice at the prevailing statutory rate.",
            "Your invoice is the definitive statement of the final amount payable, including any applicable taxes and charges.",
          ],
        },
      ],
    },
    {
      number: "1.7",
      title: "Payment",
      blocks: [
        {
          type: "paragraph",
          text: "Payment terms, accepted payment methods and related disclaimers are set out in the Payment Disclaimer at Section 4. Unless we agree otherwise in writing, products and services are confirmed, and access is granted, only once we have received cleared payment in full. We reserve the right to cancel any order that remains unpaid by the due date stated on the invoice.",
        },
      ],
    },
    {
      number: "1.8",
      title: "Tickets, passes and registrations",
      blocks: [
        {
          type: "list",
          items: [
            "Tickets and passes are issued for the named registrant and grant access only to the sessions, zones and dates specified. They are not, unless we state otherwise, transferable, and may not be resold, auctioned or used for any commercial or promotional purpose without our prior written consent.",
            "We may operate different ticket or pass categories (for example, delegate, expo, VIP, student or speaker passes), each with its own inclusions and conditions.",
            "Cancellation, transfer and refund of tickets are governed by the Refund Policy at Section 6.",
            "Your attendance is also subject to the Event Disclaimer at Section 5 and to any venue rules, safety protocols and event house rules notified to you.",
          ],
        },
      ],
    },
    {
      number: "1.9",
      title: "Sponsors, exhibitors and suppliers",
      blocks: [
        {
          type: "paragraph",
          text: 'Where you engage with us as a sponsor, exhibitor, partner or supplier, additional terms set out in the relevant sponsorship agreement, exhibitor manual, booking form, statement of work or insertion order ("Additional Terms") apply in addition to these Terms. If there is a conflict, the Additional Terms prevail to the extent of that conflict. Allocation of exhibition space, booth specifications, build-up and tear-down times, and on-site rules are governed by the exhibitor manual issued for the relevant Event.',
        },
      ],
    },
    {
      number: "1.10",
      title: "Intellectual property",
      blocks: [
        {
          type: "list",
          items: [
            "All content on the Website and in our event materials — including text, graphics, logos, the XR Summits and XR Asia Summit marks, icons, images, audio, video, layouts, code and software — is owned by or licensed to us and is protected by Malaysian and international intellectual property laws.",
            "You may view and download content for your own personal, non-commercial use only, provided you keep all proprietary notices intact. You must not copy, reproduce, republish, distribute, modify, or commercially exploit any content without our prior written permission or that of the relevant rights holder.",
            "Product images, descriptions and brand assets belonging to third parties (for example, sponsors, exhibitors or speakers) remain the property of those parties and may not be used without their consent.",
          ],
        },
        { type: "subheading", text: "Third-Party Trademarks and Logos" },
        {
          type: "paragraph",
          text: "All trademarks, service marks, logos, trade names, product names and company names displayed on the Website, Event materials, presentations, exhibition booths, marketing collateral or promotional content remain the property of their respective owners.",
        },
        {
          type: "paragraph",
          text: "Their appearance does not imply endorsement, sponsorship, partnership or affiliation with XR Summits Sdn Bhd unless expressly stated in writing.",
        },
        {
          type: "paragraph",
          text: "Any references to third-party products, technologies, software platforms or services are made solely for identification and informational purposes.",
        },
      ],
    },
    {
      number: "1.11",
      title: "Your content and submissions",
      blocks: [
        {
          type: "paragraph",
          text: "If you submit, post or share any material with us — for example through enquiry forms, community channels, or speaker and award submissions — you grant us a non-exclusive, royalty-free, worldwide licence to use, store, reproduce and display that material for the purpose of operating our Website and Events and promoting them. You are responsible for ensuring your submissions are lawful and do not infringe the rights of any third party. We may remove or moderate content at our discretion.",
        },
        { type: "subheading", text: "Speaker Content Licence" },
        {
          type: "paragraph",
          text: "Unless otherwise agreed in writing, speakers, moderators, panellists and presenters grant XR Summits Sdn Bhd a perpetual, worldwide, royalty-free, transferable licence to record, reproduce, publish, distribute, broadcast, livestream, archive, adapt and use their presentations, interviews, panel discussions and related materials for Event operations, educational purposes, future Events and promotional activities.",
        },
      ],
    },
    {
      number: "1.12",
      title: "Acceptable use",
      blocks: [
        {
          type: "paragraph",
          text: "When using the Website or any communication facility we provide, you agree that you will not:",
        },
        {
          type: "list",
          items: [
            "use it for any unlawful, fraudulent or harmful purpose, or in breach of any applicable law;",
            "post or transmit material that is defamatory, obscene, abusive, threatening, harassing, discriminatory, or that incites violence or criminal conduct;",
            "impersonate any person or misrepresent your affiliation, including impersonating our staff or representatives;",
            "introduce viruses, malware or other harmful code, or attempt to gain unauthorised access to our systems;",
            "send spam or unsolicited bulk communications through our systems; or",
            "scrape, harvest or collect data from the Website by automated means without our consent.",
          ],
        },
        {
          type: "paragraph",
          text: "We may monitor communications made through our systems, retain copies, and take action (including suspension or termination of access) for any breach.",
        },
        {
          type: "subheading",
          text: "Export Control and Sanctions Compliance",
        },
        {
          type: "paragraph",
          text: "Attendees, sponsors, exhibitors, speakers and partners agree to comply with all applicable export control laws, sanctions regulations and trade restrictions applicable in their jurisdiction.",
        },
        {
          type: "paragraph",
          text: "XR Summits Sdn Bhd reserves the right to refuse participation where such participation may violate applicable laws or regulations.",
        },
      ],
    },
    {
      number: "1.13",
      title: "Third-party links and content",
      blocks: [
        {
          type: "paragraph",
          text: "The Website may contain links to, or content from, third-party sites and services that we do not control — including those of sponsors, exhibitors, ticketing or payment providers. We provide these for convenience only. We do not endorse and are not responsible for the content, products, services, accuracy or availability of any third-party site, and your dealings with third parties are solely between you and them.",
        },
      ],
    },
    {
      number: "1.14",
      title: "Disclaimers and limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: 'The Website and our content are provided on an "as is" and "as available" basis. The disclaimers in the General Website Disclaimer at Section 7 apply. To the maximum extent permitted by law:',
        },
        {
          type: "list",
          items: [
            "we do not warrant that the Website will be uninterrupted, error-free, secure, or free of viruses, or that information on it is complete or accurate;",
            "we are not liable for any indirect, consequential, special or punitive loss, or for any loss of profit, revenue, business, goodwill, data or opportunity; and",
            "our total aggregate liability to you arising out of or in connection with your use of the Website or any single order is limited to the amount you paid to us for that order.",
          ],
        },
        {
          type: "paragraph",
          text: "Nothing in these Terms excludes or limits liability that cannot be excluded or limited under Malaysian law, including under the Consumer Protection Act 1999 where it applies to you as a consumer, or for death or personal injury caused by our negligence, or for fraud.",
        },
      ],
    },
    {
      number: "1.15",
      title: "Indemnity",
      blocks: [
        {
          type: "paragraph",
          text: "You agree to indemnify us against reasonable losses, damages and costs we incur arising from your breach of these Terms, your misuse of the Website, or your infringement of any third-party right.",
        },
      ],
    },
    {
      number: "1.16",
      title: "Force majeure",
      blocks: [
        {
          type: "paragraph",
          text: "We are not liable for any delay or failure to perform our obligations caused by events beyond our reasonable control, including acts of God, fire, flood, storm, epidemic or pandemic, war, terrorism, civil unrest, strikes, government action or restriction, utility or network failure, or the unavailability of a venue. The consequences of such events for Events are addressed in the Event Disclaimer at Section 5.",
        },
      ],
    },
    {
      number: "1.17",
      title: "Governing law and dispute resolution",
      blocks: [
        {
          type: "list",
          items: [
            "These Terms, and any dispute arising out of or in connection with them, are governed by the laws of Malaysia.",
            "The parties will first attempt to resolve any dispute amicably. Failing resolution within thirty (30) days, the dispute will be referred to and finally resolved by arbitration administered by the Asian International Arbitration Centre (AIAC) in Kuala Lumpur, in accordance with the AIAC Arbitration Rules, conducted in the English language. The seat of arbitration is Kuala Lumpur, Malaysia.",
            "Nothing prevents either party from seeking urgent injunctive or other equitable relief from the courts of Malaysia, in particular to protect intellectual property rights. Where you deal with us as a consumer, your statutory rights to bring proceedings are not affected.",
          ],
        },
      ],
    },
    {
      number: "1.18",
      title: "General",
      blocks: [
        {
          type: "list",
          items: [
            "If any provision of these Terms is found to be unenforceable, the remaining provisions continue in full force.",
            "Our failure to enforce any right is not a waiver of that right.",
            "You may not assign or transfer your rights or obligations without our written consent. We may assign ours to a successor or affiliate.",
            "These Terms, together with the documents incorporated by reference and any applicable Additional Terms, form the entire agreement between you and us in relation to their subject matter.",
            "Notices to us should be sent to register@xr-summits.com. We may communicate with you electronically, and you agree that electronic communications satisfy any legal requirement that communications be in writing.",
          ],
        },
      ],
    },
  ],
};
