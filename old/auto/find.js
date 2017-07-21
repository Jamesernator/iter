import auto from "./auto.js"
import syncF from "../sync/find.js"
import asyncF from "../async/find.js"

export default auto(syncF, asyncF)