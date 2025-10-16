import http from "k6/http";
import { sleep, check } from "k6";
import { cities } from "../helpers/cities.js";
import { BASE_URL, DEFAULT_PARAMS } from "../helpers/config.js";

export const options = {
  stages: [
    { duration: "10s", target: 20 },   
    { duration: "20s", target: 100 },  
    { duration: "20s", target: 200 },  
    { duration: "10s", target: 0 },   
  ],
  thresholds: {
    http_req_duration: ["p(95)<1000"], 
    http_req_failed: ["rate<0.05"],   
  },
};

export default function () {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const url = `${BASE_URL}?latitude=${city.lat}&longitude=${city.lon}${DEFAULT_PARAMS}`;
  const res = http.get(url);

  check(res, {
    "status é 200 ou 429": (r) => r.status === 200 || r.status === 429,
    "resposta abaixo de 2s": (r) => r.timings.duration < 2000,
  });

  sleep(1);
}
