import auto from "./auto.js"
import syncF from "../sync/scan.js"
import asyncF from "../async/scan.js"

export default auto(syncF, asyncF)