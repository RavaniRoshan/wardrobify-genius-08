
import { useNavigate } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  const navigate = useNavigate();
  
  const handleExploreCollections = () => {
    navigate("/collections");
  };

  return (
    <div className="container flex flex-col items-center text-center">
      <FadeIn delay={150}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 max-w-4xl leading-tight md:leading-tight">
          Your Personal Style, <br /> Curated with Precision
        </h1>
      </FadeIn>
      
      <FadeIn delay={300}>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
          AI-powered fashion recommendations tailored to your unique preferences, 
          body type, and lifestyle. Discover pieces that truly reflect who you are.
        </p>
      </FadeIn>
      
      <FadeIn delay={450}>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="rounded-full px-8 bg-primary/90 hover:bg-primary transition-all text-base"
            onClick={onStartQuiz}
          >
            Take Style Quiz
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-primary/20 hover:border-primary/50 transition-all text-base"
            onClick={handleExploreCollections}
          >
            Explore Collections
          </Button>
        </div>
      </FadeIn>
      
      <FadeIn delay={600} className="mt-16 w-full max-w-5xl">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
            alt="Fashion Collection Showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="text-xl md:text-2xl font-medium mb-2">Discover Your Perfect Style</h3>
            <p className="text-white/80">Personalized recommendations tailored just for you</p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default HeroSection;
