import React, { useState } from "react";
import GlobalInputs from "../../global/GlobalInputs";
import { IoChevronDown } from "react-icons/io5";
import GlobalButton from "../../global/GlobalButton";
import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { AddPetSchema } from "../../../schema/app/PetFormSchema";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
import { petBreeds } from "../../../static/StaticData";
const EditPetForm = ({
  isOpen,
  onClose,
  setEditPetSuccess,
  setEditPetModal,
  petData,
  setUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      petName: petData?.name || "",
      petType: petData?.type || "",
      petBreed: petData?.breed || "",
      petAge: petData?.age || "",
      petDiscription: petData?.symptoms || "",
    },
    validationSchema: AddPetSchema,

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          petName: values.petName,
          petBreed: values.petBreed,
          petType: values.petType,
          petAge: values.petAge,
          symptoms: values.symptoms,
        };
        const response = await axios.post("/user/update-user-profile", payload);
        if (response.status === 200) {
          SuccessToast("Pet Profile Updated");
          setEditPetModal(false);
          setEditPetSuccess(true);
          setUpdate((prev) => !prev);
        }
      } catch (error) {
        ErrorToast(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });
  const availableBreeds = petBreeds[values.petType] || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-gradient-to-br  from-[#A0E6E1] to-[#C3B4D3] rounded-2xl w-[471px] max-w-xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex  justify-between border-b border-[#FFFFFF] pb-2 ">
          <h2 className="text-[18px] font-[600] text-[#212121] mb-2 ">
            Edit Pet Information
          </h2>
          <button
            onClick={onClose}
            className=" h-[36px] w-[36px]  flex justify-center items-center rounded-full right-4 text-xl font-bold text-gray-700 hover:text-black"
          >
            <RxCross2 />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <GlobalInputs
            placeholder="Enter Pet’s Name"
            value={values.petName}
            type="text"
            name="petName"
            id="petName"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.petName}
            touched={touched.petName}
            max={50}
          />
          <div className="relative w-full">
            <select
              value={values.petType}
              onChange={(e) => {
                handleChange(e);
                setFieldValue("petBreed", ""); // reset breed when type changes
              }}
              name="petType"
              id="petType"
              onBlur={handleBlur}
              className={`appearance-none w-full rounded-xl px-4 py-3 h-[49px] pr-10 text-[14px] bg-white text-[#616161] border placeholder:text-gray-400 outline-none transition ${
                errors.petType && touched.petType
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
            {errors.petType && touched && (
              <p className="text-red-500 text-[12px] mt-1 font-medium">
                {errors.petType}
              </p>
            )}
          </div>
          <div className="relative w-full">
            <select
              value={values.petBreed}
              onChange={handleChange}
              name="petBreed"
              id="petBreed"
              onBlur={handleBlur}
              disabled={!values.petType}
              className={`appearance-none w-full rounded-xl px-4 py-3 h-[49px] pr-10 text-[14px] bg-white text-[#616161] border placeholder:text-gray-400 outline-none transition ${
                errors.petBreed && touched.petBreed
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
              }`}
            >
              <option value="">
                {values.petType ? "Select Breed" : "Select Pet Type First"}
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
            {errors.petBreed && touched.petBreed && (
              <p className="text-red-500 text-[12px] mt-1 font-medium">
                {errors.petBreed}
              </p>
            )}
          </div>

          <GlobalInputs
            placeholder="Enter Pet Age"
            value={values.petAge}
            type="text"
            name="petAge"
            id="petAge"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.petAge}
            touched={touched.petAge}
          />
          <textarea
            name="petDiscription"
            placeholder="Enter Symptoms or Reasons for the visit"
            id="petDiscription"
            value={values.petDiscription}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={250}
            className={`bg-white w-full rounded-[20px] h-[113px] px-4 py-4 ${
              errors.petDiscription && touched.petDiscription
                ? "border-red-500 ring-1 ring-red-500"
                : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
            } `}
          ></textarea>
          {errors.petDiscription && touched.petDiscription && (
            <p className="text-red-500 text-[12px] mt-1 font-medium">
              {errors.petDiscription}
            </p>
          )}

          <div className="pt-4">
            <GlobalButton type="submit" loading={loading} children={"Update"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPetForm;
