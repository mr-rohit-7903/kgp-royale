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
          <Link to="/" className="flex items-center gap-3 group">
            <span className="hidden sm:block font-outfit font-extrabold text-2xl md:text-3xl tracking-tight text-foreground">
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
              <Link to="/login">
                <Button
                  variant={isActive("/login") ? "navActive" : "nav"}
                  className="font-outfit text-base"
                >
                  Login
                </Button>
              </Link>
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
          <div className="md:hidden pb-4 space-y-2 animate-in slide-in-from-top duration-200 bg-background border-t-2 border-foreground mt-2 px-2 pt-2 rounded-b-xl shadow-soft-hard">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <Button
                  variant={isActive(link.path) ? "navActive" : "nav"}
                  className="w-full justify-start font-title"
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
                  className="w-full justify-start font-title"
                >
                  <span className="inline-flex items-center justify-center text-inherit">👤</span>
                  {profile?.playerName || "Profile"}
                </Button>
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <Button
                  variant={isActive("/login") ? "navActive" : "nav"}
                  className="w-full justify-start font-title"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
