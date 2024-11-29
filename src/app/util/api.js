

import axios from "axios";
import { getToken,saveToken } from "./authutil";

const API_BASE_URL = "http://localhost:8080";

export async function makeApiCall(endpoint, method = "GET", body = null) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers,
    };

    if (body) {
      config.data = body;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);

    // Check if the error is a response error
    if (error.response) {
      throw new Error(error.response.data.message || "API error");
    } else {
      throw new Error(error.message);
    }
  }
}
 export function getUsers(){
  return makeApiCall("/users/list","GET");
 }
 export async function login(data) {

    console.log("Making api call");
    const response =await makeApiCall("/auth/login","POST",data);
    saveToken(response.Token);
    return response;
    
  }

  export async function deleteUser(id) {
    return await makeApiCall(`/users/${id}`,"DELETE");
    
  }
  
 

