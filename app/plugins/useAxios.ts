import axios from "axios"

export default defineNuxtPlugin(() => {
  // env
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.baseUrl,
    headers: {},
  })

  return { provide: { axios: api } }
})

