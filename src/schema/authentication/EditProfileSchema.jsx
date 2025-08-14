import * as Yup from "yup";

export const EditProfileSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .test(
      "not-empty-after-trim",
      "Name cannot be empty or just spaces.",
      (value) => value?.trim().length > 0
    )
    .test("no-leading-space", "Name cannot start with a space.", (value) =>
      value ? !value.startsWith(" ") : true
    )
    .test(
      "no-multiple-spaces",
      "Name cannot contain multiple spaces.",
      (value) => (value ? !/ {2,}/.test(value) : true)
    )
    .test("no-numbers", "First name cannot contain numbers.", (value) =>
      value ? !/\d/.test(value) : true
    )
    .test(
      "first-letter-uppercase",
      "First letter must be uppercase.",
      (value) => (value ? /^[A-Z]/.test(value.trim()) : true)
    ),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^\d{10,15}$/, "Phone number must be between 10 to 15 digits")
    .required("Phone number is required"),
  // profilePic: Yup.mixed()
  //   .nullable()
  //   .required("Profile picture is required")
  //   .test("fileType", "Only image files are allowed", (value) => {
  //     return (
  //       value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
  //     );
  //   }),
});
