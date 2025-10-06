import "./Footer.css";
import { useState } from "react";
import { supabase } from "../../hooks/supabase";

export default function Footer() {
  const [formData, setFormData] = useState({
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (submitStatus === "success") {
      setSubmitStatus(null);
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.rpc("send_feedback", {
        message: formData.message,
      });

      if (error) {
        // console.error("Supabase error:", error);
        setSubmitStatus("error");
      } else {
        // console.log("Success:", data);
        setSubmitStatus("success");
        setFormData({ message: "" });
      }
    } catch (error) {
      // console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section-feedback">
          <h3 className="footer-title">
            <ion-icon name="chatbubbles-outline"></ion-icon>
            Anonymous Feedback
          </h3>
          <p className="footer-subtitle">
            Your thoughts matter! Share suggestions or just say hi. Don't worry,
            this is completely anonymous.
          </p>
          <form className="feedback-form" onSubmit={formSubmit}>
            <label className="form-label">Message </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={formInputChange}
              className="form-textarea"
              placeholder="Any feedback to make this site better?"
              maxLength={500}
              required
            />
            <div className="char-count">{formData.message.length}/500</div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? <>Processing...</> : <>Send Message</>}
            </button>
            {submitStatus === "success" && (
              <div className="success-message">
                <span>Message sent successfully!</span>
              </div>
            )}
          </form>
        </div>

        <div className="footer-section-detail">
          <h3 className="footer-title">About This Site</h3>
          <p className="about-text">
            Built with modern web technologies to showcase my journey in
            software development. Designed with attention to detail and user
            experience in mind.
          </p>

          <div style={{ marginTop: "20px" }}>
            <div className="form-label" style={{ marginBottom: "12px" }}>
              Built With
            </div>
            <div className="tech-stack">
              <span className="tech-badge">React</span>
              <span className="tech-badge">JavaScript</span>
              <span className="tech-badge">CSS3</span>
              <span className="tech-badge">HTML5</span>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <div className="form-label" style={{ marginBottom: "12px" }}>
              Last Updated
            </div>
            <p className="about-text" style={{ margin: 0 }}>
              October 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
