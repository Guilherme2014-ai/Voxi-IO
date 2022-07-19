const ApiContentUrl = import.meta.env.VITE_API_CONTENT_URL;

export const config = {
  ApiContentUrl: ApiContentUrl || "What are you looking for ?",
};
