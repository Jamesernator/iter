import auto from "./auto.js"
import syncF from "../sync/sample.js"
import asyncF from "../async/sample.js"

export default auto(syncF, asyncF)