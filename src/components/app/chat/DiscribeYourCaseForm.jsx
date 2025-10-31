import React from "react";
import GlobalButton from "../../global/GlobalButton";

const DiscribeYourCaseForm = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  loading,
  handleSubmit,
}) => {
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="ml-10 bg-white p-4 rounded-xl w-full max-w-md shadow space-y-3">
          <h3 className="font-semibold text-gray-700 text-sm">
            Describe your case
          </h3>
          {/* <input
            type="text"
            id="title"
            name="title"
            onBlur={handleBlur}
            placeholder="Subject"
            value={values.title}
            onChange={handleChange}
            maxLength={50}
            className="w-full border border-[#00b1b1] rounded-md px-3 py-2 text-sm focus:outline-none"
          />
          {errors.title && touched.title && (
            <p className="text-red-500 text-[12px]  font-medium">
              {errors.title}
            </p>
          )} */}
          <textarea
            placeholder="Description"
            rows={4}
            id="description"
            name="description"
            onBlur={handleBlur}
            value={values.description}
            onChange={handleChange}
            maxLength={250}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm resize-none focus:outline-none"
          />
          {errors.description && touched.description && (
            <p className="text-red-500 text-[12px]  font-medium">
              {errors.description}
            </p>
          )}
          <div className="w-[100px] ms-auto">
            <GlobalButton loading={loading} type="submit" children={"Send"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DiscribeYourCaseForm;
