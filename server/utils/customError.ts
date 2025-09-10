export const CustomError = (err: Error) => {
  throw createError(err);
};
