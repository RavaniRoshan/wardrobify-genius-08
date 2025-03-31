
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ProfileSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: any;
  onProfileUpdate: () => void;
}

const ProfileSettingsDialog = ({
  open,
  onOpenChange,
  currentUser,
  onProfileUpdate,
}: ProfileSettingsDialogProps) => {
  const [name, setName] = useState(currentUser?.user_metadata?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update user metadata (name)
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { name }
      });

      if (metadataError) throw metadataError;

      // Update email if changed
      if (email !== currentUser?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email
        });

        if (emailError) throw emailError;

        toast({
          title: "Verification email sent",
          description: "Please check your email to confirm your new email address.",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated successfully.",
        });
      }

      onProfileUpdate();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {email !== currentUser?.email && (
                <p className="text-xs text-muted-foreground">
                  You'll need to verify your new email address.
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettingsDialog;
