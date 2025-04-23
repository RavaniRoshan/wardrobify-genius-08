
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import StyleQuiz from "@/components/StyleQuiz";

interface QuizSectionProps {
  showQuiz: boolean;
  onStartQuiz: () => void;
  onComplete: (answers: any[]) => void;
}

const QuizSection = ({ showQuiz, onStartQuiz, onComplete }: QuizSectionProps) => {
  return (
    <section className="py-20 md:py-32 bg-secondary/30" id="quiz-section">
      <div className="container">
        {showQuiz ? (
          <StyleQuiz onComplete={onComplete} />
        ) : (
          <div className="text-center">
            <FadeIn>
              <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Personalize Your Style
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Ready to Discover Your Perfect Style?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Take our style quiz to receive personalized fashion recommendations
                tailored just for you. It only takes a few minutes.
              </p>
              <Button
                size="lg"
                className="rounded-full px-8"
                onClick={onStartQuiz}
              >
                Start the Quiz
              </Button>
            </FadeIn>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizSection;
