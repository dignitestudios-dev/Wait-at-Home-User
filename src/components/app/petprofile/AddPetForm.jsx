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
import { petBreeds } from "../../../static/StaticData";

const AddPetForm = ({
  isOpen,
  onClose,
  setAddPetSuccess,
  setAddPetModal,
  setUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [isOther, setIsOther] = useState({});
  if (!isOpen) return null;
  return (
    <Formik
      initialValues={AddPet}
      validationSchema={AddPetSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        setLoading(true);
        try {
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
        setFieldValue,
      }) => (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="relative bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] rounded-2xl w-[471px] max-w-xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between border-b border-[#FFFFFF] pb-2 ">
              <h2 className="text-[18px] font-[600] text-[#212121] mb-2 ">
                Tell us About Your Pet
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
                    {values.pets.map((pet, index) => {
                      const availableBreeds = petBreeds[pet.petType] || [];
                      const handleBreedChange = (e) => {
                        const value = e.target.value;
                        if (value === "Other") {
                          setIsOther((prev) => ({ ...prev, [index]: true }));
                          setFieldValue(`pets.${index}.petBreed`, "");
                        } else {
                          setIsOther((prev) => ({ ...prev, [index]: false }));
                          handleChange(e);
                        }
                      };
                      return (
                        <div key={index} className="mb-2 border-b pb-2">
                          {/* Pet Name */}
                          <GlobalInputs
                            placeholder="Pet’s Name"
                            value={pet.petName}
                            type="text"
                            name={`pets.${index}.petName`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.pets?.[index]?.petName}
                            touched={touched.pets?.[index]?.petName}
                            max={50}
                          />

                          {/* Pet Type */}
                          <div className="relative w-full mb-2">
                            <select
                              value={pet.petType}
                              onChange={(e) => {
                                handleChange(e);
                                // reset breed when type changes
                                setFieldValue(`pets.${index}.petBreed`, "");
                              }}
                              name={`pets.${index}.petType`}
                              onBlur={handleBlur}
                              className={`appearance-none w-full rounded-xl px-4 py-3 h-[49px] pr-10 text-[14px] bg-white text-[#616161] border ${
                                errors.pets?.[index]?.petType &&
                                touched.pets?.[index]?.petType
                                  ? "border-red-500 ring-1 ring-red-500"
                                  : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                              }`}
                            >
                              <option value="">Pet Type</option>
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

                          {/* Pet Breed - Dynamic */}
                          {/* <div className="relative w-full mb-2">
                            <select
                              value={isOther[index] ? "Other" : pet.petBreed}
                              onChange={handleBreedChange}
                              name={`pets.${index}.petBreed`}
                              onBlur={handleBlur}
                              disabled={!pet.petType}
                              className={`appearance-none w-full rounded-xl px-4 py-3 h-[49px] pr-10 text-[14px] bg-white text-[#616161] border ${
                                errors.pets?.[index]?.petBreed &&
                                touched.pets?.[index]?.petBreed
                                  ? "border-red-500 ring-1 ring-red-500"
                                  : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                              }`}
                            >
                              <option value="">
                                {pet.petType
                                  ? "Select Breed"
                                  : "Pet Type First"}
                              </option>
                              {availableBreeds.slice(0, 8).map((breed, i) => (
                                <option key={i} value={breed}>
                                  {breed}
                                </option>
                              ))}
                              {availableBreeds.length > 0 && (
                                <option value="Other">Other</option>
                              )}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#616161]">
                              <IoChevronDown />
                            </div>
                            {errors.pets?.[index]?.petBreed &&
                              touched.pets?.[index]?.petBreed && (
                                <p className="text-red-500 text-[12px] mt-1 font-medium">
                                  {errors.pets[index].petBreed}
                                </p>
                              )}
                          </div>

                          {isOther[index] && (
                            <input
                              type="text"
                              placeholder="Enter Breed"
                              value={pet.petBreed}
                              onChange={(e) =>
                                setFieldValue(
                                  `pets.${index}.petBreed`,
                                  e.target.value
                                )
                              }
                              className="w-full border rounded-lg p-2 mb-2"
                            />
                          )} */}
                          <div className="relative w-full mb-2">
                            <input
                              type="text"
                              placeholder={
                                pet.petType ? "Enter Breed" : "Pet Type First"
                              }
                              value={pet.petBreed}
                              name={`pets.${index}.petBreed`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`w-full rounded-xl px-4 py-3 h-[49px] text-[14px] bg-white text-[#616161] border ${
                                errors.pets?.[index]?.petBreed &&
                                touched.pets?.[index]?.petBreed
                                  ? "border-red-500 ring-1 ring-red-500"
                                  : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                              }`}
                            />
                            {errors.pets?.[index]?.petBreed &&
                              touched.pets?.[index]?.petBreed && (
                                <p className="text-red-500 text-[12px] mt-1 font-medium">
                                  {errors.pets[index].petBreed}
                                </p>
                              )}
                          </div>
                          {/* Pet Age */}
                          <GlobalInputs
                            placeholder="Age"
                            value={pet.petAge}
                            type="text"
                            name={`pets.${index}.petAge`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.pets?.[index]?.petAge}
                            touched={touched.pets?.[index]?.petAge}
                          />

                          {/* Pet Description */}
                          <textarea
                            name={`pets.${index}.petDiscription`}
                            placeholder="Reason for the visit"
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

                          {/* Remove Button */}
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
                      );
                    })}
                    {/* <div className="flex justify-end">
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
                    </div> */}
                  </>
                )}
              </FieldArray>

              <GlobalButton
                type="submit"
                children={"Continue"}
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
