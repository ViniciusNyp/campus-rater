from ..database import Session
from ..models import Review


async def insert_review(review: Review) -> Review:
    async with Session() as session:
        session.add(review)
        await session.commit()
        return review
