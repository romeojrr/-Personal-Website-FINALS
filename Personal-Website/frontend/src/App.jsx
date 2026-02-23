import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PixelSnow from './components/PixelSnow';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || '';

// ==================== SKILL DATA ====================
const skillsRow1 = [
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', name: 'HTML5' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', name: 'CSS3' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', name: 'JS' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', name: 'TypeScript' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', name: 'Vue' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'React' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', name: 'Angular' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', name: 'Flutter' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', name: 'Bootstrap' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', name: 'Vite' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', name: 'Dart' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', name: 'Python' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', name: 'Java' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', name: 'Node.js' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', name: 'Vercel' },
];

const skillsRow2 = [
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', name: 'C++' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', name: 'C#' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', name: 'MySQL' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', name: 'Supabase' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', name: 'AWS' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', name: 'GitHub' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', name: 'Git' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', name: 'VS Code' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', name: 'Figma' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg', name: 'Notion' },
  { icon: 'fas fa-rocket', color: '#ff6b6b', name: 'Antigravity' },
];

// ==================== PLAYLIST DATA ====================
const playlistData = [
  { title: 'Fallen Star', artist: 'The Neighborhood', cover: 'SongCover/Fallen Star_cover.jpg', src: 'Songs/Fallen Star.mp3' },
  { title: 'Self Control', artist: 'Frank Ocean', cover: 'SongCover/Self Control_cover.jpg', src: 'Songs/Self Control.mp3' },
  { title: 'CYANIDE', artist: 'Daniel Caesar', cover: 'SongCover/CYANIDE_cover.jpg', src: 'Songs/CYANIDE.mp3' },
  { title: 'The Way I Loved You', artist: 'Taylor Swift', cover: 'SongCover/The Way I Loved You_cover.jpg', src: "Songs/The Way I Loved You (Taylor's Version).mp3" },
  { title: 'Open Arms', artist: 'SZA (feat. Travis Scott)', cover: 'SongCover/Open Arms_cover.jpg', src: 'Songs/Open Arms (feat. Travis Scott).mp3' },
  { title: 'Loving Machine', artist: 'TV Girl', cover: 'SongCover/Loving Machine_cover.jpg', src: 'Songs/Loving Machine.mp3' },
  { title: 'Thick and Thin', artist: 'LANY', cover: 'SongCover/Thick and Thin_cover.jpg', src: 'Songs/Thick and Thin.mp3' },
  { title: 'Cornelia Street', artist: 'Taylor Swift', cover: 'SongCover/Cornelia Street_cover.jpg', src: 'Songs/Cornelia Street.mp3' },
  { title: 'The Neighborhood', artist: 'The Neighborhood', cover: 'SongCover/Over the Influence_cover.jpg', src: 'Songs/Over the Influence.mp3' },
  { title: 'If I knew', artist: 'Bruno Mars', cover: 'SongCover/If I Knew_cover.jpg', src: 'Songs/If I Knew.mp3' },
];

function SkillIcon({ item, ariaHidden }) {
  if (item.icon) {
    return (
      <div className="skill-icon-item" aria-hidden={ariaHidden || undefined}>
        <i className={item.icon} style={{ color: item.color }} />
        <span>{item.name}</span>
      </div>
    );
  }
  return (
    <div className="skill-icon-item" aria-hidden={ariaHidden || undefined}>
      <img src={item.img} alt={ariaHidden ? '' : item.name} />
      <span>{item.name}</span>
    </div>
  );
}

