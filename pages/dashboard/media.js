import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import axios from "axios";

import { parseCookies } from "../../helper/";

export default function Upload({ data }) {
  const [token, setToken] = useState(JSON.parse(data.token));
  const [name, setName] = useState(JSON.parse(data.user_nicename));

  const [loading, setLoading] = useState(false);
  



  const addPost = async (datas) => {
    setLoading(true);
    // const postData = {
    //   file: datas.file,
    //  title:'test'
      

    // };
    const formData = new FormData();
    formData.append("file", datas.file[0]);
    formData.append("title", 'ciao');
    console.log(datas.file[0])
    try {
      const result = await axios.post(
        "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/media",
        formData,
          {
            headers: {
                "Content-Type": "multipart/form-data;",
              'Authorization': `Bearer ${token}` 
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
      <div>
        <h1>Ciao {name}</h1>
        <p>token:{token} </p>

        <form className="grid grid-cols-12">
          <div className="grid grid-cols-1 col-span-7">
            <label> File</label>
            <input
            type='file'
              className="checkout border"
              // onChange={(e) => setOrderData(e.target.value)}
              {...register("file", {
                required: true,

              
              })}
            />
          

            <button
              className=" border mt-10  h-12 flex flex-wrap   w-full btn_don_oro justify-center  content-center"
              onClick={handleSubmit(addPost)}
            >
              crea
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
      </div>
    </>
  );
}
Upload.getInitialProps = async ({ req, res }) => {
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
