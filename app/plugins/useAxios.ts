import axios from "axios";

export default defineNuxtPlugin(() => {
  // env
  const { baseUrl, icon } = useRuntimeConfig();
  console.log(baseUrl, icon);
  const api = axios.create({
    baseURL: baseUrl,
    headers: {},
  });

  return { provide: { axios: api } };
});
