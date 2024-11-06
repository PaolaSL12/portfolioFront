import { API } from "../API/API";

export const fetchData = async (setData, setLoading, setError, endpoint) => {
    setLoading(true); 
  
    try {
      const data = await API({ endpoint });
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };