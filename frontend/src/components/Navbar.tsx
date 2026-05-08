import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/upcoming", label: "Tournament" },
    { path: "/team", label: "Team" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b-4 border-accent/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="hidden sm:block font-title text-xl md:text-2xl text-foreground cr-title">
              KGP <span className="text-accent">ROYALE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? "navActive" : "nav"}
                  className="font-title text-base"
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
                    className="font-title text-base flex items-center gap-1.5"
                  >
                    <User className="w-4 h-4" />
                    {profile?.playerName || "Profile"}
                  </Button>
                </Link>
                <Button
                  variant="nav"
                  className="font-title text-base"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant={isActive("/login") ? "navActive" : "nav"}
                  className="font-title text-base"
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
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in slide-in-from-top duration-200">
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
              <>
                <Link
                  to="/user/profile"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Button
                    variant={isActive("/user/profile") ? "navActive" : "nav"}
                    className="w-full justify-start font-title"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {profile?.playerName || "Profile"}
                  </Button>
                </Link>
                <Button
                  variant="nav"
                  className="w-full justify-start font-title"
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
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
