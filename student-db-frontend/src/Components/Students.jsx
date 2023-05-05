import React, { useEffect, useState } from "react";
import { StudentTable } from "../Reusable/StudentTable";
import { tableHeaders } from "../Utils/data";
import StudentForm from "../Reusable/StudentForm";
import {
  createStudent,
  deleteStudent,
  listStudents,
  updateStudent,
} from "../Services/http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css"

function StudentsComponent() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [studentModal, setStudentModal] = useState({
    visible: false, //Flag to set the modal visibility
    type: "create", //Either create or edit depending on usecase.
    editId: 0, //In case of edit, edit id will be set
  });

  const triggerModal = (type) => {
    setStudentModal({ ...studentModal, visible: !studentModal.visible, type });
  };

  const triggerToast = (message) => {
    toast.success(message,{theme:'colored'});
  };

  const saveStudent = async (payload) => {
    setLoading(true);
    if (studentModal.type === "create") {
      //Adds a new student
      let response = await createStudent(payload);
      if (response.status === 201) {
        triggerToast(response?.data?.message);
        await fetchStudents();
      } else {
        setLoading(false);
      }
    } else {
      //Edits the Student Via ID
      let response = await updateStudent(studentModal.editId, payload);
      if (response.status === 200) {
        triggerToast(response?.data?.message);
        await fetchStudents();
      } else {
        setLoading(false);
      }
    }
  };

  const editModal = (id) => {
    setStudentModal({
      editId: id,
      visible: !studentModal.visible,
      type: "edit",
    });
  };

  const deleteStudentFunction = async (id) => {
    setLoading(true);
    let response = await deleteStudent(id);
    if (response.status === 200) {
      triggerToast(response?.data?.message);
      await fetchStudents();
    } else {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    let response = await listStudents();
    if (response.status === 200) {
      setStudents(response.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function init() {
      await fetchStudents();
    }
    init();
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col w-full p-10 page-container">
      <div className="flex flex-row">
        <div className="text-xl font-bold">Students</div>
        <button
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded h-10 ml-auto"
          onClick={() => {
            triggerModal("create");
          }}
        >
          Create Student
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />

      {studentModal.visible ? (
        <StudentForm
          type={studentModal.type}
          editData={students.find(
            (student) => student._id === studentModal.editId
          )}
          onClose={() => {
            triggerModal("edit");
          }}
          onSave={(payload) => {
            saveStudent(payload);
          }}
        ></StudentForm>
      ) : (
        ""
      )}
      {students.length ? (
        <StudentTable
          tableHeaders={tableHeaders}
          showButtons
          tableData={students}
          setEdit={(id) => {
            editModal(id);
          }}
          deleteStudent={deleteStudentFunction}
        ></StudentTable>
      ) : (
        <div className="text-base font-medium text-red-600 mt-4">
          No Student Found Please add Student from "Create Student" button
        </div>
      )}
    </div>
  );
}

export default StudentsComponent;
