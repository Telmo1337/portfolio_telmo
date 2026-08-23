import { useEffect, useState } from 'react'
import futbolLogo from './assets/futbol.svg'
import theCouchProblem from './assets/the_couch_problem.png'
import sayWhoHere from './assets/say_who_here.png'
import showTheWhy from './assets/show_the_why.png'
import handleMessy from './assets/handle_the_messy_case.png'
import honestLimits from './assets/honest_limits.png'

const LINKS = {
  github: 'https://github.com/Telmo1337',
  linkedin: 'https://www.linkedin.com/in/telmo-regalado-b193b59b/',
  email: 'mailto:telmoregalado@gmail.com',
  futbol: 'https://github.com/Telmo1337/FUTbol',
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))]
}

function Header({ onBrandClick, theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="header-inner">
        <button onClick={onBrandClick} className="brand">Telmo Regalado</button>
        <button aria-label="Toggle theme" onClick={toggleTheme} className="theme-btn">
          {theme === 'light' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
          )}
        </button>
      </div>
    </header>
  )
}

function ProjectCard({ title, desc, thumb, thumbImage, meta, href, onClick, external }) {
  const El = onClick ? 'button' : 'a'
  const props = onClick ? { onClick } : { href, target: external ? '_blank' : undefined, rel: external ? 'noreferrer' : undefined }
  return (
    <El className="card" {...props}>
      <div className={`card-media ${thumb}`}>
        {thumbImage ? <img src={thumbImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
        {!thumbImage && thumb === 'thumb-netflix' && <span>N</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
        {meta && <div className="card-meta">{meta.map((m) => <span key={m} className="meta-pill">{m}</span>)}</div>}
      </div>
      <span className="card-arrow" aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 17L17 7M17 7H8M17 7V16" /></svg>
      </span>
    </El>
  )
}

function Section({ eyebrow, title, children }) {
  return (
    <section className="case-section">
      <p className="snum">{eyebrow}</p>
      <h2 className="case-h2">{title}</h2>
      {children}
    </section>
  )
}

function Fig({ src, alt }) {
  return (
    <div className="fig">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}

function Home({ onOpenCase }) {
  const [tab, setTab] = useState('projects')
  return (
    <>
      <div className="intro">
        <p>
          I'm a <span className="em">product designer / engineer</span> with a passion for motion and craft. Previously Software Engineer Intern at <a className="dotted" href="#" onClick={(e) => e.preventDefault()}>XARP, Reality Labs</a> — where I worked on a fully client-side Virtual Try-On engine and exploratory QA.
        </p>
        <p>
          I design and build. <span className="em">Decide Together</span> is a Netflix couch-side concept for when two people sit down — say who's watching, get three explained picks, veto quietly, one tap to play. <span className="em">FUTbol</span> is a serverless Discord bot that runs the weekly cycle of a casual football group.
        </p>
        <p>
          You can find me on <a className="dotted" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a> and <a className="dotted" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>, or reach me by <a className="dotted" href={LINKS.email}>email</a>.
        </p>
      </div>

      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'projects'} className={`tab ${tab === 'projects' ? 'active' : ''}`} onClick={() => setTab('projects')}>Projects</button>
        <button role="tab" aria-selected={tab === 'experience'} className={`tab ${tab === 'experience' ? 'active' : ''}`} onClick={() => setTab('experience')}>Experience</button>
      </div>

      {tab === 'projects' ? (
        <div className="stack">
          <ProjectCard onClick={onOpenCase} thumb="thumb-netflix" title="Decide Together — Netflix" desc="Netflix knows what each of us likes — it never uses that when two of us sit down. A couch-side feature: say who's watching, get three explained picks, veto anonymously, one tap to play." meta={['2026 · Case study', 'Product design + build', 'Smart TV']} />
          <ProjectCard href={LINKS.futbol} external thumb="thumb-futbol" thumbImage={futbolLogo} title="FUTbol — Discord bot" desc="A Discord bot that runs the full weekly cycle of a casual football group. Day voting, attendance, waitlist, check-in and automatic team builder. Zero hosting cost." meta={['2025 · Live', 'TypeScript', 'Cloudflare Workers', 'D1', 'Drizzle ORM']} />
        </div>
      ) : (
        <div className="exp-section">
          <div className="exp-card">
            <div className="exp-head">
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div className="xarp-logo" aria-hidden><span className="xarp-xa">XA</span><span className="xarp-rp">RP</span></div>
                <div>
                  <p className="exp-role">Software Engineer Intern — Frontend & QA</p>
                  <p className="exp-company">XARP, Reality Labs · Viana do Castelo, PT</p>
                  <p className="exp-loc">Where exploratory testing became second nature.</p>
                </div>
              </div>
              <span className="exp-date">Mar – Jun 2026</span>
            </div>
            <ul className="exp-bullets">
              <li>Mapped key user flows (login, outfit creation, scheduling) to guide my own testing.</li>
              <li>Ran exploratory and manual testing on the mobile app, flagging bugs, errors, and UI/UX improvement opportunities, logged as tickets in GitHub Projects.</li>
              <li>Contributed to a fully client-side Virtual Try-On engine for cosmetic lip transformation, working within real browser-performance constraints.</li>
            </ul>
            <div className="tag-row">{['React', 'TypeScript', 'Vite', 'Zustand', 'Tailwind CSS'].map((t) => <span key={t} className="tag">{t}</span>)}</div>
          </div>
        </div>
      )}
    </>
  )
}

function CaseStudy({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="case-wrap">
      <div className="case-hero">
        <button className="back-btn" onClick={onBack}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M19 12H5M12 19l-7-7 7-7" /></svg> Back to work</button>
        <p className="kicker">Telmo Regalado · Case study · 00</p>
        <h1 className="case-title">Decide Together.</h1>
        <p className="case-subtitle">Netflix knows what each of us likes. It never uses that when two of us sit down. A feature for the couch — Smart TV, remote-first, one question: who's watching tonight?</p>
        <dl className="case-meta-grid">
          <div><dt>Role</dt><dd>Product design (concept)</dd></div>
          <div><dt>Surface</dt><dd>Smart TV</dd></div>
          <div><dt>Context</dt><dd>Design graduate program take-home</dd></div>
          <div><dt>Year</dt><dd>2026</dd></div>
        </dl>
      </div>

      <Section eyebrow="01 — Constraints" title="What I actually had.">
        <p className="case-p italic">Stated up front, because a case study that hides its constraints is selling you something.</p>
        <h3 className="case-h3">Brief</h3><p className="case-p">Pick a product you use, add a feature you've always wanted. Take a risk.</p>
        <h3 className="case-h3">Time</h3><p className="case-p">Five days, alongside a separate frontend challenge.</p>
        <h3 className="case-h3">Research</h3><p className="case-p">None. No users tested. This is a problem I live weekly, not one I validated.</p>
        <h3 className="case-h3">Surface</h3><p className="case-p">Smart TV — a ten-foot, remote-first interface, not a phone.</p>
        <h3 className="case-h3">Mockups</h3><p className="case-p">Hand-built in HTML, imported to Figma. I build, so I prototyped in the real medium.</p>
        <h3 className="case-h3">AI</h3><p className="case-p">Used to accelerate. The idea, the decisions and the why are mine — and defensible live.</p>
      </Section>

      <Section eyebrow="02 — The problem" title="The couch problem.">
        <p className="case-p">It's you and your partner, or a few friends round at your place. You're on the couch and the question hits: what do we put on? Five minutes becomes thirty — scrolling past everything, agreeing on nothing — and you give up and put anything on. And <em>anything</em> is a compromise nobody is happy with.</p>
        <p className="case-p">Netflix only knows how to ask <strong>which profile</strong>. So couples keep separate profiles it cannot merge, or share one muddled profile that recommends for no one. Either way, it has no idea that tonight it is <strong>the two of us</strong> on the couch.</p>
        <p className="case-quote">Netflix knows what each of us likes. It never uses that when two of us sit down.</p>
        <Fig src={theCouchProblem} alt="The couch problem — deciding what to watch together" />
      </Section>

      <Section eyebrow="03 — The move" title="Say who's here — don't switch profiles.">
        <p className="case-p">It is not a magic button that reads your mind. It takes the pain out of deciding together, and it starts with one question: <strong>who is watching tonight?</strong></p>
        <p className="case-p">If someone has their own account — and your partner probably does — they scan a QR code and join, like a Spotify Jam. Their real taste comes with them: no new profile, nothing to maintain. I still need a signal from each person; you cannot blend a taste you know nothing about. But it is your own account joining for the night, asked right there on the couch, where the payoff is instant.</p>
        <Fig src={sayWhoHere} alt="Say who's here — don't switch profiles" />
      </Section>

      <Section eyebrow="04 — The heart" title="Show the why. Let anyone say no.">
        <p className="case-p">Not fifty titles — <strong>three</strong>. Each one comes with the reason it made the cut: <em>you both loved Knives Out, and neither of you has seen this.</em> That is the whole difference from a random autoplay — you see why, and you choose.</p>
        <p className="case-p">If one is a no, there is a quiet veto. Anyone can pass and it swaps out, without their taste getting shot down out loud.</p>
        <p className="case-quote">Because otherwise the loudest person on the couch just wins.</p>
        <Fig src={showTheWhy} alt="Show the why — three explained picks, veto quietly" />
      </Section>

      <Section eyebrow="05 — Maturity" title="Handle the messy cases.">
        <p className="case-p">A real product does not stop at the happy path. None of the three landed? A longer merged list, still explained — never a dead end.</p>
        <p className="case-p">Tastes barely overlap tonight? It says so honestly and offers to take turns: tonight leans your way, next time it balances. And the screen only ever shows the shared result, never each other's private history. When someone leaves the session, their data leaves with them.</p>
        <Fig src={handleMessy} alt="Handle the messy cases — never a dead end" />
      </Section>

      <Section eyebrow="06 — What I'd do with more time" title="The honest limits.">
        <p className="case-p">I assert the veto keeps the peace. I have not proven it. I would test it with five real couples on a real TV and watch where the remote hesitates.</p>
        <p className="case-p">I would measure one number — <strong>time to play</strong>, the minutes lost before someone finally hits play. And the cold start — that twenty-second tap, or the QR join — is the riskiest part of the flow. It is where I would spend the next week.</p>
        <Fig src={honestLimits} alt="The honest limits — what I'd do with more time" />
      </Section>

      <Section eyebrow="07 — Where it sits" title="Has this been tried?">
        <p className="case-p">The first question in the room, so I checked. No streaming platform has a native decide-together.</p>
        <p className="case-p">Teleparty and the swipe apps live outside Netflix — a second app that cannot see your real history. Play Something is Netflix's only help-me-decide, and it is random: no agency, no why. The decision itself is still unsolved. This design attacks it — three explained options and a veto, not one forced pick.</p>
        <div className="colophon">
          <p className="case-p"><strong>Colophon</strong> — This case study is also the work sample. I designed the thing, then I built the page you read it on. The screening room, the scroll and the type are React. Every screen is the interface I submitted, rebuilt as a component.</p>
        </div>
        <div className="case-actions">
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="pill-ghost">GitHub →</a>
          <button onClick={onBack} className="pill-solid">Back to work</button>
        </div>
      </Section>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} Telmo Regalado</span>
        <nav className="footer-links"><a href={LINKS.email}>Email</a><a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a><a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></nav>
      </div>
    </footer>
  )
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [view, setView] = useState('home')
  useEffect(() => {
    const sync = () => setView(window.location.hash === '#decide-together' ? 'case' : 'home')
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  const openCase = () => { window.location.hash = '#decide-together' }
  const goHome = () => { window.location.hash = ''; setView('home'); window.scrollTo(0, 0) }
  return (
    <div className="shell">
      <Header onBrandClick={goHome} theme={theme} toggleTheme={toggleTheme} />
      <main className="container" style={{ flex: 1 }}>{view === 'case' ? <CaseStudy onBack={goHome} /> : <Home onOpenCase={openCase} />}</main>
      <Footer />
    </div>
  )
}
