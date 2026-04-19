const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not set. Add it to your .env file.");
}

export const API_URL = apiUrl;
