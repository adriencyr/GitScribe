from linecache import cache

from fastapi import FastAPI, Depends, Form, UploadFile, File, HTTPException
from gitscribe.generator import generate_commit_message_from_text
import redis, json

from fastapi.middleware.cors import CORSMiddleware

from api.redis_db import pool

async def get_redis():
      return redis.Redis(connection_pool=pool)

app = FastAPI()
origins = [
    #"http://localhost",
    #"http://localhost:5173",
    #"http://127.0.0.1:5173",
    "https://git-scribe-aybm.vercel.app",
    "https://git-scribe-delta.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/msgs/{user_id}")
async def read_msgs(user_id: str, cache = Depends(get_redis)):
     messages = cache.get(user_id)
     return {"msgs": messages}

@app.get("/test/")
async def test_endpoint():
    return {"message": "This is a test endpoint for GitScribe."}

@app.post("/uploads/")
async def update_item(
    user_id: str = Form(...),
    num_msgs: int = Form(...),
    old_file: UploadFile = File(...),
    new_file: UploadFile = File(...),
    cache = Depends(get_redis)
):
    try:
        old_file_content = await old_file.read()
        new_file_content = await new_file.read()

        generated_msgs = generate_commit_message_from_text(
            num_msgs,
            old_file_content.decode("utf-8"),
            new_file_content.decode("utf-8")
        )

        cache.set(user_id, json.dumps(generated_msgs))

        return {
            "user_id": user_id,
            "messages": generated_msgs,
            "old_file_type": old_file.content_type,
            "old_file_content": old_file_content.decode("utf-8"),
            "new_file_type": new_file.content_type,
            "new_file_content": new_file_content.decode("utf-8"),
        }

    except Exception as e:
        print("UPLOAD ERROR:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))

# @app.post("/texts/{item_id}")
# async def create_item(item_id:str, num_msgs: int, old_filename: str, new_filename: str, cache = Depends(get_redis)):
#     cache.set(item_id, num_msgs, old_filename, new_filename)
#     return {"item_id": item_id}


#     return {
#         "messages": generate_commit_message_from_file(nm, old_filename, new_filename)
#     }