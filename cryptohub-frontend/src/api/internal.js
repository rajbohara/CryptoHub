import axios from 'axios';
// this file deals with all the backend apis
const api = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials: true,  // to make cookies also a part of every request
    headers: {
        'Content-Type': 'application/json',
    },
});   // returns an object
// these all will be used in every api call

export const login = async (data) => {
       let response;
       try {
             response= await api.post('/login',data);
       } 
       catch (error) {
             return error;
       }

       return response;
};

export const signup = async (data) => {
    let response;
  
    try {
      response = await api.post("/register", data);
    } catch (error) {
      return error;
    }
  
    return response;
  };

  export const signout = async () => {
    let response;
  
    try {
      response = await api.post("/logout");
    } catch (error) {
      return error;
    }
  
    return response;
  };

  export const getAllBlogs = async () => {
    let response;

    try {
      response = await api.get("/blog/all");
    } catch (error) {
      
    }
    return response
  }

  export const submitBlog = async (data) => {
    let response;
  
    try {
      response = await api.post("/blog", data);
    } catch (error) {
      return error;
    }
  
    return response;
  };

  export const getBlogById = async (id) => {
    let response;
    try {
      response = await api.get(`/blog/${id}`)
    } catch (error) {
      return error;
    }
    return response;
  }

  export const getCommentsById = async (id) =>{
    let response;

    try {
      response = await api.get(`/comment/${id}`,{
        validateStatus: false
      })
    } catch (error) {
      return error;
    }
    return response;
  }

  export const postComment = async (data) => {
    let response;
    try {
      response = await api.post('/comment',data)
    } catch (error) {
       return error;
    }
    return response;
  }

  export const deleteBlog = async (id) => {
   let response;
   try {
    response = await api.delete(`/blog/${id}`);
   } catch (error) {
    return error;
   }
   return response;
  }

  export const updateBlog = async (data) => {
    let response;
    try {
      response = await api.put("/blog", data);
    } catch (error) {
      return error;
    }
    return response;
  }
  // auto token refresh

// /protected-resource -> 401
// /refresh -> authenthicated state
// /protected-resource

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    // extract the value of message from json response if it exists
    const errorMessage = error.response && error.response.data && error.response.data.message;

    if (
      errorMessage === 'Unauthorized' &&
			(error.response.status === 401 || error.response.status === 500) &&
			originalReq &&
			!originalReq._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (error) {
        return error;
      }
    }
    throw error;
  }
);
