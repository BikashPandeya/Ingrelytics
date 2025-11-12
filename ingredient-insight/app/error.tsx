"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-green-50 to-green-100 text-green-900 px-4">
      <h1 className="text-5xl font-extrabold mb-4">Oops!</h1>
      <p className="text-lg mb-6">Something went wrong.</p>
      <pre className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full mb-6 text-red-600 overflow-auto">
        {error.message}
      </pre>
      <button
        onClick={() => reset()}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition"
      >
        Try Again
      </button>
    </div>
  );
}
