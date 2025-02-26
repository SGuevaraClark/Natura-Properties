import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const PrivacyPolicy = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center mb-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-[#7dc138] hover:text-[#7dc138]/80 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>
        
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-[#7dc138] text-white px-4 py-2 rounded-lg hover:bg-[#7dc138]/90 transition-colors"
        >
          <FaHome />
          <span>Home</span>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-md mb-12">
        <p className="text-gray-500 mb-6">Last Updated: February 26th, 2025</p>

        <p className="text-gray-700 mb-6">
          Welcome to Natura Properties! This Privacy Policy explains how we collect, use, and share your personal information when you visit our website, https://naturaproperties.com (the "Site") or otherwise interact with our services ("Services").
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Who We Are</h2>
          <p className="text-gray-700">
            Our website address is: https://naturaproperties.com. For any privacy-related concerns, you can contact us at naturaproperties@gmail.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Personal Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect personal information from you in various ways when you access or use the Site or otherwise interact with our Services. This information may include:
          </p>

          <h3 className="text-lg font-medium mb-2">2.1 Information You Provide to Us</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
            <li><strong>Contact Information:</strong> This includes your first and last name, email address, phone number, and other contact details you provide.</li>
            <li><strong>Feedback and Correspondence:</strong> Information you provide when you contact us with questions, feedback, or otherwise correspond with us.</li>
            <li><strong>Marketing Information:</strong> Your preferences for receiving communications about our activities, events, and publications, and details about how you engage with such communications.</li>
            <li><strong>Other Information:</strong> Any other information you voluntarily provide or that is necessary for your interactions with us through the Site or Services.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">2.2 Information We Obtain from Third Parties</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
            <li><strong>Social Media Information:</strong> We may maintain pages on social media platforms such as Facebook, LinkedIn, and Instagram. When you interact with these pages, the platform providers' privacy policies will apply. Information you provide to us through these platforms will be treated according to this Privacy Policy.</li>
            <li><strong>Other Sources:</strong> We may obtain your personal information from third-party analytics services, marketing partners, publicly-available sources, and data providers.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">2.3 Automatic Data Collection</h3>
          <p className="text-gray-700 mb-4">
            We, along with our service providers and advertising partners, may automatically log information about you, your computer or mobile device, and your interaction over time with our Services, communications, and other online services. This data may include:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
            <li><strong>Device Data:</strong> Information such as your computer's or mobile device's operating system, browser type, screen resolution, IP address, device identifiers, and general location information (e.g., city, state).</li>
            <li><strong>Online Activity Data:</strong> Pages or screens viewed, browsing history, navigation paths, access times, and duration of access, as well as interactions with our marketing emails.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">2.4 Tools for Automatic Data Collection</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
            <li><strong>Cookies:</strong> Text files stored on your device that help us understand user activity and facilitate online advertising.</li>
            <li><strong>Local Storage Technologies:</strong> Technologies like HTML5 that provide cookie-equivalent functionality.</li>
            <li><strong>Web Beacons:</strong> Small graphics used to understand your interactions with our emails or web content.</li>
            <li><strong>Pixels:</strong> Small images or code snippets that allow us and our advertising partners to collect information about your interactions with our website and ads.</li>
          </ul>

          <h3 className="text-lg font-medium mb-2">2.5 Comments</h3>
          <p className="text-gray-700 mb-4">
            When visitors leave comments on the site, we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. After approval of your comment, your profile picture is visible to the public in the context of your comment.
          </p>

          <h3 className="text-lg font-medium mb-2">2.6 Media</h3>
          <p className="text-gray-700">
            If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. How We Use Your Personal Information</h2>
          <p className="text-gray-700">
            We may use your personal information for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>To operate our Services</li>
            <li>To communicate with you</li>
            <li>For marketing and advertising purposes</li>
            <li>To comply with legal obligations</li>
            <li>For fraud prevention and safety</li>
            <li>To create anonymous, aggregated data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. How We Share Your Personal Information</h2>
          <p className="text-gray-700">
            We do not "sell" your personal information as defined under applicable laws. We may share your personal information as described in this policy, including with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Service providers</li>
            <li>Professional advisors</li>
            <li>For compliance and safety purposes</li>
            <li>In the event of business transfers</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Your Privacy Choices</h2>
          <p className="text-gray-700 mb-4">
            While we strive to give you as much choice as possible regarding the collection and use of your personal information, our website currently has limited functionality in this area. Here are the choices available to you:
          </p>

          <h3 className="text-lg font-medium mb-2">5.1 Browser Controls</h3>
          <p className="text-gray-700 mb-4">
            Most web browsers provide settings that allow users to control or reject cookies, or to alert users when a cookie is placed on their computer. Although our website is designed to function without cookies, rejecting or disabling cookies or similar technologies may affect the availability and functionality of our Services. To learn more about browser controls, please consult the documentation that your browser manufacturer provides.
          </p>

          <h3 className="text-lg font-medium mb-2">5.2 Do Not Track</h3>
          <p className="text-gray-700 mb-4">
            Some Internet browsers may be configured to send "Do Not Track" signals to the online services that you visit. We currently do not respond to "Do Not Track" or similar signals. To find out more about "Do Not Track," please visit http://www.allaboutdnt.com.
          </p>

          <h3 className="text-lg font-medium mb-2">5.3 Privacy Rights</h3>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict the use of your data. To exercise these rights, please contact us using the information provided in the "Contact Information" section of this policy.
          </p>

          <h3 className="text-lg font-medium mb-2">5.4 Opting Out of Communications</h3>
          <p className="text-gray-700">
            If you have provided us with your contact information, you may opt out of receiving further communications from us by contacting us directly. Please note that even if you opt out of receiving marketing communications, we may still send you non-marketing communications (such as emails related to our business relationship or emails about changes to our legal terms).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Google Ads and Analytics</h2>
          <p className="text-gray-700">
            We use Google Ads for advertising and Google Analytics for website analytics. These services use cookies and similar technologies to collect and analyze information about use of the Services and report on activities and trends. You can learn more about Google's practices by visiting https://www.google.com/policies/privacy/partners/.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Security</h2>
          <p className="text-gray-700">
            We employ various technical, organizational, and physical safeguards to protect the personal information we collect. However, no security measures are entirely fail-safe.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
          <p className="text-gray-700">
            Our Services are not intended for use by individuals under 18 years of age. If we learn that we have collected personal information from a child under 18 without parental consent, we will delete it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">9. International Data Transfers</h2>
          <p className="text-gray-700">
            Your information may be transferred to, and processed in, countries other than the country you live in. These countries may have data protection laws different from the laws of your country.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">10. Data Retention</h2>
          <p className="text-gray-700">
            We retain personal information for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            <br /><br />
            For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">11. Your Rights</h2>
          <p className="text-gray-700">
            Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict the use of your data. To exercise these rights, please contact us using the information provided below.
            <br /><br />
            You can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">12. Embedded Content from Other Websites</h2>
          <p className="text-gray-700">
            Articles on this site may include embedded content (e.g., videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">13. Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">14. Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
            <br /><br />
            Email: naturaproperties@gmail.com
          </p>
        </section>
      </div>
      
      {/* Return to top button */}
      <div className="flex justify-center mb-12">
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-[#7dc138] text-white px-6 py-3 rounded-lg hover:bg-[#7dc138]/90 transition-colors"
        >
          <FaHome />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 