"""Populate institution table with seed values

Revision ID: b0cdf7ca815e
Revises: eca3c98a48c5
Create Date: 2024-05-26 18:20:50.471586

"""

import json
import os
from typing import Sequence, Union

from alembic import op
from sqlalchemy.sql import table

from app.db.models import Institution

# revision identifiers, used by Alembic.
revision: str = "b0cdf7ca815e"
down_revision: Union[str, None] = "eca3c98a48c5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

file_path = os.path.join(os.path.dirname(__file__), "assets", "institution_seed.json")


def upgrade() -> None:
    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)

        institutions_to_add = []
        for item in data:
            institutions_to_add.append(Institution(**item).__dict__)
        Institution
        op.bulk_insert(Institution.__table__, institutions_to_add)


def downgrade() -> None:
    op.execute(f"DELETE FROM {Institution.__tablename__}")
