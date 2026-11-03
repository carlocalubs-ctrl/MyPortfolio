import { useState } from 'react';
import { ChevronsUp, Pause, Play, Zap } from 'lucide-react';
import './workflow-highlights.css';

const workflows = [
  { file: 'GHL - Customer Feedback Automation.png', title: 'Customer Feedback Automation', platform: 'GHL', logo: 'GoHighLevel.svg' },
  { file: 'Zapier Automation Booking.png', title: 'Automation Booking', platform: 'Zapier', logo: 'Zapier_.svg' },
  { file: 'User Journey Workflow.png', title: 'User Journey Workflow', platform: 'GHL', logo: 'GoHighLevel.svg' },
  { file: '1. PROJECT SCREENSHOT.jpg', title: 'Workflow Automation', platform: 'Make', logo: 'Make.svg' },
  { file: 'Never Rebook Campaign.png', title: 'Never Rebook Campaign', platform: 'GHL', logo: 'GoHighLevel.svg' },
];

export const WorkflowHighlights = () => {
  const [paused, setPaused] = useState(false);

  return (
    <aside className={`workflow-highlights${paused ? ' is-paused' : ''}`} aria-labelledby="workflow-highlights-title">
      <header className="workflow-highlights-heading">
        <h2 id="workflow-highlights-title"><Zap size={15} aria-hidden="true" /> Workflow Highlights</h2>
        <button type="button" className="workflow-highlights-toggle" onClick={() => setPaused(value => !value)}
          aria-label={paused ? 'Play workflow animation' : 'Pause workflow animation'} aria-pressed={paused}>
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      </header>
      <p className="workflow-highlights-intro">A quick look at some of the automations, workflows, and CRM setups I've built.</p>
      <div className="workflow-highlights-window" tabIndex={0} role="region" aria-label="Automation screenshots; hover or focus to pause">
        <div className="workflow-highlights-track">
          {[false, true].map(duplicate => (
            <div className="workflow-highlights-list" key={String(duplicate)} aria-hidden={duplicate || undefined}>
              {workflows.map(({ file, title, platform, logo }) => (
                <figure className="workflow-highlight" key={file}>
                  <div className="workflow-highlight-screenshot">
                    <img src={`/projects/All%20workflows/${encodeURIComponent(file)}`} alt={duplicate ? '' : `${title} in ${platform}`} decoding="async" />
                  </div>
                  <figcaption className="workflow-highlight-label">
                    <img src={`/projects/Logo/${logo}`} alt="" aria-hidden="true" />
                    <span><strong>{platform}</strong><span>{title}</span></span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="workflow-highlights-chevrons" aria-hidden="true"><ChevronsUp size={19} /><ChevronsUp size={19} /></div>
    </aside>
  );
};
