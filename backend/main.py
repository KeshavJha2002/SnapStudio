from fastapi import FastAPI, Request, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from starlette.responses import Response
from utils import generate_session_id ,setup_image_folder, check_valid_user
from apis import change_image_format
from logger import log_event

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from the specified origins
    allow_credentials=True,  # Allows cookies to be sent with requests
    allow_methods=["*"],     # Allows all methods (GET, POST, PUT, etc.)
    allow_headers=["*"],     # Allows all headers (like Authorization)
)

@app.post("/api/change_format/{target}/{session_id}")
async def change_format_api(target: str, session_id: str, files:Annotated[list[UploadFile], File(description="Multiple files as UploadFile")]):
    try:
        if not check_valid_user(session_id):
            raise HTTPException(status_code=403, detail="Invalid session ID")
        print(files)
        return await change_image_format(session_id, target, files)
    except HTTPException as e:
        return {"status": "error", "message": e.detail}
    except Exception as e:
        return {"status": "error", "message": f"An unexpected error occurred: {str(e)}"}


@app.get("/api/start-session")
async def root(request: Request, response: Response):
    session_id = generate_session_id()
    log_event(session_id, f"Client {session_id} connected")
    setup_image_folder(session_id)
    response.set_cookie(key="session_id", value=session_id)
    return {"message": "The server is up and running", "session_id": session_id}
