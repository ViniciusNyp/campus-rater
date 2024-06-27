from datetime import datetime
from functools import reduce
from statistics import mean

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
    func,
    select,
)
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )


class User(Base):
    __tablename__ = "user"
    __table_args__ = tuple(UniqueConstraint("email, password"))

    user_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True)
    full_name: Mapped[str] = mapped_column(String(500))
    email: Mapped[str] = mapped_column(String(250), unique=True)
    password: Mapped[str] = mapped_column(String(250))
    institution_id: Mapped[int] = mapped_column(
        ForeignKey("institution.institution_id")
    )


class Review(Base):
    __tablename__ = "review"

    review_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(50))
    content: Mapped[str] = mapped_column(String(250))
    rating: Mapped[float] = mapped_column(Integer())
    user_id: Mapped[int] = mapped_column(ForeignKey("user.user_id"))
    institution_id: Mapped[int] = mapped_column(
        ForeignKey("institution.institution_id")
    )
    private: Mapped[bool] = mapped_column(Boolean(), default=False)
    institution: Mapped["Institution"] = relationship(back_populates="reviews")


class Institution(Base):
    __tablename__ = "institution"

    institution_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(500))
    abbrev: Mapped[str | None] = mapped_column(String(50), nullable=True)
    code: Mapped[int] = mapped_column(Integer(), unique=True)
    reviews: Mapped[list["Review"]] = relationship(
        back_populates="institution", lazy="selectin"
    )

    @hybrid_property
    def average_rating(self):
        return mean(map(lambda item: item.rating, self.reviews))
