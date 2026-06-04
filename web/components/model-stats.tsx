"use client";

import { useEffect, useState } from "react";

interface StatsData {
  accuracy?: number;
  train_size?: number;
  test_size?: number;
}

export default function ModelStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Model Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-slate-900/50 border border-blue-500/20 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-400 mb-2">Model Accuracy</div>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {stats?.accuracy ? ((stats.accuracy as number) * 100).toFixed(2) : "99.88"}%
          </div>
          <div className="text-xs text-slate-500 mt-2">On test dataset</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-slate-900/50 border border-green-500/20 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-400 mb-2">Training Data</div>
          <div className="text-4xl font-bold text-green-400">
            {stats?.train_size ? stats.train_size.toLocaleString() : "3,312"}
          </div>
          <div className="text-xs text-slate-500 mt-2">samples in training set</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-slate-900/50 border border-purple-500/20 rounded-xl p-6 text-center">
          <div className="text-sm text-slate-400 mb-2">Test Data</div>
          <div className="text-4xl font-bold text-purple-400">
            {stats?.test_size ? stats.test_size.toLocaleString() : "829"}
          </div>
          <div className="text-xs text-slate-500 mt-2">samples in test set</div>
        </div>
      </div>

      {/* Model Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            🔧 Model Architecture
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-700/30">
              <span className="text-slate-400">Algorithm</span>
              <span className="text-blue-300 font-semibold">Logistic Regression</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-700/30">
              <span className="text-slate-400">Regularization</span>
              <span className="text-blue-300 font-semibold">L2 (C=1.0)</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-700/30">
              <span className="text-slate-400">Solver</span>
              <span className="text-blue-300 font-semibold">lbfgs</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-700/30">
              <span className="text-slate-400">Max Iterations</span>
              <span className="text-blue-300 font-semibold">1,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Random State</span>
              <span className="text-blue-300 font-semibold">42</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            📊 Feature Engineering
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-700/30">
              <span className="text-slate-400">Vectorizer</span>
              <span className="text-blue-300 font-semibold">TF-IDF</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-700/30">
              <span className="text-slate-400">Max Features</span>
              <span className="text-blue-300 font-semibold">5,000</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-700/30">
              <span className="text-slate-400">N-gram Range</span>
              <span className="text-blue-300 font-semibold">(1, 2)</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-700/30">
              <span className="text-slate-400">Min Document Frequency</span>
              <span className="text-blue-300 font-semibold">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Sublinear TF</span>
              <span className="text-blue-300 font-semibold">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preprocessing Pipeline */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          ⚙️ Text Preprocessing Pipeline
        </h3>
        <div className="space-y-3">
          {[
            { step: "1", title: "Lowercase", desc: "Convert all text to lowercase" },
            { step: "2", title: "URL Removal", desc: "Remove URLs and mentions (@username)" },
            { step: "3", title: "Character Cleaning", desc: "Remove non-alphabetic characters" },
            { step: "4", title: "Stopword Removal", desc: "Remove Indonesian stopwords" },
            { step: "5", title: "Length Filter", desc: "Keep words with length > 2" },
            { step: "6", title: "Vectorization", desc: "Convert text to TF-IDF features" },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-3 rounded-lg bg-slate-900/30 border border-slate-700/30 hover:border-blue-500/30 transition-all">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-semibold text-sm">
                {item.step}
              </div>
              <div>
                <div className="font-semibold text-slate-200">{item.title}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Info */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          📚 Dataset Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Samples</span>
              <span className="text-slate-100 font-semibold">4,141</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Language</span>
              <span className="text-slate-100 font-semibold">Indonesian</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Source</span>
              <span className="text-slate-100 font-semibold">E-commerce & Reviews</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Classes</span>
              <span className="text-slate-100 font-semibold">2 (Positive / Negative)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Train/Test Split</span>
              <span className="text-slate-100 font-semibold">80% / 20%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Stratified</span>
              <span className="text-slate-100 font-semibold">Yes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
