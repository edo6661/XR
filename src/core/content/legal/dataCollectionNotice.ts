import type { LegalDocument } from "./types";

export const dataCollectionNotice: LegalDocument = {
  slug: "data-collection-notice",
  title: "Data Collection Notice",
  preamble: [
    "Issued under Section 7 of the Personal Data Protection Act 2010 (Malaysia).",
    'XR Summits Sdn Bhd (Company Registration No. 1506516-A) ("we", "us", "our") is processing your personal data. This Notice tells you what we collect and why, and your rights in relation to it. It supplements, and should be read with, our Privacy Policy at Section 2.',
  ],
  sections: [
    {
      number: "3.1",
      title: "Personal data we are collecting",
      blocks: [
        {
          type: "paragraph",
          text: "We may collect and process the following personal data about you: your name, job title and organisation; your business and contact details (address, email, telephone and mobile number); your registration, ticket and attendance information; your badge-scan records at sessions and exhibitor booths; your billing information; technical data such as your IP address; and your image, voice and likeness as captured in event photography and recordings.",
        },
      ],
    },
    {
      number: "3.2",
      title: "Source of the data",
      blocks: [
        {
          type: "paragraph",
          text: "We obtain personal data directly from you, from your employer or colleagues where they register on your behalf, and from our ticketing, registration and service partners.",
        },
      ],
    },
    {
      number: "3.3",
      title: "Purposes of collection",
      blocks: [
        {
          type: "paragraph",
          text: "Your personal data is processed to register you and administer your attendance; to process orders, payments and invoices; to deliver and improve our Events and the Website; to communicate with you about logistics and, where permitted, marketing; to maintain security and prevent fraud; and to comply with legal obligations. The full list of purposes is set out in Section 2.4.",
        },
      ],
    },
    {
      number: "3.4",
      title: "Disclosure",
      blocks: [
        {
          type: "paragraph",
          text: "Your personal data may be disclosed to our affiliates, our service providers and contractors, and — where you consent, including by allowing your badge to be scanned — to sponsors and exhibitors. It may also be disclosed to authorities where required by law. Disclosure may involve transfer outside Malaysia, with appropriate safeguards. Details are in Section 2.6.",
        },
      ],
    },
    {
      number: "3.5",
      title: "Obligatory or voluntary",
      blocks: [
        {
          type: "paragraph",
          text: "Some of the personal data we request is necessary for us to register you, process your order and provide our services. If you do not provide this data, we may be unable to complete your registration or fulfil your order. Other data (such as dietary or accessibility preferences) is voluntary and is used only to improve your experience.",
        },
      ],
    },
    {
      number: "3.6",
      title: "Your rights of access and correction",
      blocks: [
        {
          type: "paragraph",
          text: "You have the right to request access to, and correction of, your personal data, and to limit its processing, subject to the PDPA. To make a request, or for any query about this Notice, contact us at register@xrsummits.com.",
        },
      ],
    },
  ],
};
