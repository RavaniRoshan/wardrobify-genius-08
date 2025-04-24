
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import HeaderSection from "@/components/sections/HeaderSection";
import FooterSection from "@/components/sections/FooterSection";

const AppDownload = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderSection />
      
      <main className="container py-20">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Download Our App</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Get exclusive access to our full collection and personalized recommendations right on your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg h-16 px-8">
                Download for iOS
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-16 px-8">
                Download for Android
              </Button>
            </div>
          </div>
        </FadeIn>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default AppDownload;
