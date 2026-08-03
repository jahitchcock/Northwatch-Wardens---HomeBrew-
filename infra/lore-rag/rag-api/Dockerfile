FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends libgomp1 && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Trailing slash is required: the classic builder rejects a multi-source COPY
# whose destination is not a directory, and BuildKit is disabled for this host
# (it drops the connection over the SSH docker context).
COPY app.py selectors_lore.py ./
EXPOSE 8100
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8100"]
