from fastapi import APIRouter

from ...schemas.user import CreateUserInput, UserResponse
from ...services.user import register_user

router = APIRouter()


@router.post("/", response_model=UserResponse, status_code=201)
async def register(input: CreateUserInput):
    return await register_user(input)
