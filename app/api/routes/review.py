from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ...schemas.review import CreateReviewInput, ReviewResponse
from ...services.review import create_review
from ..dependencies.authentication import oauth2_scheme

router = APIRouter()

@router.post("/", response_model=ReviewResponse, status_code=201)
async def create(
    token: Annotated[str, Depends(oauth2_scheme)], input: CreateReviewInput
):
    return await create_review(input, token)
