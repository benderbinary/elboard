import axios from "axios";
import type { ActivityInterface } from "@/models/ActivityInterface";

const baseUrl = import.meta.env.VITE_BORED_API_BASE_URL;

export async function fetchActivity(): Promise<ActivityInterface | null> {
    try {
        console.log('baseUrl ', baseUrl)
        const response = await axios.get(`${baseUrl}/activity`);
        console.log('response ', response);
        return response.data as ActivityInterface;
    } catch (error) {
        console.error("Error fetching activity:", error);
        return null;
    }
}