import { useState, useEffect } from "react";
import { getUserQuery } from "@/app/services/queries/auth.query";
import { getUserFromAsyncStorage, storeUserInAsyncStorage } from "../functions/crud-tokens-storage";


const useGetUser = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: apiData, isLoading: apiLoading, isError, refetch } = getUserQuery();

  useEffect(() => {
    const getUser = async () => {
      const asyncStorageData = await getUserFromAsyncStorage();
      if (asyncStorageData) {
        setUser(asyncStorageData); 
        setIsLoading(false); 
      } else {
        console.log('Refetched');
        refetch();
      }
    }
    getUser();
  }, []);
  
  useEffect(() => {
    if (apiData) {
      setUser(apiData.data);  
      storeUserInAsyncStorage(apiData.data);  
      setIsLoading(false);  
    }
  }, [apiData]);

  if (isError) {
    console.log("Error fetching user data");
    setIsLoading(false); 
  }

  return { user, isLoading: isLoading || apiLoading };
};

export default useGetUser;
