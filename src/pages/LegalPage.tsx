import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LEGAL_PAGES } from '../core/content/legalPages';

// --- KOMPONEN KONTEN PRIVACY POLICY ---
// --- KOMPONEN KONTEN PRIVACY POLICY ---
const PrivacyPolicyContent = () => (
  <div className="flex flex-col gap-5 text-foreground-muted leading-relaxed" style={{ fontSize: '0.88rem', lineHeight: 1.8 }}>
    <p><strong>Effective Date: 1 August 2023</strong></p>

    <h3 className="text-foreground font-bold text-lg mt-4">Background</h3>
    <p>This Privacy Policy sets out the terms between You and Us as to the use and access of Our Websites by You. This Privacy Policy applies to all Users of Our Websites.</p>
    <p>Your use of any of Our Websites means that You accept, and agree to abide by, all the terms stated in this Privacy Policy, our General Terms, Our Acceptable Use Policy, our Copyright Policy and any applicable Additional terms which apply to You.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">Introduction</h3>
    <p>XR-Summits (“We”) is committed to the protection of your Personal Data and takes the matter of protecting your privacy as a matter of paramount importance.</p>
    <p>This Privacy Policy sets forth how we protect the privacy of your Personal Data under the Personal Data Protection Act 2010 (“PDPA”).</p>

    <h3 className="text-foreground font-bold text-lg mt-4">WHAT PERSONAL DATA DO WE COLLECT?</h3>
    <p>The types of Personal Data that we collect directly from you or from third parties may include (but is not limited to) your name, address, contact details, credit/debit card number/s and expiry date, banking or financial information, residential or office address, billing address, and information relating to Products and Services that you often use on Our Websites.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">HOW DO WE COLLECT YOUR PERSONAL DATA?</h3>
    <p>This Privacy Statement covers any Personal Data provided to us:</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>When you use any of Our Products or Services on Our Websites.</li>
      <li>When you register, open an account, or sign up with Us, for transactions for Products or Services provided or supplied on any of Our Websites.</li>
      <li>When you use or visit online sites operated by XR-Summits and its suppliers or contractors.</li>
      <li>Under any other contractual agreement or arrangement Via a third party Products or Services Provider.</li>
    </ul>
    <p className="mt-2">Some of the other ways we may collect Personal Data also includes (but is not limited to):</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>Communications between Us and You Via telephone, letter, fax, or email.</li>
      <li>When you visit Our Websites or one of our contractors’ websites.</li>
      <li>When you contact us in person.</li>
      <li>When we contact you in person.</li>
      <li>When we collect information about you from trusted third parties who process Our transactions.</li>
    </ul>

    <h3 className="text-foreground font-bold text-lg mt-4">HOW DO WE COLLECT PERSONAL DATA FROM OUR WEBSITES?</h3>
    <p><strong>Your IP Address</strong><br />We use your IP address to help diagnose problems with our server, and to administer our Website. Your IP address is used to help identify you and your registration sign up or membership information and to gather broad demographic information.</p>
    <p><strong>User Feedback Form</strong><br />Our Customer Care Feedback Form requires you to give us contact information (e.g. your name and email address) so that we can respond to your comments or queries. We use your contact information from the Registration form [or when you sign up] to send you information about ourselves. Your contact information is also used to contact you where necessary. Demographic and profile data are also collected at Our Websites. We use your Personal Data to tailor your experience at Our Website by showing you contents, or Products or Services that we think You may be interested in.</p>
    <p><strong>Information on Cookies</strong><br />A cookie is a small amount of data, which often includes an anonymous unique identifier that is sent to your browser from Our Websites and stored on your computer’s hard drive. We use cookies in some of our web pages to store your preferences and record session information. The information that We collect is then used to ensure a more personalized service experience for Our Users. You can adjust settings on Your browser so that You will be notified when You receive a cookie. Please refer to Your browser documentation to check if cookies have been ‘enabled’ or ‘disabled’ on Your computer. You may adjust your setting so that you do not receive cookies.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">WHAT DO WE USE YOUR PERSONAL DATA FOR?</h3>
    <p>We may use Your Personal Data for the following purposes (“Purpose”):</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>To process your Orders and transactions for Products or Services.</li>
      <li>To process other transactions.</li>
      <li>To facilitate your participation in the Cloud-Credit program, or in our other promotions, rewards, lucky draws or loyalty programs as are from time to time offered by us or our Affliiate Partners.</li>
      <li>To send you promotions and information on Products, Services and activities.</li>
      <li>To protect the safety and security of yourself and other Users.</li>
      <li>To investigate and respond to claims or queries from You.</li>
      <li>To comply with any legal or regulatory requirements.</li>
    </ul>

    <h3 className="text-foreground font-bold text-lg mt-4">ACCESSING/LIMITING/CORRECTING/UPDATING YOUR PERSONAL DATA</h3>
    <p>You may request to obtain information of your Personal Data, limit the processing of your Personal Data, and also update or make amendments to your Personal Data as below:</p>
    <p>For account holders or registered customers, you may login to your account and update your Personal Data.</p>
    <p>For every other customer, you may forward your request to admin@xr-summits.com</p>
    <p>We will endeavor to provide the information back to you as soon as is practicable.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">WITHDRAWING CONSENT</h3>
    <p>Please note that it is obligatory for Us to process your Personal Data, without which we will not be able to process your Orders for Products or Services and other transactions that You enter into.</p>
    <p>Nonetheless, you may stop receiving XR-Summits’s Promotional or reward program activities by:</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>Unsubscribing from the mailing list.</li>
      <li>Editing the relevant account settings to “unsubscribe”.</li>
      <li>Sending a request to Us to Customer Services.</li>
    </ul>

    <h3 className="text-foreground font-bold text-lg mt-4">TO WHOM DO WE DISCLOSE YOUR PERSONAL DATA?</h3>
    <p>We will not sell your Personal Data to third parties. Your Personal Data shall only be disclosed or transferred to the following third parties who may be located within or outside Malaysia for the fulfillment of the Purposes described hereinbelow:</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>Our Subsidiaries, Affiliate Partners, and trusted merchants and contractors who work closely with us where necessary to: process your Orders; to provide you with Our Website’s Products or Services; or to process other required information.</li>
      <li>Credit card verification providers, data warehouse and other third parties in order to process your commercial transactions.</li>
      <li>Legal bodies as required by law, such as in compliance with a warrant or subpoena issued by a court of competent jurisdiction compelling disclosure.</li>
      <li>Customs, immigration or other regulatory authorities applicable to You.</li>
    </ul>

    <h3 className="text-foreground font-bold text-lg mt-4">HOW LONG DO WE RETAIN YOUR PERSONAL DATA?</h3>
    <p>We do not retain your personal data longer than necessary for the fulfillment of the Purposes. However, relevant Personal Data may be retained subject to the conditions below:</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>As and when required under applicable legislation.</li>
      <li>Where legal action has arisen and/or is pending.</li>
    </ul>
    <p>We shall take all reasonable steps to ensure that all Personal Data is destroyed or permanently deleted when no longer required for the Purposes herein described.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PERMANENTLY DELETE ACCOUNT</h3>
    <p>You can permanently delete your account at XR-Summits by following step.</p>
    <p>Login to your profile, click on [Delete my Account] at your bottom right corner, click on [Confirm Delete].</p>
    <p>Account deletion will be forever. You will not be able to access your profile in XR-Summits anymore.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PERMANENTLY DELETE YOUR DATA</h3>
    <p>You can permanently delete your data at XR-Summits by following step.</p>
    <p>Login to your profile, click on [Delete my Account] at your bottom right corner, click on [Confirm Delete].</p>
    <p>Data deletion will be forever. You will not be able to access your data in XR-Summits anymore.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">SECURITY</h3>
    <p>No data transmissions over the Internet can be guaranteed to be 100% safe, secure or error free. Consequently, we cannot warrant the security of the information you provide to us. Once we receive your transmission, we make reasonable efforts to ensure its security on our systems. We use Secure Server Software (SSL) and firewalls to protect your information from unauthorized access, disclosure, alteration, or destruction. However, this is not an ironclad 100 % fool proof protection. There is no absolutely failsafe or failproof system whose security systems cannot be breached by third party hackers or mischief makers. You hereby agree that We shall have no liability to you in the event of breach of our security systems by a third party hacker or mischief maker. If we learn of a security systems breach, we shall notify you of the same so that you can take appropriate protective steps to safeguard your critical data.</p>
    <p>By using Our Websites, or providing personal information to us, you agree that we can communicate with you electronically regarding security, privacy and administrative issues relating to your use of Our Websites. We may post a notice on Our websites if a security breach occurs, or may send an email to you at the email address you have provided to us.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">NOTIFICATION OF CHANGES</h3>
    <p>Please note that this Privacy Policy may be amended from time to time to comply with applicable laws and regulations, and such variations may be applicable to you. Do revisit our Website from time to time to review our updates on our Privacy Statement.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">INCORPORATION BY REFERENCE</h3>
    <p>This “Privacy Policy” shall be read in conjunction with our “General Terms” and “Our Acceptable Use Policy” all of which shall be deemed to be incorporated herein by this reference.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">CONTACT</h3>
    <p>For any queries, concerns or complaints in relation to our handling of your Personal Data or Our Personal Data Protection policies, please contact us at admin@xr-summits.com</p>

    <h3 className="text-foreground font-bold text-lg mt-4">DEFINITIONS</h3>
    <p>See Our General Terms.</p>
  </div>
);

