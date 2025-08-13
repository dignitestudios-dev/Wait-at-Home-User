import * as Yup from "yup";


export const ChatFormShema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter Title")
    .min(2, "Title must be at least 2 characters"),

  description: Yup.string()
    .required("Please describe your issue")
    .min(10, "Description must be at least 10 characters"),
});