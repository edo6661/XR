import type { LegalDocument } from "./types";

export const eventDisclaimer: LegalDocument = {
  slug: "event-disclaimer",
  title: "Event Disclaimer",
  effectiveDate: "18 June 2026",
  preamble: [
    "This Event Disclaimer applies to all attendees, delegates, speakers, sponsors, exhibitors, contractors and guests at Events organised by XR Summits Sdn Bhd.",
  ],
  sections: [
    {
      number: "5.1",
      title: "Programme changes",
      blocks: [
        {
          type: "paragraph",
          text: "We reserve the right, in our absolute discretion and without liability, to change the agenda, format, speakers, content, timings, venue or any other aspect of an Event, and to postpone, shorten or cancel an Event, with or without notice. Speaker line-ups in particular are subject to change. Where reasonably possible we will publish updates, but the published programme is indicative and not a contractual commitment.",
        },
      ],
    },
    {
      number: "5.2",
      title: "Admission and conduct",
      blocks: [
        {
          type: "list",
          items: [
            "A valid badge, ticket or pass is required for entry. Badges are personal to the registrant and must be worn at all times on site.",
            "We, and the venue operator, may carry out security and identity checks and may refuse entry to, or remove from the Event without refund, any person who behaves in a manner we consider disruptive, unsafe, unlawful or in breach of these documents, the venue rules or any house rules.",
            "Certain zones or sessions may be age-restricted (18+); we may request identification and refuse entry where age cannot be verified.",
          ],
        },
      ],
    },
    {
      number: "5.3",
      title: "Health, safety and assumption of risk",
      blocks: [
        {
          type: "paragraph",
          text: "Attending a live event involves inherent risks, including the risk of exposure to communicable illness in any place where people gather. To the maximum extent permitted by law, and except where caused by our negligence or wilful misconduct, you voluntarily attend at your own risk and accept responsibility for your own health and safety. You agree to comply with all health, safety and security protocols put in place by the venue, the authorities or us. Failure to comply may result in refusal of entry or removal without refund. These protocols reduce but do not eliminate risk.",
        },
        {
          type: "subheading",
          text: "5.3A Immersive Technology Participation",
        },
        {
          type: "paragraph",
          text: "Certain Event activities may involve the use of Virtual Reality (VR), Augmented Reality (AR), Mixed Reality (MR), Extended Reality (XR), simulation systems, haptic devices, motion tracking systems, wearable technologies and related immersive experiences.",
        },
        {
          type: "paragraph",
          text: "Participation may cause motion sickness, dizziness, fatigue, eye strain, discomfort, loss of balance, disorientation or other physical effects.",
        },
        {
          type: "paragraph",
          text: "Participants acknowledge and voluntarily assume all risks associated with the use of such technologies and agree to discontinue use immediately if discomfort occurs.",
        },
        {
          type: "paragraph",
          text: "XR Summits Sdn Bhd shall not be liable for injury, discomfort, equipment misuse or adverse physical reactions arising from participation except where required by law.",
        },
      ],
    },
    {
      number: "5.4",
      title: "Photography, recording and likeness",
      blocks: [
        {
          type: "paragraph",
          text: "By entering an Event, you acknowledge and agree that you may be photographed, filmed and recorded, and you consent to our use of your image, voice and likeness — in photographs, video, livestreams, electronic media and other formats — for the purpose of running, documenting and promoting our Events and our business, now and in the future, without further notice, approval or compensation. If you do not wish to be recorded, please contact our on-site team or avoid camera areas.",
        },
        {
          type: "paragraph",
          text: "Attendees, media and exhibitor personnel must not photograph or record another exhibitor's booth, products, or a speaker's session for commercial purposes without the permission of the relevant exhibitor, speaker and any individuals shown. Some sessions or products may be embargoed or designated no-recording; please observe all such notices.",
        },
        {
          type: "subheading",
          text: "5.4A Drone, Aerial and Livestream Recording",
        },
        {
          type: "paragraph",
          text: "The Event may utilise drones, aerial imaging systems, livestreaming platforms and other recording technologies for operational, security, media coverage and promotional purposes.",
        },
        {
          type: "paragraph",
          text: "By entering the Event venue, attendees acknowledge and consent to such recording activities.",
        },
      ],
    },
    {
      number: "5.5",
      title: "Views of speakers, sponsors and exhibitors",
      blocks: [
        {
          type: "paragraph",
          text: "Views, opinions, statements and materials presented by speakers, sponsors, exhibitors and other participants are their own. We do not endorse them and accept no liability for any advice, opinion or information given at an Event or in materials provided to attendees. Any commercial dealings you enter into with a sponsor, exhibitor or other participant are solely between you and them.",
        },
        {
          type: "subheading",
          text: "5.5A Artificial Intelligence (AI) Content",
        },
        {
          type: "paragraph",
          text: "Certain Event presentations, demonstrations, exhibits, marketing materials, videos, images, audio content and other materials may contain AI-generated, AI-assisted or synthetic content.",
        },
        {
          type: "paragraph",
          text: "XR Summits Sdn Bhd makes no representation regarding the accuracy, completeness, reliability or suitability of AI-generated outputs, and attendees should independently verify information before relying upon it.",
        },
        {
          type: "paragraph",
          text: "The views and outputs generated by AI systems remain the responsibility of the respective presenter, exhibitor, sponsor or content creator.",
        },
        { type: "subheading", text: "5.5B No Endorsement" },
        {
          type: "paragraph",
          text: "The participation of any speaker, sponsor, exhibitor, partner, government agency, university, industry association or other organisation does not constitute endorsement by XR Summits Sdn Bhd of any product, service, opinion, technology, investment opportunity or commercial offering.",
        },
        { type: "subheading", text: "5.5C Speaker Materials" },
        {
          type: "paragraph",
          text: "Presentation slides, keynote sessions, workshops, demonstrations, masterclasses and educational materials are provided for informational purposes only.",
        },
        {
          type: "paragraph",
          text: "Nothing presented at the Event constitutes legal, financial, tax, medical, investment, technical or professional advice.",
        },
        {
          type: "paragraph",
          text: "Attendees should obtain independent professional advice before acting upon any information presented.",
        },
        {
          type: "subheading",
          text: "5.5D Technology Demonstrations and Cybersecurity",
        },
        {
          type: "paragraph",
          text: "The Event may feature software, hardware, applications, platforms, networks and emerging technologies provided by exhibitors, sponsors, speakers and third parties.",
        },
        {
          type: "paragraph",
          text: "XR Summits Sdn Bhd is not responsible for any system failure, software defect, malware infection, cybersecurity incident, data loss, network interruption or other consequence arising from the use of third-party technologies.",
        },
        {
          type: "paragraph",
          text: "Users interact with such technologies entirely at their own risk.",
        },
        {
          type: "subheading",
          text: "5.5E Investment and Business Opportunities",
        },
        {
          type: "paragraph",
          text: "The Event may include presentations, demonstrations, pitches, investment opportunities, startup showcases and commercial offerings.",
        },
        {
          type: "paragraph",
          text: "XR Summits Sdn Bhd does not verify, endorse or guarantee any investment, business opportunity, commercial arrangement or representation made by any participant.",
        },
        {
          type: "paragraph",
          text: "Attendees are solely responsible for conducting their own due diligence before entering into any commercial transaction or investment decision.",
        },
      ],
    },
    {
      number: "5.6",
      title: "Personal property and insurance",
      blocks: [
        {
          type: "paragraph",
          text: "You are responsible for your own belongings at all times. To the maximum extent permitted by law, we are not liable for loss of or damage to personal property at the venue. It is your responsibility to arrange any travel, medical or other insurance appropriate to your attendance. Sponsors and exhibitors are responsible for insuring their own stands, equipment and personnel as set out in the exhibitor manual.",
        },
      ],
    },
    {
      number: "5.7",
      title: "Travel, visas and accommodation",
      blocks: [
        {
          type: "paragraph",
          text: "You are responsible for your own travel arrangements, visas and accommodation. We are not liable for any travel or accommodation cost you incur if an Event is changed, postponed or cancelled. Where a hotel or travel package is offered through a third party, that booking is subject to the third party's own terms, and you should contact them directly to amend or cancel.",
        },
      ],
    },
    {
      number: "5.8",
      title: "Force majeure and cancellation of an Event",
      blocks: [
        {
          type: "paragraph",
          text: "We are not responsible for any failure to hold, or any change to, an Event caused by circumstances beyond our reasonable control — including acts of God, fire, flood, severe weather, epidemic or pandemic, war, terrorism, civil unrest, strikes, government order or restriction, travel disruption, utility or network failure, or unavailability of the venue. In such circumstances we may, at our discretion, reschedule the Event, relocate it, move it partly or wholly online, or cancel it. Where an Event cannot be rescheduled, the treatment of fees already paid is governed by the Refund Policy at Section 6.",
        },
        {
          type: "paragraph",
          text: "Where circumstances reasonably require, XR Summits Sdn Bhd may convert all or part of an Event into a virtual, hybrid or online format without liability. Registrations shall remain valid for the revised Event format unless otherwise determined by XR Summits Sdn Bhd.",
        },
      ],
    },
    {
      number: "5.9",
      title: "Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the maximum extent permitted by law, our total liability in connection with your attendance at an Event is limited to the amount you paid us for that Event, and we are not liable for any indirect or consequential loss. Nothing in this Disclaimer limits any liability that cannot be limited under Malaysian law, including for death or personal injury caused by our negligence or for fraud.",
        },
      ],
    },
  ],
};
