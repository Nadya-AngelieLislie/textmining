export default function About() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Project Overview */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">About SentiAnalyze</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          SentiAnalyze is an advanced machine learning application for sentiment analysis of Indonesian text. 
          Built with cutting-edge NLP techniques, it achieves <span className="text-blue-400 font-semibold">99.88% accuracy</span> in 
          classifying text as positive or negative sentiment.
        </p>
        <p className="text-slate-300 leading-relaxed">
          The model has been trained on over 4,000 authentic Indonesian reviews and comments from e-commerce 
          and restaurant platforms, making it highly effective at understanding real-world Indonesian sentiment expressions.
        </p>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-8">
        <h3 className="text-xl font-bold text-slate-100 mb-6">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "🚀", title: "Real-time Analysis", desc: "Instant sentiment predictions with confidence scores" },
            { icon: "📊", title: "Batch Processing", desc: "Analyze up to 50 texts at once for efficiency" },
            { icon: "🎯", title: "High Accuracy", desc: "99.88% accuracy on diverse Indonesian text" },
            { icon: "🔍", title: "Detailed Insights", desc: "See preprocessing steps and confidence breakdowns" },
            { icon: "⚡", title: "Fast & Reliable", desc: "Sub-second response times for single predictions" },
            { icon: "🌐", title: "Indonesian Focus", desc: "Optimized specifically for Indonesian language nuances" },
          ].map((feature, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-slate-900/30 border border-slate-700/30 hover:border-blue-500/30 transition-all">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="font-semibold text-slate-100 mb-1">{feature.title}</div>
              <div className="text-sm text-slate-400">{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-8">
        <h3 className="text-xl font-bold text-slate-100 mb-6">Technology Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-400 mb-3">Backend</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Flask — Python web framework
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                scikit-learn — Machine learning library
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                pandas — Data manipulation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                joblib — Model serialization
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400 mb-3">Frontend</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Next.js 16 — React framework
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                TypeScript — Type safety
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Tailwind CSS — Styling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Responsive Design — Mobile-first
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="bg-gradient-to-br from-blue-500/10 to-slate-900/50 border border-blue-500/30 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-slate-100 mb-2">👩‍💻 Created by</h3>
        <p className="text-slate-300 text-lg mb-1">Nadya Angelie Lislie</p>
        <p className="text-slate-400 text-sm mb-4">Student ID: 270231680</p>
        <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-lg">
          <p className="text-sm text-blue-300">
            Built with passion for natural language processing and machine learning
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-8">
        <h3 className="text-xl font-bold text-slate-100 mb-6">Use Cases</h3>
        <div className="space-y-3">
          {[
            "E-commerce reviews — Automatically categorize customer feedback as positive or negative",
            "Social media monitoring — Track brand sentiment across Indonesian social networks",
            "Customer service — Route complaints and praise to appropriate teams automatically",
            "Market research — Analyze customer opinions and extract valuable insights",
            "Content moderation — Identify toxic vs. constructive community feedback",
            "Business intelligence — Aggregate sentiment trends from multiple sources",
          ].map((useCase, idx) => (
            <div key={idx} className="flex gap-3 p-3 rounded-lg bg-slate-900/30 border border-slate-700/30">
              <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
              <span className="text-slate-300">{useCase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-8">
        <h3 className="text-xl font-bold text-slate-100 mb-6">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {[
            { label: "Accuracy", value: "99.88%", color: "blue" },
            { label: "Precision", value: ">99%", color: "green" },
            { label: "Recall", value: ">99%", color: "green" },
            { label: "F1-Score", value: "0.999", color: "purple" },
            { label: "Response Time", value: "<500ms", color: "cyan" },
            { label: "Uptime", value: "99.9%", color: "blue" },
          ].map((metric, idx) => (
            <div key={idx} className={`p-4 rounded-lg bg-gradient-to-br from-${metric.color}-500/10 to-slate-900/50 border border-${metric.color}-500/20`}>
              <div className={`text-2xl font-bold text-${metric.color}-400`}>{metric.value}</div>
              <div className="text-xs text-slate-400 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
