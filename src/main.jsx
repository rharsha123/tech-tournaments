import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Trophy, CalendarDays, ChevronRight, Play, Camera, Medal,
  CircleDot, Clock3, MapPin, Menu, X, ArrowUpRight
} from "lucide-react";
import "./styles.css";

const matches = [
  { id: 1, sport: "Cricket", date: "12 Sep", time: "10:00 AM", teamA: "SNB Warriors", teamB: "SNB Kings", venue: "Ground 1", status: "upcoming" },
  { id: 2, sport: "Badminton", date: "12 Sep", time: "12:30 PM", teamA: "Ahmed", teamB: "Mohammed", venue: "Court 2", status: "upcoming" },
  { id: 3, sport: "Cricket", date: "12 Sep", time: "3:30 PM", teamA: "SNB Eagles", teamB: "SNB Lions", venue: "Ground 2", status: "upcoming" },
  { id: 4, sport: "Badminton", date: "12 Sep", time: "6:00 PM", teamA: "Omar / Ali", teamB: "Fahad / Saad", venue: "Court 1", status: "upcoming" }
];

const results = [
  { sport: "Cricket", date: "11 Sep", a: "SNB Falcons", b: "SNB Tigers", scoreA: "142/6", scoreB: "138/9", note: "Falcons won by 4 runs" },
  { sport: "Badminton", date: "11 Sep", a: "Hassan", b: "Bilal", scoreA: "21", scoreB: "17", note: "Hassan won" }
];

const points = [
  ["SNB Warriors", 3, 3, 0, 6],
  ["SNB Kings", 3, 2, 1, 4],
  ["SNB Eagles", 3, 1, 2, 2],
  ["SNB Lions", 3, 0, 3, 0]
];

function Badge({ children, live = false }) {
  return <span className={`badge ${live ? "live" : ""}`}>{live && <CircleDot size={11}/>} {children}</span>;
}

