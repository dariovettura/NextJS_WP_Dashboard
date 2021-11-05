import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import axios from "axios";
import { useCookies } from "react-cookie";


import Select, { Option } from "react-select";

export default function Upload({ data }) {
 
  const [cookie, setCookie] = useCookies('user_nicename');
  const [cookies, setCookies] = useCookies("token");
  const [loading, setLoading] = useState(false);
  const [users,setUsers] = useState()
  const [user,setUser] = useState(1)
const [uploadok,setUploadok] =useState(false)
const [text,settext] = useState()

  useEffect(async () => {
    const result = await axios.get(
      "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/users"
    );

    setUsers(result.data);
    console.log(result.data)
  }, []);

  const options = users?.map((post) => ({
    value: post.id,
    label: (
      <div>
     
        {post.name}
      </div>
    ),
  }));

  const getData = async (datas) => {
    setLoading(true);
    setUploadok(false);
    // const postData = {
    //   file: datas.file,
    //  title:'test'
      

    // };
    const formData = new FormData();
    formData.append("file", datas.file[0]);
    formData.append("title", datas.titolo);
    formData.append("author", user);
    console.log(datas.file[0])
    try {
      const result = await axios.post(
        "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/media",
        formData,
          {
            headers: {
                "Content-Type": "multipart/form-data;",
              'Authorization': `Bearer ${cookies.token}` 
            },
          }
      );

      if (result.data) {
        console.log(result.data);
        // cookieCutter.set('token', JSON.stringify(result.data['token']))

        setLoading(false);
        setUploadok(true);
        settext('Foto caricata con successo')
      } else {
        setLoading(false);
        setUploadok(true);
        settext('Non caricata,probabilmente il nome già esiste oppure è scaduto il login.Aggiorna la pagina')
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
     

        <form className="grid grid-cols-12 place-content-center">
          <div className="max-w-md grid grid-cols-1 col-span-7 mb-5">
            <label> File</label>
            <input
            type='file'
              className="checkout border"
              // onChange={(e) => setOrderData(e.target.value)}
              {...register("file", {
                required: true,

              
              })}
            />
           </div>
           <div className="max-w-md grid grid-cols-1 mb-5 col-span-7" >
            <label> titolo</label>
            <input
            type='text'
              className="checkout border"
              // onChange={(e) => setOrderData(e.target.value)}
              {...register("titolo", {
                required: true,

              
              })}
            />
           </div>
           <div className="max-w-md grid grid-cols-1 mb-5 col-span-7" >
           <label> Autore</label>
           <Select className='col-span-7'
           
                    options={options}
                    
                    onChange={(e) => setUser(e.value)}
                  ></Select>
                  </div>
                  <div className="max-w-md grid grid-cols-1 mb-5 col-span-7"  style={{
          
            display: uploadok ? "block" : "none",

        
          }}
        >
          {text}
                  </div>
           <button
                  className="btn  mt-10  h-12 flex flex-wrap  col-span-7  w-full  justify-center  content-center"
                  onClick={handleSubmit(getData)}
                >
                  Update
                </button>
         
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


