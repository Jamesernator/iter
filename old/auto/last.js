import auto from "./auto.js"
import syncF from "../sync/last.js"
import asyncF from "../async/last.js"

export default auto(syncF, asyncF)