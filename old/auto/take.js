import auto from "./auto.js"
import syncF from "../sync/take.js"
import asyncF from "../async/take.js"

export default auto(syncF, asyncF)