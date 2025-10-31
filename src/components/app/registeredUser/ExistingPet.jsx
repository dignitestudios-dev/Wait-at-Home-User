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
  setAddPetModal,
}) => {
  if (!isOpen) return null;
  const { Auth } = useContext(AppContext);

  const [selectedPets, setSelectedPets] = useState([]); // array of selected pet ids
  const [petDescriptions, setPetDescriptions] = useState({}); // { petId: description }
  const [errors, setErrors] = useState({ pets: "", reasons: {} });
  const [loading, setLoading] = useState(false);

  const handlePetClick = (petId) => {
    setErrors({ pets: "", reasons: {} });
    if (selectedPets.includes(petId)) {
      setSelectedPets(selectedPets.filter((id) => id !== petId));
      setPetDescriptions((prev) => {
        const copy = { ...prev };
        delete copy[petId];
        return copy;
      });
    } else {
      setSelectedPets([...selectedPets, petId]);
    }
  };

  const handleDescriptionChange = (petId, value) => {
    setPetDescriptions((prev) => ({ ...prev, [petId]: value }));
    setErrors((prev) => ({
      ...prev,
      reasons: { ...prev.reasons, [petId]: "" },
    }));
  };

  const handleContinue = async () => {
    let hasError = false;
    let newErrors = { pets: "", reasons: {} };

    if (selectedPets.length === 0) {
      newErrors.pets = "Please select at least one pet.";
      hasError = true;
    }

    selectedPets.forEach((petId) => {
      if (!petDescriptions[petId]?.trim()) {
        newErrors.reasons[petId] = "Please provide a reason for this pet.";
        hasError = true;
      }
    });

    setErrors(newErrors);

    if (!hasError) {
      setLoading(true);
      try {
        const payload = {
          AppointmentDate: new Date().toISOString().split("T")[0],
          AppointmentTime: new Date(),
          notes: "Multiple pets booking",
          petId: selectedPets.map((petId) => ({
            petId,
            symptoms: petDescriptions[petId],
          })),
        };

        const response = await axios.post("/user/create-appointment", payload);
        if (response.status === 200) {
          SuccessToast(response.data.message);
          Auth(response?.data); 
          setExistingPet(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] w-[471px] p-6 rounded-3xl shadow-lg relative text-gray-800 flex flex-col">
        <div className="flex justify-between border-b border-[#FFFFFF] pb-5">
          <h2 className="text-[18px] font-[600] text-[#212121] mb-2">
            Join Wait at Home
          </h2>
          <button
            onClick={onClose}
            className="h-[36px] w-[36px] bg-white flex justify-center items-center rounded-full right-4 text-xl font-bold text-gray-700 hover:text-black"
          >
            <RxCross2 />
          </button>
        </div>
        {errors.pets && (
          <p className="text-red-500 text-sm mt-1 mx-4">{errors.pets}</p>
        )}
        <div className="custom-scrollbar overflow-y-auto h-[420px] p-2">
          {profileData?.pets?.map((pet) => (
            <div key={pet.id} className="mb-4">
              <div className="bg-[#c9dee3] backdrop-blur rounded-2xl px-4 py-3 flex items-center gap-4 w-full">
                <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-b from-[#10C0B6] to-[#684D7B] flex items-center justify-center">
                  <img src={IconDog} className="w-[27px] h-[27px]" alt="" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800 text-sm truncate max-w-[110px]">
                      {pet?.name}
                    </p>
                    <img
                      src={
                        selectedPets.includes(pet.id)
                          ? RadioActive
                          : RadioInactive
                      }
                      className="w-[20px] h-[20px] cursor-pointer"
                      alt=""
                      onClick={() => handlePetClick(pet.id)}
                    />
                  </div>
                  <p className="text-[14px] text-[#858585] font-[500]">
                    {pet?.breed} {pet?.age} Yrs
                  </p>
                </div>
              </div>

              {selectedPets.includes(pet.id) && (
                <textarea
                  placeholder="Reason for the visit"
                  maxLength={250}
                  value={petDescriptions[pet.id] || ""}
                  onChange={(e) =>
                    handleDescriptionChange(pet.id, e.target.value)
                  }
                  className={`bg-white mt-2 w-full rounded-[20px] h-[113px] px-4 py-4 focus:outline-none ${
                    errors.reasons[pet.id]
                      ? "border border-red-500 ring-1 ring-red-500"
                      : "focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                  }`}
                />
              )}
              {errors.reasons[pet.id] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reasons[pet.id]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <h2
            onClick={() => {
              setExistingPet(false);
              setAddPetModal(true);
            }}
            className="text-[#00000080] text-[18px] cursor-pointer font-[600] text-center"
          >
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
  );
};

export default ExistingPet;
