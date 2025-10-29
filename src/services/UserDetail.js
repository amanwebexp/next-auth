import ApiClient from "./baseapi"; // 🧩 Import the configured Axios instance
// userDetail service handles all user and product API requests
const userDetail = {
    // Fetch all users
  getAllUser: () => {
    return ApiClient().get("/user");  
  },
   // Fetch all products
  getAllProduct:()=>{
    return ApiClient().get('/products')
  },

  // Fetch a single product by ID
  getSingleProduct: (id)=>{
    return ApiClient().get(`/products/${id}`)
  }
};

export default userDetail;
