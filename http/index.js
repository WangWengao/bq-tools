import axios from 'axios'

class HTTP {
  constructor ({ apis, config = {}, interceptors }) {
    const axiosInstance = axios.create(config)
    const { request, response } = interceptors
    if (request && typeof request === 'function') {
      axiosInstance.interceptors.request.use(request)
    }
    if (response && typeof response === 'function') {
      axiosInstance.interceptors.request.use(response)
    }

    Object.keys(apis).forEach(key => {
      const method = apis[key].method
      switch (method) {
        case 'get':
          this[key] = ({ params = {} }) => axiosInstance.get(apis[key].url(params), { api: apis[key] })
          break

        case 'post':
          this[key] = ({ params = {}, data = {} }) => axiosInstance.post(apis[key].url(params), data, { api: apis[key] })
          break

        case 'put':
          this[key] = ({ params = {}, data = {} }) => axiosInstance.put(apis[key].url(params), data, { api: apis[key] })
          break

        case 'delete':
          this[key] = ({ params = {} }) => axiosInstance.delete(apis[key].url(params), { api: apis[key] })
          break
      }
    })
  }

  install (Vue) {
    Vue.prototype.$http = this
  }
}

export default HTTP
