import React, { useContext, useState } from "react";
import { Context } from "../states/context";
import LogoWrapper from "./LogoWrapper";
import Header from "./Header";
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import { NextScript } from 'next/document';
function Layout(props) {
  const { children } = props;
  const { state } = useContext(Context);
  const [isOpen, setOpen] = useState(false);
  const newCredit =
    state?.auth?.data?.credit;

  return (
    <>
      { state?.loading && <div className="wait-loading">
        <Icon path={mdiLoading} size={3} color={'#fff'} spin={1} />
      </div>}
      <LogoWrapper credits={newCredit} />
      <Header credits={newCredit} handleModal={() => setOpen(true)} />
      {children}
      {/* <NextScript /> */}
      <style jsx global>{`
    html{
      padding:0px !important;

    }
    body{
      padding:0px !important;
    }
        .wait-loading {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(142, 161, 183, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 101;
        }
       
      `}</style>
    </>
  );
}
export default Layout;
