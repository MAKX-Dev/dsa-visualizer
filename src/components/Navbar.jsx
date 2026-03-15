import { Link, useLocation } from "react-router-dom";
import { Github, Moon, Sun } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const { pathname } = useLocation();

  const isSorting = pathname.startsWith("/sorting");
  const isSearching = pathname.startsWith("/searching");
  const isTreeNode = pathname.startsWith("/Trees")
  return (
    <nav className="navbar-wrapper">
      <div className="navbar">
        {/* Logo */}
        <Link to="/" className="logo">
          DSA<span>Visualizer</span>
        </Link>

        {/* Center tabs */}
        <div className="nav-tabs">
          <Link
            to="/sorting"
            className={`nav-link ${isSorting ? "active" : ""}`}
          >
            Sorting
          </Link>

          <Link
            to="/searching"
            className={`nav-link ${isSearching ? "active" : ""}`}
          >
            Searching
          </Link>
          <Link
            to="/Trees"
            className={`nav-link ${isTreeNode ? "active" : ""}`}
          >
           Trees
          </Link>
        </div>

        {/* Right actions */}
        <div className="nav-actions">
          <a
            href="https://github.com/MAKX-Dev/dsa-visualizer"
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            aria-label="View on GitHub"
          >
            <Github size={18} />
          </a>

          <button className="icon-btn" aria-label="Toggle theme">
            <Moon size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
