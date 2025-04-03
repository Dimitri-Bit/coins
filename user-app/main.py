import fastapi
import uvicorn

from route.user_route import router as user_route

app = fastapi.FastAPI();

app.include_router(user_route);

if __name__ == "__main__":
    uvicorn.run(app, reload = True);
