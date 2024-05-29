from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm.exc import NoResultFound

from ..config.environment import env
from ..db.repositories.user import (
    get_user_by_id,
    get_user_by_username_or_email_and_password,
)
from ..schemas.authentication import AccessToken, AccessTokenData, LoginInput
from .security import verify_password

async def login(input: LoginInput) -> AccessToken:
    db_user = await get_user_by_username_or_email_and_password(input)

    if not (db_user and verify_password(input.password, db_user.password)):
        raise HTTPException(
            detail="Username or email or password is wrong", status_code=401
        )

    return get_access_token(
        AccessTokenData.model_validate(db_user, from_attributes=True)
    )


def get_access_token(data: AccessTokenData) -> AccessToken:
    token = generate_access_token(data)
    return AccessToken(access_token=token, type="Bearer")


def generate_access_token(user: AccessTokenData) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=env.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    data = {**user.model_dump(), **{"exp": expire}}

    return jwt.encode(data, env.SECRET_KEY, algorithm=env.ALGORITHM)


async def get_logged_user_by_token(token: str):
    try:
        user_id = jwt.decode(token, env.SECRET_KEY, algorithms=[env.ALGORITHM]).get(
            "user_id"
        )

        return await get_user_by_id(user_id)
    except (jwt.InvalidTokenError, NoResultFound):
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
