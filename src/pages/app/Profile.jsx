import React, { useContext, useState } from "react";
import ProfileSidebar from "../../components/app/profile/ProfileSidebar";
import MainContentPorfile from "../../components/app/profile/MainContentPorfile";
import SettingMainContent from "../../components/app/accountsetting/SettingMainContent";
import EditProfileModal from "../../components/app/profile/EditProfileModal";
import ProfileUpdated from "../../components/app/profile/ProfileUpdated";
import AddPetForm from "../../components/app/petprofile/AddPetForm";
import AddPetSuccess from "../../components/app/petprofile/AddPetSuccess";
import EditPetForm from "../../components/app/petprofile/EditPetForm";
import RemovePet from "../../components/app/profile/RemovePet";
import { AppContext } from "../../context/AppContext";
import { useGlobal } from "../../hooks/api/Get";
import { ProfileInfoSkeleton } from "../../components/global/Skeleton";

const Profile = () => {
  const { userData, handleLogOut } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [editModal, setEditModal] = useState(false);
  const [updatedEdit, setUpdatedEdit] = useState(false);
  const [addPetModal, setAddPetModal] = useState(false);
  const [addPetSuccess, setAddPetSuccess] = useState(false);
  const [editPetModal, setEditPetModal] = useState(false);
  const [editPetSuccess, setEditPetSuccess] = useState(false);
  const [deletePet, setDeletePet] = useState(false);
  const [deletePetSuccess, setDeletePetSuccess] = useState(false);
  const { loading, data } = useGlobal("/user/get-user-profile");
  console.log(data, "data");
  return (
    <div className="flex min-h-screen border border-white/20 rounded-[30px]  bg-[#83c9ce]">
      <ProfileSidebar
        handleLogOut={handleLogOut}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
      />
      <div className="flex-1 p-4 md:p-6 lg:p-10">
        {loading ? (
          <ProfileInfoSkeleton />
        ) : (
          <>
            {activeTab === "profile" && (
              <MainContentPorfile
                userProfileData={data}
                setEditModal={setEditModal}
                setAddPetModal={setAddPetModal}
                setEditPetModal={setEditPetModal}
                setDeletePet={setDeletePet}
              />
            )}
            {activeTab === "setting" && <SettingMainContent />}
          </>
        )}
      </div>
      <EditProfileModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        setUpdatedEdit={setUpdatedEdit}
        setEditModal={setEditModal}
      />
      <ProfileUpdated
        isOpen={updatedEdit}
        onClose={() => setUpdatedEdit(false)}
      />
      <AddPetForm
        onClose={() => setAddPetModal(false)}
        isOpen={addPetModal}
        setAddPetModal={setAddPetModal}
        setAddPetSuccess={setAddPetSuccess}
      />
      <AddPetSuccess
        onClose={() => setAddPetSuccess(false)}
        isOpen={addPetSuccess}
        text={"Pet Profile Added"}
        para={"New Pet Profile has been added successfully"}
      />
      <EditPetForm
        onClose={() => setEditPetModal(false)}
        isOpen={editPetModal}
        setEditPetModal={setEditPetModal}
        setEditPetSuccess={setEditPetSuccess}
      />
      <AddPetSuccess
        onClose={() => setEditPetSuccess(false)}
        isOpen={editPetSuccess}
        text={"Pet Profile Updated"}
        para={"Your Pet Profile Info has been updated successfully"}
      />
      <RemovePet
        onClose={() => setDeletePet(false)}
        isOpen={deletePet}
        handleCLick={() => {
          setDeletePet(false);
          setDeletePetSuccess(true);
        }}
      />
      <AddPetSuccess
        onClose={() => setDeletePetSuccess(false)}
        isOpen={deletePetSuccess}
        text={"Profile Deleted"}
        para={"Your Pet Profile has been delete successfully"}
      />
    </div>
  );
};

export default Profile;
