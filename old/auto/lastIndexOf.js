import auto from "./auto.js"
import syncF from "../sync/lastIndexOf.js"
import asyncF from "../async/lastIndexOf.js"

export default auto(syncF, asyncF)