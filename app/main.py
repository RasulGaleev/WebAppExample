from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import router as api_router

app = FastAPI(
    title="Muslim Web Bot",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url=f"/api/openapi.json",
)

# template_dir = os.path.join("app", "templates")
# templates = Jinja2Templates(directory=template_dir)

# static_dir = os.path.join("app", "static")
# app.mount("/audio", StaticFiles(directory=os.path.join(static_dir, "audio")), name="audio")
# app.mount("/js", StaticFiles(directory=os.path.join(static_dir, "js")), name="js")
# app.mount("/css", StaticFiles(directory=os.path.join(static_dir, "css")), name="css")
# app.mount("/media", StaticFiles(directory=os.path.join(static_dir, "media")), name="media")


app.include_router(api_router)

# @app.get("/")
# async def main_page(request: Request):
#     return templates.TemplateResponse("index.html", {"request": request})
#
#
# @app.get("/dua")
# async def dua_page(request: Request, item_id: int = Query(..., alias="itemId")):
#     return templates.TemplateResponse("dua.html", {"request": request, "item_id": item_id})

origins = ["http://localhost:8000", "http://92.38.48.73"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["Content-Type", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin"],
)

# if __name__ == '__main__':
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
