import { Card, Form } from "react-bootstrap";
import React from "react";
import { AdminLayout } from "@layout";
import { PendudukList } from "../components/Penduduk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {useAuth} from "@hooks/auth"


const DataPenduduk = () => {
  const {user} = useAuth();
  const router = useRouter();
  
  useEffect (() =>{
    if(!user){
      router.push("/login");
    }
  },[user, router]);

  return (
    <>
    
      <AdminLayout>
        <Card className="h-min-screen h-full">
          <Card.Header>Data Penduduk</Card.Header>
          <Card.Body>
            <PendudukList />
          </Card.Body>
        </Card>
      </AdminLayout>
    </>
  );
};
export default DataPenduduk;
