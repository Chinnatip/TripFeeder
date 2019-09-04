import axios from 'axios'
import * as fs from 'fs'

// Setup ProductUrl and AppKey
const productURL = `https://sb.api.adv-tour.com/v1`
const appKey = `44bf66fh896355a`
const suffixKey = process.env.suffix
const writeFile = process.env.path

// Prepare AXIOS
const axiosInstance = axios.create({
  baseURL: productURL,
  // timeout: 5000,
  headers: {
    appKey: appKey
  }
})

// Fetch Process and write file to JSON
const getAxios = async () => await axiosInstance.get(suffixKey)
getAxios().then(resp =>
  fs.writeFileSync(writeFile, JSON.stringify(resp.data.data, null, 2))
)
