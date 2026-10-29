import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronRight, Home, FolderOpen, MessageSquare, UserRound, Layers, Mail, Phone, Linkedin, Menu, X, LayoutGrid } from 'lucide-react';
import { portfolioData } from '../mockData';
import { Footer } from './Footer';
import { FolderPreview } from './FolderPreview';

const destinations = [
  { title: 'Home', path: '/', icon: Home },
  { title: 'Projects', path: '/projects', icon: FolderOpen, description: 'Automations, integrations & digital experiences' },
  { title: 'Testimonials', path: '/testimonials', icon: MessageSquare, description: 'Words from the people I work with' },
  { title: 'About', path: '/about', icon: UserRound, description: 'My story, experience & services' },
  { title: 'Tech Stack', path: '/tech-stack', icon: Layers, description: 'The tools behind the workflows' },
  { title: 'Get in Touch', path: '/contact', icon: Mail, description: 'Start a conversation about your next project' },
];

export const LegacyHome = () => {
  const { hash } = useLocation();
  const legacy = { hero: '/about#hero', home: '/', services: '/about#services', works: '/projects', experience: '/about#experience', testimonials: '/testimonials', contact: '/contact', 'tools-platforms': '/tech-stack' };
  return legacy[hash.slice(1)] ? <Navigate replace to={legacy[hash.slice(1)]} /> : <HomeExplorer />;
};

const projectThumbnails = [
  { src: '/gohighlevel-thumbnail.png', width: 1600, height: 900 },
  { src: '/projects/thumbnail/THUMBNAIL%20MAKE.png', width: 1672, height: 941 },
  { src: '/projects/thumbnail/THUMBNAIL%20n8n.png', width: 1672, height: 941 },
  { src: '/projects/thumbnail/THUMBNAIL%20SALES%20FUNNEL.png', width: 1672, height: 941 },
  { src: '/projects/thumbnail/THUMBNAIL%20ZAPIER.png', width: 1672, height: 941 },
];

const testimonialThumbnails = [
  { src: '/projects/thumbnail/kameron-testimonial.jpg', video: true },
  { src: '/projects/thumbnail/MY%20PICTURE.jpg' },
];

const folderImages = {
  '/projects': projectThumbnails,
  '/testimonials': testimonialThumbnails,
  '/tech-stack': ['GoHighLevel.svg', 'n8n.svg', 'Make.svg', 'Zapier_.svg', 'Claude.svg', 'Twilio.svg']
    .map((name) => ({ src: '/projects/Logo/' + name })),
};

export const FolderCard = ({ title, path, description, icon: Icon = FolderOpen, index = 0, showProjectGallery = false }) => (
  <Link to={path} className={`folder-card${showProjectGallery ? ' home-project-card' : ''}`} style={{ '--folder-hue': [170, 194, 160, 215, 178, 190][index % 6] }}>
    <div className="folder-art" aria-hidden="true">
      <svg viewBox="0 0 160 116" fill="none"><path d="M8 24a10 10 0 0 1 10-10h39l15 15h70a10 10 0 0 1 10 10v60a9 9 0 0 1-9 9H17a9 9 0 0 1-9-9Z" className="folder-back" /><path d="M8 47a10 10 0 0 1 10-10h124a10 10 0 0 1 10 10v52a9 9 0 0 1-9 9H17a9 9 0 0 1-9-9Z" className="folder-front" /><path d="M20 38h120" stroke="white" strokeOpacity=".3" /></svg>
      <Icon size={25} strokeWidth={1.5} />
    </div>
    <span className="folder-label">{title}<ArrowUpRight size={16} /></span>
    <span className="folder-description">{description}</span>
    {showProjectGallery && <FolderPreview images={folderImages[path]} testimonial={path === '/testimonials'} />}
  </Link>
);

export const FolderGrid = ({ items, showProjectGallery = false }) => <div className={`folder-grid${showProjectGallery ? ' folder-preview-grid' : ''}`}>{items.map((item, index) => <FolderCard key={item.path} {...item} index={index} showProjectGallery={showProjectGallery && Boolean(folderImages[item.path]?.length)} />)}</div>;

export const HomeExplorer = () => (
  <section className="explorer-page">
    <div className="explorer-eyebrow"><span /> MY PERSONAL WORKSPACE</div>
    <h1>A little about me.<br /><span>A lot of possibilities.</span></h1>
    <p className="explorer-intro">Welcome to my portfolio. Open a folder and explore what I do.</p>
    <div className="explorer-toolbar"><h2>Explore my portfolio</h2><span><LayoutGrid size={15} /> 5 folders</span></div>
    <FolderGrid items={destinations.slice(1)} showProjectGallery />
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
      <a className="workspace-skip" href="#workspace-content">Skip to content</a>
      <aside className={`workspace-sidebar ${menuOpen ? 'is-open' : ''}`}>
        <Link className="workspace-brand" to="/">JC<span> / PORTFOLIO</span></Link>
        <button className="mobile-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="workspace-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <div className="sidebar-profile text-center"><img className="mx-auto" src={portfolioData.profileImage} alt={portfolioData.name} /><span className="profile-status justify-center"><span className="status-dot" /> Available for Projects</span><h2>{portfolioData.name}</h2><p>{portfolioData.title}</p><div className="sidebar-socials justify-center"><a href={`mailto:${portfolioData.email}`} aria-label="Email"><Mail size={17} /></a><a href={`tel:${portfolioData.phone}`} aria-label="Phone"><Phone size={17} /></a>{portfolioData.linkedin && <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>}</div></div>
        <nav id="workspace-navigation" className="sidebar-navigation" aria-label="Portfolio"><span className="sidebar-caption">WORKSPACE</span>{destinations.map(({ title, path, icon: Icon }) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><Icon size={18} /><span>{title}</span><ChevronRight size={14} /></NavLink>)}</nav>
        <div className="sidebar-bottom"><span className="status-dot" /> Built around possibilities.<small>© {new Date().getFullYear()} {portfolioData.name}</small></div>
      </aside>
      <div className="workspace-main">
        <header className="workspace-topbar"><nav aria-label="Breadcrumb"><ol>{crumbs.map((crumb, index) => <li key={crumb.path}>{index > 0 && <ChevronRight size={14} />}{index === crumbs.length - 1 ? <span aria-current="page">{crumb.title}</span> : <Link to={crumb.path}>{crumb.title}</Link>}</li>)}</ol></nav><span className="workspace-topbar-label">PORTFOLIO EXPLORER</span></header>
        <main id="workspace-content" ref={panelRef} tabIndex={-1} className="workspace-content">
          {location.pathname !== '/' && <Link className="workspace-back" to={crumbs.at(-2)?.path || '/'}><ArrowLeft size={15} /> Back to {crumbs.at(-2)?.title || 'Home'}</Link>}
          <Outlet />
          {location.pathname !== '/' && location.pathname !== '/projects' && <Footer />}
        </main>
      </div>
    </div>
  );
};
