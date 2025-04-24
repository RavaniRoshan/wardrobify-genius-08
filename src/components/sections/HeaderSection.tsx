
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { AuthContext } from "../../App";
import { useContext } from "react";
import FadeIn from "@/components/FadeIn";

const HeaderSection = () => {
  const auth = useContext(AuthContext);
  
  return (
    <FadeIn>
      <div className="bg-secondary/10 py-2 text-center text-sm">
        <span className="text-primary/80">Discover the new collections.</span>
        <Link to="/collections" className="ml-2 text-primary font-medium hover:underline">
          Shop Now
        </Link>
      </div>
      <Header />
      {auth?.isAuthenticated && auth.user && (
        <div className="container mt-4">
          <span className="text-sm text-primary font-medium">
            Welcome back, {auth.user.name || auth.user.email?.split('@')[0] || 'Style Enthusiast'}
          </span>
        </div>
      )}
    </FadeIn>
  );
};

export default HeaderSection;
