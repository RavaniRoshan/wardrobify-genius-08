
import { Button } from "@/components/ui/button";
import FadeIn from "./FadeIn";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

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
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-primary font-semibold text-sm">SC</span>
            </div>
            <h1 className="text-xl font-medium">
              Style<span className="text-primary font-semibold">Curator</span>
            </h1>
          </Link>
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
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  {auth.user?.name || auth.user?.email}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full px-6 border-primary/20 hover:border-primary/50 transition-all"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
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
                    className="rounded-full px-6 bg-primary/90 hover:bg-primary transition-all"
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
      
      {/* Mobile Menu */}
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
                  <div className="text-sm px-1">
                    Signed in as {auth.user?.name || auth.user?.email}
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-primary/20 hover:border-primary/50 transition-all"
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
                      className="w-full rounded-full bg-primary/90 hover:bg-primary transition-all"
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
