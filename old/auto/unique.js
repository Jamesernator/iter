import auto from "./auto.js"
import syncF from "../sync/unique.js"
import asyncF from "../async/unique.js"

export default auto(syncF, asyncF)