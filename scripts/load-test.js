import http from "k6/http";
import { sleep, check } from "k6";
import { cities } from "../helpers/cities.js";
import { Trend, Counter, Rate } from "k6/metrics";
import { generateReport } from '../utils/reports.js';
import { BASE_URL, DEFAULT_PARAMS } from "../helpers/config.js";

export const responseTime = new Trend("tempo_resposta_ms");
export const errorCount = new Counter("total_erros");
export const successRate = new Rate("taxa_sucesso");

export const options = {
  stages: [
    { duration: "5s", target: 5 }, 
    { duration: "15s", target: 20 }, 
    { duration: "5s", target: 0 }, 
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], 
    http_req_failed: ["rate<0.01"], 
    "taxa_sucesso": ["rate>0.95"],     
    "tempo_resposta_ms": ["p(95)<1000"],
    "total_erros": ["count<10"]
  },
};

export default function () {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const url = `${BASE_URL}?latitude=${city.lat}&longitude=${city.lon}${DEFAULT_PARAMS}`;

  const res = http.get(url);

  responseTime.add(res.timings.duration);   
  successRate.add(res.status === 200);         
  if (res.status !== 200) errorCount.add(1);
  
  check(res, { 
    "status 200": (r) => r.status === 200 
  });
  
  sleep(1);
}

export function handleSummary(data) {
  return generateReport('load-report.html', data);
}