from typing import Sequence

from app.schemas.api import PaginationParams
from app.schemas.institution import FetchInstitutionsParams
from sqlalchemy import or_
from sqlalchemy.future import select

from ..database import Session
from ..models import Institution

from sqlalchemy.sql.functions import ReturnTypeFromArgs

class unaccent(ReturnTypeFromArgs):
    pass

async def fetch_institutions(
    fetchInstitutionsParams: FetchInstitutionsParams, paginationParams: PaginationParams
) -> Sequence[Institution]:
    filters = []
    if fetchInstitutionsParams.institution_id is not None:
        filters.append(
            Institution.institution_id == fetchInstitutionsParams.institution_id
        )
    if fetchInstitutionsParams.name_or_abbrev is not None:
        filters.append(
            or_(
                unaccent(Institution.abbrev).ilike(unaccent(f"%{fetchInstitutionsParams.name_or_abbrev}%")),
                unaccent(Institution.name).ilike(unaccent(f"%{fetchInstitutionsParams.name_or_abbrev}%")),
            )
        )
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
