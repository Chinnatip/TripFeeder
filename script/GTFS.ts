import { agency, stops } from './GTFS/file.strategy'
import { reconstructData } from './GTFS/reconstruct.strategy'
import { parseData, saveTo, compressZip } from './GTFS/parse.strategy'
const JSZip = require('jszip')
const zip = new JSZip()

const TEMPLATE_FILE_PATH = 'Songserm-GTFS-Homework'
const ZIP_PATH_NAME = 'Songserm'
const data: any[] = parseData(TEMPLATE_FILE_PATH)
const originalData: any[] = reconstructData(data)

saveTo('csv', zip, 'agency', agency(originalData))
saveTo('csv', zip, 'stops', stops(originalData))

compressZip(zip, ZIP_PATH_NAME)
