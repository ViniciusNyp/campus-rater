from fastapi import APIRouter

from ...schemas.authentication import AccessToken, LoginInput
from ...services.authentication import login

router = APIRouter()

@router.post("/login", response_model=AccessToken)
async def register(input: LoginInput):
    return await login(input)
