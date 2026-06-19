import type { LegalDocument } from "./types";

export const paymentDisclaimer: LegalDocument = {
  slug: "payment-disclaimer",
  title: "Payment Disclaimer",
  effectiveDate: "18 June 2026",
  preamble: [
    "This Payment Disclaimer applies to all payments made to XR Summits Sdn Bhd for tickets, passes, sponsorship, exhibition space and other products or services.",
  ],
  sections: [
    {
      number: "4.1",
      title: "Currency and pricing",
      blocks: [
        {
          type: "paragraph",
          text: "Unless otherwise stated, all amounts are in Malaysian Ringgit (MYR). Prices are exclusive of Sales and Service Tax (SST) unless stated otherwise; where SST applies it will be itemised on your invoice at the prevailing statutory rate. If you pay from outside Malaysia, your bank or card issuer may apply currency conversion and additional fees over which we have no control.",
        },
      ],
    },
    {
      number: "4.2",
      title: "Accepted payment methods",
      blocks: [
        {
          type: "paragraph",
          text: "We may accept payment by credit, debit or charge card, by online payment gateway, by cheque drawn on a Malaysian bank, or by interbank or telegraphic transfer. The methods available to you will be shown at checkout or stated on your invoice.",
        },
        { type: "subheading", text: "Bank transfer and remittance details" },
        {
          type: "paragraph",
          text: "For payment by interbank transfer, telegraphic transfer or cheque, please email register@xrsummits.com to request our current bank account and remittance details. We will provide them together with your invoice and the payment reference to quote. Please do not transfer funds until you have received these details directly from us.",
        },
      ],
    },
    {
      number: "4.3",
      title: "Processing of card payments",
      blocks: [
        {
          type: "paragraph",
          text: "We do not collect or store your full card or bank account details. Card payments are processed by third-party payment service providers through secure, encrypted channels. By paying, you agree to the terms and privacy practices of the relevant payment provider. We are not responsible for the acts, omissions, security or availability of any third-party payment provider, although we will assist you to resolve a payment issue where we reasonably can.",
        },
      ],
    },
    {
      number: "4.4",
      title: "Authorisation and billing",
      blocks: [
        {
          type: "list",
          items: [
            "By submitting a payment, you warrant that you are authorised to use the payment method and to authorise the charge, whether on your own behalf or on behalf of your organisation.",
            "All bookings must be paid in full to confirm them. If payment is not completed at the time of booking, your registration is provisional only and your place is not guaranteed until cleared payment is received.",
            "If a booking is made before the Event and remains unpaid, we may require payment by card at check-in before granting entry.",
            "Only one discount or promotional code may be applied to a single registration unless we state otherwise.",
          ],
        },
      ],
    },
    {
      number: "4.5",
      title: "Billing errors",
      blocks: [
        {
          type: "paragraph",
          text: "We are not liable for erroneous bank or card statements produced by your bank or payment provider. If a billing error occurs on our side, our sole responsibility is to correct it once you notify us in writing at register@xr-summits.com within a reasonable time of the error appearing.",
        },
      ],
    },
    {
      number: "4.6",
      title: "Late payment and cancellation",
      blocks: [
        {
          type: "paragraph",
          text: "Where credit terms have been agreed, invoices are due by the date stated. We reserve the right to cancel any order, or to suspend access or services, where payment is not received by the due date, and to recover reasonable costs arising from non-payment. Any agreed interest on overdue amounts will be stated on the invoice or in the applicable Additional Terms.",
        },
      ],
    },
    {
      number: "4.7",
      title: "Refunds",
      blocks: [
        {
          type: "paragraph",
          text: "Refunds, where available, are governed by the Refund Policy at Section 6 and are made using the original payment method. We are not responsible for any conversion difference, bank charge or processing fee applied by a third party on a refunded amount.",
        },
      ],
    },
    {
      number: "4.8",
      title: "Security",
      blocks: [
        {
          type: "paragraph",
          text: "We take reasonable steps to keep the payment journey secure, but you are responsible for protecting your own devices, cards and credentials. Please tell us immediately if you suspect any unauthorised transaction relating to a purchase from us.",
        },
      ],
    },
  ],
};
