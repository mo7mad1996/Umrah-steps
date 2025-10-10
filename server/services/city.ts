import City from '../utils/db/models/City';

export const getCities = async () => {
  try {
    return await City.find().sort({ 'name.ar': 1 });
  } catch (error) {
    throw error;
  }
};

export const getCityById = async (id: string) => {
  try {
    return await City.findById(id);
  } catch (error) {
    throw error;
  }
};

export const createCity = async (data: any) => {
  try {
    return await City.create(data);
  } catch (error) {
    throw error;
  }
};

export const updateCity = async (id: string, data: any) => {
  try {
    return await City.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw error;
  }
};

export const deleteCity = async (id: string) => {
  try {
    return await City.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
