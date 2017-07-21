import auto from "./auto.js"
import syncF from "../sync/reject.js"
import asyncF from "../async/reject.js"

export default auto(syncF, asyncF)