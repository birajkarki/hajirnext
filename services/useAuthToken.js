// useAuthToken.js

import { useAuth } from "@/context/AuthContext";

export const useAuthToken = () => {
  const { authToken } = useAuth();
  const tokenExists = !!authToken; // Convert authToken to boolean

  return { authToken, tokenExists };
};
