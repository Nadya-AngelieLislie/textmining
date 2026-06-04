"use client";

import { useState } from "react";

interface PredictionResult {
  text_original: string;
  text_preprocessed: string;
  prediction: "positif" | "negatif";
  prediction_label: string;
  confidence: {
    negatif: number;
    positif: number;
  };
}

export default function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const examplePositive = "Produk sangat bagus dan berkualitas, pelayanan ramah pengiriman cepat sekali!";
  const exampleNegative = "Barang tidak sesuai gambar, kualitas buruk dan pengiriman sangat lama mengecewakan!";

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      const data = await response.json();
      if (data.result) {
        setResult(data.result);
      } else {
        setError("Could not process the request");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const insertExample = (example: string) => {
    setText(example);
  };

  const isPositive = result?.prediction === "positif";

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Input Section */}
      <div className="md:col-span-2 space-y-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-6">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Enter Indonesian Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan teks ulasan bahasa Indonesia..."
            className="w-full h-32 bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
          />

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => insertExample(examplePositive)}
              className="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 hover:bg-green-500/20 text-sm font-medium transition-all"
            >
              ✓ Positive Example
            </button>
            <button
              onClick={() => insertExample(exampleNegative)}
              className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 text-sm font-medium transition-all"
            >
              ✗ Negative Example
            </button>
            <button
              onClick={() => { setText(""); setResult(null); setError(""); }}
              className="px-3 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50 text-sm font-medium transition-all"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-700 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:shadow-none"
        >
          {loading ? "Analyzing..." : "🔍 Analyze Sentiment"}
        </button>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Preprocessing Details */}
        {result && (
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
            <details className="text-sm">
              <summary className="font-semibold text-slate-300 cursor-pointer hover:text-slate-100">
                📋 Preprocessing Details
              </summary>
              <div className="mt-3 space-y-2 text-slate-400 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Original:</span>
                  <div className="mt-1 p-2 bg-slate-950/50 rounded border border-slate-700/30 text-slate-300 break-words">
                    {result.text_original}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Cleaned:</span>
                  <div className="mt-1 p-2 bg-slate-950/50 rounded border border-slate-700/30 text-slate-300 break-words">
                    {result.text_preprocessed}
                  </div>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>

      {/* Result Section */}
      <div>
        {result ? (
          <div
            className={`rounded-xl p-8 text-center border-2 backdrop-blur-sm ${
              isPositive
                ? "bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/50"
                : "bg-gradient-to-br from-red-500/10 to-rose-500/5 border-red-500/50"
            }`}
          >
            <div className="text-6xl mb-4">{isPositive ? "😊" : "😞"}</div>
            
            <h3 className={`text-2xl font-bold mb-4 ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}>
              {isPositive ? "POSITIF" : "NEGATIF"}
            </h3>

            <div className="space-y-4">
              {/* Confidence Bars */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">😊 Positive</span>
                  <span className="font-semibold text-green-400">
                    {result.confidence.positif.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/30">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${result.confidence.positif}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">😞 Negative</span>
                  <span className="font-semibold text-red-400">
                    {result.confidence.negatif.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/30">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-rose-400 transition-all duration-500"
                    style={{ width: `${result.confidence.negatif}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-8 text-center text-slate-400">
            <div className="text-4xl mb-3">💭</div>
            <p className="text-sm">
              Enter text and click analyze to see sentiment predictions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
