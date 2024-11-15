import axios from 'axios'

export const getUserByFacebookIdAndAccessToken = ( accessToken: string, userId: string) => {
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userId}?fields=id,name,email&access_token=${accessToken}`;
    let result = axios.get(urlGraphFacebook);
    return result;
  }