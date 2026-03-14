from fastapi import FastAPI
#from gitscribe.generator import generate_file_commit_message
from pydantic import BaseModel

class Upload(BaseModel):
    id: str
    num_msgs: int
    old_filename: str
    new_filename: str
    
app = FastAPI()


@app.post("/upload_items/{item_id}")
async def create_upload_item(upload_item: Upload):
    return(upload_item)
    #return generate_file_commit_message(nm, old_filename, new_filename)

@app.get("/upload_items_get/")
async def upload_items(num_msgs: int, old_filename: str, new_filename: str):
    return ("{" + num_msgs + " " + old_filename + new_filename + "}")