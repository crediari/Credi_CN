"use client";

import { AnimatePresence, motion } from "motion/react";

type AuthLoadingProps = {
  isLoading?: boolean;
  message?: string;
  logoSrc?: string;
  className?: string;
};

function AuthLoading({
  isLoading = false,
  message = "Autenticando...",
  logoSrc = "/logo.svg",
  className = "fixed inset-0 z-100 flex flex-col items-center justify-center bg-background",
}: AuthLoadingProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={className}
        >
          <motion.img
            src={logoSrc}
            alt="Logo"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="mb-6 w-32"
          />

          <div className="relative h-1 w-40 overflow-hidden rounded-full bg-gray-200 dark:bg-accent">
            <motion.div
              className="absolute h-full w-1/2 rounded-full bg-primary dark:bg-white"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
          </div>

          <span className="mt-3 text-sm">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { AuthLoading, type AuthLoadingProps };
