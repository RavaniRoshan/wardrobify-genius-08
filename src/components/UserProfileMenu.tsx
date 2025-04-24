
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { AuthContext } from "@/App";
import { useContext } from "react";
import { 
  Moon, 
  Sun, 
  User, 
  LogOut, 
  Settings, 
  Heart, 
  ShoppingCart, 
  Package, 
  Bell, 
  Tag, 
  Monitor 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProfileSettingsDialog from "./ProfileSettingsDialog";
import { Switch } from "@/components/ui/switch";

const UserProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, resolvedTheme, setTheme } = useTheme();
  
  const handleSignOut = () => {
    if (auth) {
      auth.logout();
      navigate("/");
      setIsOpen(false);
    }
  };

  const handleProfileUpdate = () => {
    // Refresh auth state after profile update
    if (auth) {
      // Force a refresh of the user data in the parent component
      const currentUser = { ...auth.user };
      auth.refreshUser();
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

  const navigateTo = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  if (!auth?.isAuthenticated) return null;

  // Get the display name from user metadata or fall back to email
  const displayName = auth.user?.user_metadata?.name || auth.user?.email || "User";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium bg-primary/10 py-1 px-4 rounded-full text-primary hover:bg-primary/20 transition-colors"
      >
        {displayName}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-card border border-border z-50">
          <div className="p-4 border-b border-border">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User size={20} />
              </div>
              <div className="ml-3">
                <p className="font-medium">{auth.user?.user_metadata?.name || "User"}</p>
                <p className="text-sm text-muted-foreground">{auth.user?.email}</p>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            <div className="border-b border-border pb-2 mb-2">
              <button
                onClick={() => navigateTo("/profile")}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <User size={16} className="mr-2" />
                My Profile
              </button>

              <button
                onClick={() => navigateTo("/wishlist")}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Heart size={16} className="mr-2" />
                Wishlist
              </button>

              <button
                onClick={() => navigateTo("/cart")}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ShoppingCart size={16} className="mr-2" />
                Cart
              </button>

              <button
                onClick={() => navigateTo("/orders")}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Package size={16} className="mr-2" />
                Orders
              </button>

              <button
                onClick={() => navigateTo("/notifications")}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Bell size={16} className="mr-2" />
                Notifications
              </button>

              <button
                onClick={() => navigateTo("/coupons")}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Tag size={16} className="mr-2" />
                Coupons
              </button>

              <button
                onClick={() => navigateTo("/issues")}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Package size={16} className="mr-2" />
                Issues
              </button>
            </div>

            {/* Settings section */}
            <div className="border-b border-border pb-2 mb-2">
              <button
                onClick={() => {
                  setIsProfileDialogOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Settings size={16} className="mr-2" />
                Edit Profile
              </button>
              
              <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Theme</span>
                  <div className="flex items-center space-x-2">
                    <Sun size={16} className={theme === "light" || (theme === "system" && resolvedTheme === "light") ? "text-accent" : "text-muted-foreground"} />
                    <div className="flex gap-1">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setTheme("light")}
                      >
                        Light
                      </Button>
                      <Button
                        variant={theme === "system" ? "default" : "outline"}
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setTheme("system")}
                      >
                        System
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setTheme("dark")}
                      >
                        Dark
                      </Button>
                    </div>
                    <Moon size={16} className={theme === "dark" || (theme === "system" && resolvedTheme === "dark") ? "text-accent" : "text-muted-foreground"} />
                  </div>
                </div>
              </div>
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
      
      <ProfileSettingsDialog
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        currentUser={auth.user}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default UserProfileMenu;
