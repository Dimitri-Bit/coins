import { itemClient } from "../api/axios-instance";

export const ItemsService = {
  getItems: async () => {
    try {
      const response = await itemClient.get("/items");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch items", error);
      throw error;
    }
  },

  addItem: async (title) => {
    try {
      const response = await itemClient.post("/items", {
        title: title,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Failed to add item", error);
      throw error;
    }
  },

  deleteItem: async (id) => {
    try {
      const response = await itemClient.delete("/items/" + id);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Failed to remove item", error);
      throw error;
    }
  },

  updateItem: async (title, id) => {
    try {
      const response = await itemClient.put("/items/" + id, {
        title: title,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Failed to update item", error);
      throw error;
    }
  },
};
