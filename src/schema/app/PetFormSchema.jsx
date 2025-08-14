import * as Yup from "yup";
export const AddPetSchema = Yup.object({
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
});
