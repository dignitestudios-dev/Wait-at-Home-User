import React, { useState } from "react";
import ChatAndNotiBtn from "../../components/global/ChatAndNotiBtn";
import { AdminImg, Adthree } from "../../assets/export";
import DiscribeYourCaseForm from "../../components/app/chat/DiscribeYourCaseForm";
import { ChatFormShema } from "../../schema/app/ChatFormShema";
import { ChatFormValues } from "../../init/app/ChatFormValues";
import { useFormik } from "formik";
import RequestSubmited from "../../components/app/chat/RequestSubmited";
import ChatStarted from "../../components/app/chat/ChatStarted";

const Chat = () => {
  const [messageBox, setMessageBox] = useState(false);
  const [chartStart, setChatStarted] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: ChatFormValues,
      validationSchema: ChatFormShema,

      onSubmit: async (values) => {
        const payload = {
          title: values.title,
          description: values.description,
        };
        setMessageBox(true);
        console.log(payload, "Payload");
      },
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 px-2 sm:px-6">
      <div className="col-span-1 lg:col-span-8">
        <div className="w-full bg-white rounded-[20px] overflow-hidden shadow-md flex flex-col min-h-[80vh]">
          <div className="bg-white px-4 sm:px-6 py-4 flex items-center gap-3 border-b">
            <div className="border border-[#5E2E86] rounded-full p-1">
              <div className="w-10 h-10 rounded-full bg-[#5E2E86] border flex items-center justify-center">
                <img src={AdminImg} className="w-[32px] h-[32px]" alt="admin" />
              </div>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[#5E2E86]">
              Admin
            </h2>
          </div>

          <div className="flex-1 bg-gradient-to-br from-[#b2d9de] to-[#d3e6e8] p-3 sm:p-4 space-y-4 overflow-y-auto">
            <div className="flex justify-end">
              <div className="bg-[#00b1b1] text-white px-4 py-2 rounded-xl text-sm max-w-xs">
                Hi! I need some assistance
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="border border-[#5E2E86] rounded-full p-[1px]">
                <div className="w-8 h-8 rounded-full bg-[#5E2E86] border flex items-center justify-center">
                  <img
                    src={AdminImg}
                    className="w-[22px] h-[22px]"
                    alt="admin"
                  />
                </div>
              </div>
              <div className="bg-white px-4 py-2 rounded-xl text-sm max-w-md shadow text-gray-700">
                Hello! 😊 Please describe your issue so we can assist you
                better. Kindly fill out the details below:
              </div>
            </div>
            {messageBox ? (
              <div>
                <RequestSubmited
                  chartStart={chartStart}
                  handleClick={() => setChatStarted(true)}
                />
              </div>
            ) : (
              <DiscribeYourCaseForm
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
              />
            )}
          {chartStart && <ChatStarted />}
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-4">
        <div className="ms-auto">
          <div className="flex justify-end mb-4">
            <ChatAndNotiBtn />
          </div>
          <div className="relative rounded-[12px] overflow-hidden shadow-md">
            <img
              src={Adthree}
              alt="Advertisement"
              className="w-full h-auto object-contain"
            />
            <div className="absolute bottom-0 left-0 w-full px-3 py-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
              <h3 className="text-[32px] sm:text-[42px] font-[600] mb-1 text-center">
                Ads
              </h3>
              <p className="text-[12px] sm:text-[13px] text-center font-[400] leading-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
