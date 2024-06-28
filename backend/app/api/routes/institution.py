from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.db.repositories.institution import fetch_institutions
from app.schemas.api import PaginationParams

from ...schemas.institution import FetchInstitutionsParams, InstitutionResponse
from ..dependencies.authentication import oauth2_scheme

router = APIRouter()


@router.get("/", response_model=list[InstitutionResponse])
async def fetch(
    token: Annotated[str, Depends(oauth2_scheme)],
    fetchInstitutionsParams: Annotated[FetchInstitutionsParams, Depends()],
    paginationParams: Annotated[PaginationParams, Depends()],
):
    return await fetch_institutions(fetchInstitutionsParams, paginationParams)
