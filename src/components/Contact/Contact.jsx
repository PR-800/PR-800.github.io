import "./Contact.css";
import resumeFile from "/assets/Titipa-E_Resume.pdf";
import { supabase } from "../../hooks/supabase";

export default function Contact({ show }) {
  const socials = [
    {
      type: "Email",
      value: "titipa.eamsiriwong@gmail.com",
      iconName: "mail-outline",
      href: "mailto:titipa.eamsiriwong@gmail.com",
    },
    {
      type: "Phone",
      value: "+66 94 701 6039",
      iconName: "call-outline",
      href: "tel:+66947016039",
    },
    {
      type: "LinkedIn",
      value: "linkedin.com/in/titipa-eamsiriwong",
      iconName: "logo-linkedin",
      href: "https://linkedin.com/in/titipa-eamsiriwong",
    },
    {
      type: "Github",
      value: "github.com/PR-800",
      iconName: "logo-github",
      href: "https://github.com/PR-800",
    },
  ];

  const resumeDownload = () => {
    const link = document.createElement("a");
    link.href = resumeFile;
    link.download = "Titipa-E_Resume.pdf";
    link.click();
  };

  return (
    <section
      id="contact"
      className={`contact-section ${show ? "show" : "hide"}`}
    >
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Let's Connect</h2>
          <div style={{ textAlign: "center" }}>
            <div className="availability-badge">
              <span className="status-dot"></span>
              <span className="status-text">Available for opportunities</span>
            </div>
          </div>
        </div>

        <div className="contact-content">
          <div className="social-container">
            {socials.map((social, index) => (
              <a
                href={social.href}
                target={
                  social.type !== "email" && social.type !== "phone"
                    ? "_blank"
                    : undefined
                }
                className="social-link"
                key={index}
              >
                <div className="social-icon">
                  <ion-icon name={social.iconName}></ion-icon>
                </div>
                <div className="social-info">
                  <div className="social-label">{social.type}</div>
                  <div className="social-value">{social.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="resume-container">
            <div className="resume-icon">
              <ion-icon name="document-text-outline"></ion-icon>
            </div>
            <div className="resume-text">
              <div className="resume-title">My Resume</div>
              <div className="resume-subtitle">Updated November 2024 • PDF</div>
            </div>
            <div className="resume-actions">
              <button
                className="resume-button download"
                onClick={resumeDownload}
              >
                <ion-icon name="download-outline"></ion-icon>
                Download
              </button>
              <a href={resumeFile} target="_blank">
                <button className="resume-button preview">
                  <ion-icon name="eye-outline"></ion-icon>
                  Preview
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
