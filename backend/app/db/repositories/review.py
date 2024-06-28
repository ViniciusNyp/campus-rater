from typing import Sequence

from sqlalchemy import UnaryExpression
from sqlalchemy.future import select

from app.schemas.api import PaginationParams
from app.schemas.review import FetchReviewsParams

from ..database import Session
from ..models import Review


async def insert_review(review: Review) -> Review:
    async with Session() as session:
        session.add(review)
        await session.commit()
        return review


async def fetch_reviews(
    fetchReviewsParams: FetchReviewsParams, paginationParams: PaginationParams
) -> Sequence[Review]:
    filters = []
    if fetchReviewsParams.review_id is not None:
        filters.append(Review.review_id == fetchReviewsParams.review_id)
    if fetchReviewsParams.title is not None:
        filters.append(Review.title.ilike(f"%{fetchReviewsParams.title}%"))
    if fetchReviewsParams.user_id is not None:
        filters.append(Review.user_id == fetchReviewsParams.user_id)
    if fetchReviewsParams.institution_id is not None:
        filters.append(Review.institution_id == fetchReviewsParams.institution_id)

    ordering: list[UnaryExpression] = []
    if fetchReviewsParams.rating_order is not None:
        ordering.append(
            Review.rating.desc()
            if fetchReviewsParams.rating_order == "desc"
            else Review.rating.desc()
        )
    ordering.append(
        Review.updated_at.desc()
        if fetchReviewsParams.time_order == "desc"
        else Review.updated_at.asc()
    )

    query = (
        select(Review)
        .filter(Review.private == False)
        .filter(*filters)
        .offset(paginationParams.skip)
        .limit(paginationParams.limit)
        .order_by(*ordering)
    )

    async with Session() as session:
        result = await session.execute(query)
        return result.scalars().all()
