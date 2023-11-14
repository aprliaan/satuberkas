import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "@lib/axios";
import Modal from "@components/Modal/Modal"
import Register from "@components/Modal/ModalRegister";
import ToastComp from "@components/Toast/Toast";

const User = () => {
  const [user, setUser] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [register, setRegister] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [toast, setToast] = useState(false)

  useEffect(() => {
    fetchUser;
    const intervalId = setInterval(fetchUser, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchUser = () => {
    axios
      .get("/api/admin")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function deleteUser(id) {
    let params = { _method: "delete" };

    axios
      .post("/api/admin/" + id, params)
      .then((response) => {
        console.log("delete berhasil")
        setToast({
          show: true,
          message: "Data Berhasil di Hapus ",
          success: true,
        });
        fetchUser();
        console.log("Toast should show for success");
        setTimeout(() => {
          setToast(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error delete data:", error);
        setToast({
          show: true,
          message: "Data Gagal di Hapus",
          success: false,
        });
        console.log("Toast Status:", toast);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      });
  }

  function formatCreatedAt(createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const openModalHapus = (userId) => {
    setSelectedUserId(userId);
    setModalVisible(true);
  };
  const closeModalHapus = () => {
    setSelectedUserId(null);
    setModalVisible(false);
  };
  const openModalRegister = () => {
    setRegister(true);
  };
  const closeModalRegister = () => {
    setRegister(false);
  };
  const confirmDelete = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId);
      closeModalHapus();
    }
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        message="Hapus Akun Ini?"
        onClose={closeModalHapus}
        onConfirm={confirmDelete}
        confirmText="Hapus"
      />
      <Register isOpen={register} onClose={closeModalRegister} />

      {toast.show && (
        <ToastComp message={toast.message} success={toast.success} />
      )}

      <div className="flex mb-2 justify-end">
        <button
          className="bg-amber-500 rounded-md p-2 font-semibold text-white hover:bg-amber-600"
          onClick={openModalRegister}
        >
          Tambah Akun
        </button>
      </div>
      <Table responsive bordered hover>
        <thead className="bg-light">
          <tr>
            <th className="text-center">No</th>
            <th className="text-center">Nama</th>
            <th className="text-center">Email</th>
            <th className="text-center">Tanggal Registrasi</th>
            <th aria-label="Action" />
          </tr>
        </thead>
        <tbody>
          {user.map((person, index) => (
            <tr key={person.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-start">{person.name}</td>
              <td className="text-center">{person.email}</td>
              <td className="text-center">
                {formatCreatedAt(person.created_at)}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                <button
                  id={`dropdownButton-${person.id}`}
                  data-dropdown-toggle={`dropdown-${person.id}`}
                  className=" hover:text-amber-500 text-red-600"
                  type="button"
                  onClick={() => openModalHapus(person.id)}
                >
                  <FontAwesomeIcon fixedWidth icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default User;
