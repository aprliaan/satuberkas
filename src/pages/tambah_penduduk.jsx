import HeadCustom from "../layout/AdminLayout/Header/head";
import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "@lib/axios";
import useSelectChange from "../hooks/select";
import { AdminLayout } from "@layout";
import { Card } from "react-bootstrap";
import ToastComp from "../components/Toast/Toast";
import { useRouter } from "next/router";
import {useAuth} from '@hooks/auth'


const genderOptions = [
  { value: "Laki-Laki", label: "Laki-Laki" },
  { value: "Perempuan", label: "Perempuan" },
];
const rtOptions = [
  { value: "01", label: "RT 01" },
  { value: "02", label: "RT 02" },
];
const kelurahanOptions = [
  { value: "Kelurahan 1", label: "Kelurahan 1" },
  { value: "Kelurahan 2", label: "Kelurahan 2" },
];

const religionOptions = [
  { value: "Islam", label: "Islam" },
  { value: "Kristen", label: "Kristen" },
  { value: "Katholik", label: "Katholik" },
  { value: "Hindu", label: "Hindu" },
  { value: "Budha", label: "Budha" },
  { value: "Konghucu", label: "Konghucu" },
];

const occupationOptions = [
  { value: "Mahasiswa", label: "Mahasiswa" },
  { value: "Wiraswasta", label: "Wiraswasta" },
  { value: "Pelajar", label: "Pelajar" },
  { value: "Ibu Rumah Tangga", label: "Ibu Rumah Tangga" },
  { value: "Tidak Bekerja", label: "Tidak Bekerja" },
];

const maritalStatusOptions = [
  { value: "Belum Menikah", label: "Belum Menikah" },
  { value: "Sudah Menikah", label: "Sudah Menikah" },
  { value: "Janda", label: "Janda" },
  { value: "Duda", label: "Duda" },
];

