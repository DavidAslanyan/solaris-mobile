import { LoginUserFormType, RegisterUserFormType, UpdateUserFormType } from "@/utilities/types/auth.type";
import { API_URLS } from "@/constants/api-endpoints";
import { DifficultyLevel } from "@/utilities/enums/difficulty-level.enum";
import axios from "axios"

const id  = "e1630445-3f60-4b4c-b7a3-37ef7aba3bbb";


export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URLS.AUTH}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    throw error; 
  }
}


export const getUsersList = async () => {
   try {
    const response = await axios.get(`${API_URLS.LIST}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    throw error; 
  }
}


export const postUser = async (data: RegisterUserFormType) => {
  try {
    const response = await axios.post(`${API_URLS.REGISTER}`, data);
    return response.data;
  } catch(error) {
    console.error("Failed to register the user:", error);
    throw error; 
  }
}


export const loginUser = async (data: LoginUserFormType) => {
  try {
    const response = await axios.post(`${API_URLS.LOGIN}`, data);
    if (response.data.data.tokens) {
      // saveTokensInSecureStorage(
      //   response.data.data.tokens.accessToken,
      //   response.data.data.tokens.refreshToken
      // );
    }
    return response.data;
  } catch(error) {
    console.error("Failed to login the user:", error);
    throw error; 
  }
}

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URLS.LOGOUT}`);
  } catch(error) {
    console.error("Failed to logout the user:", error);
    throw error; 
  }
}


export const updateUser = async ({ userId, data }: { userId: string; data: UpdateUserFormType }) => {
  try {
    const response = await axios.patch(`${API_URLS.AUTH_UPDATE}/${userId}`, data);
    return response.data;
  } catch(error) {
    console.error("Failed to update the user:", error);
    throw error; 
  }
}


export const changeDifficulty = async ({ level }: { level: DifficultyLevel | string }) => {
  try {
    const response = await axios.patch(`${API_URLS.CHANGE_DIFFICULTY}`, { level });
    return response.data;
  } catch(error) {
    console.error("Failed to udpate difficulty:", error);
    throw error; 
  }
}

export const googleLogin = async ({ id }: { id: string }) => {
  try {
    const response = await axios.post(`${API_URLS.GOOGLE_LOGIN}`, { id });
    return response.data;
  } catch(error) {
    console.error("Failed to sign in via Google:", error);
    throw error; 
  }
} 


// export const googleLogin = useGoogleLogin({
//   onSuccess: async ({ code }) => {
//     const tokens = await axios.post(API_URLS.GOOGLE_LOGIN, {
//       code,
//     });

//     console.log(tokens);
//   },
//   flow: 'auth-code',
// });