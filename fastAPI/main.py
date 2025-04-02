from typing import List, Optional
from pydantic import BaseModel

import fastapi
import uvicorn

from fastapi.middleware.cors import CORSMiddleware

app = fastapi.FastAPI();

origins = [
    "http://localhost:5173"
];

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    id: Optional[int] | None = None;
    title: str;
    description: Optional[str] | None = None;

items: List[Item] = [];
latest_id: int = 0;

@app.post("/items", status_code = 201)
def add_item(item: Item):
    global latest_id;
    latest_id += 1;

    item.id = latest_id;
    items.append(item);
    return item;

@app.get("/items", status_code = 200)
def get_items():
    return items;

@app.get("/items/{id}", status_code = 200)
def get_item(id: int):
    not_found_response = construct_not_found_respose(f"Item with the id {id} does not exist");

    retrieved_item = get_item_by_id(id);
    if retrieved_item is None:
        return not_found_response;
    else:
        return retrieved_item;

@app.delete("/items/{id}", status_code = 200)
def delete_item(id: int):
    not_found_response = construct_not_found_respose(f"Item with the id {id} does not exist");

    retrieved_item = get_item_by_id(id);
    if (retrieved_item is None):
        return not_found_response;
    else:
        items.remove(retrieved_item);
        return retrieved_item;

@app.put("/items/{id}", status_code = 200)
def update_item(id: int, updated_item: Item):
    not_found_response = construct_not_found_respose(f"Item with the id {id} does not exist");

    retrieved_item = get_item_by_id(id);
    if (retrieved_item is None):
        return not_found_response;
    else:
        updated_item.id = retrieved_item.id;
        items[items.index(retrieved_item)] = updated_item;
        return updated_item;


def construct_not_found_respose(message: str) -> fastapi.responses.JSONResponse:
    return fastapi.responses.JSONResponse(content=
        {
            "message": message
        } ,status_code = 404);

def get_item_by_id(id: int) -> Optional[Item]:
    for item in items:
        if item.id == id:
            return item;

    return None;


if __name__ == "__main__":
    uvicorn.run(app, reload=True);
