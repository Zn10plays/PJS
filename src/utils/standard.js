import _axios from 'axios'
import qs from 'querystring'

const axios = _axios.create({
  baseURL: 'https://standardizer.glitch.me/'
})

export const fix = async (code) => {
  const body = { text: code }
  const res = await axios.post(
    'https://standardizer.glitch.me/fix',
    qs.stringify(body),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  return res.data
}
