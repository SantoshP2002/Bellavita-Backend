import { google } from "googleapis";
import axios from "axios";

export const googleAuthConfig = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  process.env.G_REDIRECT_URI
);

export const googleAuthClient = {
  // URL
  url: googleAuthConfig.generateAuthUrl({
    // Google login page ka final URL generate hota hai
    access_type: "offline", // future me refresh token bhi chahiye
    scope: [
      // google se kya chahiye
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent", // permission
    redirect_uri: process.env.G_REDIRECT_URI!, // Login ke baad Google isi URL pe redirect karega
  }),

  // DECODE
  decode: async (code: string) => {
    // Google se aane wale authorization code ko handle karta hai
    const { tokens } = await googleAuthConfig.getToken(code.toString()); // Token exchange

    googleAuthConfig.setCredentials(tokens); // google se aane wala toekn use kar

    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );
    return data;
  },
};
