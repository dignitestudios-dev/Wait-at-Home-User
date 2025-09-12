import * as Yup from "yup";

export const EnrollmentPersonalSchema = Yup.object({
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
    .required("Email is required")
    .test("no-leading-space", "Email cannot start with a space.", (value) =>
      value ? value[0] !== " " : false
    )
    .test(
      "no-internal-or-trailing-space",
      "Email cannot contain spaces.",
      (value) => (value ? value.trim() === value && !/\s/.test(value) : false)
    )
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format."),

  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10 digits"),
});


export const EnrollmentPetSchema = Yup.object({
  pets: Yup.array().of(
    Yup.object().shape({
      petName: Yup.string()
        .required("Pet Name is required.")
        .test(
          "not-empty-after-trim",
          "Pet Name cannot be empty or just spaces.",
          (value) => value?.trim().length > 0
        )
        .test("no-leading-space", "Pet Name cannot start with a space.", (value) =>
          value ? !value.startsWith(" ") : true
        )
        .test(
          "no-multiple-spaces",
          "Pet Name cannot contain multiple spaces.",
          (value) => (value ? !/ {2,}/.test(value) : true)
        )
        .test("no-numbers", "Pet Name cannot contain numbers.", (value) =>
          value ? !/\d/.test(value) : true
        )
        .test(
          "first-letter-uppercase",
          "First letter must be uppercase.",
          (value) => (value ? /^[A-Z]/.test(value.trim()) : true)
        ),

      petType: Yup.string().required("Please select your pet type"),
      petBreed: Yup.string().required("Please enter your pet's breed"),
      petAge: Yup.number()
        .typeError("Pet age must be a number")
        .required("Please enter your pet's age")
        .min(0, "Pet age cannot be negative"),
      petDiscription: Yup.string()
        .required("Please describe your pet")
        .min(10, "Description should be at least 10 characters"),
    })
  ),
  password: Yup.string().matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character"
  ),
});
