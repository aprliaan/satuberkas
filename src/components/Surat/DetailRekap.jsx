import React from "react";
import axios from "@lib/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "@components/Modal/Modal";
import ToastComp from "@components/Toast/Toast";

function DetailRekap({ index, surat }) {
  const [penduduk, setPenduduk] = useState([]);
  const [nik, setNik] = useState(null);
  const [nama, setNama] = useState(null);
  const createdAtDate = new Date(surat.created_at);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });
  

  const formattedDate = `${createdAtDate.getDate()}/${
    createdAtDate.getMonth() + 1
  }/${createdAtDate.getFullYear()}`;

  useEffect(() => {
    fetchPenduduk(surat.penduduk_id);
  }, [surat.penduduk_id]);

  function fetchPenduduk(id) {
    let url = `/api/penduduk/${id}`;
    axios
      .get(url)
      .then((response) => {
        setPenduduk(response.data);
        setNik(response.data.nik);
        setNama(response.data.nama);
      })
      .catch((error) => {
        console.error(error);
      });
  }

 const handleChange = (id) => {
    fetchBerkas(id);
  }

  function fetchBerkas(id) {
    let url = `/api/file/${id}`;
    axios
      .get(url)
      .then((response) => {
        fetchPath(response.data.file_path);
      })
      .catch((error) => {
        console.log("error");
      });
  }

  function fetchPath(file_path){
    let url = `/api/berkas/${file_path}`;
    axios.get(url, { responseType: "blob" }).then((response) => {
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      const newTab = window.open();
      newTab.document.write(
        `<iframe src="${fileURL}" width="100%" height="100%"></iframe>`
      );
    })
    .catch((error) => {
        console.log("path");
      });
  }

  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    deleteData(deleteId);
    setShowModal(false);
    setActiveDropdown(null);
  };

  const deleteData = (id) => {
    axios
      .delete(`/api/file/${id}`)
      .then((response) => {
        setToast({
          show: true,
          message: "Data Berhasil Dihapus",
          success: true,
        });
        console.log("Toast should show for success");
        setTimeout(() => {
          setToast(false);
        }, 2000);
        
      })
      .catch((error) => {
        setToast({
          show: true,
          message: "Data Gagal Dihapus",
          success: false,
        });
        // console.log("Toast should show for success");
        setTimeout(() => {
          setToast(false);
        }, 2000);
        console.log("gagal hapus");
      });
  };


  const toggleDropdown = (pendudukId) => {
    if (activeDropdown === pendudukId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(pendudukId);
    }
  };

  return (
    <tr key={surat}>
      <td className="text-center">{index + 1}</td>
      <td className="text-center">
        {nama != null ? (
          nama
        ) : (
          <FontAwesomeIcon fixedWidth icon={faSpinner} spinPulse />
        )}
      </td>
      <td className="text-center">
        {nik != null ? (
          nik
        ) : (
          <FontAwesomeIcon fixedWidth icon={faSpinner} spinPulse />
        )}
      </td>
      <td className="text-center">{surat.nama_surat}</td>
      <td className="text-center">{surat.jenis_surat}</td>
      <td className="text-center">{formattedDate}</td>
      <td className="border border-gray-300 px-4 py-2 flex justify-center">
        <button
          id={`dropdownButton-${surat.id}`}
          data-dropdown-toggle={`dropdown-${surat.id}`}
          className=" hover:text-amber-500"
          type="button"
          onClick={() => toggleDropdown(surat.id)}
        >
          <FontAwesomeIcon fixedWidth icon={faSlidersH} />
        </button>
      </td>
      <div
        id={`dropdown-${surat.id}`}
        className={`z-10 right-1 ${
          activeDropdown === surat.id ? "block" : "hidden"
        }  absolute rounded-lg shadow w-auto border border-solid border-gray-800`}
      >
        <ul
          className="text-sm bg-white text-gray-700"
          aria-labelledby={`dropdownButton-${surat.id}`}
        >
          <li>
            <Link
              href={`/detail_penduduk?id=${surat.penduduk_id}`}
              className="block text-start p-2 rounded-md hover:bg-gray-200 hover:text-gray-700"
            >
              Detail
            </Link>
          </li>
          <li>
            <a
              onClick={() => handleDelete(surat.id)}
              className="block text-start rounded-md p-2 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
            >
              Hapus Data
            </a>
          </li>
          <li>
            <a
              className=" block text-start rounded-md p-2 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
              onClick={() => handleChange(surat.id)}
            >
              Lihat PDF
            </a>
          </li>
        </ul>
        {showModal && (
          <Modal
            isOpen={showModal}
            message="Hapus Data Ini?"
            onCancel={() => setShowModal(false)}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmDelete}
            confirmText={"Hapus"}
          />
        )}
        {toast.show && (
          <ToastComp message={toast.message} success={toast.success} />
        )}
      </div>
    </tr>
  );
}


export default DetailRekap;
