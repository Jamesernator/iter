import auto from "./auto.js"
import syncF from "../sync/runs.js"
import asyncF from "../async/runs.js"

export default auto(syncF, asyncF)