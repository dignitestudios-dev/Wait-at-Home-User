import React from "react";
import { FieldArray, Form } from "formik";
import GlobalInputs from "../../global/GlobalInputs";
import { IoChevronDown } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import GlobalButton from "../../global/GlobalButton";
import { petBreeds } from "../../../static/staticData";

const PetInfo = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  handleSubmit,
  passwordError,
  checked,
  setChecked,
  setFieldValue,
  loading,
}) => {
  return (
    <div className="mt-6">
      <Form>
        <div className="px-1 pt-3 custom-scrollbar overflow-y-auto h-[450px] ">
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
                <div className="flex justify-end">
                  <button
                    type="button"
                    className=" bg-[#10C0B6] text-white rounded-lg h-[34px] w-[120px]"
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

          {/* Save Info Checkbox */}
          <div className="flex items-center mb-3  gap-2 px-2 text-[14px] text-[#6B6B6B] mt-4">
            <label className="relative cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <div className="flex items-center gap-2 text-[14px] text-[#6B6B6B]">
                <div
                  className={`w-[24px] h-[24px] rounded-[6px] border border-[#6B6B6B] cursor-pointer flex items-center justify-center transition-all ${
                    checked ? "bg-[#10C0B6] border-[#10C0B6]" : "bg-transparent"
                  }`}
                  onClick={() => {
                    setChecked(!checked);
                    setFieldValue("password", "");
                  }}
                >
                  {checked && <FaCheck size={14} color="#fff" />}
                </div>
                <span
                  onClick={() => {
                    setChecked(!checked);
                    setFieldValue("password", "");
                  }}
                  className="cursor-pointer"
                >
                  Save information for future use.
                </span>
              </div>
            </label>
          </div>

          {/* Password Input if checked */}
          {checked && (
            <div className="my-5">
              <GlobalInputs
                disabled={values.email}
                value={values.email}
                placeholder="Email"
              />
              <GlobalInputs
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id={"password"}
                name={"password"}
                placeholder="Password"
                type="password"
                max={50}
                error={errors.password}
                touched={touched.password}
              />
              {passwordError && !values.password && (
                <p className="text-red-500 text-[12px] mt-1 font-medium">
                  {passwordError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="absolute bottom-2 w-full right-0 left-0 p-3">
          <GlobalButton loading={loading} type="submit">
            Submit
          </GlobalButton>
        </div>
      </Form>
    </div>
  );
};

export default PetInfo;
