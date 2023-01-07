import { createContext, ReactNode, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSessions from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContexDataProps {
  user: UserProps;
  singIn: () => Promise<void>;
  isUserLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContexDataProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [_request, response, promptAsync] = Google.useAuthRequest({
    clientId: '999336532295-8i4ajjhjpr8bnrf9gptnrvv17ufuaist.apps.googleusercontent.com',
    redirectUri: AuthSessions.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  const singIn = async () => {
    try {
      setIsUserLoading(true);
      await promptAsync();

    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }  

  const singInWithGoogle = async (access_token: string) => {
    // try {
    //   setIsUserLoading(true);

    //   const tokenResponse = await api.post('/users', { access_token });
    //   api.defaults.headers.common[
    //     'Authorization'
    //   ] = `Bearer ${tokenResponse.data.token}`;

    //   const userInfoResponse = await api.get('/me');
    //   setUser(userInfoResponse.data.user);
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // } finally {
    //   setIsUserLoading(false);
    // }

    console.log('TOKEN: ', access_token);
    
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      singInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ user, singIn, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
