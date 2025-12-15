
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedStatus() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/status")
      .then(res => res.json())
      .then(data => setStatus(data?.currentStatus || "Available"));
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="bg-white px-12 py-10 rounded-3xl shadow-2xl text-center"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Atul is currently
      </h1>

      <motion.p
        key={status}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-purple-700"
      >
        {status}
      </motion.p>
    </motion.div>
  );
}
