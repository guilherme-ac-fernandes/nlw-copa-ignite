import { useContext } from 'react';

import { AuthContext, AuthContexDataProps } from '../context/AuthContext';

export const useAuth = (): AuthContexDataProps => {
  const context = useContext(AuthContext);
  return context;
};
