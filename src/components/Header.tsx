
import { Button } from "@/components/ui/button";
import FadeIn from "./FadeIn";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import Logo from "./Logo";
import UserProfileMenu from "./UserProfileMenu";
import { Search, ShoppingCart, Heart } from "lucide-react";

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
    <>
      <div className="bg-secondary/10 py-2 text-center text-sm">
        <span className="text-primary/80">Download the app to access everything here.</span>
        <Link to="/app" className="ml-2 text-primary font-medium hover:underline">Get Started</Link>
      </div>
      
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50"
            : "bg-background"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          <FadeIn direction="left">
            <div className="flex items-center space-x-8">
              <Logo size="md" />
              <nav className="hidden lg:flex items-center space-x-6">
                <Link to="/men" className="text-sm hover:text-primary transition-colors">Men</Link>
                <Link to="/women" className="text-sm hover:text-primary transition-colors">Women</Link>
                <Link to="/kids" className="text-sm hover:text-primary transition-colors">Kids</Link>
                <Link to="/collections" className="text-sm hover:text-primary transition-colors">Collections</Link>
                <Link to="/sale" className="text-sm text-accent hover:text-accent/80 transition-colors">Sale</Link>
              </nav>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
              
              <Link to="/wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>

              {auth?.isAuthenticated ? (
                <UserProfileMenu />
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/sign-in">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button variant="nike" size="sm">Join Us</Button>
                  </Link>
                </div>
              )}

              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden"
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
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </FadeIn>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border/50">
            <nav className="container py-4 space-y-2">
              <Link to="/men" className="block py-2 text-sm hover:text-primary transition-colors">Men</Link>
              <Link to="/women" className="block py-2 text-sm hover:text-primary transition-colors">Women</Link>
              <Link to="/kids" className="block py-2 text-sm hover:text-primary transition-colors">Kids</Link>
              <Link to="/collections" className="block py-2 text-sm hover:text-primary transition-colors">Collections</Link>
              <Link to="/sale" className="block py-2 text-sm text-accent hover:text-accent/80 transition-colors">Sale</Link>
              {!auth?.isAuthenticated && (
                <div className="pt-4 space-y-2 border-t border-border/50">
                  <Link to="/sign-in" className="block">
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/sign-up" className="block">
                    <Button variant="nike" className="w-full">Join Us</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
