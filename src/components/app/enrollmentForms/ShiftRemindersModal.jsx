import React, { useState } from "react";
import { Message, Mobile } from "../../../assets/export";
import GlobalButton from "../../global/GlobalButton";

const reminderOptions = [90, 60, 30, 15, 5];

const ShiftRemindersModal = ({
  isOpen,
  handleClick,
  selectedOptions,
  setSelectedOptions,
  loading,
  reminderFrequency,
  setReminderFrequency,
  setReminderOffsetMinutes,
  reminderOffsetMinutes,
  appointmentData,
}) => {
  
  if (!isOpen) return null;
  const [contactError, setContactError] = useState("");
  const [offsetError, setOffsetError] = useState("");
  const [frequencyError, setFrequencyError] = useState("");

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
    setContactError("");
  };

  const isSelected = (option) => selectedOptions.includes(option);

  const handleContinue = () => {
    setContactError("");
    setOffsetError("");
    setFrequencyError("");

    // Contact method validation
    if (
      !selectedOptions.includes("email") &&
      !selectedOptions.includes("phone")
    ) {
      setContactError("Please select at least one notification option.");
      return;
    }

    // Reminder offset validation
    if (!reminderOffsetMinutes) {
      setOffsetError("Please select how often you want to be reminded.");
      return;
    }

    // Reminder frequency validation
    if (!reminderFrequency) {
      setFrequencyError("Please select how much time you need to get here.");
      return;
    }

    handleClick({
      isPhoneEnabled: selectedOptions.includes("phone"),
      isEmailEnabled: selectedOptions.includes("email"),
      reminderFrequency,
      reminderOffsetMinutes,
      appointmentId: appointmentData[0]?._id,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] w-[500px] max-h-[94vh] p-8 rounded-3xl shadow-lg relative text-gray-800 overflow-y-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-[24px] font-[600]">How should we contact you?</h2>
          <span className="text-gray-500 font-[500]">
            (Select all that apply)
          </span>

          {/* Notification type (Email/Phone) */}
          <div className="flex gap-4">
            <div
              onClick={() => toggleOption("email")}
              className={`cursor-pointer border border-white space-y-2 flex flex-col items-center justify-center h-[134px] w-[127px] rounded-[20px] ${
                isSelected("email") ? "bg-white" : "bg-[#FFFFFF26]"
              }`}
            >
              <img src={Message} className="h-[40px] w-[45px]" alt="Email" />
              <p className="text-[14px] font-[500]">Email</p>
            </div>

            <div
              onClick={() => toggleOption("phone")}
              className={`cursor-pointer border border-white space-y-2 flex flex-col items-center justify-center h-[134px] w-[127px] rounded-[20px] ${
                isSelected("phone") ? "bg-white" : "bg-[#FFFFFF26]"
              }`}
            >
              <img src={Mobile} className="h-[46px] w-[34px]" alt="Phone" />
              <p className="text-[14px] font-[500]">Phone</p>
            </div>
          </div>
          {contactError && (
            <p className="text-red-600 text-sm mt-2 font-medium">
              {contactError}
            </p>
          )}

          {/* Reminder Frequency Selection - sirf tab show hoga jab email/phone select ho */}
          {(selectedOptions.includes("email") ||
            selectedOptions.includes("phone")) && (
            <>
              <div className="mt-6">
                <h3 className="text-[18px] font-[600] mb-3">
                  How often would you like to be reminded of your updated place
                  in line?
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {reminderOptions.map((min) => (
                    <div
                      key={min}
                      onClick={() => {
                        setReminderOffsetMinutes(min);
                        setOffsetError("");
                      }}
                      className={`cursor-pointer px-4 py-2 rounded-lg border border-white ${
                        reminderOffsetMinutes === min
                          ? "bg-white text-gray-800"
                          : "bg-[#FFFFFF26] text-white"
                      }`}
                    >
                      {min} min
                    </div>
                  ))}
                </div>
                {offsetError && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {offsetError}
                  </p>
                )}
              </div>{" "}
              <div className="mt-6">
                <h3 className="text-[18px] font-[600] mb-3">
                  We will let you know when it is time to come in, how much time
                  do you need to get to here?{" "}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {reminderOptions.map((min) => (
                    <div
                      key={min}
                      onClick={() => {
                        setReminderFrequency(min);
                        setFrequencyError("");
                      }}
                      className={`cursor-pointer px-4 py-2 rounded-lg border border-white ${
                        reminderFrequency === min
                          ? "bg-white text-gray-800"
                          : "bg-[#FFFFFF26] text-white"
                      }`}
                    >
                      {min} min
                    </div>
                  ))}
                </div>
                {frequencyError && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {frequencyError}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Error message */}

          <p className="text-[16px] font-[400] text-[#565656] max-w-[350px] mt-6">
            We will send you updates so you can monitor your place in line and
            know when it is time to arrive at the clinic.
          </p>
        </div>

        <div className="w-full mt-10">
          <GlobalButton
            children={"Continue"}
            loading={loading}
            onClick={handleContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default ShiftRemindersModal;
