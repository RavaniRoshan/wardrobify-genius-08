
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { img: "h-6 w-6", text: "text-lg" };
      case "md":
        return { img: "h-8 w-8", text: "text-xl" };
      case "lg":
        return { img: "h-10 w-10", text: "text-2xl" };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/689c3d2c-ff3c-4fb7-8366-9ebd117dd7dd.png" 
          alt="StyleCurator Logo" 
          className={`${sizeStyles.img} mr-3`}
          width="40"
          height="40"
        />
      </div>
      {showText && (
        <h1 className={`${sizeStyles.text} font-medium`}>
          Style<span className="text-primary font-semibold">Curator</span>
        </h1>
      )}
    </Link>
  );
};

export default Logo;
