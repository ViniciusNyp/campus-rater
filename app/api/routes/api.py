from fastapi import APIRouter

from app.api.routes import authentication, user

router = APIRouter()

router.include_router(user.router, tags=["user"], prefix="/user")
router.include_router(
    authentication.router, tags=["authentication"], prefix="/authentication"
)
