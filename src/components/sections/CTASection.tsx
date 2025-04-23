
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";

const CTASection = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <FadeIn>
          <div className="bg-primary/5 rounded-3xl p-12 md:p-20 text-center">
            <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 max-w-3xl mx-auto">
              Transform Your Wardrobe with AI-Powered Style Recommendations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Join thousands of users who have discovered their perfect style with our personalized recommendations.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8"
              onClick={onStartQuiz}
            >
              Take the Style Quiz
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CTASection;
