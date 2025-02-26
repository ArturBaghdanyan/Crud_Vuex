import { ApiUrl } from '@/main';
import axios from "axios";

export default async function request(url, options) {
  const fullUrl = ApiUrl + url;

  try {
    const res = await axios({
      url: fullUrl,
      method: options.method || "GET",
      headers: options.headers || {},
      data: options.body || null,
    });

    return res.status === 204 ? { status: 204 } : res.data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}
