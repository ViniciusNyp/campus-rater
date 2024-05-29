from pydantic import BaseModel, Field, EmailStr


class LoginInput(BaseModel):
    username_or_email: str | EmailStr = Field()
    password: str = Field()

class AccessToken(BaseModel):
    access_token: str
    type: str

class AccessTokenData(BaseModel):
    user_id: int = Field()
    username: str = Field()
    full_name: str = Field()
    email: str = Field()
