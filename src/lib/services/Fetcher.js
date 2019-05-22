import xhr from 'xhr'
import { config } from 'src/config'
import { logout } from 'src/lib/helpers/logout'

export const fetch = ({ method, url, body, file, withCredentials = true }) => {
  return new Promise((resolve, reject) => {
    xhr(
      {
        withCredentials: withCredentials,
        json: !file,
        method: method,
        url: `${config.apiUrl}/${url}`,
        body: !file
          ? body
          : (() => {
              const formData = new FormData()
              formData.append('file', file)
              return formData
            })(),
      },
      (err, resp, body) => {
        try {
          body = JSON.parse(body)
        } catch (err) {}
        if (err) {
          reject(err.message === '[object ProgressEvent]' ? new Error('Network error') : err)
          return
        }
        if (resp.statusCode === 401) {
          logout()
          return
        }
        if (resp.statusCode < 200 || resp.statusCode > 299) {
          reject({
            statusCode: resp.statusCode,
            message: body && body.message ? body.message : body,
          })
          return
        }
        resolve(body)
      }
    )
  })
}
