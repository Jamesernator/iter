import auto from "./auto.js"
import syncF from "../sync/reduceRight.js"
import asyncF from "../async/reduceRight.js"

export default auto(syncF, asyncF)