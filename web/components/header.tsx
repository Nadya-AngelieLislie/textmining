export default function Header() {
  return (
    <header className="border-b border-blue-400/20 backdrop-blur-sm bg-gradient-to-b from-blue-950/20 to-transparent">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30">
          <span className="text-xs font-semibold text-blue-300">AI Powered</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
          SentiAnalyze
        </h1>
        
        <p className="text-lg text-slate-300 mb-2">
          Indonesian Sentiment Analysis with 99.88% Accuracy
        </p>
        
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Powered by Logistic Regression + TF-IDF vectorization. Trained on 4,141 Indonesian reviews.
        </p>
        
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Model Ready
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Real-time Analysis
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            Batch Processing
          </span>
        </div>
      </div>
    </header>
  );
}
