import Header from "@/components/Header";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const team = [
    {
      name: "Ravani Roshan",
      role: "Founder & CEO",
      bio: "Creator of StyleCurator",
      image: "/lovable-uploads/1bd812a3-7658-432a-8793-30dd2b55d03b.png"
    },
    {
      name: "Shivani Shukla",
      role: "Chief AI Officer",
      bio: "Machine learning expert specializing in recommendation systems and computer vision.",
    },
    {
      name: "Kashvi",
      role: "The Honest Leader 😜",
      bio: "Professional stylist who has worked with major brands and celebrities.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-semibold mb-8">About StyleCurator</h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              StyleCurator was founded with a simple mission: make personalized fashion accessible to everyone. 
              We combine AI technology with fashion expertise to create a platform that understands your unique style.
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <FadeIn delay={150}>
              <div className="aspect-square bg-secondary/40 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                  alt="StyleCurator fashion styling" 
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="space-y-6">
                <h2 className="text-2xl font-medium">Our Story</h2>
                <p className="text-muted-foreground">
                  Founded in 2023, StyleCurator was born from the frustration of endless scrolling through 
                  fashion websites without finding pieces that truly matched personal style and body type.
                </p>
                <p className="text-muted-foreground">
                  We built an AI-powered platform that learns from your preferences, understands your body 
                  measurements, and curates fashion collections tailored specifically to you.
                </p>
                <p className="text-muted-foreground">
                  Our platform connects directly to trusted retailers like Amazon and Flipkart, 
                  making it easy to not just discover your perfect style, but to purchase it with confidence.
                </p>
                
                <div className="pt-4">
                  <Link to="/quiz-section">
                    <Button size="lg" className="rounded-full px-8">Try the Style Quiz</Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
          
          <div className="mt-24">
            <FadeIn>
              <h2 className="text-3xl font-medium mb-12 text-center">Our Team</h2>
            </FadeIn>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <FadeIn key={member.name} delay={index * 150}>
                  <div className="bg-card rounded-xl p-8 shadow-md border border-border/50 text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mb-6 mx-auto overflow-hidden">
                      {index === 0 && member.image && (
                        <img 
                          src={member.image}
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                      {index === 0 && !member.image && (
                        <img 
                          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                      {index === 1 && (
                        <img 
                          src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                      {index === 2 && (
                        <img 
                          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
