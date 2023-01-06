import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useGitSignin() {
  const {
    loading: gitSignInLoading,
    error: gitSignInError,
    act: gitSignIn
  } = useAsync(authApi.gitSignIn, false);

  return {
    gitSignIn,
    gitSignInError,
    gitSignInLoading
  };
}
