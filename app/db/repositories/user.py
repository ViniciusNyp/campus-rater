from sqlalchemy import or_
from sqlalchemy.future import select

from ...schemas.authentication import AccessTokenData, LoginInput
from ...schemas.user import CreateUserInput
from ..database import Session
from ..models import User


async def create_user(input: CreateUserInput) -> User:
    async with Session() as session:
        user = User(**input.model_dump())
        session.add(user)
        await session.commit()
        return user


async def get_user_by_username_or_email_and_password(
    input: LoginInput,
) -> User | None:
    query = (
        select(User)
        .filter(
            or_(
                User.username == input.username_or_email,
                User.email == input.username_or_email,
            )
        )
        .limit(1)
    )
    async with Session() as session:
        result = await session.execute(query)

        return result.scalars().first()


async def get_user_by_id(
    user_id: int,
) -> User:
    async with Session() as session:
        result = await session.get_one(User, user_id)
        return result
