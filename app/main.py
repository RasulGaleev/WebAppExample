import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api import router as api_router

app = FastAPI(
    title="Muslim Web Bot",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url=f"/api/openapi.json",
    redirect_slashes=False
)

# template_dir = os.path.join("app", "templates")
# templates = Jinja2Templates(directory=template_dir)

static_dir = os.path.join("app", "static")
app.mount("/audio", StaticFiles(directory=os.path.join(static_dir, "audio")), name="audio")
app.mount("/js", StaticFiles(directory=os.path.join(static_dir, "js")), name="js")
app.mount("/css", StaticFiles(directory=os.path.join(static_dir, "css")), name="css")
app.mount("/media", StaticFiles(directory=os.path.join(static_dir, "media")), name="media")
app.mount("/ads", StaticFiles(directory=os.path.join(static_dir, "ads")), name="ads")

app.include_router(api_router)

# @app.get("/")
# async def main_page(request: Request):
#     return templates.TemplateResponse("index.html", {"request": request})
#
#
# @app.get("/dua")
# async def dua_page(request: Request, item_id: int = Query(..., alias="itemId")):
#     return templates.TemplateResponse("dua.html", {"request": request, "item_id": item_id})
#

origins = [
    "http://127.0.0.1",
    "http://127.0.0.1:8000",
    "http://0.0.0.0",
    "http://0.0.0.0:80",
    "http://92.38.48.73",
    "http://92.38.48.73:80",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    expose_headers=["Content-Type"],
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin"],
)

# if __name__ == '__main__':
#     uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
