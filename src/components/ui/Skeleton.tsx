"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className = "", children }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base skeleton background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100" />

      {/* Primary pulse animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />

      {/* Secondary shimmer layer with delay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse delay-300" />

      {/* Tertiary wave effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/60 to-transparent animate-pulse delay-500" />

      {/* Content overlay */}
      {children && <div className="relative z-10 opacity-20">{children}</div>}
    </div>
  );
}

export function ImageSkeleton({ className = "" }: { className?: string }) {
  return (
    <Skeleton className={`bg-gray-200 ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        {/* Icon placeholder */}
        <div className="relative">
          <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
          <div className="absolute inset-2 w-12 h-12 bg-gray-400 rounded-full animate-pulse delay-200" />
          <div className="absolute inset-4 w-8 h-8 bg-gray-500 rounded-full animate-pulse delay-400" />
        </div>
      </div>
    </Skeleton>
  );
}
