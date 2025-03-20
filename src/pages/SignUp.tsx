
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FadeIn from "@/components/FadeIn";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({ name, email }));
      
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Welcome to StyleCurator!",
      });
      
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <FadeIn>
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <span className="text-primary font-semibold text-sm">SC</span>
              </div>
              <h1 className="text-xl font-medium">
                Style<span className="text-primary font-semibold">Curator</span>
              </h1>
            </Link>
            <h1 className="text-2xl font-semibold mb-2">Create an account</h1>
            <p className="text-muted-foreground">Sign up to get started</p>
          </div>
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default SignUp;
