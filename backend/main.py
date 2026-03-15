from fastapi import FastAPI, Depends, Form, UploadFile, File
from fastapi import FastAPI, Depends, Form, UploadFile, File
#from gitscribe.generator import generate_commit_message_from_file
import redis

from fastapi.middleware.cors import CORSMiddleware

from fastapi.middleware.cors import CORSMiddleware

from api.redis_db import pool

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_redis():
      return redis.Redis(connection_pool=pool)

async def lifespan(app: FastAPI):
    """Initializes and closes the Redis connection during app lifespan."""
    global redis_client
    redis_client = get_redis()
    yield
    await redis_client.close()

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.get("/msgs/")
async def read_msgs(user_id: str, cache = Depends(get_redis)):
     messages = cache.get(user_id)


@app.get("/uploads/")
async def read_msgs(item_id: str, cache = Depends(get_redis)):
     messages = cache.get(item_id)
     return {"msgs": messages}

@app.post("/uploads/")
async def update_item(
    user_id: str = Form(...), 
    num_msgs: int = Form(...), 
    old_file: UploadFile = File(...), 
    new_file: UploadFile = File(...), 
    cache = Depends(get_redis)):
  old_file_content = await old_file.read()
  new_file_content = await new_file.read()
  generated_msgs = "changed file to be xyz"
  cache.set(user_id, generated_msgs)
  return {"user_files_uploaded":  user_id}
@app.post("/uploads/")
async def update_item(
    user_id: str = Form(...), 
    num_msgs: int = Form(...), 
    old_file: UploadFile = File(...), 
    new_file: UploadFile = File(...), 
    cache = Depends(get_redis)):
  old_file_content = await old_file.read()
  new_file_content = await new_file.read()
  generated_msgs = "changed file to be xyz"
  cache.set(user_id, generated_msgs)
  return {"user_id":  user_id,
          "old_file_type": old_file.content_type,
          "old_file_content": old_file_content,
          "new_file_type": new_file.content_type,
          "new_file_content": new_file_content}

# @app.post("/texts/{item_id}")
# async def create_item(item_id:str, num_msgs: int, old_filename: str, new_filename: str, cache = Depends(get_redis)):
#     cache.set(item_id, num_msgs, old_filename, new_filename)
#     return {"item_id": item_id}


#     return {
#         "messages": generate_commit_message_from_file(nm, old_filename, new_filename)
#     }