from fastapi import FastAPI, HTTPException
import joblib
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

app = FastAPI()

model = joblib.load("spam_detection_model.joblib")
stop_words = set(stopwords.words("russian"))


def preprocess_message(message: str) -> str:
    message = message.lower()
    message = re.sub(r"[^а-яіё\u2C80-\u2CFF\u0370-\u03FF\u1F00-\u1FFF\u0530-\u058F\s$!€]", "", message).replace("\n", "")
    tokens = word_tokenize(message)
    tokens = [word for word in tokens if word not in stop_words]
    return " ".join(tokens)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(payload: dict):
    msg = payload.get("message")
    if not isinstance(msg, str):
        raise HTTPException(
            status_code = 400,
            detail = "Поле 'message' должно быть строкой"
        )
    cleaned = preprocess_message(msg)
    y = model.predict([cleaned])[0]
    conf = float(model.predict_proba([cleaned])[0][1])
    return {
        "prediction": int(y),
        "confidence": conf
    }
