import axios from "axios";

export default defineNuxtPlugin(() => {
  // env
  const config = useRuntimeConfig();

  const api = axios.create({
    baseURL: config.public.baseUrl,
  });

  return { provide: { axios: api } };
});
