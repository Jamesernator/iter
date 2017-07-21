import auto from "./auto.js"
import syncF from "../sync/zip.js"
import asyncF from "../async/zip.js"

export default auto(syncF, asyncF)