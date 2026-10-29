import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronRight, Home, FolderOpen, MessageSquare, UserRound, Layers, Mail, Phone, Linkedin, Menu, X, LayoutGrid } from 'lucide-react';
import { portfolioData } from '../mockData';
import { Footer } from './Footer';

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

const ProjectThumbnailMarquee = () => {
  const [next, setNext] = useState(0);
  const [ready, setReady] = useState(false);
  const animationRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    let active = true;
    Promise.all(projectThumbnails.map((image) => new Promise((resolve) => {
      const preload = new Image();
      preload.onload = resolve;
      preload.onerror = resolve;
      preload.src = image.src;
    }))).then(() => {
      if (active) setReady(true);
    });
    return () => { active = false; };
  }, []);

  useLayoutEffect(() => {
    const layer = animationRef.current;
    const card = layer.closest('.home-project-card');
    const folder = card.querySelector('.folder-art');
    const gallery = galleryRef.current;
    const measure = () => {
      const slotHeight = gallery.clientWidth * (9 / 16) + 8;
      const flyingWidth = Math.min(card.clientWidth * .465, 96);
      const flyingHeight = flyingWidth * (9 / 16);
      layer.style.setProperty('--slot-height', `${slotHeight}px`);
      layer.style.setProperty('--gallery-height', `${slotHeight * 3}px`);
      layer.style.setProperty('--flying-width', `${flyingWidth}px`);
      layer.style.setProperty('--flight-right', `${card.clientWidth - gallery.offsetLeft - gallery.clientWidth + ((gallery.clientWidth - flyingWidth) / 2)}px`);
      const landingY = gallery.offsetTop + gallery.clientHeight - slotHeight;
      const landingX = gallery.offsetLeft + ((gallery.clientWidth - flyingWidth) / 2);
      const openingY = folder.offsetTop + folder.clientHeight * .42;
      const startX = folder.offsetLeft + (folder.clientWidth / 2) - (flyingWidth / 2);
      const startY = openingY - (flyingHeight * .46);
      layer.style.setProperty('--throw-x', `${startX - landingX}px`);
      layer.style.setProperty('--throw-y', `${startY - landingY}px`);
      layer.style.setProperty('--arc-y', `${startY - 13 - landingY}px`);
      layer.style.setProperty('--landing-y', `${landingY}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  // Two residents followed by the incoming image. At the cycle boundary the
  // top resident is removed, exactly matching the completed one-row movement.
  const sequence = Array.from({ length: 3 }, (_, index) =>
    projectThumbnails[(next + index + projectThumbnails.length - 2) % projectThumbnails.length]
  );
  return (
    <div
      ref={animationRef}
      className="home-project-animation"
      data-ready={ready}
      aria-hidden="true"
      onAnimationIteration={(event) => {
        if (event.target === event.currentTarget) {
          setNext((index) => (index + 1) % projectThumbnails.length);
        }
      }}
    >
      <div ref={galleryRef} className="home-project-gallery overflow-hidden">
        <div className="home-project-track">
          {sequence.map((image, index) => (
            <div className={`home-project-image-slot${index === 2 ? ' incoming' : ''}`} key={index}>
              <img {...image} alt="" className="block rounded-md" decoding="async" draggable="false" />
            </div>
          ))}
        </div>
      </div>
      <div className="home-project-flying">
        <img {...projectThumbnails[next]} alt="" className="block rounded-md" decoding="async" draggable="false" />
      </div>
    </div>
  );
};

export const FolderCard = ({ title, path, description, icon: Icon = FolderOpen, index = 0, showProjectGallery = false }) => (
  <Link to={path} className={`folder-card${showProjectGallery ? ' home-project-card' : ''}`} style={{ '--folder-hue': [170, 194, 160, 215, 178, 190][index % 6] }}>
    <div className="folder-art" aria-hidden="true">
      <svg viewBox="0 0 160 116" fill="none"><path d="M8 24a10 10 0 0 1 10-10h39l15 15h70a10 10 0 0 1 10 10v60a9 9 0 0 1-9 9H17a9 9 0 0 1-9-9Z" className="folder-back" /><path d="M8 47a10 10 0 0 1 10-10h124a10 10 0 0 1 10 10v52a9 9 0 0 1-9 9H17a9 9 0 0 1-9-9Z" className="folder-front" /><path d="M20 38h120" stroke="white" strokeOpacity=".3" /></svg>
      <Icon size={25} strokeWidth={1.5} />
    </div>
    <span className="folder-label">{title}<ArrowUpRight size={16} /></span>
    <span className="folder-description">{description}</span>
    {showProjectGallery && <ProjectThumbnailMarquee />}
  </Link>
);

export const FolderGrid = ({ items, showProjectGallery = false }) => <div className="folder-grid">{items.map((item, index) => <FolderCard key={item.path} {...item} index={index} showProjectGallery={showProjectGallery && item.path === '/projects'} />)}</div>;

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
