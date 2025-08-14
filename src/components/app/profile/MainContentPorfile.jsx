import React from "react";
import { FaPen, FaTrash, FaCat, FaDog } from "react-icons/fa";
import {
  Adstwo,
  EditIcon,
  IconCat,
  IconDog,
  PlusIcon,
  Pro9,
} from "../../../assets/export";
import { LuTrash } from "react-icons/lu";
import PetSection from "./PetSection";
import ProfileInfo from "./ProfileInfo";

const MainContentPorfile = ({
  setEditModal,
  setAddPetModal,
  setEditPetModal,
  setDeletePet,
  userProfileData,
  setSelectedPet,
  setUpdate,
}) => {
  return (
    <div className="">
      <ProfileInfo
        userProfileData={userProfileData}
        setEditModal={setEditModal}
      />
      <PetSection
      setUpdate={setUpdate}
        petProfileData={userProfileData}
        setAddPetModal={setAddPetModal}
        setEditPetModal={setEditPetModal}
        setDeletePet={setDeletePet}
        setSelectedPet={setSelectedPet}
      />
      <div className="rounded-2xl overflow-hidden shadow-md ">
        <img src={Adstwo} alt="Ads" className="w-full h-[232px] object-cover" />
      </div>
    </div>
  );
};

export default MainContentPorfile;
