import { Link, useNavigate, useOutlet } from "react-router-dom";
import logo from "../assets/logo-bg.png";
import { BsBook, BsArchiveFill } from "react-icons/bs";
import {
  MdLogout,
  MdDashboard,
  MdOutlineQueryStats,
  MdTipsAndUpdates,
} from "react-icons/md";
import { RiArrowDropLeftLine } from "react-icons/ri";
import "../css/sidebar.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  isNewUpdate,
  isUpdateRead,
} from "../features/updates/slices/updateInfoSlice";
import useStoredNick from "../hooks/useStoredNick";
import useStoredCardDetails from "../hooks/useStoredCardDetails ";

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const outlet = useOutlet();
  const checkUpdate = useSelector(isNewUpdate);
  const readUpdate = useSelector(isUpdateRead);

  const [, , removeNick] = useStoredNick();
  const [cardDetails, , removeCardDetails] = useStoredCardDetails();

  const handleLogout = () => {
    removeNick();
    removeCardDetails(cardDetails.cardNumber, cardDetails.cardId);
    navigate("/");
  };

  return (
    <div className="sidebar-wrapper">
      <nav className={`sidebar ${showSidebar ? "" : "close"}`}>
        <header>
          <div className="logo">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>
            <span className="text">Lite</span>
          </div>
          <div className="toggle-icon">
            <RiArrowDropLeftLine
              className="toggle"
              onClick={() => setShowSidebar((prevState) => !prevState)}
            />
          </div>
        </header>
        <div className="menu">
          <ul>
            <li>
              <Link to={"dashboard"}>
                <div className="icon-wrapper">
                  <MdDashboard className="icon" title={t("misc.dashboard")} />
                </div>
                <div className="text-wrapper">{t("misc.dashboard")}</div>
              </Link>
            </li>
            <li>
              <Link to={"cards"}>
                <div className="icon-wrapper">
                  <BsBook className="icon" title={t("misc.cards")} />
                </div>
                <div className="text-wrapper">{t("misc.cards")}</div>
              </Link>
            </li>
            <li>
              <Link to={"stats"}>
                <div className="icon-wrapper">
                  <MdOutlineQueryStats
                    className="icon"
                    title={t("misc.stats")}
                  />
                </div>
                <div className="text-wrapper">{t("misc.stats")}</div>
              </Link>
            </li>
            <li>
              <Link to={"archive"}>
                <div className="icon-wrapper">
                  <BsArchiveFill className="icon" title={t("misc.arch")} />
                </div>
                <div className="text-wrapper">{t("misc.arch")}</div>
              </Link>
            </li>
            <li className={`${checkUpdate && !readUpdate ? "update" : ""}`}>
              <Link to={"updates"}>
                <div className="icon-wrapper">
                  <MdTipsAndUpdates
                    className={`icon ${
                      checkUpdate && !readUpdate ? "update" : ""
                    }`}
                  />
                </div>
                <div
                  className={`text-wrapper ${
                    checkUpdate && !readUpdate ? "update" : ""
                  }`}
                >
                  Updates
                </div>
              </Link>
            </li>
          </ul>

          <footer className="logout-button">
            <button onClick={handleLogout}>
              <MdLogout className="icon" />
              <span>{t("buttons.logout")}</span>
            </button>
          </footer>
        </div>
      </nav>

      <div className="outlet-wrapper">
        <ToastContainer autoClose={3000} position="top-right" />
        {outlet}
      </div>
    </div>
  );
};
export default Sidebar;
