
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../../App";
import { useContext } from "react";

const HeaderSection = () => {
  const auth = useContext(AuthContext);
  
  return (
    <>
      <Header />
      <div className="container flex flex-col items-center text-center">
        <FadeIn>
          <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Discover your perfect style
          </span>
        </FadeIn>
        
        {auth?.isAuthenticated && auth.user && (
          <FadeIn delay={100}>
            <div className="mb-4">
              <span className="text-lg md:text-xl font-medium text-nike-red">
                Welcome, {auth.user.name || auth.user.email?.split('@')[0] || 'Style Enthusiast'}!
              </span>
            </div>
          </FadeIn>
        )}
      </div>
    </>
  );
};

export default HeaderSection;
