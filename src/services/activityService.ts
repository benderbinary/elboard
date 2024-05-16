import axios from "axios";
import { ActivityInterface } from "@/models/ActivityInterface";

const API_BASE_URL = "https://www.boredapi.com/api";

export async function fetchActivity(): Promise<ActivityInterface | null> {
    try {
        const response = await axios.get(`${API_BASE_URL}/activity`);
        console.log("response ", response);
        return response.data as ActivityInterface;
    } catch (error) {
        console.error("Error fetching activity:", error);
        return null;
    }
}