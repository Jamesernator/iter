import auto from "./auto.js"
import syncF from "../sync/map.js"
import asyncF from "../async/map.js"

export default auto(syncF, asyncF)