// --- KOMPONEN KONTEN TERMS & CONDITIONS ---
const TermsContent = () => (
  <div className="flex flex-col gap-5 text-foreground-muted leading-relaxed" style={{ fontSize: '0.88rem', lineHeight: 1.8 }}>
    <h3 className="text-foreground font-bold text-lg mt-4">General Terms of Use ["General Terms"]</h3>
    <p><strong>Background</strong><br />We XR Summits Sdn Bhd are a private limited company incorporated in Malaysia and are the owners and operators of the XR Summits Sdn Bhd family of Websites [individually “Website/s” or collectively “Our Websites”]. By using any of Our Websites or our mobile applications (for example our Android, iPhone and iPad, Windows apps) You accept that you shall be bound by our current General Terms of Use (“General Terms”), our Acceptable Use Policy, our Privacy Policy and our Copyright Policy (collectively “Our Website Conditions”).</p>
    <p>Our Website Conditions sets out the terms between You and Us under which You may Use or Access Our Websites. Our Website Conditions applies to all Users of Our Websites.</p>
    <p>Our Websites are also made up of a number of specific Sites which deal with the supply of specific Products or Services to specified classes of users such as on a Subscription service or for advertisers. The supply or provision of such Products or Services to a User may be governed by terms of contract that may differ from or are in addition to Our Website Conditions. You hereby agree that these Additional terms ["Additional Terms"], shall apply to You in such an event, in addition to Our Website Conditions.</p>
    <p>Where Additional Terms are applicable, then Our Website Conditions shall be read in conjunction with any applicable Additional Terms. If any terms and conditions contained in Our Website Conditions conflict with any terms and conditions contained within the Additional Terms, then the Additional Terms shall prevail over Our Website Conditions [and only to the extent necessary to resolve such conflict].</p>
    <p>Any applicable Additional Terms shall be specified in the subject Website, and/or in the Products or Services “Order Form”, “Customer”s Order”, “Purchase Order”, “Request for Quotation”, “Request for Services” or “Insertion Order” found at such Website or other contractual documents referred to thereat. You hereby agree that in such instances, those Additional terms shall also be applicable to You and Us in any agreement entered into between You and Us.</p>
    <p>XR Summits Sdn Bhd reserves the right to change the terms contained in Our Website Conditions or the Additional Terms at any time. You are responsible for regularly reviewing all applicable Contractual terms and Additional terms which are be posted on Our Websites for the use of such Websites or for Products and Services provided or supplied.</p>
    <p>If You do not accept Our Website Conditions, or the applicable Additional terms, do not use any of Our Websites. We do change Our Website Conditions, and our Additional terms, from time to time, so You should review them each time that You visit the Website/s.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">Offer and Acceptance</h3>
    <p>No part of Our Websites, or of our Products or Services provided thereat, shall be deemed or intended to constitute a Contractual Offer to You. When You issue Your Order Form, Purchase Order, Customers Order, or Insertion Order [collectively “Order Form”], such Order Form shall be deemed to be Your Offer for the purchase, hire, rental, license, supply or provision of the subject Products or Services. We are at liberty to Accept or Reject Your Offer. If We accept your Offer, We shall issue to You an ‘Acceptance Confirmation’ and an Invoice. Our acceptance Confirmation shall be treated as an “Acceptance” of Your “Offer”.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">LEGAL CAPACITY</h3>
    <p><strong>Individuals</strong><br />You may use any of Our Websites no matter what age You are so long as You agree to and abide by Our Website Conditions. However if You wish to create an account, or to make an offer for the provision or supply of Products or Services, You may only do so if You are over the age of twenty one [21] and You register with us to open an account. If You are below the age of 21, You may not open an account, register with Us or order Products or Services from us. If You seek to do so, You must obtain the consent of Your parent or guardian who can open the account, register with us, and order the said Products or Services [supposing that they are in fact agreeable to do any or all of those things].</p>
    <p><strong>LEGAL PERSONS</strong><br />If You open an account to order Products or Services from us, and You act on behalf of a legal person [see definitions section below], You hereby warrant and undertake that You possess the authority to bind Yourself, Your principals or employers [or the legal person named by you] with whom You are engaged with or acting as employee or agent for.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">REGISTRATION AND ACCOUNT CREATION</h3>
    <p>As part of the registration and account creation process necessary to obtain access to certain of Our Websites, or of particular Products or Services, including those portions that require a fee or payment for access, You shall select a username and a password. You shall not:</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>Select a username already used by another person or very similar to that of another person which is likely to cause confusion.</li>
      <li>Use a username in which another person has rights, without such person’s authorization.</li>
      <li>Use a username that We, in our sole discretion, deems offensive or inappropriate.</li>
    </ul>
    <p>You shall provide to Us documentary proof of identity documents, such as scanned copies of Your Identity Card, Passport or Company profile, should such be necessary. We reserve the right to deny creation of Your account based on Our inability to verify the authenticity of the registration information or documents provided by you.</p>
    <p>You shall be solely responsible for maintaining the confidentiality of Your username and password combination. You shall immediately notify Us in writing of any known or suspected unauthorized use of Your account, or any known or suspected breach of security, including loss, theft, or unauthorized disclosure of Your password or credit, debit, charge card or banking information.</p>
    <p>You are fully responsible for all usage and activity on Your account, including, but not limited to, use of the account by any third party authorized by You to use Your username and password combination. The use of Your account by any individual under the age of twenty one (21) is strictly prohibited.</p>
    <p>If the computer system on which You accessed Our Websites, or the Products or Services on Our Websites, is sold or transferred to another party, You are advised to delete all cookies and software files obtained by or through use of Our Websites or of the Products or Services used or accessed by You.</p>
    <p>We reserve the right to terminate Your account, in Our sole discretion, at any time without notice. You may terminate Your account at any time by submitting feedback or through an email communication. Upon termination, You will receive an automated confirmation via e-mail that the request was received, and Your account will be terminated within five (5) business days. You are responsible for all fees and charges incurred up to the time the account is terminated. Notwithstanding anything else herein, We reserves the right to pursue any and all claims against any User of Your account.</p>
    <p>Whether as an individual or as a business user, You agree to maintain only one account with us at any time for the Provision of any Product or Service, unless otherwise agreed between us. At the time of account creation, You certify that You have no other account(s) with us.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PAYMENT MEDIUMS</h3>
    <p>All payments must be effected in the currency of Malaysia (MYR), unless otherwise agreed in writing between You and Us. Payments may be made using the following payment mediums:</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>By Credit Card, Debit Card or Charge Card.</li>
      <li>By a Cheque issued by a Bank in Malaysia.</li>
      <li>By an Inter Bank Transfer of Funds from Your Bank to Our Bank Account [Telegraphic Transfer].</li>
      <li>Such other method as may be agreed between You and us.</li>
    </ul>
    <p>The Products or Services ordered shall only be shipped, delivered or provided to You once We have received cleared payment of Our invoice. For Services to be provided to you, the service will be activated upon Our receiving cleared payment from You against Our invoice. Once payment has been cleared into Our Bank accounts, We shall provide You notifications by email advising You: Of the cleared payment paid against Our invoice; Of the shipment of Your Products; Of the relevant particulars of Your subscribed for or licensed Products and Services, and any relevant activation codes, usernames or passwords, or download links for software or apps, which are applicable for such Products or Services.</p>
    <p>Payments by Cheque shall comply with the following requirements:<br />Cheque Payment shall be Made in favour of: XR SUMMITS SDN BHD<br />And posted to this Postal Address : 11-3A Dataran Kencana, UOB Business Park, No. 1, Jalan Pengaturcara U1/51A,  Seksyen U1,40150 Shah Alam,Selangor Darul Ehsan, Malaysia.<br />Tel: +60 122020624 ; Email: sales@xr-summits.com  Web : https://xr-summits.com/</p>
    <p>Interbank, swift or wire Payments shall be paid to Our Bank Account as follows:<br />Name of Bank : ALLIANCE BANK<br />Account Name : XR SUMMITS SDN BHD<br />Account No : 120150013033930  CURRENT<br />BRANCH: SUBANG JAYA 15/2A</p>
    <p>Where payment has not been received by Us within fourteen days of the issue of Our Invoice, We reserve the right to cancel Your order without any recourse by You. We reserve all of Our legal rights in such an instance for any costs, expenses or charges incurred by Us which We shall have the right to recover against You for such cancelled orders.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">USE OF CARDS FOR RECURRING PAYMENTS</h3>
    <p>XR Summits Sdn Bhd will charge the credit card, debit card, or charge card You provide (“Card”) on a recurring basis at the applicable times that the applicable fees or charges become due and payable by You as per the contract entered into between You and Us. When You provide Us with Your Card particulars, You may elect to either make it valid solely for use by You or for use by both You and the organization that You work for (your “Organization”). If You elect to make Your Card valid for use by Your Organization, anyone within Your Organization may make effect the payment of fees or charges against Your Card. All applicable Additional Fees or charges will be charged to Your Card, when a product or service is ordered by You and/or Your Organization.</p>
    <p>You understand that You may withdraw this authorization to make automatic payments, by notifying XR Summits Sdn Bhd at 14 days If such notice of revocation is not received by XR Summits Sdn Bhd at least three (3) days in advance of a scheduled payment date, XR Summits Sdn Bhd may still charge Your account for the next payment and Your revocation will not take effect until the following payment.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">INTELLECTUAL PROPERTY</h3>
    <p>All Content included on Our Websites, unless uploaded by Users, including, but not limited to, text, graphics, logos, icons, images, sound clips, video clips, data compilations, page layout, underlying code and software is the property of XR Summits Sdn Bhd, our affiliates or other relevant third parties. By continuing to use Our Websites you acknowledge that such materials are protected by applicable Malaysia International intellectual property laws, the applicable laws of other countries or under international law or conventions.</p>
    <p>You shall not reproduce, copy, distribute, store or in any other fashion re-use material from Our Websites, unless otherwise indicated on the Websites, or unless given express written permission to do so by Us.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">THIRD PARTY INTELLECTUAL PROPERTY</h3>
    <p>Unless otherwise expressly indicated, all Intellectual Property rights including, but not limited to, Copyright and Trademarks, in product images and descriptions belong to the manufacturers or distributors of such Products or Services, as may be applicable.</p>
    <p>You shall not reproduce, copy, distribute, store, or in any other fashion, re-use such material, unless otherwise indicated on the Websites, or unless given express written permission to do so by the relevant manufacturer, supplier or content owner.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">LINKS TO OTHER WEBSITES</h3>
    <p>Your Websites may contain links to other sites. Unless expressly otherwise stated, these Websites are not under the control of XR Summits Sdn Bhd or that of our affiliates. We assume no responsibility for the content of such Websites and disclaim liability for any and all forms of loss or damage arising out of the use of them by You or any third party. The inclusion of a link to another site on Our Websites does not imply any endorsement or promotion of the sites themselves, of those in control of them, or of the Products and Services provided or supplied by such third parties on their Websites.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">LINKS TO OUR WEBSITES</h3>
    <p>Those wishing to place a link to Our Websites may do so only to the home page of our Website which is : https://www.XR Summits Sdn Bhd.com.my/ without prior permission. Deep linking (i.e. links to specific pages within our Websites) requires our express permission. To find out more please contact Us by email at admin@xr-summits.com</p>

    <h3 className="text-foreground font-bold text-lg mt-4">USE OF COMMUNICATION FACILITIES AND SYSTEMS</h3>
    <p>When using the enquiry form, or any other contact or communication System on Our Websites, You should do so in accordance with the following rules:</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>You shall not use foul, obscene or vulgar language.</li>
      <li>You shall not submit Content that is unlawful or otherwise objectionable. This includes, but is not limited to, content that is abusive, threatening, harassing, defamatory, ageist, sexist or racist.</li>
      <li>You shall not submit Content that is intended to promote or incite violence or any criminal act or conduct.</li>
      <li>Your submissions are to be made using the English language only as We are unable to respond to enquiries submitted in any other languages.</li>
      <li>The means by which You identify yourself must not violate these Website conditions or any applicable laws of the country where you access the world wide web.</li>
      <li>You shall not impersonate any other person, particularly employees and representatives of XR Summits Sdn Bhd or our affiliates.</li>
      <li>You shall not use our Systems for unauthorized mass-communication materials, which include, for instance, “spam” or “junk mail”.</li>
    </ul>
    <p>You acknowledge that XR Summits Sdn Bhd reserves the right to monitor any and all communications made by You to Us or by Your using any of our Website/s Systems. You acknowledge that XR Summits Sdn Bhd may retain copies of any and all communications made to Us from Your use of our Website/s or through using our Website/s Systems. You acknowledge that any information You send to us through our Website/s Systems or post on the forums/chat/community/blog or similar Services [interactive services], may be modified by us in any way and You hereby waive Your moral right to be identified as the author of such information works or materials. Any restrictions You may wish to place upon our use of such information, works or materials must and shall be communicated to Us in writing in advance and We reserve the right to reject such terms and associated information works or materials.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">ACCOUNTS AND REGISTRATION</h3>
    <p>In order to procure specific Products or Services on Our Websites or to use the forums/chat or similar interactive services, You are required to create an Account which will contain certain personal details and Payment Information which may vary based upon Your intended use of Our Websites and its Products or Services. By continuing to use Our Websites You represent and warrant that: All information that You submit is complete, factual and truthful; You have permission to authorize Payment to Us using the payment method designated by you; You have permission to submit the relevant payment information to Us; You will, on a continuing basis, and as a continuing obligation, keep such payment or banking information accurate and up-to-date. Your creation of an Account is further affirmation of Your representations and warranties which are made herein. You will not share Your Account details, particularly Your username and password combination, with third parties or unauthorized persons.</p>
    <p>XR Summits Sdn Bhd accepts no responsibility or liability for any loss or damage incurred by You as a result of Your Account details being shared by You with any third parties. If You use a shared computer, it is recommended that You do not save Your Account details in Your internet browser. If You have reason to believe that Your Account details have been obtained by another person without Your consent, You should contact Us immediately at admin@xr-summits.com to suspend Your Account and cancel any unauthorized orders or payments that may be pending. When choosing Your username You are required to adhere to the terms set out herein. Any failure to do so could result in the suspension and/or deletion of Your Account.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">TERMINATION AND CANCELLATION</h3>
    <p>Either XR Summits Sdn Bhd or You may terminate Your Account. If We terminate Your Account, You will be notified by email and an explanation for the termination may be provided. Notwithstanding the foregoing, We reserve the right to terminate Your account without giving reasons therefor. If XR Summits Sdn Bhd terminates Your Account, any current or pending orders or payments on Your Account will be cancelled and the provision of Products or Services to You will be cancelled. XR Summits Sdn Bhd reserves the right to cancel orders or payments without stating any reasons for the same. Such may be effected at any time prior to the processing of any payment by You or the commencement of any ordered for Products or Services.</p>
    <p>If orders or payments are cancelled for any reason prior to delivery of the Products to You, or commencement of the Services, You will be refunded any monies paid in relation to those purchases or transactions. If You terminate Your Account, any non-completed orders or payments will be cancelled and You will be refunded any monies paid in relation to those orders.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PAYMENTS</h3>
    <p>Any and all monies are due for payment on completion of the order or on the dates, or intervals specified in that Order as may be applicable, unless alternative arrangements are agreed between You and XR Summits Sdn Bhd. Agreed Interest for late payments shall be charged at the rate of two [2] percent per month until all sums due and owing by You have been paid.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PRODUCTS AND SERVICES PRICING AND AVAILABILITY</h3>
    <p>Where applicable, You may be required to select Products and Services which are packaged into different categories for different User requirements or types. All pricing information, or fees or charges, for Products and Services on Our Websites are correct at the time of going online. You hereby agree that XR Summits Sdn Bhd reserves the right to change prices, fees or charges and alter or remove any Special Offers, Promotions or Rewards from time to time as it deems necessary. All prices fees or charges on Our Websites do not include GST, unless otherwise specified. All prices fees or charges on the Website for the sale, subscription, supply, lease, hire or license of Products or services do not include GST. The final price that shall be paid by You shall be itemized and specified in our Invoice which shall include the following items as are applicable: GST [at the rate of 6%]; Delivery Costs [if applicable]; Insurance Costs [if applicable].</p>

    <h3 className="text-foreground font-bold text-lg mt-4">SERVICE AVAILABILITY</h3>
    <p>During the term of the applicable, XR Summits Sdn Bhd will use reasonable efforts to achieve a Monthly Uptime Percentage of at least 99.5% for any calendar month. The following are not counted as Downtime: Service unavailability caused by scheduled maintenance of the platform used to provide the applicable service (XR Summits Sdn Bhd will endeavor to provide twenty four (24) hours’ advance notice of service-affecting scheduled maintenance); or Service unavailability caused by events outside of the direct control of XR Summits Sdn Bhd or its subcontractor(s), including any force majeure event, the failure or unavailability of XR Summits Sdn Bhd’s systems, the Internet, and the failure of any other technology or equipment used to connect to or access the service.</p>
    <p><strong>Support Services.</strong> Support consists of assistance provided to customers via the Internet with respect to use of the Application and to resolve Issues. Support cases are tracked and managed through access to email or livechat services operated by XR Summits Sdn Bhd’s support center. Basic Support is available Monday through Friday during XR Summits Sdn Bhd’s business hours, excluding public holidays.</p>
    <p><strong>Additional Professional Services.</strong> Customer may purchase supplemental professional services for an additional fee. Fees related to such services will be set forth in a statement of work signed by both parties. If no fee is stated, then services will be provided at XR Summits Sdn Bhd’s standard rate for equivalent services in effect at the time the statement of work is executed.</p>
    <p><strong>On-Site Services.</strong> Customer may purchase on-site Support. Customer may purchase training services with respect to the Application. Customer may purchase consulting services related to defects caused by Issues other than the Application.</p>
    <p><strong>Out of Pocket Expenses.</strong> Customer shall pay all reasonable out-of-pocket expenses incurred by XR Summits Sdn Bhd, including costs for meals, lodging, and travel related to these additional services.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PROVISION OF SERVICES</h3>
    <p>Provision of Services shall commence when full payment has been received from you. XR Summits Sdn Bhd shall use its best endeavours to provide the Services with reasonable skill and care. Provision of all Services shall be subject to Our Website Conditions and the Additional Terms which shall be applicable to the provision of particular Services as are Ordered by You. In the event that the Services provided are not in conformity with Your Order and thus incorrect or incomplete, You should contact Us within Two [2] days to inform Us of the mistake. XR Summits Sdn Bhd will ensure that any necessary corrections to the Services provided are made in a reasonable time frame. XR Summits Sdn Bhd reserves the right to make changes or alterations to the Services from time to time.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PROVISION OF PRODUCTS</h3>
    <p>Whilst every effort has been made to ensure that all graphical representations and descriptions of Products available from XR Summits Sdn Bhd correspond to the actual Products, XR Summits Sdn Bhd is not responsible for any variations from these descriptions. Where appropriate, You may be required to select the required [ticket] [type] [performance] [variant] [capacity] [promo] [other features] of the Products that is to be provided or supplied to you. XR Summits Sdn Bhd does not represent or warrant that such Products will be available. Stock indications are not provided on Our Websites. All pricing information on Our Websites for the provision or supply of Products are correct at the time of going online. XR Summits Sdn Bhd reserves the right to change prices and alter or remove any promotions or special offers from time to time. All prices on the Website for the sale, subscription, supply, lease, or hire of Products do not include GST/Sales and Service Tax [if applicable]. The final price that shall be paid by You shall include the following items as are applicable: GST/Sales and Service Tax [if applicable]; Delivery Costs [if applicable]; Insurance Costs [if applicable].</p>

    <h3 className="text-foreground font-bold text-lg mt-4">SOFTWARE OR APPLICATIONS ['APPS'] SUPPLIED OR PROVIDED WITH ANY PRODUCTS OR SERVICES</h3>
    <p>Where any Products or Services comprises software or apps for use with the ordered Products or Services, such may be subject to an End User License Agreement (“EULA”) or other contractual terms provided by a third party Owner or the Licensor, for the Use of the software or Apps by You. You hereby agree that in any such instances, You will comply with such EULA, or the Terms of Use of such software or Apps. If such software or apps are not accompanied by a EULA, or Terms of Use, then XR Summits Sdn Bhd grants to You a non-exclusive, revocable, personal, non-transferable license to use such software or apps, solely in connection with the Products and Services, and in accordance with Our Website conditions and any applicable Additional Terms relative to such Products or Services.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">TITLE AND PROPERTY AND RISK OF LOSS OR DAMAGE</h3>
    <p>In a sale and purchase transaction, Title and Property in the Products will not pass to You until the full Invoice price for those Products have been received and credited into our Bank Account. Where payment has been received, Title and Property, and risk of loss or damage to the Products shall be deemed to pass to You when the Products are delivered to the Courier or shipping company. Where Products are leased, hired or licensed for Your use, You hereby agree that Title and Property in such Products remain with XR Summits Sdn Bhd [or other third party providers, suppliers or licensors] and You shall not deal with the Products in any manner that is in breach of the contract or terms of subscription, lease, hire, or license to use the Products. Unless otherwise agreed, You are obliged to insure the Products for ‘ALL RISKS’ whilst they are Used by You, or in Your care or control. You hereby agree that if any Products have been provided or supplied to you, and You have not made payment of the purchase price, or the fees or charges for the subscription, lease, hire or license of such Products, then XR Summits Sdn Bhd [or the Product Owners, Providers Suppliers or Licensors] have the legal right to enter Your premises and remove the subject Products from Your premises.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">DELIVERY OF PRODUCTS</h3>
    <p>XR Summits Sdn Bhd will notify You by way of email when your Products are to be dispatched to you. The message will contain details of estimated delivery times in addition to any reasons for a delay in the delivery of the Products to be supplied to you. Delivery of Products will only be made to a residential or business address in Malaysia, unless otherwise agreed in writing. We will not deliver any Products to a P.O. Box address.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">RETURNS AND REFUNDS</h3>
    <p>XR Summits Sdn Bhd aims to always provide high quality Products and Services that are fault free and undamaged. On occasions however, goods may need to be returned. Returns are governed by these Terms and Conditions. If the Purchaser receives Products which do not match those ordered, or comply with the Product description or specifications, the Purchaser should contact Us within Ten [10] working days to arrange for the collection and return of such Product/s. The Purchaser will be given the option to have the Product/s replaced with those ordered (if available) or to be refunded through the payment method used when the Products were purchased. Refunds and replacements will be issued only upon our receipt of the returned Products at the address to which such products are to be returned. If any Products purchased have faults when they are delivered, the Purchaser should contact XR Summits Sdn Bhd within Ten [10] working days to arrange for the collection and return. XR Summits Sdn Bhd is not responsible for paying the shipment costs for such returns. Products must be returned in their original condition, with all packaging and product documentation that were supplied. Upon receipt of the returned Products, the price of the Products, as paid by You, will be refunded to You through the payment method used when the Products were purchased. If any Products develop faults within their warranty period, the Purchaser is entitled to a repair or replacement under the terms of the applicable warranty. If Products are damaged in transit, and the damage is apparent on delivery, the Purchaser should sign the delivery note to the effect that the goods have been damaged. In any event, such damage should be reported to XR Summits Sdn Bhd within Ten [10] working days. The Purchaser shall be responsible for return of the Product to us at the address designated by Us for returns. XR Summits Sdn Bhd is not responsible for paying the shipment costs or insurance thereon which shall be wholly borne by the Purchaser. Upon receipt of the returned Products, the price of the Goods, as paid, will be refunded through the payment method used when the Products were purchased. If the Products have been dispatched or have reached you, but You the Purchaser decides that they are no longer required, the Goods can be returned to XR Summits Sdn Bhd within ten [10] days of receipt. Products can only be returned for this reason if their packaging remains unopened and the Goods can be re-sold, as new, without any additional work on the part of XR Summits Sdn Bhd or the Suppliers of the Products. The Purchaser is responsible for paying shipment and insurance costs if Products are returned for this reason. If the Purchaser wishes to return Goods to XR Summits Sdn Bhd for any of the above reasons, please contact us at admin@xr-summits.com to make the appropriate arrangements with Us. XR Summits Sdn Bhd reserves the right to exercise discretion with respect to any returns under these Website Conditions. Factors which may be taken into account in the exercise of this discretion include, but are not limited to: Any use or enjoyment that You may have already had out of the Goods or Products; Any characteristics of the Goods or Products which may cause them to deteriorate or expire rapidly; The fact that the Goods or Products consist of audio or video recordings or computer software and that the packaging has been opened; Any damage to the goods or Products, even if they be superficial and the degree and extent to which the Goods or Products have been used.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">THIRD PARTY WEBSITES AND THEIR CONTENT AND MATERIALS</h3>
    <p>Certain Products and Services may involve the distribution of Your Submission to third party Websites over which XR Summits Sdn Bhd has no control. In addition, XR Summits Sdn Bhd may host or provide third party content on Our Websites or may provide links to products, services, Webpages, Websites and other content of third parties. You are responsible for ensuring that Your Submission complies with the terms of use associated with any such third party Websites and You understand that Your Submission and Your use of any third party Websites will be treated in accordance with that third party’s Website’s own terms of use and policies. XR Summits Sdn Bhd does not endorse, warrant, promote or take any responsibility for, or make any warranties or representations pertaining to these third party Websites and such content, including but not limited to the content, availability, or functionality of such Websites and/or the Products and Services associated with them or offered on such Websites.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">DEALING WITH THIRD PARTY SUPPLIERS OF PRODUCTS AND SERVICES</h3>
    <p>You agree that Your dealings with Third Party Sellers, Suppliers, licensors or Service Providers [collectively “third party suppliers”] found on or through Our Websites including payment and delivery for any Products or Services offered thereat, and any other terms, conditions, warranties or representations associated with such dealings, are solely between You and such Third Party suppliers, and You hereby irrevocably agree that XR Summits Sdn Bhd shall not be responsible or liable for any claims or disputes You may have with such third parties, no matter for what reasons or causes.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">DISCLAIMERS</h3>
    <p>You Hereby irrevocably Acknowledge And Agree That: XR Summits Sdn Bhd makes no warranty or representation that Our Websites, or our Products and Services, shall meet Your requirements, that it will be of satisfactory quality, that it will be fit for a particular purpose/s, that it will not infringe the rights of third parties, that it will be compatible with all computer systems, that it will be secure, and that all information provided will be accurate. We make no warranties or guarantees of any specific results from the use of Our Websites and of the Products and Services offered thereat. XR Summits Sdn Bhd is not responsible for any material created or submitted by Users of Our Websites. No material created by Users is endorsed or otherwise supported by XR Summits Sdn Bhd. XR Summits Sdn Bhd assumes no responsibility for any offence, loss or other harm resulting from material created or submitted by Users. No part of Our Websites is intended to constitute professional opinion or advice and the content of Our Websites shall not be relied upon when making any decisions or taking any action of any kind. The data and information on Our Websites are not designed with commercial purposes in mind. XR Summits Sdn Bhd makes no representation or warranty that the content of Our Websites are suitable for use in commercial situations or that it constitutes accurate data and / or professional advice on which business or financial decisions can be based. All Users are expressly warned that they secure and obtain the advice of professional persons [such as lawyers, accountants, and property surveyors or valuers] when making a decision as to whether to enter into a transaction relating to real property. Whilst every effort has been made to ensure that all descriptions of Products and Services available from Our Websites correspond to the actual Products or Services available, XR Summits Sdn Bhd is not responsible for any variations from these descriptions. Whilst XR Summits Sdn Bhd uses reasonable endeavours, on a best efforts basis, to ensure that Our Websites, and our Products and Services, are secure and free of errors, viruses and other malware, all Users are advised to take responsibility for their own security, that of their personal details and their computers.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">CHANGES TO OUR WEBSITES, THE PRODUCTS AND SERVICES PROVIDED AND SUPPLIED, AND OUR WEBSITE CONDITIONS, AND ANY APPLICABLE ADDITIONAL TERMS</h3>
    <p>XR Summits Sdn Bhd reserves the right to change Our Websites, the Products or Services, its Content, or these Website conditions, and any applicable Additional terms at any time. You will be bound by any changes to the Website conditions and any applicable Additional terms from the first time You use Our Websites following the changes. If XR Summits Sdn Bhd is required to make any changes to our Terms and Conditions by law, these changes will apply automatically to any orders currently pending, in addition to any orders placed by You in the future.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">AVAILABILITY OF Our Websites AND OF OUR PRODUCTS AND SERVICES</h3>
    <p>You hereby irrevocably agree that Our Websites and the Products and Services provided on Our Websites, or any of them, are provided on an “AS IS”, on an “AS AVAILABLE”, and on an ‘WITH ALL FAULTS ACCEPTED’ basis. We make and give no representations, warranty or conditions, whether statutory, express or implied, that the Products and Services shall be free of defects and / or faults. To the maximum extent permitted by law, We provide no warranties (statutory, express or implied) of fitness for a particular purpose, accuracy of information, compatibility, reliability or of satisfactory quality. XR Summits Sdn Bhd accepts no liability for any disruption or non-availability of Our Websites, or of its Products and Services resulting from external causes, including, but not limited to, ISP equipment failure, host equipment failure, communications network failure, power failure, natural events, force majeure events, acts of war or legal restrictions and censorship.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">LIMITATION OF LIABILITY</h3>
    <p>To the maximum extent permitted by law, XR Summits Sdn Bhd accepts no liability for any direct or indirect loss or damage, foreseeable or otherwise, including any indirect, consequential, punitive, special, or exemplary damages arising from the use of any of our Websites, our Products or services, business interuption or loss of profit, business opportunity, or goodwill, or any information contained therein. Users should be aware that they use Our Websites, our Products and services, and its Content at their own sole risk.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">NO WAIVER</h3>
    <p>In the event that XR Summits Sdn Bhd fails to exercise any right or remedy contained herein [or specified in the additional terms], this shall not be construed as a waiver of that right or remedy.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PREVIOUS TERMS AND CONDITIONS, ANY APPLICABLE ADDITIONAL TERMS OR POLICIES</h3>
    <p>In the event of any conflict between our current Website conditions, and any applicable Additional terms, with prior versions of the same [that is to say, Website conditions and Additional terms], the current versions shall apply to any contract entered into between You and Us, unless it is expressly stated otherwise.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">THIRD PARTY RIGHTS</h3>
    <p>Nothing in our Website Conditions or Additional terms shall confer any rights upon any third party/parties. The agreement created by these Website conditions and/or Additional terms is between You and XR Summits Sdn Bhd, its subsidiaries or affiliates.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">ELECTRONIC AND MOBILE COMMUNICATIONS</h3>
    <p>XR Summits Sdn Bhd may choose to deliver all communications to You electronically, which may include: (a) email [to the email address that You provide to XR Summits Sdn Bhd upon registration] or (b) telefax [to the fax address that You provide to XR Summits Sdn Bhd upon registration]. You agree to do business electronically with XR Summits Sdn Bhd, and to receive electronically all current and future notices, disclosures, communications and information. You hereby agree that the aforementioned communications or notices provided electronically satisfies any legal requirement that such communications be in writing. You agree that You meet the following technical requirements and are able to access and retain copies of notices and information sent or made available electronically: internet access; PDF reader; ability to print with Internet browser; e-mail. Notices that are required to be sent to Us in hard copy shall be given to Us either by hand or courier delivery or posted to our Offices at 21-3 & 21-3A, 21st Floor, Oval Tower @ TTDI Damansara, Jalan Damansara, Off Lebuhraya Sprint, Taman Tun Dr Ismail, 60000, Kuala Lumpur. Such notice will be deemed received 3 days after posting if sent by post or AR Registered Mail, and the day of handover if delivered by hand. XR Summits Sdn Bhd may from time to time send You information about our Products or Services. If You do not wish to receive such information, please click on the “Unsubscribe” link in any email which You receive from us.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">LAW AND JURISDICTION</h3>
    <p>Our Website Conditions and the relationship between You and XR Summits Sdn Bhd shall be governed by and construed in accordance with the Law of Malaysia.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">NON ASSIGNMENT</h3>
    <p>You hereby agree that You shall not assign, transfer, make over, subcontract, or delegate any Agreement that is entered into between You and Us to any third party without our express written consent. Any such purported assignment shall be treated as Void and of no legal effect against Us.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">EVENTS BEYOND OUR REASONABLE CONTROL [FORCE MAJEURE]</h3>
    <p>We will not be held responsible for any delay or failure to comply with our obligations under these Website Conditions or any applicable Additional terms[or in relation to any Agreement entered into between You and Us] if the delay or failure arises from any cause/s which is beyond our reasonable control, including by reason of Force Majeure, which shall include any default due to or caused by an Act of God, war, or threatened war, act of terrorism or threatened act of terrorism, strike, lockout, industrial action, health epidemic or pandemic, fire, flood, drought, tempest or other event beyond Our control.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">DISPUTES OR CLAIMS</h3>
    <p>Any controversy, claim, or dispute of whatever nature arising between You and XR Summits Sdn Bhd (a “Dispute”), including, without limitation, a Dispute arising out of, or having to do with Your Use or Access to Our Websites, including any Products, Services, Content, or any Agreement entered into between You and Us, shall be resolved by binding arbitration. Our agreement to arbitrate shall continue in full force and effect despite the expiration, rescission, or termination of the Agreement between Ourselves and You. Either party may begin the arbitration process by giving a written notice to the other party setting forth the nature of the Dispute and its pertinent particulars. The arbitration shall be in accordance with the Kuala Lumpur Regional Centre for Arbitration Rules which shall be deemed to be incorporated herein by this reference. The arbitration shall be held in Kuala Lumpur, Malaysia, and shall be conducted in the English Language. The award of the arbitrator(s) shall be treated as final and binding on the disputant parties and enforceable in any court of competent jurisdiction. In any Dispute which involves any claim or dispute where the monies claimed [whether as loss, damages, compensation or otherwise] exceeds more than MYR 100,000, three arbitrators shall adjudge the dispute. For claims under this sum, one arbitrator shall adjudge the dispute. The arbitrator(s) shall have the authority to award actual money damages (with interest on unpaid amounts from the date due until repayment), specific performance, and temporary injunctive relief, but the arbitrator(s) shall not have the authority to award the excluded losses or damages as is specified in these Website Conditions or in any applicable Additional terms. Either party may request the arbitrators to provide a Reasoned Award in writing at the end of the arbitration. The Award of the Arbitrators shall be provided in writing no later than thirty [30] consecutive days from the date that the arbitration ends. The party that substantially prevails in the dispute shall be entitled to its arbitration costs and attorney’s or solicitors fees, which matter shall be adjudged by the arbitrator/s. If a party fails to proceed with arbitration, unsuccessfully challenges the arbitration proceedings, or fails to fully comply with the orders or directions of the arbitrators, the arbitrators and the other parties involved in the arbitration shall nevertheless be entitled to proceed with the arbitration until its conclusion. Except as otherwise required by law, the parties agree to maintain as strictly confidential all information or documents obtained during the arbitration process, including the resolution of the Dispute. Notwithstanding the parties agreement to settle their disputes by arbitration, the parties hereby agree that in relation to intellectual property issues, or where the rights of a party are in serious jeopardy, and incalculable loss may be suffered by an innocent party, then, in such an event, the aggrieved party shall be entitled to move the High Court sitting in Kuala Lumpur, Malaysia, so that equitable reliefs can be provided, such as injunctions, declarations, accounts or specific performance. The parties agree that resort to legal process shall not stay the arbitration proceedings, which shall proceed to resolve any other issues in dispute between the parties.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PRIVACY POLICY</h3>
    <p>Our Privacy Policy [To view our Privacy Policy Click here] shall be deemed to be incorporated herein by this reference.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">ACCEPTABLE USE POLICY</h3>
    <p>Our Acceptable Use Policy [To view our Acceptable Use Policy Click here] shall be deemed to be incorporated herein by this reference.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">COPYRIGHT POLICY PURSUANT TO THE DIGITAL MILLENNIUM COPYRIGHT ACT [DMCA]</h3>
    <p>Our Copyright Policy [To view our Copyright Policy click here] shall be deemed to be incorporated herein by this reference.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">DEFINITIONS</h3>
    <p>The Definitions specified here shall, unless the context requires otherwise, apply to our General Terms, Our Privacy Policy, our Acceptable Use Policy, our Copyright Policy and any applicable Additional terms. “XR Summits Sdn Bhd” means XR Summits Sdn Bhd, its subsidiaries, affiliates, agents, servants and contractors. “Account” means collectively the personal information, Payment Information and credentials used by Users to access Paid Content and / or any communications System on Our Websites. “Courier” means any third party responsible for transporting Goods or Products from our Premises to that of the Customers. “Content” means any text, graphics, images, audio, video, software, data compilations and any other form of information capable of being stored in a computer that appears on or forms part of Our Websites. “Goods” or “Products” means any Products that We advertises and / or makes available for sale, subscription, lease, hire, or license through Our Websites. “Services” means collectively any online facilities, tools, Services [including interactive services] or information that XR Summits Sdn Bhd makes available through Our Websites either now or in the future. “Payment Information” means any details required for the purchase of Products or Services from our Websites. This includes, but is not limited to, credit / debit card numbers, bank account numbers and bank sorting codes. “Purchaser”means any person or business that buys Goods from any of our Websites. “Invoice” means collectively any invoices, receipts or similar document that may be in hard copy or electronic form. “System” means any online communications infrastructure that XR Summits Sdn Bhd makes available through our Websites either now or in the future. This includes, but is not limited to, web-based email, message boards, live chat facilities and email links. “You” “Customer” “User” means You or any third party that uses or accesses Our Websites or our Products and Services. “Our Websites” means the websites that are specified at the preamble to these General Terms of Use. “Affiliate” or “subsidiary” means any related or associate company of XR Summits Sdn Bhd including their successors, assigns, employees and agents. “Agreement” or “Contract” means these Website Conditions, any applicable Additional Terms, and Policy terms which are applicable to the use of any of Our Websites, or for Products or Services ordered, supplied or sought by You from Us which shall be specified in the relevant Website [or webpage], the Order Form, Customer’s Order, Purchase Order, Insertion Order, Acceptance Confirmation, Invoice, or such other document provided or displayed on Our Websites in relation to such Products or Services. “Contents” means all information, text, sound, and music, Software, photographs, videos, graphics, data, messages or other materials. “Products” or “Services” means any tangible or intangible Products or Services listed on any of Our Websites. “Order Form”, “Customers Order” or “Purchase Order” means a written request provided or submitted [on Our prescribed order form or interactive forms] by You to Us which shall be deemed and treated as an Offer to Purchase or as an Offer for the Provision, Supply, license, hire or subscription of Products or Services [as the case may be]. ‘Supply’ or ‘Provision’ of ‘Goods’ ‘Products’ or ‘Services’ shall encompass, according to the context where the terms are used, a Sale, Subscription, License, Hire, Rental, or Assignment transaction. ‘Acceptance Confirmation’ means the document that We send to You which is an Acceptance of Your “Order Form”, “Customer’s Order” or “Purchase Order”. ‘Individual’ or ‘natural person’ shall mean a human being who has reached the age of majority and has legal capacity to contract. ‘Legal Person’ means any entity created, formed, registered or incorporated pursuant to the Laws [or internal Laws] of a Country, State or any political subdivision thereof, or pursuant to International Law or Conventions. For the avoidance of doubts, such shall encompass a sole proprietorship, a general or limited partnership, a Company or Corporation [whether public or private, and whether with limited liability or unlimited liability], Trusts, Foundations, Societies, and Associations of Persons. A ‘party’ means either ‘XR Summits Sdn Bhd’ or a ‘User’ as is applicable to the context in which such expression is used. ‘The parties’ means XR Summits Sdn Bhd and the User collectively. ‘Us’ ‘We’ ‘Our’ means XR Summits Sdn Bhd, its subsidiaries, affiliates and partners. ‘Use’ or ‘Access’ in relation to use or access to any of Our Websites and its services shall also apply to use or access via any mobile device or application. ‘User’ ‘You’ ‘Your’ ‘Subscriber’ means you, the User of any of Our Website or Our Services. Our “Website Conditions” shall mean collectively our “General Terms” our “Privacy Policy”, our ‘Acceptable Use Policy’ and Our Copyright Policy, which shall be deemed to apply to all Users, Subscribers or Members of all of Our Websites, and of our Products or Services, unless the context provides otherwise. ‘Subscriber’ shall mean any User who enters into a subscription or membership service for the Use of any specific Website or our Products or Services on a subscription basis or recurring basis.</p>
  </div>
);

