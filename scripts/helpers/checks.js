import { check } from "k6";

export function validateWeatherResponse(res) {
  return check(res, {
    "status 200": (r) => r.status === 200,
    "retorna latitude": (r) => r.json("latitude") !== undefined,
    "retorna longitude": (r) => r.json("longitude") !== undefined,
    "tem timezone": (r) => r.json("timezone") !== undefined,
    "contém temperatura": (r) => r.body.includes("temperature_2m"),
    "contém precipitação": (r) => r.body.includes("precipitation"),
    "contém cobertura de nuvens": (r) => r.body.includes("cloudcover"),
  });
}
