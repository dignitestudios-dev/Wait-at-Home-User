import * as Yup from "yup";

export const ChangepassSchema = Yup.object().shape({
  currentpassword: Yup.string().required("Please enter your current password"),

  newpassword: Yup.string()
    .min(6, "New password must be at least 6 characters long")
    .matches(
      /^(?!\s)(?!.*\s$)/,
      "New password must not begin or end with spaces"
    )
    .required("Please enter your new password"),

  confirmpassword: Yup.string()
    .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});
