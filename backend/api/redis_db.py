# Source - https://stackoverflow.com/a/73585930
# Posted by Tegar
# Retrieved 2026-03-14, License - CC BY-SA 4.0
import os
from dotenv import load_dotenv
import redis

load_dotenv()

def create_redis():
  return redis.ConnectionPool(
    #max_connections=20,
    host= os.getenv("REDIS_HOST"),
    port=19281, 
    decode_responses=True,
    username=os.getenv("REDIS_USER"),
    password=os.getenv("REDIS_PASSWORD"),
  )

pool = create_redis()