import * as Yup from "yup";
export const AddPetSchema = Yup.object({
  petName: Yup.string()
    .required("Please enter your pet's name")
    .min(2, "Pet name must be at least 2 characters"),

  petType: Yup.string().required("Please select your pet type"),

  petBreed: Yup.string().required("Please enter your pet's breed"),

  petAge: Yup.number()
    .typeError("Pet age must be a number")
    .required("Please enter your pet's age")
    .min(0, "Pet age cannot be negative"),
});
