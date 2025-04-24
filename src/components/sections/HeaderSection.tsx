
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { AuthContext } from "../../App";
import { useContext } from "react";

const HeaderSection = () => {
  const auth = useContext(AuthContext);
  
  return (
    <>
      <Header />
      {auth?.isAuthenticated && auth.user && (
        <div className="container mt-4">
          <span className="text-sm text-primary font-medium">
            Welcome back, {auth.user.name || auth.user.email?.split('@')[0] || 'Style Enthusiast'}
          </span>
        </div>
      )}
    </>
  );
};

export default HeaderSection;
