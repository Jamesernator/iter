import auto from "./auto.js"
import syncF from "../sync/skipLast.js"
import asyncF from "../async/skipLast.js"

export default auto(syncF, asyncF)