function MatchCard({ match }) {
  return (
    <article className="match-card">
      <div className="match-top">
        <span className="sport-label">{match.sport}</span>
        <Badge>Upcoming</Badge>
      </div>
      <div className="match-date">{match.date} · {match.time}</div>
      <div className="teams">
        <div><strong>{match.teamA}</strong><span>Team / Player A</span></div>
        <b>VS</b>
        <div className="right"><strong>{match.teamB}</strong><span>Team / Player B</span></div>
      </div>
      <div className="venue"><MapPin size={15}/>{match.venue}</div>
    </article>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title, action }) {
  return (
    <div className="section-title">
      <div>
        <div className="eyebrow"><Icon size={15}/>{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {action && <button className="text-button">{action}<ChevronRight size={17}/></button>}
    </div>
  );
}

function App() {
  const [sport, setSport] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(
    () => sport === "All" ? matches : matches.filter(m => m.sport === sport),
    [sport]
  );

  return (
    <div>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#home">
            <div className="brand-mark">SNB</div>
            <div><strong>Sports</strong><span>Tournament 2026</span></div>
          </a>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X/> : <Menu/>}
          </button>
          <nav className={mobileOpen ? "nav-links open" : "nav-links"}>
            {["Home", "Cricket", "Badminton", "Fixtures", "Results", "Gallery"].map(item =>
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{item}</a>
            )}
          </nav>
          <a className="admin-link" href="#admin-section">Admin <ArrowUpRight size={15}/></a>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="hero-kicker"><Trophy size={16}/> SNB SPORTS TOURNAMENT 2026</span>
              <h1>Every match.<br/><em>Every moment.</em></h1>
              <p>Follow cricket and badminton fixtures, live scores, qualifiers, results and tournament highlights in one place.</p>
              <div className="hero-actions">
                <a href="#fixtures" className="primary">View Fixtures <ChevronRight size={18}/></a>
                <a href="#results" className="secondary">Latest Results</a>
              </div>
            </div>
            <div className="hero-score">
              <div className="score-head"><span>FEATURED MATCH</span><Badge live>LIVE SOON</Badge></div>
              <div className="score-date">12 SEP · 10:00 AM</div>
              <div className="big-teams"><span>Warriors</span><b>VS</b><span>Kings</span></div>
              <div className="score-venue"><MapPin size={15}/> Ground 1</div>
              <div className="score-footer"><span>Cricket · League Stage</span><ChevronRight/></div>
            </div>
          </div>
        </section>

        <section className="quick-strip">
          <div className="container quick-grid">
            <a href="#fixtures"><CalendarDays/><span><b>Today's Matches</b><small>4 matches scheduled</small></span></a>
            <a href="#qualifiers"><Trophy/><span><b>Qualifiers</b><small>Knockout stage updates</small></span></a>
            <a href="#points"><Medal/><span><b>Points Table</b><small>Latest standings</small></span></a>
            <a href="#gallery"><Camera/><span><b>Highlights</b><small>Photos & videos</small></span></a>
          </div>
        </section>

        <section id="fixtures" className="section container">
          <SectionTitle icon={CalendarDays} eyebrow="MATCH CENTRE" title="Today's Fixtures" action="View all fixtures"/>
          <div className="filter-row">
            {["All", "Cricket", "Badminton"].map(s => <button key={s} className={sport === s ? "filter active" : "filter"} onClick={() => setSport(s)}>{s}</button>)}
          </div>
          <div className="match-grid">{filtered.map(m => <MatchCard key={m.id} match={m}/>)}</div>
        </section>

        <section id="results" className="section alt">
          <div className="container">
            <SectionTitle icon={Trophy} eyebrow="RESULTS" title="Latest Results" action="All results"/>
            <div className="results-grid">
              {results.map((r, i) => (
                <article className="result-card" key={i}>
                  <div className="result-meta"><span>{r.sport}</span><span>{r.date}</span></div>
                  <div className="result-row"><strong>{r.a}</strong><b>{r.scoreA}</b></div>
                  <div className="result-row"><strong>{r.b}</strong><b>{r.scoreB}</b></div>
                  <div className="winner">{r.note}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="points" className="section container">
          <SectionTitle icon={Medal} eyebrow="STANDINGS" title="Cricket Points Table"/>
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Team</th><th>Played</th><th>Won</th><th>Lost</th><th>Points</th></tr></thead>
              <tbody>{points.map((p, i) => <tr key={p[0]}><td>{i + 1}</td><td><strong>{p[0]}</strong></td><td>{p[1]}</td><td>{p[2]}</td><td>{p[3]}</td><td><strong>{p[4]}</strong></td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section id="qualifiers" className="section alt">
          <div className="container qualifier">
            <div>
              <div className="eyebrow"><Trophy size={15}/> KNOCKOUT STAGE</div>
              <h2>Qualifier → Semi-final → Final</h2>
              <p>Keep the tournament journey easy to follow. Add qualifier fixtures, results and qualification status here as the competition progresses.</p>
            </div>
            <div className="bracket">
              <div><small>QUALIFIER</small><b>Team TBD</b><b>Team TBD</b></div>
              <ChevronRight/>
              <div><small>SEMI-FINAL</small><b>Team TBD</b><b>Team TBD</b></div>
              <ChevronRight/>
              <div className="final"><small>FINAL</small><b>🏆 Champion TBD</b></div>
            </div>
          </div>
        </section>

        <section id="gallery" className="section container">
          <SectionTitle icon={Camera} eyebrow="TOURNAMENT LIFE" title="Photos & Videos" action="View gallery"/>
          <div className="gallery-grid">
            <div className="gallery-card photo-one"><span>Opening Day</span></div>
            <div className="gallery-card photo-two"><span>Match Highlights</span><Play className="play"/></div>
            <div className="gallery-card photo-three"><span>Behind the Scenes</span></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div><div className="brand footer-brand"><div className="brand-mark">SNB</div><div><strong>Sports</strong><span>Tournament 2026</span></div></div><p>Cricket · Badminton · Competition · Community</p></div>
          <div className="footer-links"><a href="#fixtures">Fixtures</a><a href="#results">Results</a><a href="#gallery">Gallery</a><a href="#admin-section">Admin</a></div>
        </div>
        <div className="container copyright">© 2026 SNB Sports Tournament. Built with GitHub Pages.</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
