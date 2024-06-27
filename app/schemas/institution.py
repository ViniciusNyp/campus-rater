from typing import Literal, Optional

from pydantic import BaseModel, Field


class InstitutionResponse(BaseModel):
    institution_id: int = Field()
    name: str = Field()
    abbrev: str | None = Field()
    code: int = Field()
    average_rating: float = Field()


class FetchInstitutionsParams(BaseModel):
    institution_id: Optional[int] = Field(default=None)
    name: Optional[str] = Field(default=None)
    abbrev: Optional[str] = Field(default=None)
    code: Optional[int] = Field(default=None)
    rating_order: Literal["desc", "asc", None] = Field(
        default=None,
    )
