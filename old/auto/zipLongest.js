import auto from "./auto.js"
import syncF from "../sync/zipLongest.js"
import asyncF from "../async/zipLongest.js"

export default auto(syncF, asyncF)