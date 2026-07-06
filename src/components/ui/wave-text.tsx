import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text?: string;
  className?: string;
}

function WaveText({
  text = "Hover me",
  className = "",
}: AnimatedTextProps) {
  return (
    <motion.span
      className={cn(
        "inline-block cursor-pointer",
        className
      )}
      whileHover="hover"
      initial="initial"
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split("").map((char, charIndex) => {
            const globalIndex = text.split(" ").slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0) + charIndex;
            return (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={{
                  initial: {
                    y: 0,
                  },
                  hover: {
                    y: -6,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                      delay: globalIndex * 0.025,
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < text.split(" ").length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

export { WaveText };
