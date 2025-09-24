import React from "react";
import GlobalInputs from "../../global/GlobalInputs";
import { IoChevronDown } from "react-icons/io5";
import GlobalButton from "../../global/GlobalButton";
import { Form, FieldArray } from "formik";
import { RxCross2 } from "react-icons/rx";
import { petBreeds } from "../../../static/StaticData";

const AddNewPet = ({
  isOpen,
  onClose,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  values,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] rounded-2xl w-[471px] max-w-xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between border-b border-[#FFFFFF] pb-2">
          <h2 className="text-[18px] font-[600] text-[#212121] mb-2">
            Add Pet Information
          </h2>
          <button
            onClick={onClose}
            className="h-[36px] w-[36px] flex justify-center items-center rounded-full text-xl font-bold text-gray-700 hover:text-black"
          >
            <RxCross2 />
          </button>
        </div>

        {/* ✅ Formik Form */}
        <Form className="space-y-3 mt-4" onSubmit={handleSubmit}>
          <FieldArray
            name="pets"
            render={(arrayHelpers) => (
              <>
                {values.pets.map((pet, index) => {
                  const availableBreeds = petBreeds[pet.petType] || [];
                  return (
                    <div key={index} className="mb-2 border-b pb-2">
                      {/* Pet Name */}
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

                      {/* Pet Breed - Dynamic */}
                      <div className="relative w-full mb-2">
                        <select
                          value={pet.petBreed}
                          onChange={handleChange}
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
                              : "Select Pet Type First"}
                          </option>
                          {availableBreeds.map((breed, i) => (
                            <option key={i} value={breed}>
                              {breed}
                            </option>
                          ))}
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

                      {/* Pet Age */}
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

                      {/* Pet Description */}
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

                {/* Add More Button */}
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    className="bg-[#10C0B6] text-white rounded-lg h-[40px] px-4"
                    onClick={() =>
                      arrayHelpers.push({
                        petName: "",
                        petType: "",
                        petBreed: "",
                        petAge: "",
                        petDiscription: "",
                      })
                    }
                  >
                    + Add More
                  </button>
                </div>
              </>
            )}
          />

          {/* Submit Button */}
          <div className="pt-4">
            <GlobalButton type="submit" children={"Add Pets"} loading={loading} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddNewPet;
