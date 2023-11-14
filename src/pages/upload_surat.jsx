import React, { useState, useEffect } from "react";

import HeadCustom from "../layout/AdminLayout/Header/head";
import Select from "react-select";
import { useRouter } from "next/router";
import axios from "@lib/axios";
import { AdminLayout } from "@layout";
import { Card } from "react-bootstrap";
import ToastComp from "../components/Toast/Toast";
import {useAuth} from "@hooks/auth"

const rtOptions = [
  { value: "01", label: "RT 01" },
  { value: "02", label: "RT 02" },
];

const UploadSurat = () => {
  const [penduduk, setPenduduk] = useState([]);
  const [nama, setNama] = useState(penduduk ? penduduk.nama : "");
  const [nik, setNik] = useState(penduduk ? penduduk.nik : "");
  const [rt, setRt] = useState(
    penduduk ? rtOptions.find((option) => option.value === penduduk.rt) : null
  );
  const [jenisSurat, setJenisSurat] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });


  useEffect(() => {
    if(!user){
      router.push('/login')
    }
    fetchPenduduk(id);
  }, []);

  const namaChange = (e) => {
    setNama(e.target.value);
  };
  const nikChange = (e) => {
    setNik(e.target.value);
  };
  const rtChange = (selectedOption) => {
    setRt(selectedOption.value);
  };

  const handleJenisSuratChange = (selectedOption) => {
    setJenisSurat(selectedOption);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();

    if (selectedFile && jenisSurat && id) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("pendudukId", id);
      formData.append("jenisSurat", jenisSurat.value);

      axios
        .post("/api/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle the response from the server
          console.log("File uploaded successfully:", response.data);
          setToast({
            show: true,
            message: "Upload File Berhasil",
            success: true,
          });
          console.log("Toast should show for success");
          setTimeout(() => {
            setToast(false);
            router.push("/data_penduduk");
          }, 1000);
        })
        .catch((error) => {
          console.error("File upload failed:", error);
          setToast({
            show: true,
            message: "Upload File Gagal",
            success: false,
          });
          setTimeout(() => {
            setToast(false);
          }, 2000);
          console.log("Toast Status:", toast);
        });
    } else {
      console.error("Invalid data for file upload");
      setToast({
        show: true,
        message: "Upload File Gagal",
        success: false,
      });
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
  };

  function fetchPenduduk(id) {
    let url = `/api/penduduk/${id}`;
    axios
      .get(url)
      .then((response) => {
        setPenduduk(response.data);
        setNik(response.data.nik);
        setNama(response.data.nama);
        setRt(response.data.rt);
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  }

  return (
    <>
      <HeadCustom title={"Upload Surat"} />
      <AdminLayout>
        <Card className="h-min-screen h-full">
          <Card.Header>Upload Surat</Card.Header>
          <Card.Body>
            <div className="main-content min-h-screen bg-white text-black">
              <div className="mx-auto border border-gray-300 rounded-md py-4 px-8 ml-72 bg-white">
                <h1 className="text-2xl text-center font-bold mb-4">Formulir Upload Surat</h1>

                {/* Form Informasi Penduduk */}
                <form className="mb-8">
                  <div className="mb-4">
                    <label
                      htmlFor="nama"
                      className="block text-gray-600 font-semibold"
                    >
                      Nama:
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={nama}
                      onChange={namaChange}
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="nik"
                      className="block text-gray-600 font-semibold"
                    >
                      NIK:
                    </label>
                    <input
                      type="text"
                      id="nik"
                      name="nik"
                      value={nik}
                      onChange={nikChange}
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="rt"
                      className="block text-gray-600 font-semibold"
                    >
                      RT:
                    </label>
                    <Select
                      id="rt"
                      name="rt"
                      options={rtOptions}
                      placeholder="Pilih RT"
                      value={
                        penduduk
                          ? rtOptions.find(
                              (option) => option.value === penduduk.rt
                            )
                          : null
                      }
                      onChange={rtChange}
                    />
                  </div>
                </form>

                {/* Form Jenis Surat */}
                <form className="mb-8">
                  <div className="mb-4">
                    <label
                      htmlFor="jenisSurat"
                      className="block text-gray-600 font-semibold"
                    >
                      Jenis Surat:
                    </label>
                    <Select
                      id="jenisSurat"
                      name="jenisSurat"
                      options={[
                        { value: "Surat Kematian", label: "Surat Kematian" },
                        { value: "Surat Menikah", label: "Surat Menikah" },
                      ]}
                      placeholder="Pilih Jenis Surat"
                      value={jenisSurat}
                      onChange={handleJenisSuratChange}
                      required
                    />
                  </div>
                </form>

                {/* Form Upload File */}
                <form className="mb-8">
                  <div className="mb-4">
                    <label
                      htmlFor="file"
                      className="block text-gray-600 font-semibold"
                    >
                      Pilih File:
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept=".pdf, .doc, .docx" // Specify allowed file types
                      onChange={handleFileChange}
                      className="w-full border p-2 rounded-md"
                      
                    />
                    <input type="hidden" name="pendudukId" value={id} />
                  </div>
                </form>
                <div className="flex w-full justify-center">

                <button
                  onClick={handleFileSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4 transition-colors"
                  >
                  Upload File
                </button>
                    </div>
              </div>
            </div>
            {toast.show && (
              <ToastComp message={toast.message} success={toast.success} />
            )}
          </Card.Body>
        </Card>
      </AdminLayout>
    </>
  );
};

export default UploadSurat;
