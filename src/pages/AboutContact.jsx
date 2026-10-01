import { useState } from "react";
import StarRating from "../components/StarRating";

const initialContact = { name: "", email: "", subject: "", message: "" };
const initialFeedback = { name: "", email: "", rating: 0, comments: "" };

// Letters, spaces, hyphens and apostrophes only (e.g. "Alex Morgan", "O'Neil")
const isValidName = (value) => /^[A-Za-z][A-Za-z\s'-]{1,39}$/.test(value.trim());
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const validateName = (value) => {
  if (!value.trim()) return "Name is required.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  if (!isValidName(value))
    return "Name can only contain letters, spaces, hyphens or apostrophes.";
  return "";
};

const validateEmail = (value) => {
  if (!value.trim()) return "Email is required.";
  if (!isValidEmail(value)) return "Please enter a valid email address.";
  return "";
};

export default function AboutContact() {
  // Contact Us form (separate from Feedback)
  const [contact, setContact] = useState(initialContact);
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Feedback form (separate from Contact Us)
  const [feedback, setFeedback] = useState(initialFeedback);
  const [feedbackErrors, setFeedbackErrors] = useState({});
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleContactChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleFeedbackChange = (e) =>
    setFeedback({ ...feedback, [e.target.name]: e.target.value });

  const handleContactBlur = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setContactErrors((prev) => ({ ...prev, name: validateName(value) }));
    } else if (name === "email") {
      setContactErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleFeedbackBlur = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFeedbackErrors((prev) => ({ ...prev, name: validateName(value) }));
    } else if (name === "email") {
      setFeedbackErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateName(contact.name),
      email: validateEmail(contact.email),
    };
    if (!contact.subject.trim())
      newErrors.subject = "Please enter a subject.";
    if (!contact.message.trim())
      newErrors.message = "Please enter your message.";

    Object.keys(newErrors).forEach((k) => !newErrors[k] && delete newErrors[k]);
    setContactErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setContactSubmitted(true);
      setContact(initialContact);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateName(feedback.name),
      email: validateEmail(feedback.email),
    };
    if (!feedback.rating) newErrors.rating = "Please select a star rating.";
    if (!feedback.comments.trim())
      newErrors.comments = "Please enter your comments.";

    Object.keys(newErrors).forEach((k) => !newErrors[k] && delete newErrors[k]);
    setFeedbackErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setFeedbackSubmitted(true);
      setFeedback(initialFeedback);
    }
  };

  return (
    <section id="about" className="onepage-section content-page">
      <div className="page-hero-banner">
        <h2 className="page-hero-title">About &amp; Contact</h2>
        <p className="page-hero-subtitle">
          BudgetBasics is an educational awareness website for students.
        </p>
      </div>

      <section className="content-section">
        <div
          className="info-card"
          style={{ maxWidth: "720px", margin: "0 auto" }}
        >
          <h3>Our Purpose</h3>
          <p>
            BudgetBasics helps students understand budgeting fundamentals, build
            saving habits, and avoid common money mistakes — through guides,
            infographics, and a small AI assistant.
          </p>
        </div>
      </section>

      {/* Contact Us form — separate from Feedback */}
      <section id="contact-us" className="content-section">
        <h2 className="content-section-title" style={{ textAlign: "center" }}>
          Contact Us
        </h2>
        <form
          className="info-card"
          style={{ maxWidth: "640px", margin: "0 auto" }}
          onSubmit={handleContactSubmit}
        >
          <div className="form-field">
            <label>Name</label>
            <input
              name="name"
              value={contact.name}
              onChange={handleContactChange}
              onBlur={handleContactBlur}
            />
            {contactErrors.name && (
              <span className="error-text">{contactErrors.name}</span>
            )}
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              name="email"
              value={contact.email}
              onChange={handleContactChange}
              onBlur={handleContactBlur}
            />
            {contactErrors.email && (
              <span className="error-text">{contactErrors.email}</span>
            )}
          </div>

          <div className="form-field">
            <label>Subject</label>
            <input
              name="subject"
              value={contact.subject}
              onChange={handleContactChange}
              placeholder="What is this about?"
            />
            {contactErrors.subject && (
              <span className="error-text">{contactErrors.subject}</span>
            )}
          </div>

          <div className="form-field">
            <label>Message</label>
            <textarea
              name="message"
              rows="3"
              value={contact.message}
              onChange={handleContactChange}
            ></textarea>
            {contactErrors.message && (
              <span className="error-text">{contactErrors.message}</span>
            )}
          </div>

          <button type="submit" className="primary-btn">
            Send Message
          </button>
          {contactSubmitted && (
            <p style={{ color: "#22c55e", marginTop: "12px", fontWeight: 600 }}>
              ✅ Thanks for reaching out! We've received your message (for this
              session only — nothing is saved to a server).
            </p>
          )}
        </form>

        <div
          className="info-card"
          style={{
            maxWidth: "640px",
            margin: "24px auto 0 auto",
            textAlign: "center",
          }}
        >
          <h3>Contact Info</h3>
          <p>
            📧 support@budgetbasics.edu
            <br />
            📞 +92-300-0000000
          </p>
        </div>
      </section>

      {/* Feedback form — separate from Contact Us */}
      <section id="feedback" className="content-section">
        <h2 className="content-section-title" style={{ textAlign: "center" }}>
          Feedback
        </h2>
        <form
          className="info-card"
          style={{ maxWidth: "640px", margin: "0 auto" }}
          onSubmit={handleFeedbackSubmit}
        >
          <div className="form-field">
            <label>Name</label>
            <input
              name="name"
              value={feedback.name}
              onChange={handleFeedbackChange}
              onBlur={handleFeedbackBlur}
            />
            {feedbackErrors.name && (
              <span className="error-text">{feedbackErrors.name}</span>
            )}
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              name="email"
              value={feedback.email}
              onChange={handleFeedbackChange}
              onBlur={handleFeedbackBlur}
            />
            {feedbackErrors.email && (
              <span className="error-text">{feedbackErrors.email}</span>
            )}
          </div>

          <div className="form-field">
            <label>Rating</label>
            <StarRating
              value={feedback.rating}
              onChange={(star) => {
                setFeedback((prev) => ({ ...prev, rating: star }));
                if (feedbackErrors.rating) {
                  setFeedbackErrors((prev) => ({ ...prev, rating: "" }));
                }
              }}
            />
            {feedbackErrors.rating && (
              <span className="error-text">{feedbackErrors.rating}</span>
            )}
          </div>

          <div className="form-field">
            <label>Comments</label>
            <textarea
              name="comments"
              rows="3"
              value={feedback.comments}
              onChange={handleFeedbackChange}
            ></textarea>
            {feedbackErrors.comments && (
              <span className="error-text">{feedbackErrors.comments}</span>
            )}
          </div>

          <button type="submit" className="primary-btn">
            Submit Feedback
          </button>
          {feedbackSubmitted && (
            <p style={{ color: "#22c55e", marginTop: "12px", fontWeight: 600 }}>
              ✅ Thank you! Your feedback has been received (for this session
              only — nothing is saved to a server).
            </p>
          )}
        </form>
      </section>
    </section>
  );
}
