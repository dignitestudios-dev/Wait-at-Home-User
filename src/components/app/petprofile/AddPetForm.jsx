import React, { useState } from "react";
import GlobalInputs from "../../global/GlobalInputs";
import { IoChevronDown } from "react-icons/io5";
import GlobalButton from "../../global/GlobalButton";
import { useFormik, FieldArray, Formik } from "formik";
import { AddPet } from "../../../init/app/PetForm";
import { RxCross2 } from "react-icons/rx";
import { AddPetSchema } from "../../../schema/app/PetFormSchema";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../global/Toaster";

const AddPetForm = ({
  isOpen,
  onClose,
  setAddPetSuccess,
  setAddPetModal,
  setUpdate,
}) => {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);
  return (
    <Formik
      initialValues={AddPet}
      validationSchema={AddPetSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        setLoading(true);
        try {
          // Array of pets as payload
          const payload = {
            pet: values.pets.map((pet) => ({
              petName: pet.petName,
              petBreed: pet.petBreed,
              petType: pet.petType,
              petAge: Number(pet.petAge),
              symptoms: pet.petDiscription,
            })),
          };

          const response = await axios.post("/user/add-pet", payload); // backend should accept array
          if (response.status === 200) {
            SuccessToast(response.data.message);
            setUpdate((prev) => !prev);
            setAddPetModal(false);
            setAddPetSuccess(true);
            resetForm();
          }
        } catch (error) {
          ErrorToast(error.response?.data?.message || "Something went wrong");
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
      }) => (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="relative bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] rounded-2xl w-[471px] max-w-xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between border-b border-[#FFFFFF] pb-2 ">
              <h2 className="text-[18px] font-[600] text-[#212121] mb-2 ">
                Add Pet Information
              </h2>
              <button
                onClick={onClose}
                className=" h-[36px] w-[36px] flex justify-center items-center rounded-full right-4 text-xl font-bold text-gray-700 hover:text-black"
              >
                <RxCross2 />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <FieldArray name="pets">
                {(arrayHelpers) => (
                  <>
                    {values.pets.map((pet, index) => (
                      <div key={index} className="mb-4 border-b pb-4">
                        <GlobalInputs
                          placeholder="Enter Pet’s Name"
                          value={pet.petName}
                          type="text"
                          name={`pets.${index}.petName`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.pets?.[index]?.petName}
                          touched={touched.pets?.[index]?.petName}
                          max={50}
                        />

                        <div className="relative w-full mb-2">
                          <select
                            value={pet.petType}
                            onChange={handleChange}
                            name={`pets.${index}.petType`}
                            onBlur={handleBlur}
                            className={`appearance-none w-full rounded-xl px-4 py-3 h-[49px] pr-10 text-[14px] bg-white text-[#616161] border ${
                              errors.pets?.[index]?.petType &&
                              touched.pets?.[index]?.petType
                                ? "border-red-500 ring-1 ring-red-500"
                                : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                            }`}
                          >
                            <option value="">Select Pet Type</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="other">Other</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#616161]">
                            <IoChevronDown />
                          </div>
                          {errors.pets?.[index]?.petType &&
                            touched.pets?.[index]?.petType && (
                              <p className="text-red-500 text-[12px] mt-1 font-medium">
                                {errors.pets[index].petType}
                              </p>
                            )}
                        </div>

                        <GlobalInputs
                          placeholder="Enter Pet Breed"
                          value={pet.petBreed}
                          type="text"
                          name={`pets.${index}.petBreed`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.pets?.[index]?.petBreed}
                          touched={touched.pets?.[index]?.petBreed}
                        />

                        <GlobalInputs
                          placeholder="Enter Pet Age"
                          value={pet.petAge}
                          type="text"
                          name={`pets.${index}.petAge`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.pets?.[index]?.petAge}
                          touched={touched.pets?.[index]?.petAge}
                        />

                        <textarea
                          name={`pets.${index}.petDiscription`}
                          placeholder="Enter Symptoms or Reasons for the visit"
                          value={pet.petDiscription}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`bg-white w-full rounded-[20px] h-[113px] px-4 py-4 ${
                            errors.pets?.[index]?.petDiscription &&
                            touched.pets?.[index]?.petDiscription
                              ? "border-red-500 ring-1 ring-red-500"
                              : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                          }`}
                        />
                        {errors.pets?.[index]?.petDiscription &&
                          touched.pets?.[index]?.petDiscription && (
                            <p className="text-red-500 text-[12px] mt-1 font-medium">
                              {errors.pets[index].petDiscription}
                            </p>
                          )}

                        {index > 0 && (
                          <button
                            type="button"
                            className="text-red-500 mt-2"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <div className="w-[200px]">
                        <GlobalButton
                          onClick={() =>
                            arrayHelpers.push({
                              petName: "",
                              petType: "",
                              petBreed: "",
                              petAge: "",
                              petDiscription: "",
                            })
                          }
                          children={" + Add More"}
                          
                        />
                      </div>
                    </div>
                  </>
                )}
              </FieldArray>

              <GlobalButton
                type="submit"
                children={"Add Pets"}
                loading={isSubmitting}
              />
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddPetForm;
