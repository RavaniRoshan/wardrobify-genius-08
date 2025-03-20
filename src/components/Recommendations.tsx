
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockRecommendations } from "@/utils/styleData";
import FadeIn from "./FadeIn";

interface RecommendationsProps {
  userAnswers?: any[];
}

const Recommendations = ({ userAnswers }: RecommendationsProps) => {
  const [items, setItems] = useState(mockRecommendations);
  const [isLoading, setIsLoading] = useState(true);
  const [savedItems, setSavedItems] = useState<number[]>([]);

  useEffect(() => {
    // Simulate loading recommendations based on user answers
    const timer = setTimeout(() => {
      // In a real app, we'd filter based on user answers
      // For now, we'll just show mock data
      setIsLoading(false);
      
      // Load saved items from localStorage
      const saved = localStorage.getItem("savedItems");
      if (saved) {
        setSavedItems(JSON.parse(saved));
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [userAnswers]);

  // Function to generate random purchase links
  const getPurchaseLink = (itemId: number, store: string) => {
    if (store === "amazon") {
      return `https://www.amazon.com/s?k=fashion+${itemId}`;
    } else {
      return `https://www.flipkart.com/search?q=fashion+${itemId}`;
    }
  };

  const toggleSaveItem = (itemId: number) => {
    setSavedItems(prev => {
      let newSavedItems;
      if (prev.includes(itemId)) {
        newSavedItems = prev.filter(id => id !== itemId);
      } else {
        newSavedItems = [...prev, itemId];
      }
      
      // Save to localStorage
      localStorage.setItem("savedItems", JSON.stringify(newSavedItems));
      return newSavedItems;
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <div className="h-8 w-64 bg-muted rounded animate-pulse mx-auto mb-3"></div>
          <div className="h-4 w-96 bg-muted rounded animate-pulse mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden border-0 shadow-lg">
              <div className="aspect-[3/4] bg-muted animate-pulse"></div>
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-2/3 mb-4"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse mt-2"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-3/4 mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-medium mb-3">Your Personalized Collection</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Based on your preferences, we've curated a collection of pieces that will complement your style and body type.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <FadeIn key={item.id} delay={index * 100} className="h-full">
            <Card className="overflow-hidden border-0 shadow-lg h-full flex flex-col">
              <div className="aspect-[3/4] bg-secondary/50 flex items-center justify-center group relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  {item.name.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary" size="sm" className="rounded-full">
                    Quick View
                  </Button>
                </div>
              </div>
              <CardContent className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="text-sm font-semibold">${item.price}</div>
                </div>
                <div className="text-sm text-muted-foreground mb-3">{item.brand}</div>
                <p className="text-sm">{item.description}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0 flex flex-col space-y-2">
                <Button 
                  variant={savedItems.includes(item.id) ? "default" : "outline"} 
                  className="w-full rounded-full mb-2"
                  onClick={() => toggleSaveItem(item.id)}
                >
                  {savedItems.includes(item.id) ? "Saved to Wardrobe" : "Add to Wardrobe"}
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <a href={getPurchaseLink(item.id, "amazon")} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="sm" className="w-full">
                      Amazon
                    </Button>
                  </a>
                  <a href={getPurchaseLink(item.id, "flipkart")} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="sm" className="w-full">
                      Flipkart
                    </Button>
                  </a>
                </div>
              </CardFooter>
            </Card>
          </FadeIn>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Button variant="outline" className="rounded-full px-8 mr-4">
          View More
        </Button>
        <Button className="rounded-full px-8">
          Share Collection
        </Button>
      </div>
    </div>
  );
};

export default Recommendations;
