from fastapi import FastAPI
from gitscribe.generator import generate_commit_message_from_file

app = FastAPI()


@app.get("/items")
async def get_items(nm: int, old_filename: str, new_filename: str):
    return generate_commit_message_from_file(nm, old_filename, new_filename)