export default function App() {
  // ==================== MOBILE DETECTION ====================
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ==================== TAB NAVIGATION ====================
  const [currentTab, setCurrentTab] = useState('about');
  const [currentInterest, setCurrentInterest] = useState('Music');
  const [tabAnimating, setTabAnimating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectTab = useCallback((tab) => {
    setCurrentTab((prev) => {
      if (tab === prev) return prev;
      setMobileMenuOpen(false);
      setTabAnimating(false);
      setTimeout(() => {
        setTabAnimating(true);
        setTimeout(() => setTabAnimating(false), 600);
      }, 10);
      return tab;
    });
  }, []);

  // ==================== THEME ====================
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setIsLightMode(saved === 'light');
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsLightMode((prev) => {
      const next = !prev;
      const theme = next ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      return next;
    });
  }, []);

  const snowColor = isLightMode ? '#007ab8' : '#ffffff';
  const profilePhoto = isLightMode ? 'Profile/romeopogi_light.jpg' : 'Profile/romeopogi.jpg';

  // ==================== MUSIC PLAYER ====================
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = playlistData[currentTrackIndex];
  const progressPercent = duration === 0 ? 0 : (currentTime / duration) * 100;

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = !audio.paused;
    audio.src = currentTrack.src;
    audio.load();
    if (wasPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) {
      audio.src = currentTrack.src;
      audio.load();
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isPlaying, currentTrack]);

  const prevTrack = useCallback(() => {
    setCurrentTrackIndex((i) => (i - 1 + playlistData.length) % playlistData.length);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((i) => {
      if (isShuffled) {
        let next;
        if (playlistData.length > 1) {
          do { next = Math.floor(Math.random() * playlistData.length); } while (next === i);
        } else { next = 0; }
        return next;
      }
      return (i + 1) % playlistData.length;
    });
  }, [isShuffled]);

  const playTrack = useCallback((index) => {
    if (currentTrackIndex === index) {
      togglePlay();
      return;
    }
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  }, [currentTrackIndex, togglePlay]);

  const onSeek = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  // ==================== GUESTBOOK ====================
  const [guestbookName, setGuestbookName] = useState('');
  const [guestbookMsg, setGuestbookMsg] = useState('');
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [guestbookLoading, setGuestbookLoading] = useState(false);

  // Fetch entries on mount
  useEffect(() => {
    fetch(`${API_URL}/guestbook`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch');
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setGuestbookEntries(data);
      })
      .catch(() => {
        console.warn('Could not load guestbook entries. Is the backend running?');
      });
  }, []);

  const submitGuestbook = useCallback(async (e) => {
    e.preventDefault();
    if (!guestbookName.trim() || !guestbookMsg.trim()) return;
    setGuestbookLoading(true);
    try {
      const res = await fetch(`${API_URL}/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: guestbookName.trim(), message: guestbookMsg.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Server error');
      }
      const entry = await res.json();
      setGuestbookEntries((prev) => [entry, ...prev]);
      setGuestbookName('');
      setGuestbookMsg('');
    } catch (err) {
      alert(`Failed to submit: ${err.message}. Make sure the backend is running (cd backend && npm run start:dev).`);
    }
    setGuestbookLoading(false);
  }, [guestbookName, guestbookMsg]);

  // ==================== SKILLS SCROLLER HOVER SLOW ====================
  useEffect(() => {
    const scrollerWrap = document.querySelector('.skills-scroller-wrap');
    if (!scrollerWrap) return;
    const scrollers = document.querySelectorAll('.skills-scroller');
    const enter = () => scrollers.forEach((s) => s.getAnimations().forEach((a) => a.updatePlaybackRate(0.3)));
    const leave = () => scrollers.forEach((s) => s.getAnimations().forEach((a) => a.updatePlaybackRate(1)));
    scrollerWrap.addEventListener('mouseenter', enter);
    scrollerWrap.addEventListener('mouseleave', leave);
    return () => {
      scrollerWrap.removeEventListener('mouseenter', enter);
      scrollerWrap.removeEventListener('mouseleave', leave);
    };
  }, []);

  // Initial tab animation
  useEffect(() => {
    setTabAnimating(true);
    const t = setTimeout(() => setTabAnimating(false), 600);
    return () => clearTimeout(t);
  }, []);

  // ==================== TAB VISIBILITY HELPER ====================
  const showTab = (tab) => isMobile || currentTab === tab;
  const tabClass = (tab) =>
    `tab-view${!isMobile && tabAnimating && currentTab === tab ? ' tab-animating' : ''}`;

  // ==================== RENDER ====================
  return (
    <div id="app">
      <PixelSnow color={snowColor} />

      <div className="central-content">
        {/* ======================== CV TOP ROW ======================== */}
        <div className="cv-top-row">
          {/* Left: Photo */}
          <div className="cv-card cv-photo-card">
            <img src={profilePhoto} alt="Romeo" className="cv-photo" />
          </div>

          {/* Middle Column */}
          <div className="cv-middle-col">
            <div className="cv-card cv-intro">
              <h1 className="intro-welcome-title">Hello... I am Romeo!</h1>
              <p className="intro-text">
                A 2nd-year BSIT student who is passionate about becoming a Full-stack and
                Software Developer as I continue to learn, grow, and improve more.
              </p>
            </div>
            <div className="cv-split-row">
              <div className="cv-card cv-skills-bar">
                <h2 className="card-title"><i className="fas fa-code" /> Tech Stack</h2>
                <div className="skills-scroller-wrap">
                  {/* Row 1 */}
                  <div className="skills-scroller">
                    {skillsRow1.map((s, i) => <SkillIcon key={i} item={s} />)}
                    {skillsRow1.map((s, i) => <SkillIcon key={`d${i}`} item={s} ariaHidden />)}
                  </div>
                  {/* Row 2 (reverse) */}
                  <div className="skills-scroller reverse">
                    {skillsRow2.map((s, i) => <SkillIcon key={i} item={s} />)}
                    {skillsRow2.map((s, i) => <SkillIcon key={`d${i}`} item={s} ariaHidden />)}
                  </div>
                </div>
              </div>
              <div className="cv-card cv-socials">
                <h2 className="card-title"><i className="fas fa-share-alt" /> Social Links</h2>
                <div className="social-grid">
                  <a href="https://www.facebook.com/romeojralbeza/about/" className="social-btn" title="Facebook"><i className="fab fa-facebook-f" /></a>
                  <a href="https://www.instagram.com/rmyo_o/" className="social-btn" title="Instagram"><i className="fab fa-instagram" /></a>
                  <a href="https://github.com/romeojrr" className="social-btn" title="GitHub"><i className="fab fa-github" /></a>
                  <a href="https://linkedin.com" className="social-btn" title="LinkedIn"><i className="fab fa-linkedin" /></a>
                  <a href="https://discord.com" className="social-btn" title="Discord"><i className="fab fa-discord" /></a>
                </div>
                <button className="get-in-touch-btn" onClick={() => selectTab('contact_info')}>
                  Get in Touch
                </button>
              </div>
            </div>
          </div>

          {/* Right: Music Player */}
          <div className="cv-card cv-music">
            <div className="spotify-player">
              <img src={currentTrack.cover} className="sp-cover" alt="Cover" />
              <div className="sp-info">
                <span className="sp-title">{currentTrack.title}</span>
                <span className="sp-artist">{currentTrack.artist}</span>
              </div>
              <div className="sp-progress">
                <input
                  type="range"
                  className="sp-range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={onSeek}
                  style={{ backgroundSize: `${progressPercent}% 100%` }}
                />
                <div className="sp-time">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="sp-controls">
                <button className={isShuffled ? 'active' : ''} onClick={(e) => { e.stopPropagation(); setIsShuffled((v) => !v); }}>
                  <i className="fas fa-random" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); prevTrack(); }}>
                  <i className="fas fa-step-backward" />
                </button>
                <button className="sp-play" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
                  <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextTrack(); }}>
                  <i className="fas fa-step-forward" />
                </button>
                <button className={showPlaylist ? 'active' : ''} onClick={(e) => { e.stopPropagation(); setShowPlaylist((v) => !v); }}>
                  <i className="fas fa-list-ul" />
                </button>
              </div>
              {showPlaylist && (
                <div className="sp-playlist">
                  <div className="sp-playlist-header">
                    <span className="sp-playlist-title">Playlist</span>
                    <button className="sp-close-btn" onClick={(e) => { e.stopPropagation(); setShowPlaylist(false); }}>
                      <i className="fas fa-times" />
                    </button>
                  </div>
                  <div className="sp-tracks-scroll">
                    {playlistData.map((track, index) => (
                      <div
                        key={index}
                        className={`sp-track${currentTrackIndex === index ? ' active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); playTrack(index); }}
                      >
                        <img src={track.cover} alt="" />
                        <div className="sp-track-info">
                          <span className="sp-track-name">{track.title}</span>
                          <span className="sp-track-artist">{track.artist}</span>
                        </div>
                        {currentTrackIndex === index && (
                          <div className="sp-track-status">
                            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ======================== NAVIGATION BAR ======================== */}
        <nav className="navbar">
          <div className="nav-tabs">
            {[
              { id: 'about', icon: 'fa-user', label: 'About Me' },
              { id: 'skills', icon: 'fa-layer-group', label: 'Skills' },
              { id: 'projects', icon: 'fa-laptop-code', label: 'Projects' },
              { id: 'interests', icon: 'fa-heart', label: 'My Interests' },
              { id: 'gallery', icon: 'fa-camera', label: 'Gallery' },
              { id: 'contact', icon: 'fa-book', label: 'Guestbook' },
              { id: 'contact_info', icon: 'fa-address-card', label: 'Contact Me' },
              { id: 'resources', icon: 'fa-folder-open', label: 'Resources' },
            ].map((t) => (
              <button
                key={t.id}
                className={`nav-tab${currentTab === t.id ? ' active' : ''}`}
                onClick={() => selectTab(t.id)}
              >
                <i className={`fas ${t.icon}`} /> {t.label}
              </button>
            ))}
          </div>

          <button
            className={`burger-btn${mobileMenuOpen ? ' active' : ''}`}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>

          <div className="theme-toggle-container">
            <label className="theme-switch">
              <input type="checkbox" checked={isLightMode} onChange={toggleTheme} />
              <span className="slider" />
            </label>
          </div>
        </nav>

        {/* ======================== MOBILE MENU OVERLAY ======================== */}
        <div
          className={`mobile-menu-overlay${mobileMenuOpen ? ' open' : ''}`}
          onClick={(e) => { if (e.target === e.currentTarget) setMobileMenuOpen(false); }}
        >
          <div className="mobile-menu">
            {[
              { id: 'about', icon: 'fa-user', label: 'About Me' },
              { id: 'skills', icon: 'fa-layer-group', label: 'Skills' },
              { id: 'projects', icon: 'fa-laptop-code', label: 'Projects' },
              { id: 'interests', icon: 'fa-heart', label: 'My Interests' },
              { id: 'gallery', icon: 'fa-camera', label: 'Gallery' },
              { id: 'contact', icon: 'fa-book', label: 'Guestbook' },
              { id: 'contact_info', icon: 'fa-address-card', label: 'Contact Me' },
              { id: 'resources', icon: 'fa-folder-open', label: 'Resources' },
            ].map((t) => (
              <button
                key={t.id}
                className={`mobile-nav-btn${currentTab === t.id ? ' active' : ''}`}
                onClick={() => selectTab(t.id)}
              >
                <i className={`fas ${t.icon}`} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ======================== TAB CONTENT ======================== */}
        <main className="page-content">

          {/* ===== ABOUT ME ===== */}
          <div className={tabClass('about')} style={{ display: showTab('about') ? undefined : 'none' }}>
            <h2 className="mobile-section-title"><i className="fas fa-user" /> About Me</h2>
            <div className="about-grid">
              <div className="cv-card cv-background">
                <h2 className="card-title"><i className="fas fa-user-circle" /> Background</h2>
                <div className="bg-info">
                  <div className="bg-item">
                    <span className="bg-label">About Me</span>
                    <p className="bg-value" style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                      Hello Again!!!, I am Romeo Albeza Jr.,<br /><br />
                      Just me, chillin&apos; through life but figuring stuff out as I go. I
                      overthink sometimes, but I also laugh too much at dumb things. Big on keeping my
                      peace, but I&apos;ve got my opinions too — can&apos;t help it.<br /><br />
                      I keep my peace, but I don&apos;t settle. Life hits, I hit back harder. Basically,
                      just doing me, keeping it real, not trying to be average, and building a
                      stronger self, one step at a time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="cv-card cv-education">
                <h2 className="card-title"><i className="fas fa-graduation-cap" /> Education</h2>
                <div className="edu-grid">
                  <div className="edu-entry">
                    <div className="edu-info">
                      <span className="edu-years">2024 - Present</span>
                      <h4>College - Asia Pacific College</h4>
                      <p>BS Information Technology</p>
                    </div>
                  </div>
                  <div className="edu-entry">
                    <div className="edu-info">
                      <span className="edu-years">2022 - 2024</span>
                      <h4>Senior High - Thy Covenant Montessori School</h4>
                      <p>General Academic Strand</p>
                    </div>
                  </div>
                  <div className="edu-entry">
                    <div className="edu-info">
                      <span className="edu-years">2018 - 2022</span>
                      <h4>Fort Bonifacio High School</h4>
                      <p>Junior High</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SKILLS ===== */}
          <div className={tabClass('skills')} style={{ display: showTab('skills') ? undefined : 'none' }}>
            <h2 className="mobile-section-title"><i className="fas fa-layer-group" /> Skills</h2>
            <div className="tab-inner">
              <div className="cv-skills skills-categories">
                <div className="cv-card skill-category">
                  <h4 className="skill-cat-label">Front End</h4>
                  <div className="skill-tags">
                    <span className="skill-tag"><i className="devicon-html5-plain" /> HTML</span>
                    <span className="skill-tag"><i className="devicon-css3-plain" /> CSS</span>
                    <span className="skill-tag"><i className="devicon-javascript-plain" /> JavaScript</span>
                    <span className="skill-tag"><i className="devicon-bootstrap-plain" /> Bootstrap</span>
                    <span className="skill-tag"><i className="devicon-vuejs-plain" /> Vue.js</span>
                    <span className="skill-tag"><i className="devicon-vitejs-plain" /> Vite</span>
                    <span className="skill-tag"><i className="devicon-react-original" /> React</span>
                    <span className="skill-tag"><i className="devicon-flutter-plain" /> Flutter</span>
                    <span className="skill-tag"><i className="devicon-dart-plain" /> Dart</span>
                    <span className="skill-tag"><i className="devicon-typescript-plain" /> TypeScript</span>
                    <span className="skill-tag"><i className="devicon-angularjs-plain" /> Angular</span>
                  </div>
                </div>
                <div className="cv-card skill-category">
                  <h4 className="skill-cat-label">Backend</h4>
                  <div className="skill-tags">
                    <span className="skill-tag"><i className="devicon-python-plain" /> Python</span>
                    <span className="skill-tag"><i className="devicon-java-plain" /> Java</span>
                    <span className="skill-tag"><i className="devicon-nodejs-plain" /> Node.js</span>
                    <span className="skill-tag"><i className="devicon-mysql-plain" /> MySQL</span>
                    <span className="skill-tag"><i className="fas fa-plug" /> REST API</span>
                    <span className="skill-tag"><i className="devicon-amazonwebservices-plain-wordmark" /> AWS</span>
                    <span className="skill-tag"><i className="devicon-supabase-plain" /> Supabase</span>
                    <span className="skill-tag"><i className="devicon-cplusplus-plain" /> C++</span>
                    <span className="skill-tag"><i className="devicon-csharp-plain" /> C#</span>
                  </div>
                </div>
                <div className="cv-card skill-category">
                  <h4 className="skill-cat-label">Developer Tools</h4>
                  <div className="skill-tags">
                    <span className="skill-tag"><i className="devicon-git-plain" /> Git</span>
                    <span className="skill-tag"><i className="devicon-github-original" /> GitHub</span>
                    <span className="skill-tag"><i className="devicon-vscode-plain" /> VS Code</span>
                    <span className="skill-tag"><i className="devicon-figma-plain" /> Figma</span>
                    <span className="skill-tag"><i className="devicon-notion-plain" /> Notion</span>
                    <span className="skill-tag"><i className="devicon-vercel-original" /> Vercel</span>
                    <span className="skill-tag"><i className="fas fa-rocket" /> Antigravity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== MY INTERESTS ===== */}
          <div className={tabClass('interests')} style={{ display: showTab('interests') ? undefined : 'none' }}>
            <h2 className="mobile-section-title"><i className="fas fa-heart" /> My Interests</h2>
            <div className="tab-inner">
              <div className="interests-layout">
                {/* Sidebar */}
                <div className="cv-card interests-sidebar">
                  {['Music', 'Movie', 'Anime', 'Sports'].map((cat) => (
                    <button
                      key={cat}
                      className={`interest-nav-btn${currentInterest === cat ? ' active' : ''}`}
                      onClick={() => setCurrentInterest(cat)}
                    >
                      <i className={`fas ${cat === 'Music' ? 'fa-music' : cat === 'Movie' ? 'fa-film' : cat === 'Anime' ? 'fa-dragon' : 'fa-basketball-ball'}`} />{' '}
                      {cat === 'Movie' ? 'Shows' : cat}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="cv-card interests-content-area">
                  <div className="interest-header">
                    {currentInterest === 'Music' && <h3 className="interest-title">My Top Albums</h3>}
                    {currentInterest === 'Movie' && <h3 className="interest-title">My Favorite Shows</h3>}
                    {currentInterest === 'Anime' && <h3 className="interest-title">Must Watch Animes</h3>}
                    {currentInterest === 'Sports' && <h3 className="interest-title">Sports That I Know</h3>}
                  </div>

                  {/* Music Grid */}
                  {currentInterest === 'Music' && (
                    <div className="interest-grid">
                      {[
                        { img: 'InterestsImages/TTPD_Cover.jpg', label: 'The Tortured Poets Department' },
                        { img: 'InterestsImages/Folklore_cover.jpg', label: 'Folklore' },
                        { img: 'InterestsImages/Never Enough_cover.jpg', label: 'Never Enough' },
                        { img: 'InterestsImages/CAS_cover.jpg', label: 'CAS' },
                      ].map((item, i) => (
                        <div key={i} className="interest-item">
                          <div className="interest-placeholder">
                            <img src={item.img} className="interest-img" />
                            <span className="interest-label">{item.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Shows Grid */}
                  {currentInterest === 'Movie' && (
                    <div className="interest-grid">
                      {[
                        'InterestsImages/Dare Devil_cover.jpg',
                        'InterestsImages/The Last of Us (2023).jpg',
                        'InterestsImages/BLOODHOUNDS.jpg',
                        'InterestsImages/The Boys.jpg',
                      ].map((img, i) => (
                        <div key={i} className="interest-item">
                          <div className="interest-placeholder">
                            <img src={img} className="interest-img" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Anime Grid */}
                  {currentInterest === 'Anime' && (
                    <div className="interest-grid">
                      {[
                        'InterestsImages/100 METERS.jpg',
                        'InterestsImages/Chainsaw man.jpg',
                        'InterestsImages/Jujutsu Kaisen.jpg',
                        'InterestsImages/Vinland Saga.jpg',
                      ].map((img, i) => (
                        <div key={i} className="interest-item">
                          <div className="interest-placeholder">
                            <img src={img} className="interest-img" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sports */}
                  {currentInterest === 'Sports' && (
                    <div className="sports-list-container">
                      <div className="sports-grid">
                        {[
                          { icon: 'fa-running', name: 'Running' },
                          { icon: 'fa-basketball-ball', name: 'Basketball' },
                          { icon: 'fa-feather', name: 'Badminton' },
                          { icon: 'fa-swimmer', name: 'Swimming' },
                          { icon: 'fa-futbol', name: 'Football' },
                          { icon: 'fa-bicycle', name: 'Cycling' },
                        ].map((s, i) => (
                          <div key={i} className="sports-card">
                            <div className="sports-icon"><i className={`fas ${s.icon}`} /></div>
                            <span className="sports-name">{s.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===== GALLERY ===== */}
          <div className={tabClass('gallery')} style={{ display: showTab('gallery') ? undefined : 'none' }}>
            <h2 className="mobile-section-title"><i className="fas fa-camera" /> Gallery</h2>
            <div className="tab-inner">
              <div className="cv-card gallery-card">
                <div className="gallery-grid">
                  {['pic1.jpg', 'pic4.jpg', 'pic5.jpg', 'pic2.jpg', 'pic12.jpg', 'pic3.jpg', 'pic10.jpg', 'pic8.jpg'].map((pic, i) => (
                    <div key={i} className="gallery-item">
                      <img src={`Gallery/${pic}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== PROJECTS ===== */}
          <div className={tabClass('projects')} style={{ display: showTab('projects') ? undefined : 'none' }}>
            <h2 className="mobile-section-title"><i className="fas fa-laptop-code" /> Projects</h2>
            <div className="tab-inner">
              <div className="cv-card projects-card">
                <div className="project-entry">
                  <div className="project-image-box">
                    <img src="images/RESQTAGS.png" alt="ResqTags" className="project-img" />
                  </div>
                  <div className="project-details">
                    <div className="project-header">
                      <h3>ResqTags</h3>
                      <span className="project-badge">Mobile App</span>
                    </div>
                    <p>Pet QR Tag Mobile App — track and find lost pets via crowd-sourced scanning with real-time notifications and location tracking.</p>
                    <div className="project-tech">
                      <span>Outsystems</span>
                    </div>
                    <a href="https://edulab05.outsystemsenterprise.com/PreviewInDevices/ShareMobileApp.aspx?URL=/ResQTagMobile/&_ts=113386" target="_blank" rel="noreferrer" className="view-project-btn">
                      <i className="fas fa-external-link-alt" /> View Project
                    </a>
                  </div>
                </div>
                <div className="project-entry">
                  <div className="project-image-box">
                    <img src="images/CAPYHUB.png" alt="CapyHub" className="project-img" />
                  </div>
                  <div className="project-details">
                    <div className="project-header">
                      <h3>CapyHub</h3>
                      <span className="project-badge">Mobile App</span>
                    </div>
                    <p>A simple prototype of profile card application like social media.</p>
                    <div className="project-tech">
                      <span>Flutter</span>
                      <span>Dart</span>
                    </div>
                    <a href="https://drive.google.com/drive/folders/1uR0FZpXADKmz2z82G0rT7z_fUkW-6eQQ?usp=drive_link" target="_blank" rel="noreferrer" className="view-project-btn">
                      <i className="fas fa-external-link-alt" /> View Project
                    </a>
                  </div>
                </div>
                <div className="project-entry coming-soon-entry">
                  <div className="project-icon-box coming-soon">🚧</div>
                  <div className="project-details">
                    <h3>More coming soon...</h3>
                    <p>Currently working on exciting new projects!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== GUESTBOOK ===== */}
          <div className={tabClass('contact')} style={{ display: showTab('contact') ? undefined : 'none' }}>
            <h2 className="mobile-section-title"><i className="fas fa-book" /> Guestbook</h2>
            <div className="tab-inner">
              <div className="guestbook-layout">
                {/* Form Side */}
                <div className="guestbook-form-side">
                  <div className="guestbook-form-title">
                    <i className="fas fa-pen-nib" /> Sign the Guestbook
                  </div>
                  <form className="guestbook-form" onSubmit={submitGuestbook}>
                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        placeholder="What should we call you?"
                        value={guestbookName}
                        onChange={(e) => setGuestbookName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Your Message</label>
                      <textarea
                        placeholder="Leave a message, say hi, or share some love..."
                        value={guestbookMsg}
                        onChange={(e) => setGuestbookMsg(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="guestbook-submit" disabled={guestbookLoading}>
                      <i className="fas fa-paper-plane" /> {guestbookLoading ? 'Sending...' : 'Sign Guestbook'}
                    </button>
                  </form>
                </div>
                {/* Entries Side */}
                <div className="guestbook-entries-side">
                  <div className="guestbook-entries-header">
                    <i className="fas fa-book-open" />
                    <h3>Guestbook Entries</h3>
                  </div>
                  <div className="guestbook-entries-scroll">
                    {guestbookEntries.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                        <p>No entries yet. Be the first to sign!</p>
                      </div>
                    ) : (
                      guestbookEntries.map((entry) => (
                        <div key={entry.id} className="guestbook-entry">
                          <div className="guestbook-entry-header">
                            <div className="guestbook-avatar">
                              {entry.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <span className="guestbook-name">{entry.name}</span>
                            <span className="guestbook-date">
                              {new Date(entry.created_at).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'short', day: 'numeric',
                              })}
                            </span>
                          </div>
                          <p className="guestbook-msg">{entry.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== CONTACT ME ===== */}
          <div className={tabClass('contact_info')} style={{ display: showTab('contact_info') ? undefined : 'none' }}>
            <h2 className="mobile-section-title"><i className="fas fa-address-card" /> Contact Me</h2>
            <div className="tab-inner">
              <div className="contact-section">
                <div className="cv-card contact-card">
                  <h2 className="card-title"><i className="fas fa-address-card" /> Contact Information</h2>
                  <div className="contact-list">
                    {[
                      { icon: 'fas fa-phone', label: 'Contact Number', value: '+63 951 057 9606' },
                      { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'linkedin.com/in/romeo-albeza-jr-a406b5322' },
                      { icon: 'fas fa-envelope', label: 'Email', value: 'romeojralbeza@gmail.com' },
                      { icon: 'fas fa-university', label: 'School Email', value: 'rlalbezajr@student.apc.edu.ph' },
                      { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Manila, Philippines' },
                    ].map((c, i) => (
                      <div key={i} className="contact-item">
                        <div className="contact-icon"><i className={c.icon} /></div>
                        <div className="contact-details">
                          <span className="contact-label">{c.label}</span>
                          <span className="contact-value">{c.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RESOURCES ===== */}
          <div className={tabClass('resources')} style={{ display: showTab('resources') ? undefined : 'none' }}>
            <h2 className="mobile-section-title"><i className="fas fa-folder-open" /> Resources</h2>
            <div className="tab-inner">
              <div className="cv-card resources-card">
                <div className="resource-item">
                  <div className="resource-icon gemini-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                      <path d="M12 0C12 0 12 6.27 8.13 10.13C4.27 14 0 12 0 12C0 12 4.27 14 8.13 17.87C12 21.73 12 24 12 24C12 24 12 21.73 15.87 17.87C19.73 14 24 12 24 12C24 12 19.73 10.13 15.87 6.27C12 2.4 12 0 12 0Z" />
                    </svg>
                  </div>
                  <div className="resource-info">
                    <h4>Google Gemini</h4>
                    <p>Used for debugging, layout planning, and design ideas. Helped with code suggestions, troubleshooting errors, and brainstorming UI/UX improvements throughout the project.</p>
                  </div>
                </div>
                <div className="resource-item">
                  <div className="resource-icon react-vite-icon">
                    <i className="devicon-react-original" />
                    <i className="devicon-vitejs-plain" />
                  </div>
                  <div className="resource-info">
                    <h4>React &amp; Vite</h4>
                    <p>Used as the frontend framework and build tool. React provides a component-based architecture for building dynamic user interfaces, while Vite offers lightning-fast hot module replacement and optimized production builds.</p>
                  </div>
                </div>
                <div className="resource-item">
                  <div className="resource-icon nestjs-icon">
                    <i className="devicon-nestjs-original" />
                  </div>
                  <div className="resource-info">
                    <h4>NestJS</h4>
                    <p>Used as the backend framework for building server-side applications. NestJS provides a modular architecture with TypeScript support, built-in dependency injection, and seamless REST API creation for handling data and business logic.</p>
                  </div>
                </div>
                <div className="resource-item">
                  <div className="resource-icon vercel-icon">
                    <i className="devicon-vercel-original" />
                  </div>
                  <div className="resource-info">
                    <h4>Vercel</h4>
                    <p>Used for deployment and hosting. Vercel provides seamless Git-based deployments, serverless functions, automatic HTTPS, and a global edge network for fast content delivery with zero-config production builds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>

        <audio
          ref={audioRef}
          onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
          onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
          onEnded={nextTrack}
        />
      </div>

      {/* Footer — mobile only */}
      <footer className="site-footer">
        <p>&copy; 2026 Romeo Albeza Jr. All rights reserved.</p>
      </footer>
    </div>
  );
}
