FROM python:3.11

WORKDIR /usr/src/app
COPY Requirements.txt ./
RUN pip install --no-cache-dir -r Requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
