import ApiClient from "./baseapi";
const userDetail = {
  getAllUser: () => {
    return ApiClient().get("/user");  
  },
  getAllProduct:()=>{
    return ApiClient().get('/products')
  },
  getSingleProduct: (id)=>{
    return ApiClient().get(`/products/${id}`)
  }
};

export default userDetail;
