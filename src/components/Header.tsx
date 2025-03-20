
import { Button } from "@/components/ui/button";
import FadeIn from "./FadeIn";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-primary font-semibold text-sm">SC</span>
            </div>
            <h1 className="text-xl font-medium">
              Style<span className="text-primary font-semibold">Curator</span>
            </h1>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={200}>
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a
                href="#discover"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Discover
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </nav>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full px-6 border-primary/20 hover:border-primary/50 transition-all"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="rounded-full px-6 bg-primary/90 hover:bg-primary transition-all"
            >
              Get Started
            </Button>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            aria-label="Menu"
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
    </header>
  );
};

export default Header;
