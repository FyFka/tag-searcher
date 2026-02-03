export const metadata = {
  title: "Terms and conditions",
  description:
    "Read the Terms and Conditions governing the use of the TagSearcher website and services, including user responsibilities and limitations.",
  keywords: [
    "Discord special name",
    "Discord channel symbols",
    "Discord guilds list",
    "Discord server tags",
    "Discord badges",
    "Discord tags",
    "Server tag directory",
    "Username badges 2026",
    "Discord server icons",
    "Discord servers",
  ],
};

export default function Terms() {
  return (
    <div className="px-1 md:px-0 py-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row">
        <h1 className="font-extrabold text-3xl md:text-4xl font-mono text-center">Terms and Conditions</h1>
        <p className="text-sm opacity-80">Last updated: July 15, 2025</p>
      </div>
      <div className="space-y-2">
        <p>
          These terms and conditions (“Agreement”) set forth the general terms and conditions of your use of the{" "}
          <a className="link" href="https://tagsearcher.org">
            tagsearcher.org
          </a>{" "}
          website (“Website” or “Service”) and any of its related products and services (collectively, “Services”).
        </p>
        <p>
          This Agreement is legally binding between you (“User”, “you” or “your”) and this Website operator (“Operator”,
          “we”, “us” or “our”). If you are entering into this Agreement on behalf of a business or other legal entity,
          you represent that you have the authority to bind such entity to this Agreement. If not, you may not access or
          use the Website and Services.
        </p>
        <p>
          By accessing or using the Website and Services, you acknowledge that you have read, understood, and agree to
          be bound by the terms of this Agreement. This Agreement is a contract between you and the Operator, even if it
          is electronic and not physically signed.
        </p>
      </div>
      <h2 className="font-extrabold my-4 text-xl md:text-2xl font-mono">Table of Contents</h2>
      <ol className="list-decimal pl-6 space-y-1">
        <li>
          <a className="link" href="#age-requirement">
            Age requirement
          </a>
        </li>
        <li>
          <a className="link" href="#user-content">
            User content
          </a>
        </li>
        <li>
          <a className="link" href="#backups">
            Backups
          </a>
        </li>
        <li>
          <a className="link" href="#links-to-other-resources">
            Links to other resources
          </a>
        </li>
        <li>
          <a className="link" href="#changes-and-amendments">
            Changes and amendments
          </a>
        </li>
        <li>
          <a className="link" href="#acceptance-of-these-terms">
            Acceptance of these terms
          </a>
        </li>
        <li>
          <a className="link" href="#contacting-us">
            Contacting us
          </a>
        </li>
      </ol>
      <h2 id="age-requirement" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        Age Requirement
      </h2>
      <p>
        You must be at least 13 years of age to use the Website and Services. By using the Website and agreeing to this
        Agreement, you represent and warrant that you are at least 13 years of age.
      </p>
      <h2 id="user-content" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        User Content
      </h2>
      <p>
        We do not claim ownership of any data, information, or material (“Content”) you submit via the Website. You are
        responsible for the legality and accuracy of your content. We may (but are not obligated to) review the Content.
      </p>
      <p>
        By using the Service, you grant us permission to access, store, copy, and display your Content as required to
        provide the Services. You do not grant us the right to use your Content for marketing or other commercial
        purposes unless you explicitly allow it.
      </p>
      <h2 id="backups" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        Backups
      </h2>
      <p>
        We are not responsible for the loss of Content stored on the Website. You are solely responsible for maintaining
        backups. Although we may retain backups for internal purposes, we do not guarantee their availability.
      </p>
      <h2 id="links-to-other-resources" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        Links to Other Resources
      </h2>
      <p>
        The Website may contain links to third-party resources. These links do not imply any endorsement or
        responsibility on our part. We are not liable for the content or practices of any linked websites. Use
        third-party resources at your own risk.
      </p>
      <h2 id="changes-and-amendments" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        Changes and Amendments
      </h2>
      <p>
        We reserve the right to update this Agreement at any time. When changes occur, we will notify you via email or
        other available means.
      </p>
      <p>
        Updated versions of the Agreement become effective immediately upon posting unless stated otherwise. Continued
        use of the Website signifies acceptance of the changes.
      </p>

      <h2 id="acceptance-of-these-terms" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        Acceptance of These Terms
      </h2>
      <p>
        By accessing and using the Website and Services, you confirm that you have read and agreed to these terms. If
        you do not accept this Agreement, you are not authorized to use the Website.
      </p>
      <h2 id="contacting-us" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        Contacting Us
      </h2>
      <p>If you have any questions, concerns, or complaints about this Agreement, please contact us via:</p>
      <p>
        <a className="link" href="https://tagsearcher.org/contact">
          https://tagsearcher.org/contact
        </a>
      </p>
    </div>
  );
}
