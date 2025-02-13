"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-2xl border border-gray-200 bg-white p-6 hover:border-orange-500/50 transition-colors"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="rounded-lg bg-gradient-to-br from-orange-500/10 to-pink-500/10 p-3 text-orange-500">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.div>
  );
}
