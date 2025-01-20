import { BASE_URL } from "../variables/variables";

export const API = async ({ endpoint, language = '', method = 'GET', body = null}) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${BASE_URL}${language}/${endpoint}`, options);

    if (res.ok) {
      return await res.json();
    } else {
      const errorText = await res.text();
      throw new Error(`Error fetching data: ${res.status} ${errorText}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error interacting with the API");
  }
};