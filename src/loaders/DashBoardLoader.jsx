import { redirect } from "react-router-dom";
import api from "../api/axios";

export async function DashBoardLoader() {
  const token = localStorage.getItem("access");
  if (!token) return redirect("/");

  try {
    const { data } = await api.get("activity/recent/");
    return data || [];
  } catch (err) {
    console.error("Failed to load activity:", err);
    return [];
  }
}
