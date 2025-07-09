import React from 'react';
import './terms.css';
import { useNavigate } from 'react-router-dom';

function Terms() {
  const navigate = useNavigate();

  return (
    <div className="terms-container container my-5 p-4 shadow rounded">
      <h1 className="mb-4 text-center">📚 SmartGuide – Terms & Conditions</h1>

      <section>
        <h4>1. Acceptance of Terms</h4>
        <p>
          By accessing or using SmartGuide, you confirm that you are at least 13 years old and agree to comply with these Terms and Conditions. If you do not agree, you may not use this platform.
        </p>
      </section>

      <section>
        <h4>2. User Responsibilities</h4>
        <ul>
          <li>You are responsible for all activities that occur under your account.</li>
          <li>You agree not to misuse the platform, including posting harmful or offensive content.</li>
          <li>You will not attempt to hack, exploit, or reverse-engineer any part of SmartGuide.</li>
          <li>You must not use automated systems (bots, scrapers) to access data unless granted permission.</li>
        </ul>
      </section>

      <section>
        <h4>3. Intellectual Property</h4>
        <p>
          All content, designs, logos, and source code are the exclusive property of SmartGuide unless otherwise stated. You may not reuse or distribute them without explicit permission.
        </p>
      </section>

      <section>
        <h4>4. Book Content & APIs</h4>
        <p>
          SmartGuide integrates book data via external APIs (e.g., Google Books). We do not guarantee the accuracy, completeness, or availability of external data. Book suggestions or details may change or become unavailable without notice.
        </p>
      </section>

      <section>
        <h4>5. Games and Features</h4>
        <p>
          Features like Book Bingo, Daily Quiz, Crossword, and other LitPlay activities are designed for entertainment and learning. We may modify or discontinue these features at any time without liability.
        </p>
      </section>

      <section>
        <h4>6. Community Content</h4>
        <p>
          SmartGuide may allow users to post reviews or comments. We do not endorse user-generated content and reserve the right to moderate or remove any content that violates our guidelines or laws.
        </p>
      </section>

      <section>
        <h4>7. Privacy & Data Handling</h4>
        <p>
          SmartGuide collects limited personal data like name and email to provide personalized services. We do not sell your data. Please refer to our <a href="/privacy" className="terms-link">Privacy Policy</a> for more details.
        </p>
      </section>

      <section>
        <h4>8. Account Suspension or Termination</h4>
        <p>
          We may suspend or permanently terminate your access if you violate these terms or misuse our services, with or without prior notice.
        </p>
      </section>

      <section>
        <h4>9. Limitation of Liability</h4>
        <p>
          SmartGuide is not liable for any indirect, incidental, or consequential damages resulting from the use of the platform or any content therein.
        </p>
      </section>

      <section>
        <h4>10. Modifications to Terms</h4>
        <p>
          These terms may be updated from time to time. Continued use of SmartGuide after updates constitutes acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h4>11. Contact Us</h4>
        <p>
          For any questions, concerns, or suggestions regarding these terms, please contact us at <strong>support@smartguide.io</strong>.
        </p>
      </section>

      <div className="text-center mt-5">
        <button className="btn btn-outline-primary" onClick={() => navigate('/signup')}>
          ⬅ Back to Signup
        </button>
      </div>
    </div>
  );
}

export default Terms;
