import fs from 'fs'
import axios from 'axios'

const LOCALES = ['es']
const LOCALES_DIR = './src/locales'
const LOCALISE_KEY = 'OJ_J3ArZpHx0ZZX6l3-05QAoJFrJZjih'

if (!fs.existsSync(LOCALES_DIR)) {
  fs.mkdirSync(LOCALES_DIR)
}

LOCALES.forEach((locale) => {
  axios
    .get(`https://localise.biz/api/export/locale/${locale}.json?key=${LOCALISE_KEY}`)
    .then((response) => {
      const data = { ...response.data }
      fs.writeFile(`${LOCALES_DIR}/${locale}.json`, JSON.stringify(data), () => {})
      return data
    })
    .catch(() => {})
})
