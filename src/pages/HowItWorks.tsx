
import Header from "@/components/Header";
import FadeIn from "@/components/FadeIn";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Take the Style Quiz",
      description: "Answer questions about your preferences, body type, and lifestyle to help our AI understand your style needs.",
      icon: "📋",
    },
    {
      id: 2,
      title: "AI Analysis",
      description: "Our algorithm processes your input and matches it with thousands of fashion items to find your perfect style matches.",
      icon: "🧠",
    },
    {
      id: 3,
      title: "Receive Recommendations",
      description: "Get a personalized collection of fashion items tailored to your unique style, body type, and preferences.",
      icon: "👚",
    },
    {
      id: 4,
      title: "Shop with Confidence",
      description: "Each item links directly to trusted retailers like Amazon and Flipkart, making it easy to purchase with confidence.",
      icon: "🛍️",
    },
    {
      id: 5,
      title: "Save Your Favorites",
      description: "Create a personal collection of your favorite styles and recommendations for future reference.",
      icon: "❤️",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-semibold mb-8">How It Works</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
              StyleCurator uses advanced AI algorithms to analyze your preferences, body measurements, 
              and style choices to create personalized fashion recommendations tailored just for you.
            </p>
          </FadeIn>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block"></div>
            
            {steps.map((step, index) => (
              <FadeIn key={step.id} delay={index * 150}>
                <div className={`relative flex items-start mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block w-1/2"></div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {step.id}
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 bg-card rounded-xl p-6 shadow-md border border-border/50">
                    <div className="md:hidden flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold mr-4">
                        {step.id}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <div className="hidden md:block mb-3">
                      <h3 className="text-xl font-semibold flex items-center">
                        <span className="text-3xl mr-3">{step.icon}</span>
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
