
import { useState } from "react";
import Header from "@/components/Header";
import StyleQuiz from "@/components/StyleQuiz";
import Recommendations from "@/components/Recommendations";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    // Scroll to quiz section
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
    // Scroll to recommendations
    setTimeout(() => {
      document.getElementById("recommendations")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-transparent to-transparent -z-10"></div>
        
        <div className="container flex flex-col items-center text-center">
          <FadeIn>
            <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Discover your perfect style
            </span>
          </FadeIn>
          
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
                onClick={handleStartQuiz}
              >
                Take Style Quiz
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-primary/20 hover:border-primary/50 transition-all text-base"
              >
                Explore Collections
              </Button>
            </div>
          </FadeIn>
          
          <FadeIn delay={600} className="mt-16 w-full max-w-5xl">
            <div className="relative aspect-[16/9] bg-secondary/30 rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-lg font-medium text-muted-foreground">
                  Style showcase visual
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 md:py-32" id="how-it-works">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                How it works
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Personalized Style in Three Steps
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our AI analyzes thousands of fashion combinations to create recommendations
                perfectly suited to your unique preferences.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <FadeIn delay={150}>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary font-semibold text-xl">1</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Take the Style Quiz</h3>
                <p className="text-muted-foreground">
                  Answer questions about your preferences, body type, and lifestyle to help our AI understand your needs.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary font-semibold text-xl">2</span>
                </div>
                <h3 className="text-xl font-medium mb-3">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our algorithm processes your input and matches it with thousands of fashion items to find your perfect style.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={450}>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary font-semibold text-xl">3</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Curated Collection</h3>
                <p className="text-muted-foreground">
                  Receive a personalized collection of fashion items tailored to your unique style, ready to explore and shop.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Quiz Section */}
      <section className="py-20 md:py-32 bg-secondary/30" id="quiz-section">
        <div className="container">
          {showQuiz ? (
            <StyleQuiz onComplete={handleQuizComplete} />
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
                  onClick={handleStartQuiz}
                >
                  Start the Quiz
                </Button>
              </FadeIn>
            </div>
          )}
        </div>
      </section>
      
      {/* Recommendations Section */}
      {quizCompleted && (
        <section className="py-20 md:py-32" id="recommendations">
          <Recommendations userAnswers={userAnswers} />
        </section>
      )}
      
      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                What Our Users Say
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join thousands of satisfied users who have transformed their wardrobe with StyleCurator.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-background rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">U{i}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">User {i}</h4>
                      <p className="text-sm text-muted-foreground">Fashion Enthusiast</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "StyleCurator has completely changed how I shop for clothes. The recommendations are spot-on and I finally feel confident in my personal style."
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
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
                onClick={handleStartQuiz}
              >
                Take the Style Quiz
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 bg-secondary/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <span className="text-primary font-semibold text-sm">SC</span>
              </div>
              <h3 className="text-xl font-medium">
                Style<span className="text-primary font-semibold">Curator</span>
              </h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="border-t border-primary/10 mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2023 StyleCurator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
