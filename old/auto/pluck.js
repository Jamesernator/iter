import auto from "./auto.js"
import syncF from "../sync/pluck.js"
import asyncF from "../async/pluck.js"

export default auto(syncF, asyncF)