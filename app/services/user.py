import logging

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError

from ..db.repositories.user import create_user
from ..schemas.user import CreateUserInput
from .security import get_password_hash


async def register_user(user: CreateUserInput):
    try:
        hashed_password = get_password_hash(user.password)
        return await create_user(user.model_copy(update={"password": hashed_password}))
    except IntegrityError as exc:
        logging.exception(repr(exc))
        raise HTTPException(detail=repr(exc.orig), status_code=400)
    except Exception as exc:
        logging.exception(repr(exc))
        raise exc
