
import { useNavigate } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HeroSection = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn className="order-2 lg:order-1">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
            Your Style.
            <br />
            <span className="text-accent">Your Way.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
            Discover your perfect style with AI-powered recommendations tailored just for you.
          </p>
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-md">
              <Input
                type="search"
                placeholder="Search collections..."
                className="pr-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-5 w-5" />}
              />
            </div>
          </form>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button
              size="lg"
              className="text-lg gap-3 h-16 px-8 rounded-full hover:scale-105 transition-all"
              onClick={onStartQuiz}
            >
              Take Style Quiz
              <ArrowRight className="h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg h-16 px-8 rounded-full hover:bg-secondary/20 transition-all"
              onClick={() => navigate('/sign-up')}
            >
              Join Us
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={200} className="order-1 lg:order-2">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/10 p-8">
            <img
              src="/lovable-uploads/732b5b2d-90da-4f76-9f17-1e55dbf963fd.png"
              alt="Featured Collection"
              className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default HeroSection;
