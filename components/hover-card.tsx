"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HoverCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function HoverCard({ icon, title, description }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-xl border border-white/10 bg-black p-6 hover:border-orange-500/50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 p-3 text-orange-500">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-white/60">{description}</p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.div>
  );
}
