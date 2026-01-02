// src/pages/Dashboard.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import downloadIcon from "../pages/image/dowload.png";
import infoIcon from "../pages/image/info.png";
import bellIcon from "../pages/image/bell.png";
import shopIcon from "../pages/image/shop.png";
import supportIcon from "../pages/image/support.png";
import "./Dashboard.css";
import filmstIcon from "../pages/image/films-whitecore.png";



export default function Dashboard() {
  return (
    <>
      <header className="felso-menu">
        <div className="felso-menu-logo">
          <h1>WHITECORE</h1>
        </div>

        <ul className="menu">
          <li>
            <a href="/launcher">
              Letöltés
              <img src={downloadIcon} alt="letöltés" width={20} />
            </a>
          </li>

          <li>
            <a href="/info">
              Info
              <img src={infoIcon} alt="info" width={20} />
            </a>
          </li>

          <li>
            <a href="/news">
              Hírek
              <img src={bellIcon} alt="hírek" width={20} />
            </a>
          </li>

          <li>
            <a href="/store">
              Store
              <img src={shopIcon} alt="store" width={20} />
            </a>
          </li>

          <li>
            <a href="/support">
              Support
              <img src={supportIcon} alt="support" width={20} />
            </a>
          </li>
        </ul>
          <div className="profile">
             <p>Belépve mint: {auth.currentUser?.email}</p>
                <button onClick={() => signOut(auth)}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Kijelentkezés
        </button>
          </div>
      </header>
<div className="main">


  <div className="trailer">
    <div className="trailer-img">
      <h3>Előzetes</h3>
    </div>
  </div>
</div>

<div className="content">
  {/* 1. Legfontosabb információk */}
  <section className="info-section">
    <h2>Fontos információk</h2>
    <div className="info-cards">
      <div className="card">
        <h3>Friss hírek</h3>
        <p>Új frissítés érkezett a játékhoz, nézd meg a részleteket a Hírek oldalon.</p>
      </div>
      <div className="card">
        <h3>Újdonságok</h3>
        <p>Fedezd fel a legújabb funkciókat és tartalmakat a Store-ban.</p>
      </div>
      <div className="card">
        <h3>Támogatás</h3>
        <p>Probléma van? Lépj kapcsolatba a Support csapatunkkal gyors segítségért.</p>
      </div>
    </div>
  </section>

  {/* 2. Letöltés / Launcher */}
  <section className="download-section">
    <h2>Indítsd el a játékot</h2>
    <p>Kattints a letöltés gombra, hogy azonnal elindíthasd a Whitecore élményt.</p>
    <a href="/launcher" className="download-btn">Launcher letöltése</a>
  </section>

  {/* 3. Extra hírek vagy figyelmeztetések */}
  <section className="news-section">
    <h2>Hírek és frissítések</h2>
    <ul>
      <li>2026.01.02 – Új trailer érhető el a Dashboard-on.</li>
      <li>2026.01.01 – Karbantartás befejeződött, minden rendszer elérhető.</li>
      <li>2025.12.25 – Ünnepi események és jutalmak a játékban.</li>
    </ul>
  </section>
</div>




    </>
  );
}
