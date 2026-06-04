# SentiAnalyze Web Frontend

Modern Next.js frontend for Indonesian sentiment analysis using Logistic Regression + TF-IDF.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.9+ (for Flask backend)

### Setup

#### 1. Frontend (Next.js)
```bash
cd web
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

#### 2. Backend (Flask)
Open another terminal in the root directory:

```bash
pip install -r requirements.txt
python app.py
```

The Flask API will be available at `http://localhost:5000`

### Configuration

The frontend connects to the Flask backend via the `FLASK_API_URL` environment variable.

**Default:** `http://localhost:5000`

To change it, edit `web/.env.local`:
```
FLASK_API_URL=http://your-flask-url:5000
```

## ✨ Features

### 💬 Single Text Analysis
- Analyze Indonesian text for positive/negative sentiment
- View confidence scores for each prediction
- See preprocessing steps in detail
- Example buttons for quick testing

### 📋 Batch Analysis
- Analyze up to 50 texts at once
- View results in a detailed table
- See sentiment distribution statistics
- Export-friendly data format

### 📊 Model Statistics
- View model accuracy and dataset metrics
- Understand the ML architecture
- See feature engineering details
- Review the preprocessing pipeline

### ℹ️ About Page
- Project information
- Technology stack details
- Use case examples
- Performance metrics

## 🔌 API Routes

The frontend provides API routes that proxy to the Flask backend:

- `POST /api/predict` - Single text prediction
- `POST /api/predict/batch` - Batch predictions
- `GET /api/stats` - Model statistics

## 🛠️ Technologies

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Responsive Design** - Mobile-first approach

### Backend
- **Flask** - Python web framework
- **scikit-learn** - ML models and metrics
- **TF-IDF** - Text vectorization (5000 features, unigram + bigram)
- **Logistic Regression** - Classification algorithm

## 📈 Performance

- **Accuracy**: 99.88%
- **Response Time**: <500ms per prediction
- **Batch Processing**: Up to 50 texts at once
- **Training Data**: 4,141 Indonesian reviews
- **Test Data**: 829 samples
- **Language**: Indonesian

## 👩‍💻 Author

Nadya Angelie Lislie (NIM: 270231680)

## 📝 License

MIT
