"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedRadialGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  labelText?: string;
  fontSize?: number;
}

export function AnimatedRadialGauge({
  score,
  size = 120,
  strokeWidth = 10,
  showLabel = true,
  labelText,
  fontSize,
}: AnimatedRadialGaugeProps) {
  const [currentScore, setCurrentScore] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  // Determine color based on score
  const getColor = (val: number) => {
    if (val >= 80) return "#059669"; // Emerald 600
    if (val >= 50) return "#D97706"; // Amber 600
    return "#DC2626"; // Crimson Rose 600
  };

  const isDecimal = score % 1 !== 0;

  useEffect(() => {
    const duration = 1200; // 1.2 seconds as specified
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = isDecimal
        ? Math.round(easeOut * score * 10) / 10
        : Math.round(easeOut * score);
      setCurrentScore(val);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentScore(score);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [score, isDecimal]);

  const strokeColor = getColor(score);

  // Dynamically scale font size to fit within the gauge without overflowing the circle
  const scoreFontSize =
    fontSize ??
    (size >= 100
      ? Math.round(size * 0.22)
      : Math.round(size * 0.185));

  return (
    <div className="relative inline-flex flex-col items-center justify-center select-none">
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center shrink-0"
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-200 dark:text-white/10 fill-none"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="fill-none transition-all duration-300 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${strokeColor}40)`,
            }}
          />
        </svg>

        {/* Numeric Counter ONLY in center */}
        <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
          <span
            className="font-black tracking-tight leading-none"
            style={{
              color: strokeColor,
              fontSize: `${scoreFontSize}px`,
            }}
          >
            {currentScore}%
          </span>
        </div>
      </div>

      {/* Label positioned cleanly below the circle */}
      {showLabel && (
        <span className="font-bold uppercase tracking-wider text-muted-gray mt-2 text-[10px] leading-tight text-center max-w-[130px]">
          {labelText || "Score"}
        </span>
      )}
    </div>
  );
}
