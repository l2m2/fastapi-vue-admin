FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8
WORKDIR /app/

COPY requirement.txt /app/
RUN pip install -r requirement.txt

COPY ./app /app
ENV PYTHONPATH=/app