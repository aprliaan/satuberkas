import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import axios from "@lib/axios";

const SuratNow = () => {
  const [totalNow, setTotalNow] = useState(0);

  useEffect(() => {
    axios
      .get("/api/total-suratNow-count")
      .then((response) => {
        const data = Object.values(response.data);
        setTotalNow(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      <div className="col-sm-6 col-lg-3">
        <Card bg="danger" text="white" className="mb-4">
          <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                {totalNow}
                <span className="fs-6 ms-2 fw-normal">Surat</span>
              </div>
              <div>Surat Terinput Bulan Ini</div>
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
                    min: -9,
                    max: 39,
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
                    data: [1, 18, 9, 17, 34, 22, 11],
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
};

export default SuratNow;
