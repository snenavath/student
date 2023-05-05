import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../App.css";
import moment from "moment";

const portalDiv = document.getElementById("portal-root");

const StudentForm = ({ onClose, type, onSave, editData }) => {
  const [firstName, setFirstName] = useState(
    type === "edit" ? editData.firstName : "" //If The mode is edit initial data is set to get data from current data
  );
  const [lastName, setLastName] = useState(
    type === "edit" ? editData.lastName : ""
  );
  const [dob, setDob] = useState(type === "edit" ? editData.dob : "");
  const [error, setError] = useState({
    dob: "",
  });

  const validator = () => {
    return !firstName || !lastName;
  };

  const savePayload = () => {
    if (moment().diff(dob, "years") < 10) {
      setError({
        dob: "User should be atleast 10 years old.",
      });
      return;
    }
    let payload = {
      firstName,
      lastName,
      id: "",
      dob:moment(dob).format("YYYY-MM-DD")
    };
    onSave(payload);
    onClose(); //Close Modal
  };

  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setError({ dob: "" });
    setDob(e.target.value);
  };

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="flex flex-col w-full">
        <div className="divide-y divide-grey-300 text-lg font-bold border px-4 py-2 bg-gray-100">
          {type === "edit" ? "Edit Student" : "Create Student"}
        </div>
        <div className="p-4">
          <div className="flex flex-row mb-4 justify-between items-center">
            <label className="block text-gray-700 text-sm font-bold w-[20%]">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row mb-6 justify-between items-center">
            <label className="block text-gray-700 text-sm font-bold w-[20%]">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              value={lastName}
              placeholder="Enter last name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-row mb-2 justify-between items-center">
            <label className="block text-gray-700 text-sm font-bold w-[20%]">
              Date of birth
            </label>
             
            <div className="flex flex-col w-[80%]">
              <input
                className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dob"
                type="date"
                onChange={handleChange}
                ref={dateInputRef}
                value={dob}
              />
              <span class="block sm:inline text-red-700 px-4">{error.dob}</span>
            </div>
          </div>

          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded h-10 float-right w-20 ${
              validator() &&
              "disabled:opacity-50 cursor-not-allowed pointer-events-none"
            }`}
            onClick={savePayload}
            disabled={validator()}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    portalDiv
  );
};

export default StudentForm;
