
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { AuthContext } from "@/App";
import { useContext } from "react";
import { Moon, Sun, User, LogOut } from "lucide-react";

const UserProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const handleSignOut = () => {
    if (auth) {
      auth.logout();
      navigate("/");
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!auth?.isAuthenticated) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium bg-primary/10 py-1 px-4 rounded-full text-primary hover:bg-primary/20 transition-colors"
      >
        {auth.user?.email}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-card border border-border z-50">
          <div className="p-4 border-b border-border">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User size={20} />
              </div>
              <div className="ml-3">
                <p className="font-medium">{auth.user?.name || "User"}</p>
                <p className="text-sm text-muted-foreground">{auth.user?.email}</p>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            <div className="p-2 flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </Button>
            </div>
            
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
