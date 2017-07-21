import auto from "./auto.js"
import syncF from "../sync/select.js"
import asyncF from "../async/select.js"

export default auto(syncF, asyncF)