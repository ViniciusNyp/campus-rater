import logging

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError

from ..db.models import Review
from ..db.repositories.review import insert_review
from ..schemas.review import CreateReviewInput
from .authentication import get_logged_user_by_token


async def create_review(input: CreateReviewInput, token: str):
    try:
        user = await get_logged_user_by_token(token)

        review = Review(**{**input.model_dump(), **{"user_id": user.user_id}})

        return await insert_review(review)
    except IntegrityError as exc:
        logging.exception(repr(exc))
        raise HTTPException(detail=repr(exc.orig), status_code=400)
    except Exception as exc:
        logging.exception(repr(exc))
        raise exc
