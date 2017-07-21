import auto from "./auto.js"
import syncF from "../sync/all.js"
import asyncF from "../async/all.js"

export default auto(syncF, asyncF)