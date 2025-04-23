import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import axiosInstance from '../functions/axios-instance';
import { API_URLS, BASE } from '@/constants/api-endpoints';
import { storeUserInAsyncStorage } from '../functions/crud-tokens-storage';

let socket: Socket;

const useSocket = () => {

  useEffect(() => {
    socket = io(BASE); 

    socket.on('update-user', () => {
      console.log('User data updated');
      getUser();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`${API_URLS.AUTH}`);
      console.log('Socket worked: ', response)
      storeUserInAsyncStorage(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  return {};
};

export default useSocket;
