import http from "k6/http";
import { sleep } from "k6";
import { cities } from "../helpers/cities.js";
import { validateWeatherResponse } from "../helpers/checks.js"
import { BASE_URL, DEFAULT_PARAMS } from "../helpers/config.js";

export const options = {
  vus: 1,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<800"],
    http_req_failed: ["rate<0.05"],
  },
};

export default function () {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const url = `${BASE_URL}?latitude=${city.lat}&longitude=${city.lon}${DEFAULT_PARAMS}`;

  const res = http.get(url);
  validateWeatherResponse(res);

  sleep(1);
}
