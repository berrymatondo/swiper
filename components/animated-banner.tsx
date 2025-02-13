"use client";

import { motion } from "framer-motion";

export function AnimatedBanner() {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"
      >
        <div className="container flex items-center justify-center h-10">
          <p className="text-sm font-medium text-white">
            Nouvelle session de cellules - Rejoignez-nous ce jeudi ! 🎉
          </p>
        </div>
      </motion.div>
    </div>
  );
}
