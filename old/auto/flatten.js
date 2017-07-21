import auto from "./auto.js"
import syncF from "../sync/flatten.js"
import asyncF from "../async/flatten.js"

export default auto(syncF, asyncF)