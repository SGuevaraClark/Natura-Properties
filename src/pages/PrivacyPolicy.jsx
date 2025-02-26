import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 mb-4">
            This Privacy Policy outlines how we collect, use, and protect your personal information when you use our real estate website.
            We are committed to ensuring the privacy and security of your data.
          </p>
          <p className="text-gray-700">
            By using our website, you consent to the data practices described in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Personal information such as name, email address, phone number, and address when you contact us or submit inquiries about properties.</li>
            <li>Information about your property preferences and search criteria.</li>
            <li>Technical information such as IP address, browser type, and device information.</li>
            <li>Usage data including pages visited, time spent on the site, and actions taken.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>To provide and improve our services to you.</li>
            <li>To respond to your inquiries about properties.</li>
            <li>To personalize your experience on our website.</li>
            <li>To send you relevant property listings and updates with your consent.</li>
            <li>To analyze website usage and improve our content and offerings.</li>
            <li>To protect our website and users from fraudulent activities.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Data Protection</h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Third-Party Disclosure</h2>
          <p className="text-gray-700">
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as required by law or to trusted third parties who assist us in operating our website and serving you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of your personal information.</li>
            <li>Withdraw consent for marketing communications.</li>
            <li>Lodge a complaint with a supervisory authority.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at privacy@yourdomain.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 