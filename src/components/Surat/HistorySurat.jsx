import React from "react";

const RiwayatHapus = ({ dataRiwayatHapus }) => {
  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 text-black">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">Nama</th>
            <th className="border border-gray-300 px-4 py-2">NIK</th>
            <th className="border border-gray-300 px-4 py-2">RT</th>
            <th className="border border-gray-300 px-4 py-2">Jenis Surat</th>
            <th className="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {dataRiwayatHapus.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.nomor}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.nama}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.nik}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.rt}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.jenisSurat}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.keterangan}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatHapus;
