# Campus Rater Backend

This is the backend service for the Campus Rater application. It is built using Python, FastAPI, and SQLAlchemy, and it provides RESTful APIs for the frontend to interact with.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

## Getting Started

### Prerequisites

- Python 3.11
- Poetry
- Docker

### Installation

1. Install dependencies:
    ```sh
    poetry install
    ```

2. Set up the environment variables:
    ```sh
    cp .env.example .env
    ```

3. Update the `.env` file with your configuration.

## Environment Variables

The following environment variables need to be set in the `.env` file:

- `DB_NAME`: The name of the database.
- `DB_USER`: The database user.
- `DB_PASSWORD`: The database password.
- `DB_HOST`: The database host.
- `DB_PORT`: The database port.
- `ENVIRONMENT`: The environment (e.g., `local`, `production`).
- `SERVER_PORT`: The port on which the server will run.

## Running the Application

### Using Docker

1. Run the application:
    ```sh
    poetry run uvicorn app.main:app --host 0.0.0.0 --port 80
    ```