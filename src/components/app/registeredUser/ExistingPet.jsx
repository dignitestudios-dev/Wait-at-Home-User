import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IconDog, RadioActive, RadioInactive } from "../../../assets/export";
import GlobalButton from "../../global/GlobalButton";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
import { AppContext } from "../../../context/AppContext";
const ExistingPet = ({
  isOpen,
  onClose,
  profileData,
  setExistingPet,
  setVirtualListModal,
  setUpdate,
}) => {
  if (!isOpen) return null;
  const { Auth } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({ pet: "", reason: "" });
  const [loading, setLoading] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const handlePetClick = (idx, petId) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
    setSelectedPetId(petId);
    setReason("");
    setErrors({ pet: "", reason: "" });
  };

  const handleContinue = async () => {
    let newErrors = { pet: "", reason: "" };
    let hasError = false;

    if (activeIndex === null) {
      newErrors.pet = "Please select a pet.";
      hasError = true;
    }
    if (!reason.trim()) {
      newErrors.reason = "Please provide a reason for the visit.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log("Continue with:", {
        pet: profileData?.pets[activeIndex],
        reason,
      });
      setLoading(true);

      try {
        const payload = {
          AppointmentDate: new Date().toISOString().split("T")[0],
          AppointmentTime: new Date(),
          notes: "Hello",
          petId: selectedPetId,
        };
        const response = await axios.post("/user/create-appointment", payload);
        if (response?.status === 200) {
          SuccessToast(response?.data?.message);
          Auth(response?.data);
          setExistingPet(false);
          setVirtualListModal(true);
          setUpdate((prev) => !prev);
        }
      } catch (error) {
        ErrorToast(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] w-[471px] p-6 rounded-3xl shadow-lg relative text-gray-800 flex flex-col">
          <div className="flex justify-between border-b border-[#FFFFFF] pb-5">
            <h2 className="text-[18px] font-[600] text-[#212121] mb-2">
              Enrollment
            </h2>
            <button
              onClick={onClose}
              className="h-[36px] w-[36px] bg-white flex justify-center items-center rounded-full right-4 text-xl font-bold text-gray-700 hover:text-black"
            >
              <RxCross2 />
            </button>
          </div>

          {profileData?.pets?.map((pet, idx) => (
            <div key={idx}>
              <div className="bg-[#c9dee3] mt-4 backdrop-blur rounded-2xl px-4 py-3 flex items-center gap-4 w-full">
                <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-b from-[#10C0B6] to-[#684D7B] flex items-center justify-center">
                  <img src={IconDog} className="w-[27px] h-[27px]" alt="" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800 text-sm inline-block max-w-[110px] truncate align-middle">
                      {pet?.petName}
                    </p>
                    <div onClick={() => handlePetClick(idx, pet?._id)}>
                      <img
                        src={activeIndex === idx ? RadioActive : RadioInactive}
                        className="w-[20px] h-[20px] cursor-pointer"
                        alt=""
                      />
                    </div>
                  </div>
                  <p className="text-[14px] text-[#565656] font-[500]">
                    {pet?.petType} {pet?.petAge} Yrs
                  </p>
                </div>
              </div>
              {errors.pet && (
                <p className="text-red-500 text-sm mt-2">{errors.pet}</p>
              )}
              {activeIndex === idx && (
                <>
                  <textarea
                    name="petDescription"
                    placeholder="Enter Symptoms or Reasons for the visit"
                    id={`petDescription-${idx}`}
                    maxLength={250}
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                      if (errors.reason) {
                        setErrors((prev) => ({ ...prev, reason: "" }));
                      }
                    }}
                    className={`bg-white mt-4 w-full rounded-[20px] h-[113px] px-4 py-4 border ${
                      errors.reason
                        ? "border-red-500 ring-1 ring-red-500"
                        : "focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                    }`}
                  ></textarea>
                  {errors.reason && (
                    <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
                  )}
                </>
              )}
            </div>
          ))}

          <div className="mt-10 space-y-6">
            <h2 className="text-[#00000080] text-[18px] cursor-pointer font-[600] text-center ">
              Add new profile
            </h2>
            <GlobalButton
              loading={loading}
              children={"Continue"}
              onClick={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExistingPet;
