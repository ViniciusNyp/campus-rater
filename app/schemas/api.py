from pydantic import BaseModel, Field

class PaginationParams(BaseModel):
    skip: int = Field(default=0)
    limit: int = Field(default=20)
