import auto from "./auto.js"
import syncF from "../sync/mapFinal.js"
import asyncF from "../async/mapFinal.js"

export default auto(syncF, asyncF)