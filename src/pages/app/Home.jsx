import React, { useContext, useState } from "react";
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
import { useFormik } from "formik";
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
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";
const Home = () => {
  const { Auth, appointmentData, clearAllCookies } = useContext(AppContext);
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

  const validateSchema =
    step == 1 ? EnrollmentPersonalSchema : EnrollmentPetSchema;

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
          password: values.password,
          isUserRegistered: checked,
          role: "user",
          idToken: null,
          fcmToken: "some_fcm_token",
        },
        pet: {
          petName: values.petName,
          petType: values.petType,
          petBreed: values.petBreed,
          age: values.petAge,
          symptoms: values.petDiscription,
        },
        appointment: {
          AppointmentDate: new Date().toISOString().split("T")[0],
          AppointmentTime: new Date(),
          notes: "Hello",
        },
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
      appointmentId: appointmentData?._id,
      cancelReason: cancelReasonDiscription,
    };
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

        clearAllCookies();
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setCancelLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");

    if (rawValue.length <= 10) {
      handleChange({ target: { name: e.target.name, value: rawValue } });
    }
  };

  const { loading: appointmentListLoader, data: appointmentList } = useGlobal(
    "/appointment/get-all-appointments",
    update
  );

  const { loading: appointmentNumberLoader, data: appointmentNumber } =
    useFetchById(
      // appointmentData?.signUpRecord
      //   ? `/appointment/get-user-appointment-number?userId=${appointmentData?.signUpRecord}`
      //   : null,
      `/appointment/get-user-appointment-number?userId=${appointmentData?.signUpRecord ? appointmentData?.signUpRecord : "123"}`,

      update
    );

  return (
    <div className="p-2">
      <div className="mb-6">
        <TopSection />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="flex justify-center lg:block">
          <WaitingList
            appointmentList={appointmentList}
            appointmentListLoader={appointmentListLoader}
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <JoinWaitList
              appointmentNumber={appointmentNumber}
              isWaitList={isWaitList}
              handleModalOpen={() => setFormModal(true)}
              handleCancelEnrollment={() => setCancelEnrollment(true)}
              appointmentNumberLoader={appointmentNumberLoader}
            />
            <CurrentlyServing
              appointmentListLoader={appointmentListLoader}
              currentlyServing={appointmentList}
            />
          </div>
          <EstimatedTime />
        </div>
        <div className="flex justify-center lg:ms-auto">
          <AdScreen />
        </div>
      </div>

      <EnrollmentForms
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
      />
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
      />
      <VerifyPhone
        isOpen={verifyPhonelModal}
        onClose={() => setVerifyPhonelModal(false)}
        handleClick={() => {
          setVerifyPhonelModal(false);
          setVirtualListModal(true);
        }}
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
        handleClick={() => {
          setReminderShiftModal(false);
          setIsWaitList(true);
        }}
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
    </div>
  );
};

export default Home;
