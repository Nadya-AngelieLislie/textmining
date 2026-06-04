# SentiAnalyze Setup Guide

## Quick Start (5 minutes)

### Step 1: Set Up Backend

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server (will run on port 5000)
python3 app.py
```

**✓ Flask running at:** http://localhost:5000

### Step 2: Set Up Frontend

Open a **new terminal** and:

```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start Next.js dev server (will run on port 3000)
npm run dev
```

**✓ Website ready at:** http://localhost:3000

---

## What's Running

| Component | URL | Language | Status |
|-----------|-----|----------|--------|
| **Frontend** | http://localhost:3000 | TypeScript/React | Running |
| **Backend API** | http://localhost:5000 | Python/Flask | Running |
| **Database** | In-memory | — | Ready (loaded from files) |

---

## File Organization

```
textmining/
├── web/                    ← Next.js Frontend
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── .env.local         (Configure API URL here)
│
├── app.py                 ← Flask Backend
├── requirements.txt       ← Python dependencies
├── dataset.csv           ← Training data (4,141 samples)
├── lr_model.pkl          ← ML model
├── tfidf_vectorizer.pkl  ← Text vectorizer
├── training_history.json ← Model metrics
│
└── model_cache/          ← Runtime cache (auto-created)
```

---

## Testing the Integration

### Test 1: Check Flask API

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Produk ini sangat bagus dan memuaskan"}'
```

**Expected Response:**
```json
{
  "success": true,
  "result": {
    "prediction": "positif",
    "prediction_label": "Positif 😊",
    "confidence": {
      "positif": 79.57,
      "negatif": 20.43
    }
  }
}
```

### Test 2: Check Next.js API Route

```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Ini benar-benar mengecewakan dan buruk"}'
```

### Test 3: Visit Website

Open http://localhost:3000 in your browser and:
1. Click "Analyze Text" tab
2. Click "✓ Positive Example" button
3. Click "🔍 Analyze Sentiment" button
4. See the prediction appear on the right

---

## Troubleshooting

### "Connection refused on port 5000"
- Make sure Flask is running: `python3 app.py`
- Check if another process is using port 5000: `lsof -i :5000`

### "Failed to fetch from API"
- Verify Flask is running
- Check `.env.local` has correct `FLASK_API_URL`
- Check browser console for CORS errors

### "Module not found" error in Python
- Activate virtual environment: `source venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`

### "Cannot find module" in Node.js
- Install dependencies: `npm install`
- Delete `node_modules`: `rm -rf node_modules && npm install`

### Port 3000 or 5000 already in use
```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 5000
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

---

## Features Overview

### Single Text Analysis (/analyze)
- Enter any Indonesian text
- Get sentiment prediction with confidence scores
- See preprocessed text
- Example buttons for quick testing

### Batch Processing (/batch)
- Paste up to 50 texts (one per line)
- Analyze all at once
- View results in detailed table
- See sentiment distribution chart

### Model Statistics (/stats)
- View 99.88% accuracy
- Training data: 3,312 samples
- Test data: 829 samples
- See model architecture details
- View feature engineering parameters

### About (/about)
- Project information
- Technology stack explanation
- Performance metrics
- How the model works

---

## Environment Variables

### Frontend (`web/.env.local`)
```
FLASK_API_URL=http://localhost:5000
```

### Backend (automatic)
- `FLASK_ENV=development`
- `FLASK_DEBUG=1`
- Uses default port 5000

---

## Database & Model Files

The model and dataset are **already trained and ready to use**:

- **lr_model.pkl** (5 MB) - Logistic Regression model
- **tfidf_vectorizer.pkl** (3 MB) - Text vectorizer
- **training_history.json** - Performance metrics
- **dataset.csv** - 4,141 reviews

No training needed! Just run the server.

---

## Next Steps

### 1. Customize the UI
Edit components in `web/components/` to change colors, fonts, layout

### 2. Integrate with Database
Add PostgreSQL/MongoDB to store predictions

### 3. Add Authentication
Use NextAuth.js to add user accounts

### 4. Deploy to Vercel
```bash
cd web
vercel deploy
```

### 5. Deploy Flask Backend
Use Railway, Render, or your own server

---

## Architecture

```
┌─────────────────────────────────┐
│     Next.js Frontend (3000)     │
│  - React Components             │
│  - Tailwind CSS                 │
│  - API Routes                   │
└─────────────────────────────────┘
              ↓ HTTP
┌─────────────────────────────────┐
│    Flask Backend (5000)         │
│  - ML Model (Logistic Reg)      │
│  - Text Preprocessing           │
│  - CORS Enabled                 │
└─────────────────────────────────┘
              ↓ joblib
┌─────────────────────────────────┐
│      Model Files (pkl)          │
│  - lr_model.pkl                 │
│  - tfidf_vectorizer.pkl         │
└─────────────────────────────────┘
```

---

## Learning Resources

- **Next.js:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Flask:** https://flask.palletsprojects.com
- **scikit-learn:** https://scikit-learn.org/stable/
- **TF-IDF:** https://en.wikipedia.org/wiki/Tf%E2%80%93idf

---

## Support

If you encounter issues:
1. Check this guide's Troubleshooting section
2. Look at Flask console output for backend errors
3. Check browser console (F12) for frontend errors
4. Ensure both Python and Node.js versions are correct

---

**Happy analyzing! 🚀**
