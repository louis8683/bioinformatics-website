import { BASE_URL } from "../config/config";
import { Session } from "../models/session";

const toCamelCaseSession = (data: any): Session => ({
  id: data.id,
  userId: data.user_id,
  groupName: data.group_name,
  className: data.class_name,
  schoolName: data.school_name,
  deviceName: data.device_name,
  startTimestamp: data.start_timestamp,
  endTimestamp: data.end_timestamp,
  title: data.title,
  description: data.description,
});

type SessionFilters = {
  filter?: boolean;
  school?: string;
  class?: string;
  group?: string;
};

export const fetchAllSessions = async (
  accessToken: string,
  filters?: SessionFilters
): Promise<Session[]> => {
  console.log("fetchAllSessions()", filters);

  const url = new URL(`${BASE_URL}/sessions`);

  // Append query parameters if filtering is requested
  if (filters?.filter) {
    url.searchParams.set("filter", "true");

    if (filters.school) {
      url.searchParams.set("school", filters.school);
      if (filters.class) {
        url.searchParams.set("class", filters.class);
        if (filters.group) {
          url.searchParams.set("group", filters.group);
        }
      }
    }
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user sessions");
  }

  const data = await response.json();
  return data.map(toCamelCaseSession);
};