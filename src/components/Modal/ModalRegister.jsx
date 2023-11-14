import React, { useState, useEffect } from "react";
import axios from "@lib/axios";
import ToastComp from "@components/Toast/Toast";
import { useAuth } from "@hooks/auth";

const Register = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });
  

  const namaChange = (e) => {
    setName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const addUser = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("/api/admin", formData)
      .then((response) => {
        setEmail("");
        setName("");
        setPassword("");
        console.log("Data Berhasil Ditambahkan");
        setToast({
          show: true,
          message: "Data Berhasil Ditambahkan ",
          success: true,
        });
        onClose();
        setTimeout(() => {
          setToast(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("Gagal Menambahkan Data");
        setToast({
          show: true,
          message: "Data Gagal Ditambahkan ",
          success: false,
        });
        setTimeout(() => {
          setToast(false);
        }, 2000);
      });
    };

  return (
    <>
      {toast.show && (
        <ToastComp message={toast.message} success={toast.success} />
      )}
      <div
        id="popup-modal"
        className={`fixed top-20 left-1/3 z-50 ${
          isOpen ? "" : "hidden"
        } p-4 overflow-x-hidden w-2/5 overflow-y-auto h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">
                Tambah Akun
              </h3>
              <button
                type="button"
                className="text-gray-800 bg-transparent hover:text-gray-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="defaultModal"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={addUser}>
              <div className="mb-2">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  placeholder="Nama"
                  required=""
                  value={name}
                  onChange={namaChange}
                />
              </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    for="eamil"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    placeholder="Email"
                    value={email}
                    onChange={emailChange}
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Password"
                    value={password}
                    onChange={passwordChange}
                    required=""
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-amber-500 hover:bg-amber-600 font-medium rounded-md text-sm px-4 py-2.5 text-center"
                >
                  Tambah Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
