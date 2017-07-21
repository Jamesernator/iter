import auto from "./auto.js"
import syncF from "../sync/groupBy.js"
import asyncF from "../async/groupBy.js"

export default auto(syncF, asyncF)