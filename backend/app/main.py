import asyncio
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes.api import router
from .config.environment import env
from .db.migrations.migrate import run_async_upgrade

log = logging.getLogger("uvicorn")


@asynccontextmanager
async def lifespan(app_: FastAPI):
    log.info("Starting up...")
    log.info("run alembic upgrade head...")
    await asyncio.get_running_loop().create_task(run_async_upgrade())
    yield
    log.info("Shutting down...")


def get_app() -> FastAPI:
    application = FastAPI(lifespan=lifespan)
    application.include_router(router)

    if env.ENVIRONMENT == "local":
        application.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    else:
        application.add_middleware(
            CORSMiddleware,
            allow_origins=[f"{env.CLIENT_HOST}:{env.CLIENT_PORT}"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    return application


app = get_app()
