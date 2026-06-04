# 💬 SentiAnalyze — Indonesian Sentiment Analysis

Complete full-stack Indonesian sentiment analysis application with a modern Next.js website and Flask ML backend.

**Model Performance:** 99.88% Accuracy | **Training Data:** 3,312 samples | **Test Data:** 829 samples

> **Author:** Nadya Angelie Lislie (270231680)

---

## 📊 Hasil Training

| Metric | Value |
|--------|-------|
| 🎯 Accuracy | **99.88%** |
| 📚 Training Data | 3,312 samples |
| 🧪 Test Data | 829 samples |
| 🏷️ Classes | Positif 😊 / Negatif 😞 |

---

## 📁 Project Structure

```
textmining/
├── web/                          # Next.js Frontend Application
│   ├── app/
│   │   ├── page.tsx              # Home page with tab navigation
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   └── api/                  # Next.js API routes
│   │       ├── predict/route.ts  # Single prediction endpoint
│   │       ├── predict/batch/    # Batch prediction endpoint
│   │       └── stats/route.ts    # Model statistics endpoint
│   ├── components/               # React components
│   │   ├── header.tsx            # Header with hero section
│   │   ├── sentiment-analyzer.tsx # Single text analysis
│   │   ├── batch-analyzer.tsx    # Batch processing
│   │   ├── model-stats.tsx       # Model metrics display
│   │   └── about.tsx             # Project information
│   ├── package.json
│   └── next.config.ts
│
├── app.py                        # Flask Backend API
├── streamlit_app.py              # Legacy Streamlit UI
├── requirements.txt              # Python dependencies
├── dataset.csv                   # Dataset (4,141 Indonesian reviews)
├── README.md
├── lr_model.pkl                  # Logistic Regression model
├── tfidf_vectorizer.pkl          # TF-IDF vectorizer
├── training_history.json         # Model metrics
│
└── model_cache/                  # Runtime model cache
    ├── lr_model.pkl
    ├── tfidf_vectorizer.pkl
    └── training_history.json
```

---

## ⚙️ Pipeline NLP

1. Lowercase
2. Hapus URL & mention
3. Hapus karakter non-alfabet
4. Hapus stopwords Bahasa Indonesia
5. TF-IDF Vectorization (5000 fitur, unigram + bigram)
6. Logistic Regression

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (for Next.js frontend)
- **Python** 3.9+ (for Flask backend)

### Quick Start

#### 1. Install Frontend Dependencies

```bash
cd web
npm install
```

#### 2. Install Backend Dependencies

```bash
pip install -r requirements.txt
# or using virtual environment (recommended):
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 3. Run the Applications

**Terminal 1 - Flask Backend:**
```bash
cd /path/to/textmining
source venv/bin/activate  # if using venv
python3 app.py
```

The API will be available at `http://localhost:5000`

**Terminal 2 - Next.js Frontend:**
```bash
cd /path/to/textmining/web
npm run dev
```

The website will be available at `http://localhost:3000`

### Configuration

Update the Flask API URL in `web/.env.local`:
```
FLASK_API_URL=http://localhost:5000
```

## 🌐 Website Features

### 1. Single Text Analysis
- Real-time sentiment prediction
- Confidence scores (positive vs negative)
- Text preprocessing visualization
- Example buttons for quick testing
- Responsive design

### 2. Batch Processing
- Analyze up to 50 texts at once
- Detailed results table
- Sentiment distribution charts
- Export-friendly data format

### 3. Model Statistics
- Real-time accuracy metrics (99.88%)
- Training vs test dataset sizes
- Model architecture details
- Feature engineering parameters
- NLP pipeline explanation

### 4. About Section
- Project overview
- Technology stack
- Model performance metrics
- Use case examples

## 🔌 API Endpoints

All endpoints are proxied through Next.js API routes to the Flask backend.

### Single Prediction
```
POST /api/predict
Content-Type: application/json

{
  "text": "Produk ini sangat bagus dan memuaskan"
}

Response:
{
  "success": true,
  "result": {
    "prediction": "positif",
    "prediction_label": "Positif 😊",
    "confidence": {
      "positif": 79.57,
      "negatif": 20.43
    },
    "text_original": "Produk ini sangat bagus dan memuaskan",
    "text_preprocessed": "produk bagus memuaskan"
  }
}
```

### Batch Predictions
```
POST /api/predict/batch
Content-Type: application/json

{
  "texts": [
    "Produk ini sangat bagus",
    "Ini benar-benar mengecewakan"
  ]
}
```

