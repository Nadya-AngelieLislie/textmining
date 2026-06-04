"""
Sentiment Analysis - Logistic Regression
Analisis Sentimen Bahasa Indonesia
Author: Nadya Angelie Lislie (270231680)
"""

import streamlit as st
import re, os, json
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import joblib

st.set_page_config(
    page_title="SentiAnalyze — Nadya Angelie Lislie",
    page_icon="💬",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown("""
<style>
.stApp { background: linear-gradient(160deg, #0a0a1a 0%, #0d1b2a 50%, #0a1628 100%); }
[data-testid="stSidebar"] {
    background: rgba(8,10,24,0.97) !important;
    border-right: 1px solid #3b82f6;
}
[data-testid="stSidebar"] * { color: #e2e8f0 !important; }
h1, h2, h3, h4 { color: #e2e8f0 !important; }
.card {
    background: rgba(15,23,42,0.9);
    border: 1px solid rgba(59,130,246,0.3);
    border-radius: 14px;
    padding: 22px;
    margin: 10px 0;
}
.result-pos {
    background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08));
    border: 2px solid #10b981;
    border-radius: 16px; padding: 28px; text-align: center;
}
.result-neg {
    background: linear-gradient(135deg, rgba(239,68,68,0.15), rgba(185,28,28,0.08));
    border: 2px solid #ef4444;
    border-radius: 16px; padding: 28px; text-align: center;
}
.stButton > button {
    background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
    color: white !important; border: none !important;
    border-radius: 10px !important; font-weight: 600 !important;
}
.stButton > button:hover {
    background: linear-gradient(135deg, #1d4ed8, #1e40af) !important;
    box-shadow: 0 6px 20px rgba(37,99,235,0.4) !important;
}
.stTextArea textarea {
    color: #e2e8f0 !important;
    background: rgba(15,23,42,0.95) !important;
    border: 1px solid rgba(59,130,246,0.4) !important;
    border-radius: 10px !important;
}
.stTextArea textarea::placeholder {
    color: #64748b !important;
    opacity: 1 !important;
}
.author-tag {
    position: fixed; bottom: 14px; right: 14px;
    background: rgba(37,99,235,0.85); color: white;
    padding: 6px 14px; border-radius: 20px;
    font-size: 11px; font-weight: 600; z-index: 999;
}
footer, #MainMenu { visibility: hidden; }
</style>
""", unsafe_allow_html=True)

# ── Load model langsung (path relatif ke repo) ─────────
@st.cache_resource
def load_model():
    # Streamlit Cloud menjalankan dari root repo, cari model_cache di sana
    base = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base, "lr_model.pkl")
    tfidf_path = os.path.join(base, "tfidf_vectorizer.pkl")
    hist_path  = os.path.join(base, "training_history.json")
    model   = joblib.load(model_path)
    tfidf   = joblib.load(tfidf_path)
    with open(hist_path) as f:
        history = json.load(f)
    return model, tfidf, history

STOPWORDS_ID = {
    'yang','dan','di','ke','dari','ini','itu','dengan','untuk','pada',
    'ada','tidak','sudah','juga','saya','kami','kita','mereka','dia',
    'ia','anda','karena','namun','tapi','atau','jika','bisa','lebih',
    'sangat','akan','seperti','telah','masih','hanya','semua','banyak',
    'setelah','saat','ketika','selain','dalam','oleh','atas','antara',
    'hingga','sehingga','supaya','bahwa','lagi','pun','nya','apa','mau',
    'maka','serta','yaitu','yakni','apabila','sekali','terhadap','tentang',
    'sebuah','setiap','dapat','harus','boleh','walaupun','meski','begitu',
    'lalu','kemudian','sebelum','saja'
}

def preprocess(text):
    text = str(text).lower()
    text = re.sub(r'https?://\S+|@\S+', '', text)
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    words = [w for w in text.split() if w not in STOPWORDS_ID and len(w) > 2]
    return ' '.join(words)

def predict_text(text, model, tfidf):
    clean = preprocess(text)
    vec   = tfidf.transform([clean])
    label = int(model.predict(vec)[0])
    proba = model.predict_proba(vec)[0]
    return label, float(proba[1]), float(proba[0]), clean

