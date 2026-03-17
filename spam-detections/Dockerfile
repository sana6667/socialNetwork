FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    NLTK_DATA=/usr/local/nltk_data

RUN adduser --disabled-password --gecos "" appuser
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --only-binary=:all: -r requirements.txt

# --- Скачиваем NLTK данные ---
RUN mkdir -p /usr/local/nltk_data
RUN python -m nltk.downloader stopwords
RUN python -m nltk.downloader punkt
RUN python -m nltk.downloader punkt_tab


RUN chown -R appuser:appuser /usr/local/nltk_data

COPY app_anti_spam.py .
COPY spam_detection_model.joblib .

EXPOSE 8000

USER appuser

CMD ["uvicorn", "app_anti_spam:app", "--host", "0.0.0.0", "--port", "8000"]
