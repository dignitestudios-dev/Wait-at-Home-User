import { WaitingListSkeleton } from "../../global/Skeleton";

const CurrentlyServing = ({ currentlyServing, appointmentListLoader }) => {
  return (
    <div className="bg-[#b5d8dc] cursor-pointer flex flex-col  w-[289px] rounded-[30px] border shadow-md p-4">
      <div className="max-h-[198px] overflow-y-auto pr-1 custom-scrollbar">
      <h3 className="text-[18px] font-[500] mb-4">Currently Serving</h3>
      {appointmentListLoader ? (
        <WaitingListSkeleton />
      ) : currentlyServing?.filter((item) => item?.currentlyServing)?.length ===
        0 ? (
        <p className="text-center text-sm font-medium text-gray-500 my-8 relative z-20">
          No Currently Serving
        </p>
      ) : (
        <ul>
          {currentlyServing
            ?.filter((item) => item?.currentlyServing)
            ?.map((item, index) => (
              <li key={index}>
                <div className="flex gap-3 items-center py-2">
                  {item?.profilePicture ? (
                    <img
                      src={item?.profilePicture}
                      className="w-[32px] h-[32px] rounded-full object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="w-[32px] bg-[#10C0B6] h-[32px] rounded-full flex items-center justify-center text-[12px] font-bold text-white">
                      {item?.signUpRecord?.name?.substring(0, 2)?.toUpperCase()}
                    </div>
                  )}

                  <span className="text-[#3F3F3F] font-[600] text-[14px]">
                    {item?.pets?.map((pet) => pet?.petName)} -{" "}
                    {item?.signUpRecord?.name?.charAt(0)}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default CurrentlyServing;
