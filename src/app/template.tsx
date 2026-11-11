"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/components/motion";

/*
 * Page transition. Templates remount on every navigation, so the new page
 * fades and lifts in. The very first page load is left alone so the server
 * HTML (and the hero's own entrance) shows immediately.
 */
let navigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  // Only true in the browser, after the first page has mounted
  const [animate] = useState(() => typeof window !== "undefined" && navigated);
  useEffect(() => {
    navigated = true;
  }, []);
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 18 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  );
}
