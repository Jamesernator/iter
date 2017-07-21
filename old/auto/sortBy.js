import auto from "./auto.js"
import syncF from "../sync/sortBy.js"
import asyncF from "../async/sortBy.js"

export default auto(syncF, asyncF)