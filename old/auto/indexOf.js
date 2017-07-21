import auto from "./auto.js"
import syncF from "../sync/indexOf.js"
import asyncF from "../async/indexOf.js"

export default auto(syncF, asyncF)