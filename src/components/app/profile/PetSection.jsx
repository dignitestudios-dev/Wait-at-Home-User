import React from "react";
import { EditIcon, IconCat, IconDog, PlusIcon } from "../../../assets/export";
import { LuTrash } from "react-icons/lu";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../global/Toaster";

const PetSection = ({
  setAddPetModal,
  setEditPetModal,
  setDeletePet,
  petProfileData,
  setSelectedPet,
  setUpdate,
}) => {
  return (
    <div>
      <h3 className="text-[18px] font-[600] text-[#000000] mb-3">
        Pet Profiles
      </h3>
      <div className="flex flex-wrap gap-4 mb-6">
        {petProfileData?.pets?.map((pet, idx) => (
          <div
            key={idx}
            className="bg-[#c7d9df] backdrop-blur rounded-2xl px-4 py-3 flex items-center gap-4 shadow-md w-full max-w-xs"
          >
            <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-b from-[#10C0B6] to-[#684D7B] flex items-center justify-center">
              <img src={IconDog} className="w-[27px] h-[27px] " alt="" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm inline-block max-w-[110px] truncate align-middle">
                {pet.petName}
              </p>
              <p className="text-[14px] text-[#565656] font-[500] ">
                {pet?.petType}
                {"  "}
                {pet?.petAge} Yrs
              </p>
            </div>
            <div className="flex gap-2 cursor-pointer">
              <img
                onClick={() => {
                  {
                    setSelectedPet(pet);
                    setEditPetModal(true);
                  }
                }}
                src={EditIcon}
                className="w-[20px] h-[20px] "
                alt=""
              />
              <div
                onClick={() => {
                  setSelectedPet(pet);
                  setDeletePet(true);
                }}
              >
                <LuTrash className="text-red-500 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setAddPetModal(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#c7d9df] text-[14px] font-[500]  max-w-xs px-4 py-3  rounded-[20px] text-cyan-700 hover:bg-cyan-50"
        >
          <img src={PlusIcon} className="w-[16.67px] h-[16.67px] " alt="" /> Add
          Pet Profile
        </button>
      </div>
    </div>
  );
};

export default PetSection;
