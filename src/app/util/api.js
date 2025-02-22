import axios from "axios";
import { getToken, saveToken } from "./authutil";

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

    
    if (error.response) {
      throw new Error(error.response.data.message || "API error");
    } else {
      throw new Error(error.message);
    }
  }
}

export function getUsers() {
  return makeApiCall("/user", "GET");
}

export async function login(data) {
  console.log("Making API call");
  console.log(data);

  const response = await makeApiCall("/auth/login", "POST", data);


  // Ensure response contains both token and userId
  if (response.token && response.userId) {
    // Save token to local storage
    saveToken(response.token);

    // Optionally, store userId as well if needed globally
    localStorage.setItem("userId", response.userId);

    return response; // Return full response (token and userId)
  } else {
    console.error("Login API call failed: Missing token or userId in the response");
    throw new Error("Invalid login response");
  }
}
export async function addService(data) { // Renamed to addService
  return await makeApiCall("/services","POST",data);
}

export async function deleteUser(id) {
  return await makeApiCall(`/user/${id}`, "DELETE");
}

export async function signup(data) {
  try {
    console.log("Making API call for signup...");
    const response = await makeApiCall("/auth/signup", "POST", data);

    // Optional: If the signup is successful, you can automatically log the user in by saving their token
    if (response && response.Token) {
      saveToken(response.Token);  // Save the token
    }

    return response;
  } catch (error) {
    console.log("Signup failed:", error);
    
  }
}
 
export async function addUser(data) {
  return await makeApiCall("/user","POST",data);
}
export  async  function getServices(){
   return await makeApiCall("/services","GET");
};
export const deleteService = async (id) => {
  return await makeApiCall(`/services/${id}`, "DELETE");
};

export async function addWorker(data) {
  return await makeApiCall("/workers/add","POST",data);
  
};
export  async  function getWorkers(){
  return await makeApiCall("/workers/all","GET");
};
export const deleteWorker = async (id) => {
  return await makeApiCall(`/workers/${id}`, "DELETE");
};
export async function updateUser(id, data) {
  try {
    return await makeApiCall(`/user/${id}`, "PUT", data);
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error; // Rethrow the error to be handled in the component
  }
}
export async function updateWorker(id, data) {
  try {
    return await makeApiCall(`/workers/${id}`, "PUT", data);
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error; // Rethrow the error to be handled in the component
  }
}
export  async  function getServiceTypes(){
  return await makeApiCall("/servicetypes","GET");

};
export const deleteServiceType = async (id) => {
  return await makeApiCall(`/servicetypes/${id}`, "DELETE");
};
export async function updateServiceType(id, data) {
  try {
    return await makeApiCall(`/servicetypes/${id}`, "PUT", data);
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error; // Rethrow the error to be handled in the component
  }
}
export async function addServiceType(data) {
  return await makeApiCall("/servicetypes","POST",data);
  
}
export async function getUserById(id) {
  return await makeApiCall(`/user/${id}`, "GET");
}
export async function getServicesByUserId(id) {
  return await makeApiCall(`/services/user/${id}`, "GET");
}
export async function addFeedback(data) {
  return await makeApiCall("/api/feedback","POST",data);
  
}
export async function getTotalCustomers() {
  return await makeApiCall("/user/total-users","GET");
  
}
export async function getTotalWorkers() {
  return await makeApiCall("/workers/total-workers","GET");
  
}
export async function getTotalServiceTypes() {
  return await makeApiCall("/servicetypes/total-service-types","GET");
  
}
export async function getTotalServicesMade() {
  return await makeApiCall("/services/total-services-made","GET");
  
}
export async function getFeedbacks() {
  return await makeApiCall("/api/feedback/feedbacks","GET");
  
}

export async function getFeedback() {
  return await makeApiCall("/api/feedback","GET");
  
}
export async function deleteFeedback(feedbackId) {
  return await makeApiCall(`/api/feedback/${feedbackId}`, "DELETE");
}
export async function   getPendingRequests() {
  return await makeApiCall("/services/status/Pending","GET");
  
}
export async function approveRequest(id,data) {
  return await makeApiCall(`/services/approve/${id}`, "PUT", data);
  
}