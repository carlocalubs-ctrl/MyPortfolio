import { useState } from "react";
import { Pause, Play } from "lucide-react";

const logoRoot = "/projects/Logo/Company Logo";
const companies = [
  { name: "Tata Consultancy Services", logo: `${logoRoot}/tcs-transparent.png` },
  { name: "AGL", logo: `${logoRoot}/AGL LOGO.png` },
  { name: "Teleperformance", logo: `${logoRoot}/Teleperformance.png` },
  { name: "UnitedHealthcare", logo: `${logoRoot}/UnitedHealthcare.png` },
  { name: "Nxtlvl Mobile Detail", logo: `${logoRoot}/NXT LVL DETAIL LOGO.jpg`, crop: true },
  { name: "Esstart", logo: `${logoRoot}/esstart.jpg.svg` },
];

export const CompanyStrip = () => {
  const [paused, setPaused] = useState(false);
  return (
  <section className={`company-strip${paused ? " is-paused" : ""}`} aria-labelledby="company-strip-heading">
    <div className="company-strip-label">
      <span>COMPANIES</span>
      <h2 id="company-strip-heading">I’ve worked with</h2>
    </div>
    <div className="company-strip-window">
      <div className="company-strip-track">
      {[0, 1].map((copy) => (
        <ul className="company-strip-list" key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {companies.map(({ name, logo, crop }) => (
            <li key={name} className="company-strip-item" title={name}>
              {crop ? (
                <span className="company-logo-crop">
                  <img src={logo} alt={copy === 0 ? name : ""} />
                </span>
              ) : <img src={logo} alt={copy === 0 ? name : ""} />}
            </li>
          ))}
        </ul>
      ))}
      </div>
    </div>
    <button type="button" className="company-strip-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? "Play company logo animation" : "Pause company logo animation"}>
      {paused ? <Play size={14} /> : <Pause size={14} />}
    </button>
  </section>
);



};
