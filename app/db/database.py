from asyncio import current_task

from sqlalchemy.ext.asyncio import (
    async_scoped_session,
    async_sessionmaker,
    create_async_engine,
)

from ..config.environment import env

engine = create_async_engine(env.DB_URL, echo=env.DEBUG)

Session = async_scoped_session(
    async_sessionmaker(
        expire_on_commit=False,
        autoflush=True,
        bind=engine,
    ),
    current_task,
)
