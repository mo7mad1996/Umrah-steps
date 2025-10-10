import { getCities, createCity } from '../../services/city';

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === 'GET') {
    try {
      const cities = await getCities();
      return {
        success: true,
        data: cities,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event);
      const city = await createCity(body);
      return {
        success: true,
        data: city,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
});
