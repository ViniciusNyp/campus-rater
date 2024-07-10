from typing import Literal, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class CreateReviewInput(BaseModel):
    title: str = Field(min_length=1)
    content: str = Field(min_length=1)
    rating: float = Field(gt=0.0, le=10.0)
    institution_id: int = Field()
    private: bool | None = Field(default=False)


class ReviewResponse(BaseModel):
    review_id: int = Field()
    title: str = Field()
    content: str = Field()
    rating: float = Field()
    private: bool | None = Field()
    user_id: int = Field()
    institution_id: int = Field()
    created_at: datetime = Field()
    updated_at: datetime = Field()


class FetchReviewsParams(BaseModel):
    review_id: Optional[int] = Field(default=None)
    title: Optional[str] = Field(default=None)
    user_id: Optional[int] = Field(default=None)
    institution_id: Optional[int] = Field(default=None)
    rating_order: Literal["desc", "asc", None] = Field(
        default=None,
    )
    time_order: Literal["desc", "asc", None] = Field(
        default="desc",
    )
