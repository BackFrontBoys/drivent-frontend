import QueryString from 'qs';

export default function useSetGitCode() {
  const params = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URL,
  };

  window.location.href = `https://github.com/login/oauth/authorize/?${QueryString.stringify(params)}`;
}
