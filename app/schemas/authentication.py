from pydantic import AliasChoices, BaseModel, EmailStr, Field


class LoginInput(BaseModel):
    username_or_email: str | EmailStr = Field(
        validation_alias=AliasChoices("username", "email")
    )
    password: str = Field()

class AccessToken(BaseModel):
    access_token: str
    type: str

class AccessTokenData(BaseModel):
    user_id: int = Field()
    username: str = Field()
    full_name: str = Field()
    email: str = Field()
