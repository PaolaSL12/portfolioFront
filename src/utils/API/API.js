import { BASE_URL } from "../variables/variables";

export const API = async ({ endpoint, language }) => {
    try {
      const res = await fetch(`${BASE_URL}${language}/${endpoint}`);
  
      if (res.ok) {
        const data = await res.json();
        
        return data;
      } else {
        throw new Error("Error fetching data from API");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching data from API");
    }
  };