import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockRecommendations } from "@/utils/styleData";
import FadeIn from "./FadeIn";
import { Heart, ExternalLink, RefreshCw, Shirt, Pants, Footprints } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface RecommendationsProps {
  userAnswers?: any[];
}

const outfitThemes = [
  "Casual Day Out",
  "Office Ready",
  "Weekend Vibes",
  "Evening Elegance",
  "Outdoor Adventure",
  "Coffee Shop Meeting",
  "Brunch Perfect",
  "Night in the City"
];

const Recommendations = ({ userAnswers }: RecommendationsProps) => {
  const [items, setItems] = useState(mockRecommendations);
  const [isLoading, setIsLoading] = useState(true);
  const [savedItems, setSavedItems] = useState<number[]>([]);
  const [outfitNames, setOutfitNames] = useState<Record<number, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      const saved = localStorage.getItem("savedItems");
      if (saved) {
        setSavedItems(JSON.parse(saved));
      }
      
      const names: Record<number, string> = {};
      mockRecommendations.forEach(item => {
        names[item.id] = outfitThemes[Math.floor(Math.random() * outfitThemes.length)];
      });
      setOutfitNames(names);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [userAnswers]);

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
        toast({
          title: "Outfit removed",
          description: "The outfit has been removed from your wardrobe.",
        });
      } else {
        newSavedItems = [...prev, itemId];
        toast({
          title: "Outfit saved",
          description: "The outfit has been saved to your wardrobe.",
          variant: "default",
        });
      }
      
      localStorage.setItem("savedItems", JSON.stringify(newSavedItems));
      return newSavedItems;
    });
  };

  const regenerateOutfits = () => {
    setIsLoading(true);
    setTimeout(() => {
      const shuffled = [...mockRecommendations].sort(() => 0.5 - Math.random());
      setItems(shuffled);
      
      const names: Record<number, string> = {};
      shuffled.forEach(item => {
        names[item.id] = outfitThemes[Math.floor(Math.random() * outfitThemes.length)];
      });
      setOutfitNames(names);
      
      setIsLoading(false);
      
      toast({
        title: "Outfits regenerated",
        description: "We've created new outfit suggestions for you.",
      });
    }, 1000);
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
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
          Based on your preferences, we've curated a collection of pieces that will complement your style and body type.
        </p>
        <Button 
          onClick={regenerateOutfits}
          variant="outline" 
          className="rounded-full flex items-center gap-2 px-5 mb-8"
        >
          <RefreshCw size={16} />
          Generate New Outfits
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <FadeIn key={item.id} delay={index * 100} className="h-full">
            <Card className="overflow-hidden border-0 shadow-lg h-full flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="aspect-[3/4] bg-secondary/10 flex flex-col items-center justify-center group relative overflow-hidden">
                <span className="absolute top-4 left-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {outfitNames[item.id] || "Stylish Outfit"}
                </span>
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  {item.name.charAt(0)}
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-md shadow-sm">
                    <Shirt size={18} className="text-myntra-purple" />
                    <span className="text-sm font-medium">{item.name.includes("Shirt") ? item.name : "Casual Shirt"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-md shadow-sm">
                    <Pants size={18} className="text-myntra-purple" />
                    <span className="text-sm font-medium">Classic Fit Jeans</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-md shadow-sm">
                    <Footprints size={18} className="text-myntra-purple" />
                    <span className="text-sm font-medium">Casual Sneakers</span>
                  </div>
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
                <div className="text-sm text-myntra-purple font-medium mb-3">{item.brand}</div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <h4 className="font-medium mb-2">Perfect For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Casual', 'Everyday', 'Office'].map((tag) => (
                      <span key={tag} className="bg-secondary/50 px-3 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0 flex flex-col space-y-2">
                <Button 
                  variant={savedItems.includes(item.id) ? "default" : "outline"} 
                  className="w-full rounded-full mb-2 flex items-center justify-center gap-2"
                  onClick={() => toggleSaveItem(item.id)}
                >
                  <Heart size={16} className={savedItems.includes(item.id) ? "fill-white" : ""} />
                  {savedItems.includes(item.id) ? "Saved to Wardrobe" : "Add to Wardrobe"}
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <a href={getPurchaseLink(item.id, "amazon")} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="secondary" size="sm" className="w-full rounded-full flex items-center gap-1">
                      <ExternalLink size={14} />
                      Amazon
                    </Button>
                  </a>
                  <a href={getPurchaseLink(item.id, "flipkart")} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="secondary" size="sm" className="w-full rounded-full flex items-center gap-1">
                      <ExternalLink size={14} />
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
