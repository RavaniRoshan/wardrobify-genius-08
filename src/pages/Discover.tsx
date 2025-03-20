
import Header from "@/components/Header";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { styleCategories } from "@/utils/styleData";
import { Link } from "react-router-dom";

const Discover = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-semibold mb-8">Discover Your Style</h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              Explore our curated collections of styles to find inspiration for your wardrobe.
              Whether you're looking for minimalist, classic, or avant-garde pieces, we have
              collections that match your aesthetic.
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {styleCategories.map((category, index) => (
              <FadeIn key={category.id} delay={index * 100}>
                <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border/50 h-full flex flex-col">
                  <div className="aspect-video bg-secondary flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-xl">{category.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-medium mb-2">{category.name}</h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <Link to={`/collections/${category.id}`}>
                      <Button className="w-full">Explore Collection</Button>
                    </Link>
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

export default Discover;
