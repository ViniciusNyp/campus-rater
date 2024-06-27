from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.db.repositories.review import fetch_reviews
from app.schemas.api import PaginationParams

from ...schemas.review import CreateReviewInput, FetchReviewsParams, ReviewResponse
from ...services.review import create_review
from ..dependencies.authentication import oauth2_scheme

router = APIRouter()

@router.post("/", response_model=ReviewResponse, status_code=201)
async def create(
    token: Annotated[str, Depends(oauth2_scheme)], input: CreateReviewInput
):
    return await create_review(input, token)


@router.get("/", response_model=list[ReviewResponse])
async def fetch(
    token: Annotated[str, Depends(oauth2_scheme)],
    fetchReviewsParams: Annotated[FetchReviewsParams, Depends()],
    paginationParams: Annotated[PaginationParams, Depends()],
):
    return await fetch_reviews(fetchReviewsParams, paginationParams)
