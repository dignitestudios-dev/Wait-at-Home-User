import * as Yup from "yup";

export const EditProfileSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^\d{10,15}$/, "Phone number must be between 10 to 15 digits")
    .required("Phone number is required"),
  profilePic: Yup.mixed()
    .nullable()
    .required("Profile picture is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),
});
