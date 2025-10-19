import http from "k6/http";
import { sleep, check } from "k6";
import { cities } from "../helpers/cities.js";
import { generateReport } from '../utils/reports.js';
import { BASE_URL, DEFAULT_PARAMS } from "../helpers/config.js";

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
  const url = `${BASE_URL}?latitude=${city.lat}&longitude=${city.lon}${DEFAULT_PARAMS}`;

  const res = http.get(url);
  check(res, { 
    "status 200": (r) => r.status === 200 
  });
  
  sleep(1);
}

export function handleSummary(data) {
  return generateReport('load-report.html', data);
}