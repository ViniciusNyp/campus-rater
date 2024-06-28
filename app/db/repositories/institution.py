from typing import Sequence

from sqlalchemy import UnaryExpression
from sqlalchemy.future import select

from app.schemas.api import PaginationParams
from app.schemas.institution import FetchInstitutionsParams

from ..database import Session
from ..models import Institution


async def fetch_institutions(
    fetchInstitutionsParams: FetchInstitutionsParams, paginationParams: PaginationParams
) -> Sequence[Institution]:
    filters = []
    if fetchInstitutionsParams.institution_id is not None:
        filters.append(
            Institution.institution_id == fetchInstitutionsParams.institution_id
        )
    if fetchInstitutionsParams.name is not None:
        filters.append(Institution.name.ilike(f"%{fetchInstitutionsParams.name}%"))
    if fetchInstitutionsParams.abbrev is not None:
        filters.append(Institution.abbrev.ilike(f"%{fetchInstitutionsParams.abbrev}%"))
    if fetchInstitutionsParams.code is not None:
        filters.append(Institution.code == fetchInstitutionsParams.code)

    query = (
        select(Institution)
        .filter(*filters)
        .offset(paginationParams.skip)
        .limit(paginationParams.limit)
    )

    if fetchInstitutionsParams.rating_order is not None:
        query = query.order_by(
            Institution.average_rating.desc().nulls_last()
            if fetchInstitutionsParams.rating_order == "desc"
            else Institution.average_rating.asc().nulls_last()
        )

    async with Session() as session:
        result = await session.execute(query)
        return result.scalars().all()
