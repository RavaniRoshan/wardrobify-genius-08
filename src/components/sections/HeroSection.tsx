
import { useNavigate } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn className="order-2 lg:order-1">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Style.
            <br />
            Your Way.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
            Discover your perfect style with AI-powered recommendations tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-base gap-2 h-14"
              onClick={onStartQuiz}
            >
              Take Style Quiz
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base h-14"
              onClick={() => navigate('/collections')}
            >
              Browse Collections
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={200} className="order-1 lg:order-2">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary/10 p-8">
            <img
              src="/lovable-uploads/f594b9d0-9162-495b-a57f-954de8074097.png"
              alt="Featured Collection"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default HeroSection;
