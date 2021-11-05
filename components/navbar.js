import React, { useState, useEffect } from "react";
import Link from "next/link";
import { parseCookies } from "../helper/";
import { FaHome } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { GrUser } from "react-icons/gr";

import { useCookies } from "react-cookie";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useRouter } from "next/router";
function navbar({ children }) {
  const router = useRouter();
  const [cookies, setCookie] = useCookies("token");
  const [cookie, setCookies] = useCookies("user_nicename");

  useEffect(() => {
    const token = cookies.token;
    if (token == null) {
      router.push({
        pathname: "/",
      });
    } else {
      console.log("token ok");
    }
  }, []);

  const [collaps, setCollaps] = useState(true);
  const onClick = () => {
    setCollaps(!collaps);
  };

  return (
    <div className="flex" style={{ height: "100vh" }}>
      <ProSidebar className="h-full" collapsed={collaps}>
        <Menu iconShape="square">
          <MenuItem icon={<FaAlignLeft></FaAlignLeft>} onClick={onClick}>
            Chiudi
          </MenuItem>
          <MenuItem icon={<FaHome />}>
            <Link href="/dashboard">Lista Bar</Link>
          </MenuItem>
          <MenuItem icon={<FaImage />}>
            {" "}
            <Link href="/dashboard/media">Aggiungi Media</Link>{" "}
          </MenuItem>
          <MenuItem icon={<FaUserPlus />}>
            <Link href="/dashboard/crea">Crea Bar</Link>
          </MenuItem>
        </Menu>
      </ProSidebar>

      <div className="bg-azu w-full overflow-y-auto">
        <div className="h-10 w-full shadow-md grid grid-cols-2 place-content-center">
          <h2 className="pl-2 font-medium">Dashboard</h2>
          <div className="pr-2 font-medium flex  place-self-end mr-5">
            <div>
              <GrUser className="h-full mr-1" />{" "}
            </div>
            <p className="capitalize ">{cookie.user_nicename}</p>

          </div>
        </div>

        <div className="md:p-10 p-2 h-full">{children}</div>
      </div>
    </div>
  );
}

export default navbar;
navbar.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  return {
    data: data && data,
  };
};