### Model Statistics
```
GET /api/stats

Response:
{
  "accuracy": 99.88,
  "training_samples": 3312,
  "test_samples": 829,
  "features": 5000,
  ...
}
```

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **HTTP Client:** Built-in fetch API
- **UI Components:** Custom React components
- **Design:** Responsive, dark theme, modern gradient

### Backend
- **Framework:** Flask with Flask-CORS
- **ML Library:** scikit-learn
- **Text Vectorization:** TF-IDF
- **Algorithm:** Logistic Regression
- **Language:** Python 3.9+
- **Model Serialization:** joblib/pickle

### Data Processing
- **Preprocessing:** Custom NLP pipeline
  - Lowercase conversion
  - URL and mention removal
  - Non-alphabet character removal
  - Indonesian stopword removal
- **Vectorization:** TF-IDF (5000 features, unigram + bigram)
- **Feature Engineering:** Scikit-learn

## 📊 Dataset Information

| Statistic | Value |
|-----------|-------|
| Total Samples | 4,141 |
| Training Samples | 3,312 (80%) |
| Test Samples | 829 (20%) |
| Language | Indonesian (Bahasa Indonesia) |
| Labels | Positif (😊) / Negatif (😞) |
| Source | Product reviews |

## 🎯 Model Performance

| Metric | Value |
|--------|-------|
| **Accuracy** | **99.88%** |
| **Precision** | ~99.9% |
| **Recall** | ~99.8% |
| **F1-Score** | ~99.9% |
| **Algorithm** | Logistic Regression |
| **Regularization** | L2 (C=1.0) |
| **Solver** | lbfgs |
| **Max Iterations** | 1,000 |

## 📝 NLP Pipeline

1. **Lowercase Normalization**
   - Convert all text to lowercase for consistency

2. **URL & Mention Removal**
   - Remove URLs and @mentions using regex

3. **Character Cleaning**
   - Keep only alphanumeric and whitespace characters
   - Remove special characters and emojis

4. **Stopword Removal**
   - Use Indonesian stopword list
   - Remove common words that don't add semantic value

5. **TF-IDF Vectorization**
   - 5,000 features maximum
   - Unigram and bigram support
   - Min document frequency: 1
   - Sublinear TF scaling enabled

6. **Classification**
   - Logistic Regression with L2 regularization
   - Probability output for confidence scores

## 🔒 Security & Best Practices

- **CORS Configuration:** Flask allows requests from Next.js dev/prod
- **Input Validation:** All text inputs are validated
- **Error Handling:** Graceful error responses with meaningful messages
- **API Rate Limiting:** Can be added via middleware if needed
- **Environment Variables:** Sensitive config stored in .env files

## 🚀 Deployment

### Deploying to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `FLASK_API_URL=<your-flask-api-url>`
4. Deploy!

### Deploying Flask Backend

Options:
- **Vercel:** Deploy with Python support
- **Railway:** Easy Flask deployment
- **Render:** Flask hosting with auto-deploy
- **AWS/GCP/Azure:** Traditional server options
- **Docker:** Containerize Flask app for any platform

## 📈 Monitoring & Logs

- **Frontend:** Check browser console for errors
- **Backend:** Flask logs to console, can add file logging
- **API Health:** Call `http://localhost:5000/health`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📄 Legacy Alternatives

This project also includes:
- `app.py` - Flask API (still available)
- `streamlit_app.py` - Streamlit UI (legacy)

Both work independently but the Next.js frontend is the recommended modern interface.

```bash
pip install -r requirements.txt

# Terminal 1 — Flask API
python app.py

# Terminal 2 — Streamlit UI
streamlit run streamlit_app.py
```

---

## 🌐 Deploy ke Streamlit Cloud

1. Push ke GitHub
2. Buka [share.streamlit.io](https://share.streamlit.io)
3. Main file: `streamlit_app.py`
4. Deploy ✅

---

## 🔌 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/` | Info API |
| GET | `/health` | Status model |
| GET | `/stats` | Metrik model |
| POST | `/predict` | Prediksi 1 teks |
| POST | `/predict/batch` | Prediksi banyak teks |
| POST | `/train` | Retrain model |

---

## 🛠️ Tech Stack

- **Backend:** Flask + scikit-learn
- **Frontend:** Streamlit (Dark Theme)
- **Model:** Logistic Regression (C=1.0, solver=lbfgs)
- **NLP:** TF-IDF + n-gram(1,2)
- **Bahasa:** Python 3.9+
