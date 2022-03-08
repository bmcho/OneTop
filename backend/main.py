from fastapi import FastAPI

from apps import core, models
from apps.routers import detail, home, review, search
from database import engine

app = FastAPI(root_path="/api")

# models.Base.metadata.create_all(bind=engine)

core.utill.create_folder()

app.include_router(detail.router)
app.include_router(home.router)
app.include_router(search.router)
app.include_router(review.router)
