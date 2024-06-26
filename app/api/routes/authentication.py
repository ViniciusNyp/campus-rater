from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from ...db.models import User
from ...schemas.authentication import AccessToken, LoginInput
from ...schemas.user import UserResponse
from ...services.authentication import get_logged_user_by_token, login
from ..dependencies.authentication import oauth2_scheme

router = APIRouter()

@router.post("/token", response_model=AccessToken)
async def login_for_token(input: Annotated[OAuth2PasswordRequestForm, Depends()]):
    return await login(LoginInput.model_validate(input, from_attributes=True))


@router.get("/me", response_model=UserResponse)
async def get_logged_user(
    token: Annotated[str, Depends(oauth2_scheme)],
) -> User:
    return await get_logged_user_by_token(token)
