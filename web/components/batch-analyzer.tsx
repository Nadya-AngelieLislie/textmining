"use client";

import { useState } from "react";

interface BatchResult {
  text: string;
  prediction: "positif" | "negatif";
  prediction_label: string;
  confidence_positif: number;
  confidence_negatif: number;
}

export default function BatchAnalyzer() {
  const [texts, setTexts] = useState("");
  const [results, setResults] = useState<BatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyzeBatch = async () => {
    const textList = texts
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .slice(0, 50);

    if (textList.length === 0) {
      setError("Please enter at least one text (one per line)");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/predict/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: textList }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze batch");
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const positiveCount = results.filter((r) => r.prediction === "positif").length;
  const negativeCount = results.filter((r) => r.prediction === "negatif").length;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-6">
        <label className="block text-sm font-semibold text-slate-300 mb-3">
          Enter Texts (one per line, max 50)
        </label>
        <textarea
          value={texts}
          onChange={(e) => setTexts(e.target.value)}
          placeholder="Produk bagus dan berkualitas!&#10;Pengiriman sangat lambat dan mengecewakan&#10;Barang sesuai deskripsi"
          className="w-full h-40 bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none font-mono text-sm"
        />

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleAnalyzeBatch}
            disabled={loading}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-700 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/30"
          >
            {loading ? "Processing..." : "📊 Analyze All"}
          </button>
          <button
            onClick={() => { setTexts(""); setResults([]); setError(""); }}
            className="px-4 py-3 bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50 font-medium rounded-lg transition-all"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Results Summary */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{results.length}</div>
            <div className="text-sm text-slate-400 mt-1">Total Analyzed</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-slate-900/50 border border-green-500/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{positiveCount}</div>
            <div className="text-sm text-slate-400 mt-1">Positive</div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-slate-900/50 border border-red-500/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-400">{negativeCount}</div>
            <div className="text-sm text-slate-400 mt-1">Negative</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-slate-900/50 border border-cyan-500/20 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-cyan-400">
              {((positiveCount / results.length) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-slate-400 mt-1">Positive Rate</div>
          </div>
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="overflow-x-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/30 bg-slate-900/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">Text</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300">Sentiment</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300">Positive</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300">Negative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {results.map((result, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-300 max-w-md truncate">
                    {result.text}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        result.prediction === "positif"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {result.prediction === "positif" ? "😊" : "😞"} {result.prediction.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-semibold text-green-400">
                      {result.confidence_positif.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-semibold text-red-400">
                      {result.confidence_negatif.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length === 0 && !loading && (
        <div className="text-center py-12 text-slate-400">
          <div className="text-4xl mb-3">📊</div>
          <p>Enter texts above and click "Analyze All" to see results</p>
        </div>
      )}
    </div>
  );
}
