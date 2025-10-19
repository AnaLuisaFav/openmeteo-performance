import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function generateReport(filename, data) {
  return {
    [`reports/${filename}`]: htmlReport(data),
  };
}