import auto from "./auto.js"
import syncF from "../sync/skip.js"
import asyncF from "../async/skip.js"

export default auto(syncF, asyncF)