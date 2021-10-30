import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import { useCookies } from "react-cookie";
import cookieCutter from "cookie-cutter";
import Image from "next/image";
import { get, useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies();
  const [token, setToken] = useState();

  const getData = async (datas) => {
    setLoading(true);
    const loginData = {
      username: datas.name,
      password: datas.password,
    };
    try {
      const result = await axios.post(
        "api/login",
        {data:loginData}
      );

      if (result.data) {
        // console.log(result.data);
        // cookieCutter.set('token', JSON.stringify(result.data['token']))

        setCookie(
          "user_nicename",
          JSON.stringify(result.data["user_nicename"]),
          {
           
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
          }
        );
        setCookie("token", JSON.stringify(result.data["token"]), {
         
          path: "/",
          maxAge: 7200, // Expires after 2hr
          sameSite: true,
        });

        router.push({
          pathname: "/dashboard",
        });
        setLoading(false);
      } else {
        setLoading(false);
        // console.log(result.data);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <Head>
        <title>Wordpress Personal Dashboard</title>
        <meta name="description" content="Dashboard for content management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{ height: "100vh",  }}
        className="grid grid-cols-12 bg-azu"
      >
        <form
          style={{ height: "60vh",width:'350px' }}
          className=" bg-w grid grid-cols-12 col-span-12  place-self-center p-10 rounded-md shadow-lg"
        >
          <div className="grid grid-cols-1 col-span-12">
            <h1 className="text-center text-2xl font-bold">Login</h1>
            <div className="grid grid-cols-1 ">
            <label className=" -mb-5 "> Name</label>
            <input 
              className="pl-3 checkout border bg-azu"
              // onChange={(e) => setOrderData(e.target.value)}
              {...register("name", {
                required: true,

                pattern: /^[A-Za-z0-9'\.\-\s\,]+$/i,
              })}
            />
            {errors?.name?.type === "required" && (
              <p className="error">il campo è richiesto</p>
            )}

            {errors?.name?.type === "pattern" && (
              <p className="error">solo lettere e numeri</p>
            )}
</div>
<div className="grid grid-cols-1 ">
            <label className=" -mb-5 mt-8"> Password</label>
            <input
           

              type="password"
              className="checkout border pl-3 bg-azu"
              // onChange={(e) => setOrderData(e.target.value)}
              {...register("password", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && (
              <p className="error">il campo è richiesto</p>
            )}
</div>
            <button
           
              className="btn  mt-10  h-12 flex flex-wrap   w-full  justify-center  content-center"
              onClick={handleSubmit(getData)}
            >
              Login
            </button>
          </div>
        </form>

        <div
          className="grid grid-cols-1 place-items-center place-content-center"
          style={{
            position: loading ? "fixed" : "block",
            display: loading ? "grid" : "none",

            backgroundColor: "rgba(255, 255, 255, 0.8)",
            top: 0,
            left: 0,

            height: "100vh",
            width: "100vw",
            zIndex: 100,
          }}
        >
          <Loader
            className="loade"
            type="Oval"
            color="#ff8800"
            height={80}
            width={80}
          />
          <h2>Stiamo elaborando il tuo ordine</h2>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
