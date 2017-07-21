import auto from "./auto.js"
import syncF from "../sync/scanRight.js"
import asyncF from "../async/scanRight.js"

export default auto(syncF, asyncF)