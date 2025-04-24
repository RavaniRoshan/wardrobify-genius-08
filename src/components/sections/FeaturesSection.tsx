
import FadeIn from "@/components/FadeIn";
import { Palette, ImageIcon, LayoutGrid } from "lucide-react";

const FeaturesSection = () => {
  return (
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
                <Palette className="w-8 h-8 text-primary" />
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
                <ImageIcon className="w-8 h-8 text-primary" />
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
                <LayoutGrid className="w-8 h-8 text-primary" />
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
  );
};

export default FeaturesSection;
