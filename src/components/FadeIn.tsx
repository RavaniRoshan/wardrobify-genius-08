
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  threshold?: number;
  once?: boolean;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 600,
  className = "",
  direction = "up",
  threshold = 0.1,
  once = true,
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px",
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const getDirectionStyles = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return "translate-y-[20px] opacity-0";
        case "down":
          return "translate-y-[-20px] opacity-0";
        case "left":
          return "translate-x-[20px] opacity-0";
        case "right":
          return "translate-x-[-20px] opacity-0";
        case "none":
          return "opacity-0";
        default:
          return "translate-y-[20px] opacity-0";
      }
    }
    return "translate-y-0 translate-x-0 opacity-100";
  };

  return (
    <div
      ref={ref}
      className={cn(
        getDirectionStyles(),
        "transition-all will-change-transform",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
