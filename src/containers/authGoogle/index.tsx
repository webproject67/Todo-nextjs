import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/hooks';
import { registrationAction } from '@/store/api-actions';

type TokenType = {
  iss: string;
  sub: string;
  azp: string;
  aud: string;
  jti: string;
  iat: number;
  exp: number;
  nbf: number;
  email_verified: boolean;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
};

const googlePassword = process.env.NEXT_PUBLIC_GOOGLE_PASSWORD as string;

function AuthGoogle() {
  const dispatch = useAppDispatch();

  return (
    <>
      <p>Или авторизоваться через</p>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential != null) {
            const userCredential: TokenType = jwtDecode(
              credentialResponse.credential
            );
            dispatch(
              registrationAction({
                email: userCredential.email,
                password: googlePassword,
                authGoogle: true,
              })
            );
          }
        }}
        onError={() => toast.error('Ошибка входа')}
        size="medium"
      />
    </>
  );
}

export default React.memo(AuthGoogle);
