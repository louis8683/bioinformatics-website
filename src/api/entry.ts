import { BASE_URL } from "../config/config";
import { Entry } from "../models/entry";

const toCamelCaseEntry = (data: any): Entry => ({
  id: data.id,
  userId: data.user_id,
  sessionId: data.session_id,
  timestamp: data.timestamp,
  latitude: data.latitude,
  longitude: data.longitude,
  coLevel: data.co_level,
  pm2_5Level: data.pm2_5_level,
  temperature: data.temperature,
  humidity: data.humidity,
});

// Fetch all entries from a session
export const fetchEntriesFromSession = async (
  sessionId: number,
  accessToken: string
) => {
  console.log("Fetching entries...");
  const response = await fetch(`${BASE_URL}/sessions/${sessionId}/data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Attach the token here
    },
  });

  console.log("Response:" + response.ok)
  if (!response.ok) {
    throw new Error("Failed to fetch entries from session");
  }
  
  const rawData = await response.json();
  return rawData.map(toCamelCaseEntry);
  // return response.json()
};
