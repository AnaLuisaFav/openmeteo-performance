export const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const THRESHOLDS = {
  http_req_duration: ["p(95)<800"],
  http_req_failed: ["rate<0.05"],
};