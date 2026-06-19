import type { LegalDocument } from "./types";

export const refundPolicy: LegalDocument = {
  slug: "refund-policy",
  title: "Refund Policy",
  effectiveDate: "18 June 2026",
  preamble: [
    "This Refund Policy governs cancellations, transfers and refunds for tickets, passes and registrations purchased from XR Summits Sdn Bhd. Sponsorship and exhibition bookings are governed by the cancellation terms in their own agreements.",
  ],
  sections: [
    {
      number: "6.1",
      title: "General position",
      blocks: [
        {
          type: "paragraph",
          text: "All ticket, pass and registration sales are final and non-refundable, except as expressly set out in this Policy or as required by law. We understand that plans change, so we offer the transfer and credit options below as flexible alternatives to a refund.",
        },
      ],
    },
    {
      number: "6.2",
      title: "Transfer to another person",
      blocks: [
        {
          type: "paragraph",
          text: "Up to the start of an Event, you may transfer your ticket or pass to another eligible person at no charge. To do so, email us at register@xr-summits.com with the new attendee's details before the Event begins, so we can reissue the badge. Some categories (for example, discounted or student passes) may only be transferred to a person who qualifies for the same category.",
        },
      ],
    },
    {
      number: "6.3",
      title: "Credit toward a future event",
      blocks: [
        {
          type: "paragraph",
          text: "Instead of attending, you may ask us to convert the net amount you paid into a credit toward a future XR Summits Event. To request a credit, email register@xr-summits.com before the Event. Unless we state otherwise, credits are valid for twelve (12) months from the date of issue, are non-transferable, may not be exchanged for cash, and may be applied toward a ticket, pass or, where applicable, an exhibition booking of equal or greater value (you pay any difference).",
        },
      ],
    },
    {
      number: "6.4",
      title: "Optional cancellation-and-refund schedule",
      blocks: [
        {
          type: "paragraph",
          text: "If you prefer to offer monetary refunds for early cancellations rather than the non-refundable position in Section 6.1, you may adopt a tiered schedule like the one below. The dates and percentages are placeholders and must be set per Event before publishing.",
        },
        {
          type: "table",
          headers: [
            "If written cancellation is received",
            "Refund of fees paid",
          ],
          rows: [
            [
              "More than [60] days before the Event",
              "[80]% refund (we retain a [20]% administration fee)",
            ],
            ["[30]–[60] days before the Event", "[50]% refund"],
            [
              "Fewer than [30] days before the Event",
              "No refund (transfer or credit may still apply)",
            ],
            ["After the Event has started / non-attendance", "No refund"],
          ],
        },
        {
          type: "paragraph",
          text: "If you adopt this schedule, replace Section 6.1 accordingly and keep a single, consistent position across the Website and registration pages.",
        },
      ],
    },
    {
      number: "6.5",
      title: "How to request a cancellation, transfer or refund",
      blocks: [
        {
          type: "list",
          items: [
            "Send your request in writing to register@xr-summits.com, quoting your order or invoice number and the name on the registration.",
            "All cancellations and refunds must be approved by us before they take effect. We will acknowledge your request and confirm the outcome.",
            "Approved refunds are made to the original payment method. Any bank, card or currency-conversion charge applied by a third party on the refunded amount is not borne by us (see the Payment Disclaimer at Section 4).",
          ],
        },
      ],
    },
    {
      number: "6.6",
      title: "Cancellation or change of an Event by us",
      blocks: [
        {
          type: "paragraph",
          text: "If we cancel an Event and cannot reschedule or move it online, you will be offered a credit toward a future Event or, where required by law or where we so decide, a refund of the fees you paid for that Event. If we reschedule or relocate an Event, or move it online, your registration will ordinarily carry over and fees are not automatically refunded. We are not liable for any travel, accommodation or other ancillary cost you incur (see the Event Disclaimer at Section 5).",
        },
      ],
    },
    {
      number: "6.7",
      title: "Compassionate consideration",
      blocks: [
        {
          type: "paragraph",
          text: "We aim to be reasonable in cases of documented medical emergencies or bereavement. Requests outside this Policy will be reviewed individually at our discretion.",
        },
      ],
    },
    {
      number: "6.8",
      title: "Your statutory rights",
      blocks: [
        {
          type: "paragraph",
          text: "Where you deal with us as a consumer, this Policy operates in addition to, and does not exclude, any nonexcludable rights you have under the Consumer Protection Act 1999 or other applicable Malaysian law.",
        },
      ],
    },
  ],
};
