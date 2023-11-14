import React, { useEffect, useState } from "react";
import HeadCustom from "../layout/AdminLayout/Header/head";
import axios from "@lib/axios";
import { useRouter } from "next/router";
import Modal from "../components/Modal/Modal";
import ToastComp from "../components/Toast/Toast";
import { AdminLayout } from "@layout";
import { Card } from "react-bootstrap";
import {useAuth} from "@hooks/auth"

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
  { value: "TK/Paud", label: "TK/Paud" },
  { value: "SD", label: "SD" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
  { value: "S1", label: "S1" },
  { value: "S2", label: "S2" },
  { value: "S3", label: "S3" },
];

const DetailPenduduk = () => {
  const [penduduk, setPenduduk] = useState([]);
  const [nama, setNama] = useState(penduduk ? penduduk.nama : "");
  const [nik, setNik] = useState(penduduk ? penduduk.nik : "");
  const [nokk, setNokk] = useState(penduduk ? penduduk.no_kk : "");
  const [tanggalLahir, setTanggalLahir] = useState(
    penduduk ? penduduk.tanggal_lahir : ""
  );
  const [alamat, setAlamat] = useState(penduduk ? penduduk.alamat : "");
  const [jenisKelamin, setJenisKelamin] = useState(
    penduduk
      ? genderOptions.find((option) => option.value === penduduk.jenis_kelamin)
      : null
  );
  const [kelurahan, setKelurahan] = useState(
    penduduk
      ? kelurahanOptions.find((option) => option.value === penduduk.kelurahan)
      : null
  );
  const [rt, setRt] = useState(
    penduduk ? rtOptions.find((option) => option.value === penduduk.rt) : null
  );
  const [agama, setAgama] = useState(
    penduduk
      ? religionOptions.find((option) => option.value === penduduk.agama)
      : null
  );
  const [pekerjaan, setPekerjaan] = useState(
    penduduk
      ? occupationOptions.find((option) => option.value === penduduk.pekerjaan)
      : null
  );
  const [status, setStatus] = useState(
    penduduk
      ? maritalStatusOptions.find(
          (option) => option.value === penduduk.status_perkawinan
        )
      : null
  );
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState(
    penduduk
      ? educationOptions.find(
          (option) => option.value === penduduk.pendidikan_terakhir
        )
      : null
  );
  const [ayah, setAyah] = useState(penduduk ? penduduk.ayah : "");
  const [ibu, setIbu] = useState(penduduk ? penduduk.ibu : "");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    fetchPenduduk(id);
    fetchSurat(id);
  }, [id,user,router]);

  
  function fetchPenduduk(id) {
    let url = `/api/penduduk/${id}`;
    axios
      .get(url)
      .then((response) => {
        setPenduduk(response.data);
        setNik(response.data.nik);
        setNama(response.data.nama);
        setNokk(response.data.no_kk);
        setTanggalLahir(response.data.tanggal_lahir);
        setJenisKelamin(response.data.jenis_kelamin);
        setAlamat(response.data.alamat);
        setRt(response.data.rt);
        setKelurahan(response.data.kelurahan);
        setAgama(response.data.agama);
        setPekerjaan(response.data.pekerjaan);
        setStatus(response.data.status_perkawinan);
        setPendidikanTerakhir(response.data.pendidikan_terakhir);
        setAyah(response.data.ayah);
        setIbu(response.data.ibu);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handelChange = (id) => {
    fetchBerkas(id);
  };
  
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

  function fetchSurat(id) {
    let url = `/api/file?penduduk_id=${id}}`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    function fetchPath(file_path) {
      let url = `/api/berkas/${file_path}`;
      axios
      .get(url, { responseType: "blob" })
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const newTab = window.open();
        newTab.document.write(
          `<iframe src="${fileURL}" width="100%" height="100%"></iframe>`
          );
        })
        .catch((error) => {
          console.log("error");
        });
      }
      const handleDelete = (id) => {
        setShowModal(true);
        setDeleteId(id);
      };
    
      const handleConfirmDelete = () => {
        deleteData(deleteId);
        setShowModal(false);
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
            fetchSurat(penduduk.id);
          })
          .catch((error) => {
            setToast({
              show: true,
              message: "Data Gagal Dihapus",
              success: true,
            });
            console.log("Toast should show for success");
            setTimeout(() => {
              setToast(false);
            }, 2000);
            console.log("gagal hapus");
          });
      };
      
      return (
        <>
          <HeadCustom title={"Detail Penduduk"} />
          <AdminLayout>
            <Card className="h-min-screen h-full">
              <Card.Header>Detail Penduduk</Card.Header>
              <Card.Body>
                <div className="main-content flex-stretch justify-center flex-start bg-white text-black">
                  <div className="mx-auto border border-gray-300 rounded-md px-6 py-4">
                    <h1 className="text-2xl font-bold mb-2">
                      Detail Data Penduduk
                    </h1>

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
                      <ToastComp
                        message={toast.message}
                        success={toast.success}
                      />
                    )}

                    {/* Data Pribadi */}
                    <div className="bg-white rounded-md px-4 pt-4 pb-2">
                      <h2 className="text-xl font-bold mb-2 text-black bg-amber-300 bg-opacity-50 p-2 rounded-md">
                        Data Pribadi
                      </h2>
                      <form>
                        <div className="mb-2 text-black">
                          <label htmlFor="nama">Nama:</label>
                          <input
                            type="text"
                            id="nama"
                            name="nama"
                            value={nama}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-2 text-black">
                          <label htmlFor="nik">NIK:</label>
                          <input
                            type="text"
                            id="nik"
                            name="nik"
                            value={nik}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-2 text-black">
                          <label htmlFor="jenisKelamin">Jenis Kelamin:</label>
                          <input
                            type="text"
                            id="jenisKelamin"
                            name="jenisKelamin"
                            value={jenisKelamin}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-1 text-black">
                          <label htmlFor="tanggalLahir">Tanggal Lahir:</label>
                          <input
                            type="text"
                            id="tanggalLahir"
                            name="tanggalLahir"
                            value={tanggalLahir}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                      </form>
                    </div>

                    {/* Data Keluarga */}
                    <div className="bg-white rounded-md p-4 text-black">
                      <h2 className="text-xl font-bold mb-2 bg-amber-300 bg-opacity-50 p-2 rounded-md">
                        Data Keluarga
                      </h2>
                      <form>
                        <div className="mb-2">
                          <label htmlFor="noKk">No. KK:</label>
                          <input
                            type="text"
                            id="noKk"
                            name="noKk"
                            value={nokk}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="namaAyah">Nama Ayah:</label>
                          <input
                            type="text"
                            id="namaAyah"
                            name="namaAyah"
                            value={ayah}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="namaIbu">Nama Ibu:</label>
                          <input
                            type="text"
                            id="namaIbu"
                            name="namaIbu"
                            value={ibu}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                      </form>
                    </div>

                    {/* Data Alamat */}
                    <div className="bg-white rounded-md px-4 pt-2 pb-2">
                      <h2 className="text-xl font-bold mb-2 bg-amber-300 bg-opacity-50 p-2 rounded-md">
                        Data Alamat
                      </h2>
                      <form>
                        <div className="mb-2">
                          <label htmlFor="rt">RT:</label>
                          <input
                            type="text"
                            id="rt"
                            name="rt"
                            value={rt}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="nomorRumah">Alamat:</label>
                          <input
                            type="text"
                            id="alamat"
                            name="alamat"
                            value={alamat}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="kelurahan">Kelurahan:</label>
                          <input
                            type="text"
                            id="kelurahan"
                            name="kelurahan"
                            value={kelurahan}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                      </form>
                    </div>

                    {/* Data Umum */}
                    <div className="bg-white rounded-md p-4">
                      <h2 className="text-xl font-bold mb-2 bg-amber-300 bg-opacity-50 p-2 rounded-md">
                        Data Umum
                      </h2>
                      <form>
                        <div className="mb-2">
                          <label htmlFor="agama">Agama:</label>
                          <input
                            type="text"
                            id="agama"
                            name="agama"
                            value={agama}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="statusPernikahan">
                            Status Pernikahan:
                          </label>
                          <input
                            type="text"
                            id="statusPernikahan"
                            name="statusPernikahan"
                            value={status}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="pekerjaan">Pekerjaan:</label>
                          <input
                            type="text"
                            id="pekerjaan"
                            name="pekerjaan"
                            value={pekerjaan}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="pendidikanTerakhir">
                            Pendidikan Terakhir:
                          </label>
                          <input
                            type="text"
                            id="pendidikanTerakhir"
                            name="pendidikanTerakhir"
                            value={pendidikanTerakhir}
                            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                            disabled
                          />
                        </div>
                      </form>
                    </div>

                    {/* Data Berkas */}
                    <div className="bg-white rounded-md p-4">
                      <h2 className="text-xl font-bold mb-2 bg-amber-300 bg-opacity-50 p-2 rounded-md">
                        Data Berkas
                      </h2>
                      <table className="w-full border-collapse border text-center border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">No.</th>
                            <th className="border border-gray-300 p-2">
                              Jenis Surat
                            </th>
                            <th className="border border-gray-300 p-2">
                              File Surat
                            </th>
                            <th className="border border-gray-300 p-2">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={item}>
                              <td className="border border-gray-300 p-2">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {/* {console.log(item)} */}
                                {item.jenis_surat}
                              </td>
                              <td className="border border-gray-300 p-2">
                                {item.nama_surat}
                              </td>
                              <td className="border border-gray-300 p-2 flex justify-center gap-3">
                                <button
                                  onClick={() => handelChange(item.id)}
                                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md px-3 py-1.5"
                                >
                                  Buka
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="bg-red-600 hover:bg-red-800 text-white font-medium rounded-md px-3 py-1.5"
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </AdminLayout>
        </>
      );
};

export default DetailPenduduk;
