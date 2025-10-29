import * as Yup from "yup";

export const loginvalidation = Yup.object().shape({
  username: Yup.string().required("User Name is required"),
  password: Yup.string().required("Password is required"),
});
