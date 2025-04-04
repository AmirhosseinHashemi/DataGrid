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

export async function getRowDataById(id: number) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Error getting products data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting row ${id} data`);
  }
}

interface rowData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export async function updateRowData(data: rowData) {
  const option = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${data.id}`,
      option,
    );
    if (!response.ok) {
      throw new Error("Error updating row data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error updating row data");
  }
}

export async function deleteRow(id: number) {
  const option = {
    method: "DELETE",
  };

  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      option,
    );
    if (!response.ok) {
      throw new Error("Error deleting product data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting row data");
  }
}