# Load
try:
    model, tfidf, history = load_model()
    model_ok = True
except Exception as e:
    model_ok = False
    model_err = str(e)

# ── Sidebar ────────────────────────────────────────────
with st.sidebar:
    st.markdown("""
    <div style='text-align:center; padding:20px 0 8px;'>
        <h2 style='color:#93c5fd; margin:6px 0 2px;'>SentiAnalyze</h2>
        <p style='color:#64748b; font-size:12px; margin:0;'>Analisis Sentimen Bahasa Indonesia</p>
        <div style='background:rgba(37,99,235,0.15); border-radius:8px; padding:8px; margin:10px 0;'>
            <p style='color:#bfdbfe; font-size:11px; margin:0; font-weight:600;'>Nadya Angelie Lislie</p>
            <p style='color:#64748b; font-size:11px; margin:2px 0;'>NIM: 270231680</p>
        </div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("---")
    menu = st.radio("Menu", [
        "Prediksi Teks",
        "Batch Analysis",
        "Model Performance",
        "Tentang"
    ], label_visibility="collapsed")

    st.markdown("---")
    st.markdown("""
    <div style='background:rgba(37,99,235,0.1); border-radius:10px; padding:12px;'>
        <p style='color:#93c5fd; font-size:12px; font-weight:700; margin:0 0 6px;'>Model Info</p>
        <p style='color:#94a3b8; font-size:11px; margin:2px 0;'>Logistic Regression</p>
        <p style='color:#94a3b8; font-size:11px; margin:2px 0;'>TF-IDF (5000 fitur)</p>
        <p style='color:#94a3b8; font-size:11px; margin:2px 0;'>n-gram (1,2)</p>
        <p style='color:#94a3b8; font-size:11px; margin:2px 0;'>4141 data</p>
        <p style='color:#3b82f6; font-size:11px; margin:6px 0 0; font-weight:600;'>Accuracy: 99.88%</p>
    </div>
    """, unsafe_allow_html=True)

# ── PREDIKSI ───────────────────────────────────────────
if menu == "Prediksi Teks":
    st.markdown("""
    <div style='text-align:center; padding:28px 0 16px;'>
        <h1 style='color:#93c5fd; font-size:2.4em; margin-bottom:6px;'>SentiAnalyze</h1>
        <p style='color:#64748b; font-size:1em;'>Analisis Sentimen Teks Bahasa Indonesia · Logistic Regression</p>
        <div style='display:inline-block; background:rgba(37,99,235,0.15); border-radius:20px; padding:3px 14px; margin-top:6px;'>
            <span style='color:#93c5fd; font-size:12px;'>Accuracy 99.88% · 4141 Data</span>
        </div>
    </div>
    """, unsafe_allow_html=True)

    if not model_ok:
        st.error(f"Gagal load model: {model_err}")
        st.stop()

    if "contoh" not in st.session_state:
        st.session_state.contoh = ""

    col1, col2 = st.columns([3, 2])

    with col1:
        st.markdown('<div class="card">', unsafe_allow_html=True)
        st.markdown("#### Input Teks")

        ec1, ec2 = st.columns(2)
        with ec1:
            if st.button("Contoh Positif", use_container_width=True):
                st.session_state.contoh = "Produk sangat bagus dan berkualitas, pelayanan ramah pengiriman cepat sekali!"
                st.rerun()
        with ec2:
            if st.button("Contoh Negatif", use_container_width=True):
                st.session_state.contoh = "Barang tidak sesuai gambar, kualitas buruk dan pengiriman sangat lama mengecewakan!"
                st.rerun()

        user_text = st.text_area(
            "Teks",
            value=st.session_state.contoh,
            placeholder="Masukkan teks ulasan bahasa Indonesia...",
            height=130,
            label_visibility="collapsed",
            key="input_area"
        )
        st.session_state.contoh = user_text

        go = st.button("Analisis Sekarang", use_container_width=True, type="primary")
        st.markdown('</div>', unsafe_allow_html=True)

    with col2:
        st.markdown('<div class="card">', unsafe_allow_html=True)
        st.markdown("#### Statistik Model")
        acc = round(history.get("accuracy", 0) * 100, 2)
        st.metric("Accuracy", f"{acc}%")
        st.metric("Data Train", f"{history.get('train_size', 0):,}")
        st.metric("Data Test", f"{history.get('test_size', 0):,}")
        st.markdown('</div>', unsafe_allow_html=True)

    if go:
        teks = st.session_state.contoh.strip()
        if not teks:
            st.warning("Masukkan teks terlebih dahulu!")
        else:
            label, conf_pos, conf_neg, clean = predict_text(teks, model, tfidf)

            if label == 1:
                st.markdown(f"""
                <div class='result-pos'>
                    <h2 style='color:#10b981; margin:4px 0;'>SENTIMEN POSITIF</h2>
                    <p style='color:#a7f3d0; font-size:1.1em;'>Confidence: <b>{conf_pos*100:.1f}%</b></p>
                </div>""", unsafe_allow_html=True)
            else:
                st.markdown(f"""
                <div class='result-neg'>
                    <h2 style='color:#ef4444; margin:4px 0;'>SENTIMEN NEGATIF</h2>
                    <p style='color:#fca5a5; font-size:1.1em;'>Confidence: <b>{conf_neg*100:.1f}%</b></p>
                </div>""", unsafe_allow_html=True)

            fig, ax = plt.subplots(figsize=(7, 2))
            fig.patch.set_facecolor('none'); ax.set_facecolor('none')
            bars = ax.barh(['Negatif', 'Positif'], [conf_neg*100, conf_pos*100],
                           color=['#ef4444', '#10b981'], height=0.45)
            for b, v in zip(bars, [conf_neg*100, conf_pos*100]):
                ax.text(min(v+1, 93), b.get_y()+b.get_height()/2,
                        f'{v:.1f}%', va='center', color='white', fontweight='bold', fontsize=12)
            ax.set_xlim(0, 100)
            ax.tick_params(colors='white', labelsize=11)
            for sp in ax.spines.values(): sp.set_visible(False)
            plt.tight_layout()
            st.pyplot(fig, transparent=True)
            plt.close()

            with st.expander("Detail Preprocessing"):
                st.code(f"Original : {teks}\nCleaned  : {clean}", language="text")

# ── BATCH ──────────────────────────────────────────────
elif menu == "Batch Analysis":
    st.markdown("### Analisis Batch Teks")

    if not model_ok:
        st.error(f"Gagal load model: {model_err}")
        st.stop()

    st.markdown('<div class="card">', unsafe_allow_html=True)
    batch_input = st.text_area(
        "Teks (satu per baris, maks 50):",
        height=180,
        placeholder="Produk bagus dan berkualitas!\nPengiriman sangat lambat dan mengecewakan\nBarang sesuai deskripsi"
    )
    if st.button("Analisis Semua", use_container_width=True):
        lines = [t.strip() for t in batch_input.strip().split('\n') if t.strip()]
        if not lines:
            st.warning("Masukkan minimal 1 teks!")
        else:
            rows = []
            for t in lines[:50]:
                lbl, cp, cn, _ = predict_text(t, model, tfidf)
                rows.append({
                    "Teks": t,
                    "Hasil": "Positif" if lbl == 1 else "Negatif",
                    "Conf. Positif (%)": round(cp * 100, 1),
                    "Conf. Negatif (%)": round(cn * 100, 1)
                })
            df = pd.DataFrame(rows)
            pos = int((df["Hasil"] == "Positif").sum())
            neg = int((df["Hasil"] == "Negatif").sum())

            c1, c2, c3 = st.columns(3)
            c1.metric("Total", len(df))
            c2.metric("Positif", pos)
            c3.metric("Negatif", neg)
            st.dataframe(df, use_container_width=True, height=280)

            fig2, ax2 = plt.subplots(figsize=(4, 4))
            fig2.patch.set_facecolor('none'); ax2.set_facecolor('none')
            ax2.pie([pos, neg], labels=['Positif', 'Negatif'],
                    colors=['#10b981', '#ef4444'], autopct='%1.1f%%',
                    textprops={'color': 'white', 'fontsize': 12}, startangle=90)
            ax2.set_title('Distribusi Sentimen', color='white', fontsize=12)
            st.pyplot(fig2, transparent=True)
            plt.close()
    st.markdown('</div>', unsafe_allow_html=True)

# ── MODEL PERFORMANCE ──────────────────────────────────
elif menu == "Model Performance":
    st.markdown("### Model Performance")

    if not model_ok:
        st.error(f"Gagal load model: {model_err}")
        st.stop()

    acc = round(history.get("accuracy", 0) * 100, 2)
    c1, c2, c3 = st.columns(3)
    c1.metric("Accuracy", f"{acc}%")
    c2.metric("Train Size", f"{history.get('train_size', 0):,}")
    c3.metric("Test Size", f"{history.get('test_size', 0):,}")

    rep = history.get("report", {})
    if rep:
        st.markdown("#### Classification Report")
        def g(cls, m): return f"{rep.get(cls, {}).get(m, 0):.4f}"
        st.dataframe(pd.DataFrame({
            "Kelas":     ["Positif", "Negatif", "Macro Avg"],
            "Precision": [g("Positif","precision"), g("Negatif","precision"), g("macro avg","precision")],
            "Recall":    [g("Positif","recall"),    g("Negatif","recall"),    g("macro avg","recall")],
            "F1-Score":  [g("Positif","f1-score"),  g("Negatif","f1-score"),  g("macro avg","f1-score")],
        }), use_container_width=True, hide_index=True)

    base = os.path.dirname(os.path.abspath(__file__))
    img_path = os.path.join(base, "training_results.png")
    if os.path.exists(img_path):
        st.image(img_path, caption="Confusion Matrix & Metrics", use_container_width=True)

# ── TENTANG ────────────────────────────────────────────
elif menu == "Tentang":
    st.markdown("### Tentang Proyek")
    st.markdown("""
    <div class="card">
        <h3 style='color:#93c5fd;'>SentiAnalyze — Analisis Sentimen Bahasa Indonesia</h3>
        <p style='color:#94a3b8; line-height:1.8;'>
        Aplikasi analisis sentimen teks Bahasa Indonesia menggunakan model
        <b style='color:#93c5fd;'>Logistic Regression</b> dengan fitur
        <b style='color:#93c5fd;'>TF-IDF</b> (unigram + bigram).
        Dilatih pada 4141 ulasan e-commerce dan restoran berbahasa Indonesia.
        </p>
        <hr style='border-color:#1e293b;'>
        <table style='width:100%; color:#cbd5e1; border-collapse:collapse;'>
            <tr style='border-bottom:1px solid #1e293b;'><td style='padding:8px 0; color:#93c5fd;'><b>Author</b></td><td>Nadya Angelie Lislie</td></tr>
            <tr style='border-bottom:1px solid #1e293b;'><td style='padding:8px 0; color:#93c5fd;'><b>NIM</b></td><td>270231680</td></tr>
            <tr style='border-bottom:1px solid #1e293b;'><td style='padding:8px 0; color:#93c5fd;'><b>Dataset</b></td><td>4141 teks Bahasa Indonesia (Positif / Negatif)</td></tr>
            <tr style='border-bottom:1px solid #1e293b;'><td style='padding:8px 0; color:#93c5fd;'><b>Accuracy</b></td><td>99.88%</td></tr>
            <tr style='border-bottom:1px solid #1e293b;'><td style='padding:8px 0; color:#93c5fd;'><b>Model</b></td><td>Logistic Regression (C=1.0, solver=lbfgs)</td></tr>
            <tr style='border-bottom:1px solid #1e293b;'><td style='padding:8px 0; color:#93c5fd;'><b>Fitur</b></td><td>TF-IDF max_features=5000, ngram_range=(1,2)</td></tr>
            <tr><td style='padding:8px 0; color:#93c5fd;'><b>Stack</b></td><td>Streamlit + scikit-learn</td></tr>
        </table>
    </div>
    """, unsafe_allow_html=True)

st.markdown('<div class="author-tag">Nadya Angelie Lislie · 270231680</div>', unsafe_allow_html=True)
