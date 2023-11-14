import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import axios from "@lib/axios";

const Admin = () => {

     const [totalAdmin, setTotalAdmin] = useState(0);

     useEffect(() => {
       fetchData;
       const intervalId = setInterval(fetchData, 3000);
       return () => {
         clearInterval(intervalId);
       };
     }, []);
     const fetchData = () => {
       axios
         .get("/api/total-admin-count")
         .then((response) => {
           setTotalAdmin(response.data.totalAdmin);
         })
         .catch((error) => {
           console.error("Error:", error);
         });
     };
  return (
    <>
      <div className="col-sm-6 col-lg-3">
        <Card bg="warning" text="white" className="mb-4">
          <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">
                {totalAdmin}
                <span className="fs-6 ms-2 fw-normal">
                  Akun
                </span>
              </div>
              <div>Jumlah Admin Terdaftar</div>
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
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
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
                    // label: "My First dataset",
                    backgroundColor: "rgba(255,255,255,.2)",
                    borderColor: "rgba(255,255,255,.55)",
                    data: [78, 81, 80, 45, 34, 12, 40],
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

export default Admin;