const educationOptions = [
  { value: "Belum Sekolah", label: "Belum Sekolah" },
  { value: "Paud", label: "TK/Paud" },
  { value: "SD", label: "SD" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
  { value: "S1", label: "S1" },
  { value: "S2", label: "S2" },
  { value: "S3", label: "S3" },
];

export default function AddDataPenduduk() {
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [nokk, setNokk] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [pendudukid, setPendudukId] = useState("");
  const [penduduk, setPenduduk] = useState([]);
  const [jenisKelamin, setJenisKelamin] = useSelectChange(null);
  const [kelurahan, setKelurahan] = useSelectChange(null);
  const [rt, setRt] = useSelectChange(null);
  const [agama, setAgama] = useSelectChange(null);
  const [pekerjaan, setPekerjaan] = useSelectChange(null);
  const [status, setStatus] = useSelectChange(null);
  const [pendidikanTerakhir, setPendidikanTerakhir] = useSelectChange(null);
  const [ayah, setAyah] = useState("");
  const [ibu, setIbu] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", success: true });
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    // if(!user){
    //   router.push('/login')
    // }
    fetchPenduduk();
  }, []);

  const namaChange = (e) => {
    let re = /^[A-Za-z\s]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
    setNama(e.target.value);
    }
  };
  const nikChange = (e) => {
    let re = /^[0-9]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
    setNik(e.target.value);
    }
  };
  const nokkChange = (e) => {
    let re = /^[0-9]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
    setNokk(e.target.value);
    }
  };
  const tanggalLahirChange = (e) => {
    const inputDate = e.target.value; 

    // Ubah format tanggal ke "year-month-day"
    const dateArray = inputDate.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const formattedDate = `${year}-${month}-${day}`;

    setTanggalLahir(formattedDate);
  };
  const alamatChange = (e) => {
    setAlamat(e.target.value);
  };
  const ayahChange = (e) => {
    let re = /^[A-Za-z\s]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
    setAyah(e.target.value);
    }
  };
  const ibuChange = (e) => {
    let re = /^[A-Za-z\s]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
    setIbu(e.target.value);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("nama", nama);
    formData.append("nik", nik);
    formData.append("no_kk", nokk);
    formData.append("tanggal_lahir", tanggalLahir);
    formData.append("jenis_kelamin", jenisKelamin);
    formData.append("alamat", alamat);
    formData.append("rt", rt);
    formData.append("kelurahan", kelurahan);
    formData.append("pekerjaan", pekerjaan);
    formData.append("status_perkawinan", status);
    formData.append("pendidikan_terakhir", pendidikanTerakhir);
    formData.append("agama", agama);
    formData.append("ayah", ayah);
    formData.append("ibu", ibu);

    let url = "api/penduduk";
    if (pendudukid != "") {
      url = "api/penduduk/" + pendudukid;
      formData.append("_method", "PUT");
    }

    axios.post(url, formData).then((response) => {
      fetchPenduduk()
      setPendudukId("")
      setNama("")
      setNik("")
      setNokk("")
      setTanggalLahir("")
      setJenisKelamin("")
      setKelurahan("")
      setAlamat("")
      setRt("")
      setPekerjaan("");
      setStatus("");
      setPendidikanTerakhir("");
      setAgama("");
      setAyah("");
      setIbu("");
      setToast({ show: true, message: "Data berhasil ditambahkan", success: true });
      console.log("Toast should show for success");
      setTimeout(() => {
        setToast(false);
        router.reload();
      }, 1000);
    })
    .catch((error) => {
      console.error('Error adding data:', error);
      setToast({ show: true, message: "Data Gagal Ditambahkan", success: false });
      setTimeout(() => {
        setToast(false);
      }, 2000);
      console.log('Toast Status:', toast); 
    });
  };

  function fetchPenduduk() {
    axios
      .get("/api/penduduk/")
      .then((response) => {
        setPenduduk(response.data); 
        console.log(penduduk);
      })
      .catch((error) => {
        console.error(error);
      })
      
  }


  return (
    <>
      <HeadCustom title={"Penambahan Data"} />
      <AdminLayout>
        <Card className="h-min-screen h-full">
          <Card.Header>Tambah Data penduduk</Card.Header>
          <Card.Body>
            <div className="main-content flex-stretch justify-center flex-start bg-white text-black">
              <div className=" mx-auto border border-gray-300 rounded-md p-8">
                <h1 className="text-2xl text-center font-bold mb-4">
                  Formulir Tambah Data Penduduk
                </h1>
                <form method="POST" onSubmit={submitForm}>
                  {/* NIK */}
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
                      placeholder="NIK"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={nik}
                      onChange={nikChange}
                      required
                      pattern="[0-9]{16}"
                      maxLength="16"
                      title="Masukkan 16 karakter"
                    />
                  </div>
                  {/* Nama Lengkap */}
                  <div className="mb-4">
                    <label
                      htmlFor="nama"
                      className="block text-gray-600 font-semibold"
                    >
                      Nama Lengkap:
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      placeholder="Nama Lengkap"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={nama}
                      onChange={namaChange}
                      required
                    />
                  </div>

                  {/* No. KK */}
                  <div className="mb-4">
                    <label
                      htmlFor="noKk"
                      className="block text-gray-600 font-semibold"
                    >
                      No. KK:
                    </label>
                    <input
                      type="text"
                      id="noKk"
                      name="noKk"
                      placeholder="No. KK"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={nokk}
                      onChange={nokkChange}
                      required
                      pattern="[0-9]{16}"
                      maxLength="16"
                      title="Masukkan 16 karakter"
                    />
                  </div>

                  <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="tanggalLahir"
                        className="block text-gray-600 font-semibold"
                      >
                        Tanggal Lahir:
                      </label>
                      <input
                        type="date"
                        id="tanggalLahir"
                        name="tanggalLahir"
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                        value={tanggalLahir}
                        onChange={tanggalLahirChange}
                        required
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="jenisKelamin"
                        className="block text-gray-600 font-semibold"
                      >
                        Jenis Kelamin:
                      </label>
                      <Select
                        id="jenisKelamin"
                        name="jenisKelamin"
                        placeholder="Pilih Jenis Kelamin"
                        options={genderOptions}
                        value={genderOptions.find(
                          (option) => option.value === jenisKelamin
                        )}
                        onChange={setJenisKelamin}
                        required
                      />
                    </div>
                  </div>
                  {/* Alamat */}
                  <div className="mb-4">
                    <label
                      htmlFor="alamat"
                      className="block text-gray-600 font-semibold"
                    >
                      Alamat:
                    </label>
                    <input
                      type="text"
                      id="alamat"
                      name="alamat"
                      placeholder="Alamat"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={alamat}
                      onChange={alamatChange}
                      required
                    />
                  </div>

                  {/* RT dan Kelurahan */}
                  <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="rt"
                        className="block text-gray-600 font-semibold"
                      >
                        Pilih RT:
                      </label>
                      <Select
                        id="rt"
                        name="rt"
                        placeholder="Pilih RT"
                        options={rtOptions}
                        value={rtOptions.find((option) => option.value === rt)}
                        onChange={setRt}
                        required
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="kelurahan"
                        className="block text-gray-600 font-semibold"
                      >
                        Pilih Kelurahan:
                      </label>
                      <Select
                        id="kelurahan"
                        name="kelurahan"
                        options={kelurahanOptions}
                        placeholder="Pilih Kelurahan"
                        value={kelurahanOptions.find(
                          (option) => option.value === kelurahan
                        )}
                        onChange={setKelurahan}
                        required
                      />
                    </div>
                  </div>

                  {/* Agama */}
                  <div className="mb-4">
                    <label
                      htmlFor="agama"
                      className="block text-gray-600 font-semibold"
                    >
                      Agama:
                    </label>
                    <Select
                      id="agama"
                      name="agama"
                      options={religionOptions}
                      placeholder="Pilih Agama"
                      value={religionOptions.find(
                        (option) => option.value === agama
                      )}
                      onChange={setAgama}
                      required
                    />
                  </div>

                  {/* Pekerjaan */}
                  <div className="mb-4">
                    <label
                      htmlFor="pekerjaan"
                      className="block text-gray-600 font-semibold"
                    >
                      Pekerjaan:
                    </label>
                    <Select
                      id="pekerjaan"
                      name="pekerjaan"
                      options={occupationOptions}
                      placeholder="Pilih Pekerjaan"
                      value={occupationOptions.find(
                        (option) => option.value === pekerjaan
                      )}
                      onChange={setPekerjaan}
                      required
                    />
                  </div>

                  {/* Status Pernikahan */}
                  <div className="mb-4">
                    <label
                      htmlFor="statusPernikahan"
                      className="block text-gray-600 font-semibold"
                    >
                      Status Pernikahan:
                    </label>
                    <Select
                      id="statusPernikahan"
                      name="statusPernikahan"
                      options={maritalStatusOptions}
                      placeholder="Pilih Status Pernikahan"
                      value={maritalStatusOptions.find(
                        (option) => option.value === status
                      )}
                      onChange={setStatus}
                      required
                    />
                  </div>

                  {/* Pendidikan Terakhir */}
                  <div className="mb-4">
                    <label
                      htmlFor="pendidikanTerakhir"
                      className="block text-gray-600 font-semibold"
                    >
                      Pendidikan Terakhir:
                    </label>
                    <Select
                      id="pendidikanTerakhir"
                      name="pendidikanTerakhir"
                      options={educationOptions}
                      placeholder="Pilih Pendidikan Terakhir"
                      value={educationOptions.find(
                        (option) => option.value === pendidikanTerakhir
                      )}
                      onChange={setPendidikanTerakhir}
                      required
                    />
                  </div>

                  {/* Nama Ayah Kandung */}
                  <div className="mb-4">
                    <label
                      htmlFor="namaAyahKandung"
                      className="block text-gray-600 font-semibold"
                    >
                      Nama Ayah Kandung:
                    </label>
                    <input
                      type="text"
                      id="namaAyahKandung"
                      name="namaAyahKandung"
                      placeholder="Nama Ayah Kandung"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={ayah}
                      onChange={ayahChange}
                      required
                    />
                  </div>

                  {/* Nama Ibu Kandung */}
                  <div className="mb-4">
                    <label
                      htmlFor="namaIbuKandung"
                      className="block text-gray-600 font-semibold"
                    >
                      Nama Ibu Kandung:
                    </label>
                    <input
                      type="text"
                      id="namaIbuKandung"
                      name="namaIbuKandung"
                      placeholder="Nama Ibu Kandung"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                      value={ibu}
                      onChange={ibuChange}
                      required
                    />
                  </div>

                  {/* Tombol Simpan */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
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
}
