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
