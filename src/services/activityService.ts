import axios from "axios";
import type { ActivityInterface } from "@/models/ActivityInterface";

const BORED_API_BASE_URL = import.meta.env.BORED_API_BASE_URL

export async function fetchActivity(): Promise<ActivityInterface | null> {
    try {
        const response = await axios.get(`${BORED_API_BASE_URL}/activity`);
        return response.data as ActivityInterface;
    } catch (error) {
        console.error("Error fetching activity:", error);
        return null;
    }
}