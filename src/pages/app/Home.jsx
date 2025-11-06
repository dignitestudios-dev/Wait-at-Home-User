import React, { useContext, useEffect, useState } from "react";
import WaitingList from "../../components/app/home/WaitingList";
import CurrentlyServing from "../../components/app/home/CurrentlyServing";
import EstimatedTime from "../../components/app/home/EstimatedTime";
import JoinWaitList from "../../components/app/home/JoinWaitList";
import AdScreen from "../../components/app/home/AdScreen";
import TopSection from "../../components/app/home/TopSection";
import EnrollmentForms from "../../components/app/enrollmentForms/EnrollmentForms";
import AlmostThereModal from "../../components/app/enrollmentForms/AlmostThereModal";
import VerifyEmail from "../../components/app/enrollmentForms/VerifyEmail";
import VerifyPhone from "../../components/app/enrollmentForms/VerifyPhone";
import VirtualListModal from "../../components/app/enrollmentForms/VirtualListModal";
import ShiftRemindersModal from "../../components/app/enrollmentForms/ShiftRemindersModal";
import { Formik, useFormik } from "formik";
import { EnrollmentValues } from "../../init/authentication/EnrollmentValues";
import {
  EnrollmentPersonalSchema,
  EnrollmentPetSchema,
} from "../../schema/authentication/EnrollmentSchema";
import CancelEnrollment from "../../components/app/enrollmentForms/CancelEnrollment";
import CancelReason from "../../components/app/enrollmentForms/CancelReason";
import CancelSuccessFull from "../../components/app/enrollmentForms/CancelSuccessFull";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { useFetchById, useGlobal } from "../../hooks/api/Get";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import ExistingPet from "../../components/app/registeredUser/ExistingPet";
import AddNewPet from "../../components/app/registeredUser/AddNewPet";
import AddPetSuccess from "../../components/app/petprofile/AddPetSuccess";
import { AddPet } from "../../init/app/PetForm";
import { AddPetSchema } from "../../schema/app/PetFormSchema";
import GoogleAd from "../../components/global/GoogleAd";
const Home = () => {
  const {
    Auth,
    appointmentData,
    clearAllCookies,
    isPhoneVerified,
    isVerifiedEmail,
    petData,
    setIsVerifiedEmail,
    setIsPhoneVerified,
    userData,
    token,
    setPetData,
    fcmToken,
    setIsRestrictByAdmin,
  } = useContext(AppContext);

  const [step, setStep] = useState(1);
  const [formModal, setFormModal] = useState(false);
  const [almostThere, setAlmostThere] = useState(false);
  const [verifyEmailModal, setVerifyEmailModal] = useState(false);
  const [verifyPhonelModal, setVerifyPhonelModal] = useState(false);
  const [virtualListModal, setVirtualListModal] = useState(false);
  const [reminderShiftModal, setReminderShiftModal] = useState(false);
  const [cancelEnrollment, setCancelEnrollment] = useState(false);
  const [cancelReason, setCancelReason] = useState(false);
  const [cancelSuccessFull, setCancelSuccessFull] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isWaitList, setIsWaitList] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [checked, setChecked] = useState(false);
  const [cancelReasonDiscription, setCancelReasonDiscription] = useState("");
  const [errorReasonDiscription, setErrorReasonDiscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [existingPet, setExistingPet] = useState(false);
  const [addPetModal, setAddPetModal] = useState(false);
  const [addPetSuccess, setAddPetSuccess] = useState(false);
  const [creatAppoitmentLoading, setCreatAppoitmentLoading] = useState(false);
  const validateSchema =
    step == 1 ? EnrollmentPersonalSchema : EnrollmentPetSchema;
  const latestAppointment = Array.isArray(appointmentData)
    ? appointmentData[appointmentData.length - 1]
    : appointmentData;
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: EnrollmentValues,
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      const payload = {
        user: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: checked ? values.password : null,
          isUserRegistered: checked,
          role: "user",
          idToken: null,
          fcmToken: values.password ? fcmToken : null,
        },

        pets: values.pets.map((pet) => ({
          petName: pet.petName,
          petType: pet.petType,
          petBreed: pet.petBreed,
          age: pet.petAge,
          symptoms: pet.petDiscription,
        })),
      };

      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        if (checked && !values.password) {
          setPasswordError("Password Required");
        } else {
          setLoading(true);
          try {
            const response = await axios.post("/auth/signup", payload);
            if (response.status === 200) {
              SuccessToast(response?.data?.message);
              Auth(response?.data);
              setAlmostThere(true);
              setFormModal(false);
              setUpdate((prev) => !prev);
            }
          } catch (errors) {
            ErrorToast(errors.response.data.message);
          } finally {
            setLoading(false);
          }
        }
      }
    },
  });
  const handleCancelChange = (e) => {
    setCancelReasonDiscription(e.target.value);
    if (e.target.value.trim() !== "") {
      setErrorReasonDiscription("");
    }
  };

  const handleCancelSubmit = async (e) => {
    e.preventDefault();
    if (!cancelReasonDiscription.trim()) {
      setErrorReasonDiscription("Please fill in the description.");
      return;
    }

    const payload = {
      appointmentId: appointmentData?.map((item) => item?._id),
      cancelReason: cancelReasonDiscription,
    };
    if (!latestAppointment) {
      ErrorToast("No appointment found to cancel.");
      return;
    }
    setCancelLoading(true);
    try {
      const response = await axios.post(
        "/appointment/cancel-appointment",
        payload
      );
      if (response.status === 200) {
        SuccessToast(response.data.message);
        setCancelSuccessFull(true);
        setCancelReason(false);
        setUpdate((prev) => !prev);
        setCancelReasonDiscription("");
        setTimeout(() => {
          setCancelSuccessFull(false);
        }, 2000);
        if (userData?.isUserRegistered) {
          Cookies.remove("appointmentData");
          Cookies.remove("petData");
          setPetData(null);
        } else {
          clearAllCookies();
        }
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setCancelLoading(false);
    }
  };

  const handleCreateAppoitment = async () => {
    const payload = {
      AppointmentDate: new Date().toISOString().split("T")[0],
      AppointmentTime: new Date(),
      notes: "Hello",
      ...(petData && petData.length > 0
        ? {
            petId: petData.map((p) => ({ petId: p?._id })), // 👈 array of objects
          }
        : {
            pet: [
              {
                petName: petNewValues.petName,
                petType: petNewValues.petType,
                petBreed: petNewValues.petBreed,
                petAge: Number(petNewValues.petAge),
                symptoms: petNewValues.petDiscription,
              },
            ],
          }),
    };
    setCreatAppoitmentLoading(true);
    try {
      const response = await axios.post("/user/create-appointment", payload);
      if (response?.status === 200) {
        SuccessToast(response?.data?.message);
        Auth(response?.data);
        Cookies.remove("isPhoneVerified");
        Cookies.remove("isEmailVerified");
        setIsPhoneVerified(false);
        setIsVerifiedEmail(false);
        setAddPetModal(false);
        setExistingPet(false);

        setUpdate((prev) => !prev);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setCreatAppoitmentLoading(false);
    }
  };

  useEffect(() => {
    if (isPhoneVerified && isVerifiedEmail) {
      handleCreateAppoitment();
    }
  }, [isPhoneVerified, isVerifiedEmail]);

  const {
    values: petNewValues,
    handleBlur: handlePetBlur,
    handleChange: handlePetChange,
    handleSubmit: handlePetSubmit,
    errors: peterror,
    touched: petTouched,
    resetForm,
  } = useFormik({
    initialValues: AddPet,
    validationSchema: AddPetSchema,
    onSubmit: async ({ resetForm }) => {
      await handleCreateAppoitment();
      resetForm();
    },
  });

  const { loading: appointmentListLoader, data: appointmentList } = useGlobal(
    "/appointment/get-all-appointments",
    update
  );

  const userId = userData?.signUpRecord
    ? userData.signUpRecord
    : appointmentData?.signUpRecord
    ? appointmentData.signUpRecord
    : "123";

  const { loading: appointmentNumberLoader, data: appointmentNumber } =
    useFetchById(
      `/appointment/get-user-appointment-number?userId=${userId}`,
      update
    );

  const { loading: profileLoading, data: profileData } = useGlobal(
    token ? "/user/get-user-profile" : null,
    1,
    true
  );

  const { loading: estimateLoader, data: estimateData } = useGlobal(
    latestAppointment
      ? `/appointment/get-estimated-wait-time?userId=${userId}`
      : null,
    1,
    update
  );
  useEffect(() => {
    if (profileData?.user?.isRestrictedByAdmin === true) {
      clearAllCookies();
    }
  }, [profileData]);

  const [reminderFrequency, setReminderFrequency] = useState(0); // default 30 min
  const [notificationLoading, setNotificationLoading] = useState(false);

  const handleToggle = async (payload) => {
    try {
      setNotificationLoading(true);
      const response = await axios.post("/user/notification-settings", payload);

      if (response?.status === 200) {
        SuccessToast(response?.data?.message);
        setReminderShiftModal(false);
        setIsWaitList(true);
        setUpdate((prev) => !prev);
        setSelectedOptions([]);
        setReminderFrequency(null);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setNotificationLoading(false);
    }
  };
  return (
    <div className="p-2">
      <div className="mb-6">
        <TopSection />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="flex justify-center mt-6 lg:block">
          <WaitingList
            appointmentList={appointmentList}
            appointmentListLoader={appointmentListLoader}
          />
        </div>
        <div className="flex w-full flex-col gap-6">
          <div className="flex  flex-col sm:flex-row gap-4">
            <JoinWaitList
              appointmentNumber={appointmentNumber}
              isWaitList={isWaitList}
              handleModalOpen={() =>
                userData?.isUserRegistered
                  ? setExistingPet(true)
                  : setFormModal(true)
              }
              handleCancelEnrollment={() => setCancelEnrollment(true)}
              appointmentNumberLoader={appointmentNumberLoader}
            />

            {/* <CurrentlyServing
              appointmentListLoader={appointmentListLoader}
              currentlyServing={appointmentList}
            /> */}
          <EstimatedTime
            appointmentNumber={appointmentNumber}
            data={estimateData}
            loading={estimateLoader}
            update={update}
            handleCancelEnrollment={() => setCancelEnrollment(true)}
          />
          </div>
        </div>
        <div className="flex justify-center lg:ms-auto">
          <AdScreen />
          {/* <GoogleAd dataAdSlot={'5642921217'} /> */}
        </div>
      </div>
      <Formik
        initialValues={EnrollmentValues}
        validationSchema={
          step === 1 ? EnrollmentPersonalSchema : EnrollmentPetSchema
        }
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (step === 1) {
            setStep(2);
            setSubmitting(false);
            return;
          }

          if (step === 2) {
            if (checked && !values.password) {
              setPasswordError("Password Required");
              setSubmitting(false);
              return;
            }

            const payload = {
              user: {
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: checked ? values.password : null,
                isUserRegistered: checked,
                role: "user",
                idToken: null,
                // fcmToken: values.password ? fcmToken : null,
                fcmToken: fcmToken || "abc",
              },
              pet: values.pets.map((pet) => ({
                petName: pet.petName,
                petType: pet.petType,
                petBreed: pet.petBreed,
                age: pet.petAge,
                symptoms: pet.petDiscription,
              })),
            };

            setLoading(true);
            try {
              const response = await axios.post("/auth/signup", payload);
              if (response.status === 200) {
                SuccessToast(response?.data?.message);
                Auth(response?.data);
                setAlmostThere(true);
                setFormModal(false);
                setUpdate((prev) => !prev);
                resetForm();
                setStep(1);
                setChecked(false);
              }
            } catch (err) {
              ErrorToast(err.response?.data?.message || "Something went wrong");
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }
        }}
      >
        {(formikProps) => (
          <EnrollmentForms
            {...formikProps}
            loading={loading}
            step={step}
            setStep={setStep}
            isOpen={formModal}
            onClose={() => setFormModal(false)}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            setChecked={setChecked}
            checked={checked}
            setFieldValue={formikProps.setFieldValue}
          />
        )}
      </Formik>
      {/* <EnrollmentForms
        loading={loading}
        step={step}
        setStep={setStep}
        touched={touched}
        errors={errors}
        values={values}
        handleChange={handleChange}
        handleBlur={handleBlur}
        isOpen={formModal}
        onClose={() => setFormModal(false)}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        handleSubmit={handleSubmit}
        setChecked={setChecked}
        checked={checked}
        setFieldValue={setFieldValue}
        handlePhoneChange={handlePhoneChange}
      /> */}

      <Formik
        initialValues={AddPet}
        validationSchema={AddPetSchema}
        enableReinitialize
        onSubmit={async (values) => {
          const payload = {
            AppointmentDate: new Date().toISOString().split("T")[0],
            AppointmentTime: new Date(),
            notes: "Hello",
            pet: values.pets.map((pet) => ({
              petName: pet.petName,
              petType: pet.petType,
              petBreed: pet.petBreed,
              petAge: Number(pet.petAge),
              symptoms: pet.petDiscription,
            })),
          };
          setCreatAppoitmentLoading(true);
          try {
            const response = await axios.post(
              "/user/create-appointment",
              payload
            );
            if (response?.status === 200) {
              SuccessToast(response?.data?.message);
              Auth(response?.data);
              setIsPhoneVerified(false);
              setIsVerifiedEmail(false);
              setAddPetModal(false);
              setExistingPet(false);
              setUpdate((prev) => !prev);
            }
          } catch (error) {
            ErrorToast(error?.response?.data?.message);
          } finally {
            setCreatAppoitmentLoading(false);
          }
        }}
      >
        {(formikProps) => (
          <AddNewPet
            {...formikProps}
            isOpen={addPetModal}
            onClose={() => setAddPetModal(false)}
            loading={creatAppoitmentLoading}
          />
        )}
      </Formik>

      <AlmostThereModal
        isOpen={almostThere}
        onClose={() => setAlmostThere(false)}
        handleClick={() => {
          setAlmostThere(false);
          setVerifyEmailModal(true);
        }}
        email={values.email}
        phone={values.phone}
      />
      <VerifyEmail
        isOpen={verifyEmailModal}
        onClose={() => setVerifyEmailModal(false)}
        setVerifyPhonelModal={setVerifyPhonelModal}
        email={values.email}
        setVerifyEmailModal={setVerifyEmailModal}
      />
      <VerifyPhone
        email={values.email}
        isOpen={verifyPhonelModal}
        onClose={() => setVerifyPhonelModal(false)}
        handleClick={() => {
          setVerifyPhonelModal(false);
          setVirtualListModal(true);
        }}
        setVerifyPhonelModal={setVerifyPhonelModal}
        setVirtualListModal={setVirtualListModal}
        phone={values.phone}
      />
      <VirtualListModal
        isOpen={virtualListModal}
        handleClick={() => {
          setVirtualListModal(false);
          setReminderShiftModal(true);
        }}
      />

      <ShiftRemindersModal
        isOpen={reminderShiftModal}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        reminderFrequency={reminderFrequency}
        setReminderFrequency={setReminderFrequency}
        handleClick={handleToggle}
        loading={notificationLoading}
      />
      <CancelEnrollment
        isOpen={cancelEnrollment}
        handleClick={() => {
          setCancelReason(true);
          setCancelEnrollment(false);
        }}
        onClose={() => setCancelEnrollment(false)}
      />
      <CancelReason
        cancelLoading={cancelLoading}
        isOpen={cancelReason}
        onClose={() => setCancelReason(false)}
        handleClick={handleCancelSubmit}
        cancelReasonDiscription={cancelReasonDiscription}
        handleChange={handleCancelChange}
        errorReasonDiscription={errorReasonDiscription}
      />
      <CancelSuccessFull
        isOpen={cancelSuccessFull}
        onClose={() => setCancelSuccessFull(false)}
      />
      <ExistingPet
        isOpen={existingPet}
        profileData={profileData}
        setUpdate={setUpdate}
        setVirtualListModal={setVirtualListModal}
        setExistingPet={setExistingPet}
        onClose={() => setExistingPet(false)}
        setAddPetModal={setAddPetModal}
      />

      <AddPetSuccess
        onClose={() => setAddPetSuccess(false)}
        isOpen={addPetSuccess}
        text={"Pet Profile Added"}
        para={"New Pet Profile has been added successfully"}
      />
    </div>
  );
};

export default Home;
