
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { styleCategories, mockRecommendations } from "@/utils/styleData";

const Collections = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

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
  }, [id]);

  // Function to generate random purchase links
  const getPurchaseLink = (itemId: number, store: string) => {
    if (store === "amazon") {
      return `https://www.amazon.com/s?k=fashion+${itemId}`;
    } else {
      return `https://www.flipkart.com/search?q=fashion+${itemId}`;
    }
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
                    <a href={getPurchaseLink(item.id, "amazon")} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full rounded-full" variant="outline">
                        Buy on Amazon
                      </Button>
                    </a>
                    <a href={getPurchaseLink(item.id, "flipkart")} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full rounded-full" variant="default">
                        Buy on Flipkart
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
