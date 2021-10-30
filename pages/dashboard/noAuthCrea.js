import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import axios from "axios";

import { parseCookies } from "../../helper/";

export default function Subscription({ data }) {
  const [token, setToken] = useState(JSON.parse(data.token));
  const [name, setName] = useState(JSON.parse(data.user_nicename));

  const [loading, setLoading] = useState(false);

  const getData = async (datas) => {
    setLoading(true);
    const postData = {
      username: datas.name,
      email: datas.email,
      password: datas.password,
      // roles:'editor',
      // fields:{
      //   avatar:'https://www.drinkinstreet.it/wordpress/wp-content/uploads/2021/10/amarimio.png'
      // },
      // avatar_urls:{
      //  ['24']:'https://www.drinkinstreet.it/wordpress/wp-content/uploads/2021/10/amarimio.png'
      // }
      
    };
    try {
      const result = await axios.post(
        "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/users/register",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data) {
        console.log(result.data);
        // cookieCutter.set('token', JSON.stringify(result.data['token']))

        setLoading(false);
      } else {
        setLoading(false);
        console.log(result.data);
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
    <>
      <h1>Ciao {token}</h1>
      <main style={{ minHeight: "70%" }} className="grid grid-cols-12 bg-azu ">
        <form
          style={{ width: "350px" }}
          className="h-full bg-w grid grid-cols-12 col-span-12  place-self-center p-10 rounded-md shadow-lg"
        >
          <div className="grid grid-cols-1 col-span-12">
            <h1 className="text-center text-2xl font-bold">
              Crea un nuovo utente
            </h1>
            <div className="grid grid-cols-1 ">
              <label className="  "> Nome</label>
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
              <label className="  mt-8">E-mail</label>
              <input
                className="checkout border pl-3 bg-azu"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
              />
              {errors?.email?.type === "required" && (
                <p className="error">il campo è richiesto</p>
              )}
              {errors?.email?.type === "pattern" && (
                <p className="error">Formato E-mail non corretto</p>
              )}
            </div>

            <div className="grid grid-cols-1 ">
              <label className="  mt-8"> Password</label>
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
    </>
  );
}
Subscription.getInitialProps = async ({ req, res }) => {
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
