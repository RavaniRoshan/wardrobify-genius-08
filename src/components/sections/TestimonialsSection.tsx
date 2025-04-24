
import FadeIn from "@/components/FadeIn";

const testimonials = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=300&q=80",
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    quote: "StyleCurator has completely changed how I shop for clothes. The recommendations are spot-on!"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300&q=80",
    name: "Michael Chen",
    role: "Style Seeker",
    quote: "I finally feel confident in my personal style thanks to the personalized recommendations."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&h=300&q=80",
    name: "Emily Wright",
    role: "Fashion Blogger",
    quote: "The AI-powered style quiz is incredibly accurate. It's like having a personal stylist!"
  }
];

const TestimonialsSection = () => {
  return (
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
          {testimonials.map((testimonial) => (
            <FadeIn key={testimonial.id} delay={testimonial.id * 150}>
              <div className="bg-background rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
