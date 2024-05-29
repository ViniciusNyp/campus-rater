from pydantic import BaseModel, EmailStr, Field


class CreateUserInput(BaseModel):
    username: str = Field(min_length=4)
    full_name: str = Field(min_length=4)
    email: EmailStr = Field()
    password: str = Field(min_length=8)


class UserResponse(BaseModel):
    user_id: int = Field()
    username: str = Field()
    full_name: str = Field()
    email: str = Field()

