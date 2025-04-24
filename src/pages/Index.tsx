
import { useState } from "react";
import HeaderSection from "@/components/sections/HeaderSection";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import QuizSection from "@/components/sections/QuizSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import FooterSection from "@/components/sections/FooterSection";
import Recommendations from "@/components/Recommendations";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setTimeout(() => {
      document.getElementById("quiz-section")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  const handleQuizComplete = (answers: any[]) => {
    setUserAnswers(answers);
    setQuizCompleted(true);
    setTimeout(() => {
      document.getElementById("recommendations")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-transparent to-transparent -z-10"></div>
        <HeaderSection />
        <HeroSection onStartQuiz={handleStartQuiz} />
      </section>
      
      <FeaturesSection />
      <QuizSection 
        showQuiz={showQuiz}
        onStartQuiz={handleStartQuiz}
        onComplete={handleQuizComplete}
      />
      
      {quizCompleted && (
        <section className="py-20 md:py-32" id="recommendations">
          <Recommendations userAnswers={userAnswers} />
        </section>
      )}
      
      <TestimonialsSection />
      <CTASection onStartQuiz={handleStartQuiz} />
      <FooterSection />
    </div>
  );
};

export default Index;
