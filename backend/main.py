from fastapi import FastAPI, Request
from starlette.responses import Response
from utils import generate_session_id ,setup_image_folder
from logger import log_event

app = FastAPI()

@app.get("/")
async def root(request: Request, response: Response):
    session_id = generate_session_id()
    log_event(session_id, f"Client {session_id} connected")
    setup_image_folder(session_id)
    response.set_cookie(key="session_id", value=session_id)
    return {"message": "The server is up and running", "session_id": session_id}
