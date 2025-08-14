import React from "react";
import { WaitingListSkeleton } from "../../global/Skeleton";

const WaitingListModal = ({
  onClose,
  appointmentList,
  appointmentListLoader,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md max-h-[80vh] rounded-[30px] border border-white shadow-lg overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-[6px] bg-[#c3d8df]/70 z-10 rounded-[30px] pointer-events-none" />

        <div className="relative z-20 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl font-bold text-gray-600"
          >
            ✕
          </button>

          <h2 className="text-[18px] font-[500] mb-4  text-black">
            Waiting List
          </h2>
          {appointmentListLoader ? (
            <WaitingListSkeleton />
          ) : (
            <ul className="relative z-20 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
              {appointmentList
                ?.filter((item) => !item?.currentlyServing)
                ?.map((item, index) => (
                  <li key={index}>
                    <div className="flex gap-3 items-center py-2">
                      <span className="min-w-[20px] text-right text-[#3F3F3F] font-[600] text-[14px]">
                        {index + 1}
                      </span>

                      {item?.profilePicture ? (
                        <img
                          src={item?.profilePicture}
                          className="w-[32px] h-[32px] rounded-full object-cover"
                          alt=""
                        />
                      ) : (
                        <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[12px] font-bold bg-[#10C0B6] text-white">
                          {item?.signUpRecord?.name
                            ?.substring(0, 2)
                            ?.toUpperCase()}
                        </div>
                      )}

                      <span className="text-[#3F3F3F] font-[600] w-[250px] text-[14px] whitespace-normal break-words align-middle">
                        {item?.pets?.map((pet) => pet?.petName).join(", ")} -{" "}
                        {item?.signUpRecord?.name.charAt(0)}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitingListModal;
