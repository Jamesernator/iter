import auto from "./auto.js"
import syncF from "../sync/length.js"
import asyncF from "../async/length.js"

export default auto(syncF, asyncF)