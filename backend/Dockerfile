FROM python:3.11 AS builder

WORKDIR /tmp
RUN pip install poetry
COPY ./pyproject.toml ./poetry.lock* /tmp/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.11-slim-bullseye

WORKDIR /code
COPY --from=builder /tmp/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./ /code/

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]