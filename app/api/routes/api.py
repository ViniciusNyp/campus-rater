from fastapi import APIRouter

from app.api.routes import authentication, institution, review, user

router = APIRouter()

router.include_router(
    authentication.router, tags=["authentication"], prefix="/authentication"
)
router.include_router(user.router, tags=["user"], prefix="/user")
router.include_router(review.router, tags=["review"], prefix="/review")
router.include_router(institution.router, tags=["institution"], prefix="/institution")
