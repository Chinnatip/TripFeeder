import axios from 'axios'
const fs = require('fs')
//
const productURL = `https://sb.api.adv-tour.com/v1`
const appKey = `44bf66fh896355a`
const suffixKey = process.env.suffix
const writeFile = process.env.path
const axiosInstance = axios.create({
  baseURL: productURL,
  timeout: 5000,
  headers: {
    appKey: appKey
  }
})
//
const getAxios = async () => await axiosInstance.get(suffixKey)
getAxios().then(resp =>
  fs.writeFileSync(writeFile, JSON.stringify(resp.data.data, null, 2))
)
