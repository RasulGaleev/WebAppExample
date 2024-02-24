from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import router as api_router

app = FastAPI(
    title="Muslim Web Bot",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url=f"/api/openapi.json",
    redirect_slashes=False
)

app.include_router(api_router)

origins = ["http://92.38.48.73", "http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    expose_headers=["Content-Type"],
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin"],
)

# template_dir = os.path.join("app", "templates")
# templates = Jinja2Templates(directory=template_dir)

# static_dir = os.path.join("app", "static")
# app.mount("/audio", StaticFiles(directory=os.path.join(static_dir, "audio")), name="audio")
# app.mount("/js", StaticFiles(directory=os.path.join(static_dir, "js")), name="js")
# app.mount("/css", StaticFiles(directory=os.path.join(static_dir, "css")), name="css")
# app.mount("/media", StaticFiles(directory=os.path.join(static_dir, "media")), name="media")


# @app.middleware("http")
# async def add_cors_headers(request, call_next):
#     response = await call_next(request)
#     response.headers["Access-Control-Allow-Origin"] = "http://92.38.48.73, http://localhost:8000"
#     response.headers["Access-Control-Allow-Credentials"] = "true"
#     response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
#     response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
#     return response

# @app.get("/")
# async def main_page(request: Request):
#     return templates.TemplateResponse("index.html", {"request": request})
#
#
# @app.get("/dua")
# async def dua_page(request: Request, item_id: int = Query(..., alias="itemId")):
#     return templates.TemplateResponse("dua.html", {"request": request, "item_id": item_id})


# if __name__ == '__main__':
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
