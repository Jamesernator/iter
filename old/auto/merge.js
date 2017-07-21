import auto from "./auto.js"
import syncF from "../sync/merge.js"
import asyncF from "../async/merge.js"

export default auto(syncF, asyncF)