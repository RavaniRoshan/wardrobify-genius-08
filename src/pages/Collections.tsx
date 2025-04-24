
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { styleCategories, mockRecommendations } from "@/utils/styleData";
import { ExternalLink, Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Collections = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [savedItems, setSavedItems] = useState<number[]>([]);

  useEffect(() => {
    // Get collection info
    if (id) {
      const collectionInfo = styleCategories.find(cat => cat.id === id);
      setCollection(collectionInfo);
      
      // Filter items based on style
      const filteredItems = mockRecommendations.filter(item => 
        item.style === id || !id // show all if no id
      );
      setItems(filteredItems);
    } else {
      setItems(mockRecommendations);
    }

    // Load saved items from localStorage
    const saved = localStorage.getItem("savedItems");
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, [id]);

  // Function to generate purchase links
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
          title: "Item removed",
          description: "The item has been removed from your wishlist.",
        });
      } else {
        newSavedItems = [...prev, itemId];
        toast({
          title: "Item saved",
          description: "The item has been added to your wishlist.",
          variant: "default",
        });
      }
      
      localStorage.setItem("savedItems", JSON.stringify(newSavedItems));
      return newSavedItems;
    });
  };

  const getRandomPrice = (id: number) => {
    // Use a deterministic price based on item ID for consistency
    return (19.99 + (id % 10) * 10).toFixed(2);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              {collection ? collection.name : "All Collections"}
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              {collection 
                ? collection.description 
                : "Browse our curated collections of fashion items across different styles."}
            </p>
          </FadeIn>
          
          {!id && (
            <div className="flex flex-wrap gap-3 mb-10">
              {styleCategories.map((category) => (
                <Link key={category.id} to={`/collections/${category.id}`}>
                  <Button variant="outline" className="rounded-full">
                    {category.name}
                  </Button>
                </Link>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => {
              const price = getRandomPrice(item.id);
              return (
                <FadeIn key={item.id} delay={index * 100} className="h-full">
                  <Card className="overflow-hidden border-0 shadow-lg h-full flex flex-col hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <div className="aspect-[3/4] bg-secondary/10 flex items-center justify-center group relative overflow-hidden">
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                          {item.name.charAt(0)}
                        </div>
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button variant="secondary" size="sm" className="rounded-full">
                            Quick View
                          </Button>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        onClick={() => toggleSaveItem(item.id)}
                      >
                        <Heart className={savedItems.includes(item.id) ? "fill-accent text-accent" : ""} size={18} />
                      </Button>
                    </div>
                    <CardContent className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-sm font-semibold">${price}</div>
                      </div>
                      <div className="text-sm text-accent font-medium mb-3">{item.brand}</div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-secondary/30 px-3 py-1 rounded-full text-xs font-medium">
                            Free shipping
                          </span>
                          <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">
                            10% off
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0 flex flex-col space-y-2">
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <a href={getPurchaseLink(item.id, "amazon")} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Button variant="outline" size="sm" className="w-full rounded-full flex items-center gap-1">
                            <ExternalLink size={14} />
                            Amazon
                          </Button>
                        </a>
                        <a href={getPurchaseLink(item.id, "flipkart")} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Button size="sm" className="w-full rounded-full flex items-center gap-1 bg-[#2874f0] hover:bg-[#2874f0]/90">
                            <ExternalLink size={14} />
                            Flipkart
                          </Button>
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
