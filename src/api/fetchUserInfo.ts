import { USER_INFO_ENDPOINT } from "../config/config";

export const fetchUserInfo = async (
  accessToken: string
) => {
  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  const response = await fetch(`${USER_INFO_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch user info: ${errorText}`);
  }

  const data = await response.json();
  console.log("User info response:", data);
  return data;
};