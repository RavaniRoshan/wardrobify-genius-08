
import { Button } from "@/components/ui/button";
import FadeIn from "./FadeIn";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import Logo from "./Logo";
import UserProfileMenu from "./UserProfileMenu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    if (auth) {
      auth.logout();
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <FadeIn direction="left" delay={100}>
          <Logo size="md" />
        </FadeIn>

        <FadeIn direction="right" delay={200}>
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link
                to="/discover"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Discover
              </Link>
              <Link
                to="/how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </nav>
            
            {auth?.isAuthenticated ? (
              <UserProfileMenu />
            ) : (
              <>
                <Link to="/sign-in">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full px-6 border-primary/20 hover:border-primary/50 transition-all"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button
                    size="sm"
                    variant="nike"
                    className="px-6"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </FadeIn>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/discover"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Discover
              </Link>
              <Link
                to="/how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
            
            <div className="pt-2 border-t border-border/30 flex flex-col space-y-3">
              {auth?.isAuthenticated ? (
                <>
                  <div className="text-sm font-medium px-4 py-2 bg-primary/10 rounded-full text-primary text-center">
                    {auth.user?.name || auth.user?.email}
                  </div>
                  <Button
                    variant="nike"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-primary/20 hover:border-primary/50 transition-all"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      className="w-full"
                      variant="nike"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
