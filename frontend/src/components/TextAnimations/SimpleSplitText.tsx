import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface SimpleSplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  onAnimationComplete?: () => void;
}

const SimpleSplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  onAnimationComplete,
}: SimpleSplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("SimpleSplitText useEffect triggered for text:", text);
    
    if (!containerRef.current || !text) {
      console.log("Early return - container/text check failed");
      return;
    }

    const container = containerRef.current;
    
    // Split text into words and create spans
    const words = text.split(' ');
    container.innerHTML = words
      .map(word => `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(40px);">${word}</span>`)
      .join(' ');

    const wordElements = container.querySelectorAll('.word');
    console.log(`Created ${wordElements.length} word elements for animation`);

    if (wordElements.length === 0) {
      console.warn("No word elements found");
      onAnimationComplete?.();
      return;
    }

    // Create timeline that starts immediately
    const tl = gsap.timeline({
      onComplete: () => {
        console.log("SimpleSplitText animation completed!");
        onAnimationComplete?.();
      },
    });

    // Animate words with stagger
    tl.to(wordElements, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger: delay / 1000,
    });

    return () => {
      tl.kill();
      console.log("SimpleSplitText cleanup");
    };
  }, [text, delay, duration, ease, onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className={`split-text-container ${className}`}
      style={{
        textAlign: "center",
        overflow: "visible",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {text}
    </div>
  );
};

export default SimpleSplitText;