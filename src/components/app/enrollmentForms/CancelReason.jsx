import React from "react";
import { RiLoader5Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const CancelReason = ({
  isOpen,
  handleClick,
  onClose,
  handleChange,
  cancelReasonDiscription,
  errorReasonDiscription,
  cancelLoading,
  setIsSkip
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gradient-to-br from-[#A0E6E1] to-[#C3B4D3] w-[471px] p-8 rounded-3xl shadow-lg relative text-gray-800">
        <div className="flex justify-between border-b border-[#FFFFFF] pb-5">
          <h2 className="text-[18px] font-[600] text-[#212121] mb-2">
            Let us know how we can improve

          </h2>
          <button
            onClick={onClose}
            className="h-[36px] w-[36px] bg-white flex justify-center items-center rounded-full right-4 text-xl font-bold text-gray-700 hover:text-black"
          >
            <RxCross2 />
          </button>
        </div>
        <form action="" onSubmit={handleClick}>
          <textarea
            placeholder="Why did you decide to take your name off the Wait at Home list? 
"
            value={cancelReasonDiscription}
            onChange={handleChange}
            className={`bg-white w-full mt-7 rounded-[20px] h-[113px] px-4 py-4 border  ${
              errorReasonDiscription
                ? "border-red-500 ring-1 ring-red-500"
                : "focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
            }`}
          ></textarea>
          {errorReasonDiscription && (
            <p className="text-red-500 text-sm mt-1">
              {errorReasonDiscription}
            </p>
          )}
          <div className="flex flex-col justify-center items-center space-y-3 mt-10">
          <div
  onClick={() => {
    setIsSkip(true);
    handleClick();
  }}
  className="cursor-pointer font-[500] text-[#00000080]"
>
  Skip
</div>

            <button
              type="submit"
                onClick={() => setIsSkip(false)}
              className="w-full bg-[#00AAAD] hover:bg-[#00908b] text-white text-[14px] font-[600] py-3 rounded-[12px] transition duration-200"
            >
              <div className="flex justify-center items-center">
                <span className="mr-1">Submit</span>
                {cancelLoading && (
                  <RiLoader5Line className="animate-spin text-lg " />
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelReason;
