import React, { useEffect, useState } from "react";

import HeadCustom from "../layout/AdminLayout/Header/head";
import { Card } from "react-bootstrap";
import { AdminLayout } from "@layout";
import axios from "@lib/axios"
import { useRouter } from "next/router";
import {useAuth} from "@hooks/auth"
import ToastComp from "@components/Toast/Toast";

const History = () => {
  const [softDeletedData, setSoftDeletedData] = useState([]);
  const [penduduk, setPenduduk] = useState([]);
  const [nik, setNik] = useState(null);
  const [nama, setNama] = useState(null);
  const pendudukIds = softDeletedData.map((data) => data.penduduk_id);
  const { user } = useAuth();
  const router = useRouter();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    };
    axios.get("/api/soft-deleted-data").then((response) => {
      setSoftDeletedData(response.data);
    });

    fetchPenduduk(pendudukIds);
  }, [pendudukIds, router, user]);

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

  function formatDeletedAt(createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleRestore(id) {
    const url = `/api/restore/${id}`; 
    axios
      .post(url)
      .then((response) => {
        console.log("Data berhasil direstore");
        setToast({
          show: true,
          message: "Data Berhasil Direstore",
          success: true,
        });
        console.log("Toast should show for success");
        setTimeout(() => {
          setToast(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Gagal melakukan restore data", error.response.data);
        setToast({
          show: true,
          message: "Data Gagal Direstore",
          success: false,
        });
        setTimeout(() => {
          setToast(false);
        }, 2000);
      });
  }
  return (
    <>
      <HeadCustom title={"Riwayat Penghapusan"} />
      {toast.show && (
        <ToastComp message={toast.message} success={toast.success} />
      )}
      <AdminLayout>
        <Card className="h-min-screen h-full">
          <Card.Header>History Penghapusan Surat</Card.Header>
          <Card.Body>
            {/* Konten */}
            <div className="flex-grow flex justify-center bg-white">
              <div className=" border border-gray-300 rounded-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-black">
                  Riwayat Penghapusan
                </h1>

                {/* Tampilkan komponen RiwayatHapus */}
                <table className="w-full border-collapse border border-gray-300 text-black">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        No
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Nama
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        NIK
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Nama Surat
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Jenis Surat
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Waktu Penghapusan
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {softDeletedData.map((item, index) => (
                      <tr key={item.id}>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {nama}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {nik}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {item.nama_surat}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {item.jenis_surat}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {formatDeletedAt(item.deleted_at)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          >
                            Restore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card.Body>
        </Card>
      </AdminLayout>
    </>
  );
};

export default History;
