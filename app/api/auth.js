import axios from "axios";

const BASE_URL = "http://localhost:1337";

export const registerUser = async (data) => {
  const url = `${BASE_URL}/api/auth/local/register`;
  const response = await axios.post(url, data);
  return response.data;
};

export const loginUser = async (data) => {
  const url = `${BASE_URL}/api/auth/local`;
  const response = await axios.post(url, data);
  return response.data;
};

export const getMe = async (token) => {
  const url = `${BASE_URL}/api/users/me`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
