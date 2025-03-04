import logo from "../assets/logo-bg.png";
import "../css/welcome_page.css";
import { MdDashboard, MdOutlineQueryStats } from "react-icons/md";
import { BsBook, BsArchiveFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useStoredNick from "../hooks/useStoredNick";
import { useState } from "react";

const WelcomePage = () => {
  const { t } = useTranslation();
  const [nick, setNick] = useStoredNick();
  const [inputNick, setInputNick] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setNick(inputNick);
    setInputNick("");
  };

  const navbar = (
    <nav>
      {nick !== "empty" ? (
        <span>
          Karty użytkownika: <p> {nick}</p>
        </span>
      ) : (
        <span>Zaloguj się byku</span>
      )}
    </nav>
  );

  const disableLinkClass = !nick || nick === "empty" ? "disabled" : "";

  return (
    <section className="welcome-page">
      {navbar}
      <div className="image-wrapper">
        <img src={logo} alt="logo" />
        <div className="h-wrapper">
          <h4>Lite</h4>
          <span className="dot"></span>
        </div>
      </div>
      <aside>
        <div className="wrapper">
          <form onSubmit={handleLogin}>
            <label htmlFor="nickname" className="primary-label">
              Podaj nick parówo
            </label>
            <input
              type="text"
              id="nickname"
              className="primary-input"
              value={inputNick}
              onChange={(e) => setInputNick(e.target.value)}
            />
            <button type="submit" className="primary-btn">
              Zapisz
            </button>
          </form>
        </div>
      </aside>
      <div className="link-wrapper">
        <div className={`link ${disableLinkClass}`}>
          <Link to={"/home/dashboard"}>
            <MdDashboard className="icon" />
            <span>{t("misc.dashboard")}</span>
          </Link>
        </div>
        <div className={`link ${disableLinkClass}`}>
          <Link to={"/home/cards"}>
            <BsBook className="icon" />
            <span>{t("misc.cards")}</span>
          </Link>
        </div>
        <div className={`link ${disableLinkClass}`}>
          <Link to={"/home/stats"}>
            <MdOutlineQueryStats className="icon" />
            <span>{t("misc.stats")}</span>
          </Link>
        </div>
        <div className={`link ${disableLinkClass}`}>
          <Link to={"/home/archive"}>
            <BsArchiveFill className="icon" />
            <span>{t("misc.arch")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default WelcomePage;
