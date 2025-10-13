import http from "k6/http";
import { sleep } from "k6";
import { cities } from "../helpers/cities.js";
import { BASE_URL } from "../helpers/config.js";
import { validateWeatherResponse } from "../helpers/checks.js"

export const options = {
  stages: [
    { duration: "5s", target: 5 }, 
    { duration: "15s", target: 20 }, 
    { duration: "5s", target: 0 }, 
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], 
    http_req_failed: ["rate<0.01"], 
  },
};

export default function () {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const url = `${BASE_URL}?latitude=${city.lat}&longitude=${city.lon}&hourly=temperature_2m,precipitation,cloudcover&timezone=America%2FRecife`;

  const res = http.get(url);
  validateWeatherResponse(res)

  sleep(1);
}