import "./Footer.css";

export default function Footer() {
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
          <form className="feedback-form">
            <label className="form-label">Message </label>
            <textarea
              name="message"
              className="form-textarea"
              placeholder="Any feedback to make this site better?"
              // value={formData.message}
              // onChange={handleChange}
            />
            <div className="char-count">/500</div>
            {/* <div className="char-count">{formData.message.length}/500</div> */}

            <button
              type="button"
              className="submit-button"
              // disabled={isSubmitting || !formData.message.trim()}
              // onClick={handleSubmit}
            >
              Send Message
            </button>
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
