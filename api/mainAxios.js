import instance from "./axios";

export const GetAllClothes = async () => {
  let response = await instance.get("api/clothe-items");
  return response;
};

export const DeleteClotheById = async (id) => {
  let response = await instance.delete(`api/clothe-items/${id}`);
  return response;
};

export const AddClotheProduct = async (clothingItem) => {
  try {
    const response = await instance.post("api/clothe-items", clothingItem);
    return response.data;
  } catch (error) {
    console.error("Failed to add clothing item:", error);
    throw error;
  }
};