// --- KOMPONEN KONTEN REFUND POLICY ---
const RefundPolicyContent = () => (
  <div className="flex flex-col gap-5 text-foreground-muted leading-relaxed" style={{ fontSize: '0.88rem', lineHeight: 1.8 }}>
    <h3 className="text-foreground font-bold text-lg mt-4">REFUNDS FOR CANCELLATION OF YOUR PURCHASE</h3>
    <p>Purchases made from the XR Summits Website online<br />The deadline to receive refunds for cancellation of any portion of your Summit Purchase is September 10, 2023 5:00pm EST</p>

    <h3 className="text-foreground font-bold text-lg mt-4">PLEASE NOTE</h3>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>Refunds requested from July 1, 2023 are eligible for an 80% refund of the total purchase.</li>
      <li>Refunds requested from August 1 – August 31, 2023 are eligible for a 60% refund of the total purchase.</li>
      <li>Refunds requested from September 1-29 , 2023 ARE NOT ELIGIBLE FOR A REFUND.</li>
    </ul>

    <h3 className="text-foreground font-bold text-lg mt-4">ALL REFUNDS MUST BE PRE-APPROVED</h3>
    <p><strong>STEP 1:</strong> All cancellations must be submitted in writing to info@xr-summits.com<br />
      <strong>STEP 2:</strong> A Summit Staff Member will contact you to review and process your refund request. Refunds will be returned if cancellation notice is received by the stated deadline.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">REQUESTS FOR SCHEDULE CHANGES</h3>
    <p>If you require a change to your festival schedule, please contact our Festival Staff info@xr-summits.com<br />
      If applicable, refunds will be returned if notice of schedule/purchase change is received by or before the stated deadline of June 8, 2023. (Please see Refund Policy and dates listed above in 1a.<br />
      If a schedule change does not result in a refund and is requested after June 8, 2023 at 5:00PM MDT, students will be transferred to a different scheduled FFABQ 36 workshop of their choosing of equal value. In the case that the student’s chosen workshop is full or otherwise unavailable, then the student will be issued an Extended Festival Credit for use within one year from date of issue for future Festival Flamenco classes and workshops.</p>

    <p>Extended Festival Credits are not transferable to other individuals, may not be exchanged, and may not be sold or traded online.</p>
    <ul className="list-disc pl-5 flex flex-col gap-2">
      <li>i. Extended Festival Credits may not be applied to retail items.</li>
      <li>ii. Extended Festival Credits are valid for one year from the date of issue for purchase of future Festival Flamenco classes, workshops, ticket packages.</li>
    </ul>

    <p>During the Festival, workshops may be added but not switched after Sunday, June 11. Students may continue to add classes until the end of Festival Flamenco 2023.<br />
      Students who purchase the Festival Flamenco 2023 ALL ACCESS or VIP packages are exempt from this rule and may switch classes for the duration of the Festival.<br />
      When workshops have reached capacity, online registration will close automatically. At this point, Wait Lists will be created.<br />
      Wait Lists are managed online through XR SUMMITS and students are added in the order requests are received. For assistance adding your name to the online Wait List, please call 505-242-7600.</p>

    <h3 className="text-foreground font-bold text-lg mt-4">POLICY FOR NON-ATTENDANCE OF THE PAID WORKSHOPS</h3>
    <p>Individuals must notify the SUMMIT Staff in writing prior to SEPTEMBER 1, 2023 at 5:00 pm EST to receive a refund in the amounts stated above in section<br />
      Notifications received after this date and time will result in the forfeiture of the total amount of purchase.<br />
      AFTER SEPTEMBER 1ST , Refunds will not be issued unless the cancellation or non-attendance is due to documented COVID illness, or personal emergencies as outlined below in item<br />
      We aim to be sensitive in understanding your particular issue, including personal emergencies and deaths in the family. Our Executive Director will review these cases individually.</p>
  </div>
);
// --- KOMPONEN FALLBACK UNTUK HALAMAN LAINNYA ---
const DefaultContent = () => (
  <div className="flex flex-col gap-6 text-foreground-muted leading-relaxed" style={{ fontSize: '0.88rem', lineHeight: 1.9 }}>
    <p>This document is currently being updated by our legal team. Please check back later.</p>
  </div>
);

const LegalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = LEGAL_PAGES.find((p) => p.slug === slug);

  if (!page) {
    return <Navigate to="/contact" replace />;
  }

  // Render konten sesuai dengan slug (url parameter)
  const renderContent = () => {
    switch (slug) {
      case 'privacy':
        return <PrivacyPolicyContent />;
      case 'terms':
        return <TermsContent />;
      case 'refund-policy':
        return <RefundPolicyContent />;
      default:
        return <DefaultContent />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${page.title} | XR Summits`}</title>
        <meta name="description" content={`${page.title} — Official document for XR Summits.`} />
      </Helmet>

      <article className="relative w-full px-6 pt-32 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-mono text-[0.5rem] tracking-[0.35em] uppercase text-foreground-muted/50 hover:text-accent transition-colors mb-8"
          >
            ← Back to contact
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 pb-8 border-b border-white/10"
          >
            <p className="font-bold tracking-[0.45em] uppercase mb-3" style={{ fontSize: '0.52rem', color: '#ef783d' }}>
              Legal Document
            </p>
            <h1 className="font-heading font-black text-foreground" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              {page.title}
            </h1>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>

          <p className="mt-16 font-mono text-[0.48rem] tracking-[0.28em] uppercase text-foreground-muted/40 text-center">
            XR Summits Sdn Bhd · Phase 1
          </p>
        </div>
      </article>
    </>
  );
};

export default LegalPage;