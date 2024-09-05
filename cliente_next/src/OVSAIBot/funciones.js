import { ENV } from "@/config/env";

export async function ObtenerEstaciones() {
    const res = await fetch(`${ENV.URLBASE}api/estaciones/get/`);
    return res.json();
}