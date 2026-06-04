"""
Sentiment Analysis - Logistic Regression
Analisis Sentimen Bahasa Indonesia
Author: Nadya Angelie Lislie (270231680)
"""

import streamlit as st
import joblib, re, os, json
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

st.set_page_config(
    page_title="Sentiment Analysis — Nadya Angelie Lislie",
    page_icon="💬",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown("""
<style>
.stApp { background: #0d1117; color: #e6edf3; }
[data-testid="stSidebar"] { background: #161b22 !important; border-right: 1px solid #30363d; }
[data-testid="stSidebar"] * { color: #e6edf3 !important; }
h1, h2, h3, h4 { color: #e6edf3 !important; }
.stTextArea textarea {
    background: #161b22 !important;
    border: 1px solid #30363d !important;
    border-radius: 8px !important;
    color: #e6edf3 !important;
    font-size: 15px !important;
}
.stButton > button {
    background: #238636 !important;
    color: white !important;
    border: 1px solid #2ea043 !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
}
.stButton > button:hover { background: #2ea043 !important; }
.result-pos {
    background: #0d2818; border: 1px solid #2ea043;
    border-radius: 10px; padding: 24px; text-align: center; margin: 16px 0;
}
.result-neg {
    background: #2d1017; border: 1px solid #f85149;
    border-radius: 10px; padding: 24px; text-align: center; margin: 16px 0;
}
.info-box {
    background: #161b22; border: 1px solid #30363d;
    border-radius: 8px; padding: 16px; margin: 8px 0;
}
footer, #MainMenu, [data-testid="stToolbar"] { visibility: hidden; }
</style>
""", unsafe_allow_html=True)

# ── Load model ─────────────────────────────────────────
@st.cache_resource
def load_model():
    model = joblib.load("model_cache/lr_model.pkl")
    tfidf = joblib.load("model_cache/tfidf_vectorizer.pkl")
    with open("model_cache/training_history.json") as f:
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
    vec = tfidf.transform([clean])
    label = int(model.predict(vec)[0])
    proba = model.predict_proba(vec)[0]
    return label, float(proba[1]), float(proba[0]), clean

# Load model
try:
    model, tfidf, history = load_model()
    model_ok = True
except Exception as e:
    st.error(f"Gagal load model: {e}")
    model_ok = False

# ── Sidebar ────────────────────────────────────────────
with st.sidebar:
    st.markdown("### Sentiment Analysis")
    st.markdown("Analisis Sentimen Teks Bahasa Indonesia")
    st.markdown("---")
    menu = st.radio("Halaman", ["Prediksi", "Batch Analysis", "Model Info"], label_visibility="collapsed")
    st.markdown("---")
    st.markdown("**Nadya Angelie Lislie**")
    st.markdown("270231680")
    if model_ok:
        acc = round(history.get("accuracy", 0) * 100, 2)
        st.markdown(f"Accuracy: **{acc}%**")

# ── PREDIKSI ───────────────────────────────────────────
if menu == "Prediksi":
    st.markdown("## Prediksi Sentimen")

    # Simpan contoh di session state
    if "contoh" not in st.session_state:
        st.session_state.contoh = ""

    col1, col2 = st.columns(2)
    with col1:
        if st.button("Contoh Positif"):
            st.session_state.contoh = "Produk sangat bagus dan berkualitas, pelayanan ramah, pengiriman cepat sekali!"
    with col2:
        if st.button("Contoh Negatif"):
            st.session_state.contoh = "Barang tidak sesuai gambar, kualitas buruk dan pengiriman sangat lama, mengecewakan!"

    user_text = st.text_area(
        "Masukkan teks ulasan:",
        value=st.session_state.contoh,
        height=120,
        placeholder="Ketik teks ulasan bahasa Indonesia di sini...",
        key="input_area"
    )

    # Update session state kalau user ngetik manual
    if user_text != st.session_state.contoh:
        st.session_state.contoh = user_text

    if st.button("Analisis Sentimen", type="primary"):
        teks = st.session_state.contoh.strip()
        if not teks:
            st.warning("Masukkan teks terlebih dahulu.")
        elif not model_ok:
            st.error("Model tidak tersedia.")
        else:
            label, conf_pos, conf_neg, clean = predict_text(teks, model, tfidf)

            if label == 1:
                st.markdown("""
                <div class='result-pos'>
                    <h2 style='color:#2ea043; margin:0;'>POSITIF</h2>
                    <p style='color:#7ee787; margin:6px 0 0;'>Sentimen ulasan ini positif</p>
                </div>""", unsafe_allow_html=True)
            else:
                st.markdown("""
                <div class='result-neg'>
                    <h2 style='color:#f85149; margin:0;'>NEGATIF</h2>
                    <p style='color:#ffa198; margin:6px 0 0;'>Sentimen ulasan ini negatif</p>
                </div>""", unsafe_allow_html=True)

            st.markdown(f"**Confidence Positif:** {conf_pos*100:.1f}%")
            st.progress(conf_pos)
            st.markdown(f"**Confidence Negatif:** {conf_neg*100:.1f}%")
            st.progress(conf_neg)

            with st.expander("Detail preprocessing"):
                st.write(f"**Original:** {teks}")
                st.write(f"**Cleaned:** {clean}")

# ── BATCH ──────────────────────────────────────────────
elif menu == "Batch Analysis":
    st.markdown("## Batch Analysis")
    st.markdown("Masukkan beberapa teks, satu per baris (maksimal 50).")

    batch_text = st.text_area(
        "Teks:",
        height=200,
        placeholder="Produk bagus dan berkualitas!\nPengiriman sangat lambat\nBarang sesuai deskripsi",
        key="batch_area"
    )

    if st.button("Analisis Semua", type="primary"):
        if not batch_text.strip():
            st.warning("Masukkan minimal 1 teks.")
        elif not model_ok:
            st.error("Model tidak tersedia.")
        else:
            lines = [l.strip() for l in batch_text.strip().split('\n') if l.strip()][:50]
            rows = []
            for t in lines:
                lbl, cp, cn, _ = predict_text(t, model, tfidf)
                rows.append({
                    "Teks": t,
                    "Hasil": "Positif" if lbl == 1 else "Negatif",
                    "Conf. Positif (%)": round(cp * 100, 1),
                    "Conf. Negatif (%)": round(cn * 100, 1)
                })

            df = pd.DataFrame(rows)
            pos = (df["Hasil"] == "Positif").sum()
            neg = (df["Hasil"] == "Negatif").sum()

            c1, c2, c3 = st.columns(3)
            c1.metric("Total", len(df))
            c2.metric("Positif", int(pos))
            c3.metric("Negatif", int(neg))

            st.dataframe(df, use_container_width=True)

            fig, ax = plt.subplots(figsize=(4, 3))
            fig.patch.set_facecolor('#0d1117')
            ax.set_facecolor('#0d1117')
            ax.bar(["Positif", "Negatif"], [int(pos), int(neg)],
                   color=["#2ea043", "#f85149"], width=0.4)
            ax.set_title("Distribusi Sentimen", color="#e6edf3")
            ax.tick_params(colors="#e6edf3")
            for sp in ax.spines.values():
                sp.set_edgecolor('#30363d')
            plt.tight_layout()
            st.pyplot(fig, transparent=True)
            plt.close()

# ── MODEL INFO ─────────────────────────────────────────
elif menu == "Model Info":
    st.markdown("## Informasi Model")

    if not model_ok:
        st.error("Model tidak tersedia.")
    else:
        rep = history.get("report", {})
        acc = round(history.get("accuracy", 0) * 100, 2)
        train_size = history.get("train_size", "-")
        test_size = history.get("test_size", "-")

        st.markdown(f"""
| Info | Detail |
|---|---|
| **Author** | Nadya Angelie Lislie |
| **NIM** | 270231680 |
| **Model** | Logistic Regression |
| **Fitur** | TF-IDF (5000 fitur, n-gram 1-2) |
| **Accuracy** | {acc}% |
| **Data Train** | {train_size:,} |
| **Data Test** | {test_size:,} |
| **Total Dataset** | 4.141 ulasan Bahasa Indonesia |
        """)

        if rep:
            st.markdown("---")
            st.markdown("**Classification Report:**")

            def safe(cls, metric):
                return f"{rep.get(cls, {}).get(metric, 0):.4f}"

            report_df = pd.DataFrame({
                "Kelas":     ["Positif", "Negatif", "Macro Avg"],
                "Precision": [safe("Positif","precision"), safe("Negatif","precision"), safe("macro avg","precision")],
                "Recall":    [safe("Positif","recall"),    safe("Negatif","recall"),    safe("macro avg","recall")],
                "F1-Score":  [safe("Positif","f1-score"),  safe("Negatif","f1-score"),  safe("macro avg","f1-score")],
            })
            st.dataframe(report_df, use_container_width=True, hide_index=True)

        st.markdown("---")
        if os.path.exists("static/training_results.png"):
            st.image("static/training_results.png",
                     caption="Confusion Matrix & Metrics",
                     use_container_width=True)
        else:
            st.info("File training_results.png tidak ditemukan di folder static/.")
