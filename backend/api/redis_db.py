# Source - https://stackoverflow.com/a/73585930
# Posted by Tegar
# Retrieved 2026-03-14, License - CC BY-SA 4.0

import redis

def create_redis():
  return redis.ConnectionPool(
    host='localhost', 
    port=6379, 
    db=0, 
    decode_responses=True
  )

pool = create_redis()
