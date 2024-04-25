import { Link, useLocation } from "react-router-dom";
import "./index.css";
import "../../Kanbas/style.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaInbox,
  FaRegClock,
  FaDesktop,
  FaArrowRight,
  FaQuestionCircle,
} from "react-icons/fa";

function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2 account-icon" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2 other-icon" /> },
    { label: "Courses", icon: <FaBook className="fs-2 other-icon" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2 other-icon" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2 other-icon" /> },
    { label: "History", icon: <FaRegClock className="fs-2 other-icon" /> },
    { label: "Studio", icon: <FaDesktop className="fs-2 other-icon" /> },
    { label: "Commons", icon: <FaArrowRight className="fs-2 other-icon" /> },
    { label: "Help", icon: <FaQuestionCircle className="fs-2 other-icon" /> }
  ];
  const { pathname } = useLocation();
  return (
    <ul className="d-none d-md-block wd-kanbas-navigation">
      <div>
        <img src={`/images/neu_logo.jpg`} alt="logo" width="85px" />
      </div>
      {links.map((link, index) => (
        <li
          key={index}
          className={pathname.includes(link.label) ? "wd-active" : ""}
        >
          <Link to={`/Kanbas/${link.label}`}>
            {" "}
            {link.icon}
            <br />
            {link.label}{" "}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default KanbasNavigation;
