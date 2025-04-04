import axios from "axios";

export async function getRowData() {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting products data");
  }
}
