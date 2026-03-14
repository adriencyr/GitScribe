from fastapi import FastAPI
from gitscribe.generator import generate_file_commit_message

app = FastAPI()


@app.get("/items")
async def get_items(nm: int, old_filename: str, new_filename: str):
    return generate_file_commit_message(nm, old_filename, new_filename)