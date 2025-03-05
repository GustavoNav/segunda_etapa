FROM python:3.12.3-slim

RUN apt-get update && apt-get install -y \
    curl \
    libpq-dev \
    gcc \
    make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

CMD ["sh", "-c", "sleep 15 && python main.py"]  
