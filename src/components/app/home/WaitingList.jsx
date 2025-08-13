import React, { useState } from "react";
import WaitingListModal from "./WaitingListModal";
import { WaitingListSkeleton } from "../../global/Skeleton";
const WaitingList = ({ appointmentList, appointmentListLoader }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative bg-transparent cursor-pointer border border-white w-[281px] p-4 rounded-[30px] shadow-md mb-6 overflow-hidden">
        <div className="absolute inset-0 z-10 pointer-events-none rounded-[20px] backdrop-blur-[6px] bg-[#c3d8df]/70" />

        <h3 className="text-[18px] font-[500] text-black mb-4 z-20 relative">
          Waiting List
        </h3>
        {appointmentListLoader ? (
          <WaitingListSkeleton />
        ) : (
          <>
            {appointmentList?.filter((item) => !item?.currentlyServing)
              ?.length === 0 ? (
              <p className="text-center text-sm font-medium text-gray-500 my-8 relative z-20">
                No appointments found
              </p>
            ) : (
              <ul className="relative z-20 max-h-[550px] overflow-y-auto pr-1 custom-scrollbar">
                {appointmentList
                  ?.filter((item) => !item?.currentlyServing)
                  ?.slice(0, 10)
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

                        <span className="text-[#3F3F3F] font-[600] text-[14px]">
                          {item?.pets?.map((pet) => pet?.petName).join(", ")} -{" "}
                          {item?.signUpRecord?.name.charAt(0)}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}

        {appointmentList?.filter((item) => !item?.currentlyServing)?.length >=
          10 && (
          <p
            className="text-center text-sm font-medium text-black mt-2 relative z-20 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            See All
          </p>
        )}
      </div>

      {showModal && (
        <WaitingListModal
          onClose={() => setShowModal(false)}
          appointmentList={appointmentList}
          appointmentListLoader={appointmentListLoader}
        />
      )}
    </>
  );
};

export default WaitingList;
