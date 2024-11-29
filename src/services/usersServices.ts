import { USERS_API } from '@/lib/api';

export const getUserInfo = async () => {
  try {
    const response = await USERS_API.get('/');

    if (response.status === 200) {
      return response;
    } else if (response.status === 404) {
      throw new Error('User not found.');
    } else {
      throw new Error('Error fetching user info.');
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserPlan = async (
  plan: string,
  token: string,
  paymentMethod: string,
) => {
  try {
    const response = await USERS_API.patch('/plan', {
      plan_name: plan,
      token: token,
      payment_method: paymentMethod,
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Error updating user plan.');
    }
  } catch (error) {
    throw error;
  }
}
