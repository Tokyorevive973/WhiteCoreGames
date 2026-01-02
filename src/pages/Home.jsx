import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import "./Home.css";
import kepWht2 from './image/kep-wht2.png';


export default function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchNews();

    const fetchEvents = async () => {
      const q = query(collection(db, "events"), orderBy("date"));
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchEvents();

    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".fade-in").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) el.classList.add("show");
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="felso-index-menu-elso">
        <div className="felso-index-menu-logo">Whitecore</div>
        <div className="menu-a-link-felso-index">
          <a href="/launcher">Launcher</a>
          <a href="/composition.jsx">Composition</a>
          <a href="/info">Info</a>
        </div>
        <div className="felso-menu-index-profile">
          <a href="/register">Register</a>
         <div className="login">
           <a href="/login">Login</a>
         </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <a href="/register">Get started</a>
        </div>
      </section>

      {/* News row */}
      <section className="news-row">
        <h2>Whitecore News</h2>
        <div className="news-scroll">
          {news.map(item => (
            <div key={item.id} className="news-card">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <small>{item.admin}</small>
            </div>
          ))}
        </div>
      </section><br></br>

      {/* Events vertical */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <small>{new Date(event.date).toLocaleString()}</small>
          </div>
        ))}
      </section> <br></br>



      {/* Footer / Legal */}
      <footer className="legal-section fade-in">
        <div className="legal-box">
          <h2>Subscription & Privacy</h2>
          <p>Your data is safe and GDPR compliant.</p>
          <div className="legal-images">
<img src={kepWht2} alt="Subscription" />          </div>
        </div>
      </footer>
    </>
  );
}
