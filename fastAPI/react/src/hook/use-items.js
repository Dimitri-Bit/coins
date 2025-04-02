import { ItemsService } from "../service/items-service";

export const useItems = () => {
  const getItems = async () => {
    try {
      return await ItemsService.getItems();
    } catch (error) {
      console.log("Could not fetch items", error);
      throw error;
    }
  };

  const addItem = async (title) => {
    try {
      return await ItemsService.addItem(title);
    } catch (error) {
      console.log("Could not add item", error);
      throw error;
    }
  };

  const deleteItem = async (id) => {
    try {
      return await ItemsService.deleteItem(id);
    } catch (error) {
      console.log("Could not add item", error);
      throw error;
    }
  };

  const updateItem = async (title, id) => {
    try {
      return await ItemsService.updateItem(title, id);
    } catch (error) {
      console.log("Could not update item", error);
      throw error;
    }
  };

  return {
    getItems,
    addItem,
    deleteItem,
    updateItem,
  };
};
