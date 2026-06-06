import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);



  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/upcoming", label: "Tournament" },
    { path: "/team", label: "Team" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <span className="font-outfit font-extrabold text-xl md:text-3xl tracking-tight text-foreground">
              KGP <span className="text-primary">ROYALE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? "navActive" : "nav"}
                  className="font-outfit text-base"
                >
                  {link.label}
                </Button>
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <Link to="/user/profile">
                  <Button
                    variant={isActive("/user/profile") ? "navActive" : "nav"}
                    className="font-outfit text-base flex items-center gap-1.5"
                  >
                    <span className="inline-flex items-center justify-center text-inherit">👤</span>
                    {profile?.playerName || "Profile"}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    variant={isActive("/login") ? "navActive" : "nav"}
                    className="font-outfit text-base"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant={isActive("/register") ? "navActive" : "nav"}
                    className="font-outfit text-base"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <span className="inline-flex items-center justify-center text-inherit">❌</span> : <span className="inline-flex items-center justify-center text-inherit">☰</span>}
          </Button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 pb-4 space-y-2 animate-in slide-in-from-top duration-200 bg-background border-b-4 border-foreground px-4 pt-2 shadow-hard">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <Button
                  variant={isActive(link.path) ? "navActive" : "nav"}
                  className="w-full justify-start font-outfit text-base"
                >
                  {link.label}
                </Button>
              </Link>
            ))}

            {user ? (
              <Link
                to="/user/profile"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <Button
                  variant={isActive("/user/profile") ? "navActive" : "nav"}
                  className="w-full justify-start font-outfit text-base"
                >
                  <span className="inline-flex items-center justify-center text-inherit">👤</span>
                  {profile?.playerName || "Profile"}
                </Button>
              </Link>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button
                    variant={isActive("/login") ? "navActive" : "nav"}
                    className="w-full justify-start font-outfit text-base"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button
                    variant={isActive("/register") ? "navActive" : "nav"}
                    className="w-full justify-start font-outfit text-base"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
