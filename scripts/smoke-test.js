import http from "k6/http";
import { check, sleep } from "k6";
import { cities } from "./helpers/cities.js";
import { BASE_URL, THRESHOLDS } from "./helpers/config.js";

export const options = {
  vus: 1,
  duration: "5s",
  thresholds: THRESHOLDS
};

export default function () {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const url = `${BASE_URL}?latitude=${city.lat}&longitude=${city.lon}&hourly=temperature_2m,precipitation,cloudcover&timezone=America%2FRecife`;

  const res = http.get(url);
  check(res, { "status 200": (r) => r.status === 200 });
  sleep(1);
}
