import AppError from '@shared/errors/AppError';
import axios from 'axios';

type MethodTypes = 'get' | 'post' | 'put';

type BodyTypes = {
  [key: string]: [];
};

export const mountRequest = async <T>(
  method: MethodTypes,
  url: string,
  data?: BodyTypes,
  params?: object,
) => {
  try {
    if (method === 'get') {
      return await axios[method]<T>(url, {
        params,
      });
    }

    return await axios[method]<T>(url, data, {
      params,
    });
  } catch (error) {
    throw new AppError('Request failed.');
  }
};
