import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import Select,{Option} from 'react-select'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Loader from "react-loader-spinner";
import axios from "axios";
import Modals from "../../components/modal";
import { useCookies } from "react-cookie";

import { parseCookies } from "../../helper/";

export default function Subscription({ data }) {
  const [cookies, setCookies] = useCookies("token");
  const [cookie, setCookie] = useCookies('user_nicename');
 

  const [modal, setModal] = useState(false);
  const [modalText,setModalText] = useState('')
  function closeModal() {
    setModal(false);
  }

  const [loading, setLoading] = useState(false);


  const [logo,setLogo] =useState()
  const [img,setImg] =useState()

  

  useEffect(async () => {
    const result = await axios.get( "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/media");

  

    setLogo(result.data);
  }, []);
console.log(logo)
  

  const options  =  
    logo?.map((post) =>
     ({ value: post.source_url, label: <div><img src={post.source_url} height="30px" width="30px"/>{post.title.rendered} </div> }),)
    
    
  ;
   

 
  const getData = async (datas) => {
    setLoading(true);
    const userData = {
      username: datas.name,
      email: datas.email,
      password: datas.password,
      url:img,
      roles:'author',
      // fields:{
      //   avatar:'https://www.drinkinstreet.it/wordpress/wp-content/uploads/2021/10/amarimio.png'
      // },
      // avatar_urls:{
      //  ['24']:'https://www.drinkinstreet.it/wordpress/wp-content/uploads/2021/10/amarimio.png'
      // }

    };
    try {
      const result = await axios.post(
        "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (result.data) {

        const postData = {
          title: result.data.name,
         author:result.data.id,
         status:'publish'
        
          // fields:{
          //   avatar:'https://www.drinkinstreet.it/wordpress/wp-content/uploads/2021/10/amarimio.png'
          // },
          // avatar_urls:{
          //  ['24']:'https://www.drinkinstreet.it/wordpress/wp-content/uploads/2021/10/amarimio.png'
          // }
    
        };
        try {
          const result = await axios.post(
            "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/posts",
            postData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );
    
          if (result.data) {
    
    
    
    
            
            console.log(result.data);
            // cookieCutter.set('token', JSON.stringify(result.data['token']))
    
          
          } else {
            console.log('errore')
          
          }
        } catch (err) {
          console.log(err);
         
        }






        
        console.log(result.data);
        // cookieCutter.set('token', JSON.stringify(result.data['token']))

        setLoading(false);
        setModal(true);
        setModalText('Creato con successo');
      } else {
        setLoading(false);
        console.log(result.data);
        setModal(true);
        setModalText('Qualcosa è andato storto,forse il nome utente o email gia esiste');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setModal(true);
      setModalText('Qualcosa è andato storto,forse il nome utente o email gia esiste');
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
     <div className="h-10 w-full mb-16 shadow-md grid grid-cols-2 place-content-center">
           <h2 className='pl-2 font-medium'>Dashboard / Add User</h2>
           <h2 className='pr-2 font-medium place-self-end'>Ciao {cookie.user_nicename}</h2>

         </div>
      <main style={{ minHeight: "70%" }} className="grid grid-cols-12 bg-azu ">
        <form
          style={{ width: "350px" }}
          className="h-full bg-w grid grid-cols-12 col-span-12  place-self-center p-10 rounded-md shadow-lg"
        >
          <div className="grid grid-cols-1 col-span-12">
            <h1 className="text-center text-2xl font-bold">
              Crea un nuovo Bar
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
<div className="grid grid-cols-1">
<label className="  mt-8"> Logo</label>
{/* <Select onClick={getImg}  {...register("imgUrl", {
                  required: true,
                })}
              options={options}
                >

                </Select> */}
            {/* <select onClick={getImg}  {...register("imgUrl", {
                  required: true,
                })}>
                   {logo &&
            logo?.map((post, i) => {
              return (<option value={post.source_url} style={{height:'30px',backgroundImage: `url(${post.source_url})`}} key={i} className=""></option> );
            })}

      </select> */}
    
      <Select options={options}    onChange={(e) => setImg(e.value)} ></Select>
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
          <h2>Stiamo elaborando la tua richiesta</h2>
        </div>
        <div className="grid grid-cols-5">  <Modals
        open={modal}
        close={closeModal}
        text={modalText}
        ></Modals>
        </div>

      </main>
    </>
  );
}

