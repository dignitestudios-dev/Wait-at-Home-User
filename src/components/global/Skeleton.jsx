export const WaitingListSkeleton = () => {
  return (
    <ul className="relative z-20 max-h-[550px] overflow-y-auto pr-1 custom-scrollbar">
      {[...Array(5)].map((_, index) => (
        <li key={index}>
          <div className="flex gap-3 items-center py-2 animate-pulse">
            <span className="min-w-[20px] text-right font-[600] text-[14px] text-transparent bg-gray-300 rounded">
              {index + 1}
            </span>

            <div className="w-[42px] h-[32px] rounded-full bg-gray-300"></div>

            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const ProfileInfoSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        {/* Avatar + Edit Icon */}
        <div className="flex items-center gap-4 relative">
          <div className="relative w-20 h-20">
            <div className="bg-gray-300 rounded-full h-20 w-20" />
            <div className="absolute bottom-0 right-0 bg-gray-400 w-[35px] h-[35px] rounded-full border" />
          </div>

          {/* Name & Email Placeholder */}
          <div className="text-center lg:text-left">
            <div className="bg-gray-300 h-5 w-32 rounded mb-2" />
            <div className="bg-gray-200 h-4 w-44 rounded" />
          </div>
        </div>

        {/* Chat & Notification Buttons Placeholder */}
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <div className="bg-gray-300 h-10 w-10 rounded-full" />
          <div className="bg-gray-300 h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Info Cards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 border-b-2 pb-6">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={`${i !== 2 ? "border-r" : ""} flex flex-col gap-2`}
          >
            <div className="bg-gray-200 h-4 w-20 rounded" />
            <div className="bg-gray-300 h-5 w-40 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
