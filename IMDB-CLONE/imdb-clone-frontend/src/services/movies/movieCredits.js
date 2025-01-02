import axios from "axios";

const baseUrl = "/api/movie/credits";

const getMovieCredits = async (id) => {
  if (!id) {
    throw new Error("Movie ID is required");
  }
  const url = `${baseUrl}/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

export default getMovieCredits;