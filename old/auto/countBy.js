import auto from "./auto.js"
import syncF from "../sync/countBy.js"
import asyncF from "../async/countBy.js"

export default auto(syncF, asyncF)