from fastapi import FastAPI, Depends
#from gitscribe.generator import generate_commit_message_from_file
import redis

from api.redis_db import pool

app = FastAPI()

def get_redis():
      return redis.Redis(connection_pool=pool)



@app.get("/uploads/{item_id}")
async def read_msgs(item_id: str, cache = Depends(get_redis)):
     messages = cache.get(item_id)
     return {"msgs": messages}

@app.post("/uploads/{item_id}")
async def update_item(item_id: str, num_msgs: int, old_filename: str, new_filename: str, cache = Depends(get_redis)):
  cache.set(item_id, old_filename)
  return {"uploaded": old_filename }

@app.post("/texts/{item_id}")
async def create_item(item_id:str, num_msgs: int, old_filename: str, new_filename: str, cache = Depends(get_redis)):
    cache.set(item_id, num_msgs, old_filename, new_filename)
    return {"item_id": item_id}


#     return {
#         "messages": generate_commit_message_from_file(nm, old_filename, new_filename)
#     }