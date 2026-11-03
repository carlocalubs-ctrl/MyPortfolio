import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronRight, Home, FolderOpen, MessageSquare, UserRound, Layers, Mail, Phone, Linkedin, Menu, X, LayoutGrid, Workflow } from 'lucide-react';
import { portfolioData } from '../mockData';
import { Footer } from './Footer';
import { AnimatedWorkflowBackground } from './AnimatedWorkflowBackground';
import { CompanyStrip } from './CompanyStrip';

const destinations = [
  { title: 'Home', path: '/', icon: Home },
  { title: 'Projects', path: '/projects', icon: FolderOpen, description: 'Automations, integrations & digital experiences' },
  { title: 'Testimonials', path: '/testimonials', icon: MessageSquare, description: 'Words from the people I work with' },
  { title: 'About', path: '/about', icon: UserRound, description: 'My story & professional experience' },
  { title: 'Services', path: '/services', icon: Workflow, description: 'Automation, CRM solutions & integrations' },
  { title: 'Tech Stack', path: '/tech-stack', icon: Layers, description: 'The tools behind the workflows' },
  { title: 'Get in Touch', path: '/contact', icon: Mail, description: 'Start a conversation about your next project' },
];

export const LegacyHome = () => {
  const { hash } = useLocation();
  const legacy = { hero: '/about#hero', home: '/', services: '/services', works: '/projects', experience: '/about#experience', testimonials: '/testimonials', contact: '/contact', 'tools-platforms': '/tech-stack' };
  return legacy[hash.slice(1)] ? <Navigate replace to={legacy[hash.slice(1)]} /> : <HomeExplorer />;
};

const FolderSurface = () => (
  <svg className="home-folder-shape" viewBox="0 0 400 174" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M20 0H282Q294 0 298 12L302 20Q306 28 318 28H380Q400 28 400 48V154Q400 174 380 174H20Q0 174 0 154V20Q0 0 20 0Z" />
      <path className="home-folder-highlight" d="M1 20Q1 1 20 1H282Q293 1 297 12L301 20Q306 29 318 29H380Q399 29 399 48" />
    </svg>
);

const projectFolderLabels = {
  '/projects/gohighlevel': 'CRM & Funnels',
  '/projects/n8n': 'Workflow Automation',
  '/projects/zapier': 'Multi-step Automations',
  '/projects/make': 'Scenario-based Flows',
  '/projects/funnels': 'Lead Conversion',
  '/projects/websites': 'Web Projects',
};

export const FolderCard = ({ title, path, description }) => (
  <Link to={path} className="home-folder project-category-folder" aria-labelledby={`category-${path.slice(1).replaceAll('/', '-')}`} aria-describedby={`category-${path.slice(1).replaceAll('/', '-')}-description`}>
    <FolderSurface />
    <div className="home-folder-top" aria-hidden="true">
      <FolderOpen className="home-folder-icon" size={20} strokeWidth={1.5} />
      <ArrowUpRight className="home-folder-arrow" size={18} strokeWidth={1.5} />
    </div>
    <h3 id={`category-${path.slice(1).replaceAll('/', '-')}`} className="home-folder-title">{title}</h3>
    <p id={`category-${path.slice(1).replaceAll('/', '-')}-description`} className="home-folder-description">{description}</p>
    <span className="home-folder-description project-category-label">{projectFolderLabels[path]}</span>
  </Link>
);

export const FolderGrid = ({ items }) => <div className="portfolio-folder-grid project-folder-grid">{items.map(item => <FolderCard key={item.path} {...item} />)}</div>;

const HomeFolder = ({ title, path, description, statistic, label = title, callout = false, icon: Icon }) => (
  <Link to={path} className="home-folder" aria-labelledby={`folder-${path.slice(1)}`} aria-describedby={`folder-${path.slice(1)}-description`}>
    <FolderSurface />
    <div className="home-folder-top" aria-hidden="true">
      <Icon className="home-folder-icon" size={22} strokeWidth={1.5} />
      <ArrowUpRight className="home-folder-arrow" size={18} strokeWidth={1.5} />
    </div>
    <h3 id={`folder-${path.slice(1)}`} className="home-folder-title">
      <span className={`home-folder-statistic${callout ? ' home-folder-callout' : ''}`}>{statistic}</span>
      <span className="home-folder-label">{label}</span>
    </h3>
    <p id={`folder-${path.slice(1)}-description`} className="home-folder-description">{description}</p>
  </Link>
);

// Testimonials.jsx renders one featured written entry plus Kameron's video.
const testimonialCount = portfolioData.testimonials.filter(item => !item.featured).length
  + (portfolioData.testimonials.some(item => item.featured) ? 2 : 0);
// Verified against the 10 + 15 named platforms rendered by ToolsPlatforms.jsx.
const technologyCount = 25;
const homeFolderHighlights = {
  '/testimonials': { statistic: testimonialCount },
  '/projects': { statistic: '20+' },
  '/tech-stack': { statistic: technologyCount, label: 'Technologies' },
  '/services': { statistic: portfolioData.services.length },
  '/about': { statistic: 'My Story', callout: true },
  '/contact': { statistic: "Let's Talk", callout: true },
};

const homeFolders = ['/testimonials', '/projects', '/tech-stack', '/services', '/about', '/contact']
  .map((path, index) => ({
    ...destinations.find(item => item.path === path),
    ...homeFolderHighlights[path],
    description: [
      'Client feedback and experiences.',
      'Automation workflows, CRM systems, and websites.',
      'Tools and technologies behind my work.',
      'AI automation, CRM, and integration solutions.',
      'My story and professional experience.',
      "Let's discuss your next project.",
    ][index],
  }));

