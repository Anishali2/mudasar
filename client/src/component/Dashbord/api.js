import axios from "axios";
import { axiosClient } from "./client";

const URL = "http://localhost:8000";

export const addUser = async (data) => {
  try {
    // console.log("listening to addUser", data)
    return await axios.post(`${URL}/add`, data);
  } catch (err) {
    console.log("Error While Calling addUser API", err);
  }
};
export function addCart(id, user) {
  const obj = {
    userId: user.email,
    productId: id,
    productQty: 1,
  };
  console.log(obj);
  if (user.cartData.length === 0) {
    // if empty add new product
    return axiosClient.put(
      "http://localhost:8000/cart/new",
      JSON.stringify(obj)
    );
  } else {
    // update Qty
    const filter = user.cartData.filter((item) => item.product._id === id);
    if (filter.length !== 0) {
      return axiosClient.put(
        "http://localhost:8000/cart/updateqty",
        JSON.stringify(obj)
      );
    } else {
      // add new product

      return axiosClient.put(
        "http://localhost:8000/cart/newproduct",
        JSON.stringify(obj)
      );
    }
  }
}

// ----- get ALL users ---------
export const getUsers = async () => {
  try {
    // console.log("listening to getUsers")
    const result = await axios.get(`${URL}/all`);
    console.log(result);

    return result;
  } catch (err) {
    console.log("Error While Calling getUsers API", err);
  }
};

//----------- Edit User -----------
export const editUser = async (id) => {
  try {
    // console.log("listening to editUser")
    return await axios.get(`${URL}/${id}`);
  } catch (err) {
    console.log("Error While Calling editUser API", err);
  }
};

// ------------save edited user--------
export const saveUser = async (user, id) => {
  try {
    // console.log("listening to saveUser")
    return await axios.post(`${URL}/${id}`, user);
  } catch (err) {
    console.log("Error While Calling saveUser API", err);
  }
};

// ------------delete user--------
export const deleteuser = async (id) => {
  try {
    // console.log("listening to deleteUser")
    return await axios.delete(`${URL}/${id}`);
  } catch (err) {
    console.log("Error While Calling deleteUser API", err);
  }
};
