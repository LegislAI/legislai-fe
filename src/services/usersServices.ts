import { USERS_API } from '@/lib/api';

export const getUserInfo = async () => {
  try {
    const response = await USERS_API.get('/');

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      throw new Error('User not found.');
    } else {
      throw new Error('Error fetching user info.');
    }
  } catch (error) {
    throw error;
  }
};