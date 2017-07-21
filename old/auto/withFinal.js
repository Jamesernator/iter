import auto from "./auto.js"
import syncF from "../sync/withFinal.js"
import asyncF from "../async/withFinal.js"

export default auto(syncF, asyncF)