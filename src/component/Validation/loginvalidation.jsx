import * as Yup from "yup";

export const loginvalidation = Yup.object().shape({
  password: Yup.string().required("Password is required"),
})
