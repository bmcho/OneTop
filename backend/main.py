from fastapi import FastAPI

from apps import models
from apps.routers import detail, home, search
from database import engine

app = FastAPI(root_path="/api")

models.Base.metadata.create_all(bind=engine)

app.include_router(detail.router)
app.include_router(home.router)
app.include_router(search.router)
