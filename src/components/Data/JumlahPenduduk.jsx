import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import axios from "@lib/axios";

const JumlahPenduduk = () => {

    const [totalPenduduk, setTotalPenduduk] = useState(0);

    useEffect(() => {
      axios
        .get("/api/total-penduduk-count")
        .then((response) => {
          setTotalPenduduk(response.data.totalPenduduk);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, []);

    return (
      <>
        <div className="col-sm-6 col-lg-3">
          <Card bg="primary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  {totalPenduduk}
                  <span className="fs-6 ms-2 fw-normal">Jiwa</span>
                </div>
                <div>Jumlah Penduduk Terdaftar</div>
              </div>
            </Card.Body>
            <div className="mt-3 mx-3" style={{ height: "70px" }}>
              <Line
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 0,
                      hoverRadius: 0,
                    },
                  },
                }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      backgroundColor: "rgba(255,255,255,.20)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [65, 59, 84, 84, 51, 55, 40],
                      fill: true,
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </div>
      </>
    );
}

export default JumlahPenduduk