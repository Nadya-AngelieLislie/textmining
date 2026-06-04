"use client";

import { useState } from "react";
import Header from "@/components/header";
import SentimentAnalyzer from "@/components/sentiment-analyzer";
import BatchAnalyzer from "@/components/batch-analyzer";
import ModelStats from "@/components/model-stats";
import About from "@/components/about";

export default function Home() {
  const [activeTab, setActiveTab] = useState("analyze");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 md:py-16">
        {/* Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 mb-12 border-b border-blue-400/20">
          {[
            { id: "analyze", label: "💬 Analyze Text", icon: "🔍" },
            { id: "batch", label: "📋 Batch Analysis", icon: "📊" },
            { id: "stats", label: "📈 Model Stats", icon: "📊" },
            { id: "about", label: "ℹ️ About", icon: "ℹ️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="animate-fadeIn">
          {activeTab === "analyze" && <SentimentAnalyzer />}
          {activeTab === "batch" && <BatchAnalyzer />}
          {activeTab === "stats" && <ModelStats />}
          {activeTab === "about" && <About />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-400/20 py-6 px-4 text-center text-sm text-slate-400">
        <p>SentiAnalyze © 2024 — Built by Nadya Angelie Lislie (270231680)</p>
      </footer>
    </div>
  );
}