export const HomeExplorer = () => (
  <section className="explorer-page">
    <div className="explorer-eyebrow"><span /> MY PERSONAL WORKSPACE</div>
    <h1>A little about me.<br /><span>A lot of possibilities.</span></h1>
    <p className="explorer-intro">Welcome to my portfolio. Open a folder and explore what I do.</p>
    <div className="explorer-toolbar"><h2>Explore my portfolio</h2><span><LayoutGrid size={15} /> {homeFolders.length} folders</span></div>
    <div className="portfolio-folder-grid">{homeFolders.map(item => <HomeFolder key={item.path} {...item} />)}</div>
    <div className="explorer-note"><span className="status-dot" /> Available for Projects <Link to="/contact">Let’s build something together <ArrowUpRight size={15} /></Link></div>
  </section>
);

export const ProjectsExplorer = () => (
  <section className="explorer-page">
    <div className="explorer-eyebrow">SELECTED WORK</div>
    <h1>Projects<span>.</span></h1>
    <p className="explorer-intro">Real-world automation workflows I&apos;ve built and deployed for clients</p>
    <div className="explorer-toolbar"><h2>Browse by platform</h2><span><LayoutGrid size={15} /> 6 folders</span></div>
    <FolderGrid items={[...portfolioData.projectCategories, { title: 'Websites', path: '/projects/websites', description: 'Website projects' }]} />
  </section>
);

export const WebsitesPage = () => <section className="explorer-page"><h1>Websites<span>.</span></h1><div className="empty-folder"><FolderOpen size={48} /><h2>No website projects listed yet</h2><p>Explore the other folders to see my existing work.</p><Link to="/projects">Browse projects <ArrowUpRight size={16} /></Link></div></section>;

const getCrumbs = (pathname) => {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs = [{ title: 'Home', path: '/' }];
  parts.forEach((part, index) => {
    const path = '/' + parts.slice(0, index + 1).join('/');
    const project = Object.values(portfolioData.platformProjects).flatMap(category => category.projects).find(item => item.path === path);
    const category = portfolioData.projectCategories.find(item => item.path === path);
    const title = destinations.find(item => item.path === path)?.title || category?.title || project?.title || (part === 'websites' ? 'Websites' : part.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' '));
    crumbs.push({ title, path });
  });
  return crumbs;
};

export const PortfolioLayout = () => {
  const location = useLocation();
  const panelRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const crumbs = getCrumbs(location.pathname);
  useEffect(() => {
    setMenuOpen(false);
    const panel = panelRef.current;
    panel?.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${getCrumbs(location.pathname).at(-1).title} | ${portfolioData.name}`;
    const frame = requestAnimationFrame(() => {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
      else panel?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);
  return (
    <div className="portfolio-workspace">
      <AnimatedWorkflowBackground />
      <a className="workspace-skip" href="#workspace-content">Skip to content</a>
      <aside className={`workspace-sidebar ${menuOpen ? 'is-open' : ''}`}>
        <Link className="workspace-brand" to="/">JC<span> / PORTFOLIO</span></Link>
        <button className="mobile-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="workspace-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <div className="sidebar-profile text-center"><img className="mx-auto" src={portfolioData.profileImage} alt={portfolioData.name} /><span className="profile-status justify-center"><span className="status-dot" /> Available for Projects</span><h2>{portfolioData.name}</h2><p>{portfolioData.title}</p><div className="sidebar-socials justify-center"><a href={`mailto:${portfolioData.email}`} aria-label="Email"><Mail size={17} /></a><a href={`tel:${portfolioData.phone}`} aria-label="Phone"><Phone size={17} /></a>{portfolioData.linkedin && <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>}</div></div>
        <nav id="workspace-navigation" className="sidebar-navigation" aria-label="Portfolio"><span className="sidebar-caption">WORKSPACE</span>{destinations.map(({ title, path, icon: Icon }) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><Icon size={18} /><span>{title}</span><ChevronRight size={14} /></NavLink>)}</nav>
        <div className="sidebar-bottom"><span className="status-dot" /> Built around possibilities.<small>© {new Date().getFullYear()} {portfolioData.name}</small></div>
      </aside>
      <div className="workspace-main">
        <header className={`workspace-topbar${location.pathname === "/" ? " workspace-topbar-home" : ""}`}>{location.pathname !== "/" && <nav aria-label="Breadcrumb"><ol>{crumbs.map((crumb, index) => <li key={crumb.path}>{index > 0 && <ChevronRight size={14} />}{index === crumbs.length - 1 ? <span aria-current="page">{crumb.title}</span> : <Link to={crumb.path}>{crumb.title}</Link>}</li>)}</ol></nav>}{location.pathname === "/" ? <CompanyStrip /> : <span className="workspace-topbar-label">PORTFOLIO EXPLORER</span>}</header>
        <main id="workspace-content" ref={panelRef} tabIndex={-1} className="workspace-content">
          {location.pathname !== '/' && <Link className="workspace-back" to={crumbs.at(-2)?.path || '/'}><ArrowLeft size={15} /> Back to {crumbs.at(-2)?.title || 'Home'}</Link>}
          <Outlet />
          {location.pathname !== '/' && location.pathname !== '/projects' && <Footer />}
        </main>
      </div>
    </div>
  );
};
