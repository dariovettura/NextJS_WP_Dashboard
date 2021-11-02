import React, { useState, useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { BsPlusCircle} from "react-icons/bs";

import {
    Accordion as AccordionM,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from "react-accessible-accordion";
  import Select, { Option } from "react-select";
  import { useCookies } from "react-cookie";
  import axios from "axios";
import Modals from "./modal";
import Loader from "react-loader-spinner";


function AddPost(props) {

    const [cookies, setCookie] = useCookies("token");
  
    const [menu, setMenu] = useState(props.menu);
    console.log('foto',menu)
    const [img, setImg] = useState();

    const options = props.logo?.map((post) => ({
        value: post.id,
        label: (
          <div>
            <img src={post.source_url} height="30px" width="30px" />
            {post.title.rendered}
          </div>
        ),
      }));

    const [expanded, setExpanded] = useState(false);

    const expand = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };


    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [loading, setLoading] = useState(false);
    function closeModal() {
      setModal(false);
    }
    function openModal() {
      setModal(true);
    }


    const getData = async (datas) => {
      setLoading(true);
        const infoData = { 
           
            title:datas.titolo,
            featured_media:img,
            excerpt:datas.descrizione};
        
    
        try {
          const result = await axios.post(
            "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/posts/",
            infoData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );
    
          if (result.data) {
            console.log(result.data);
            setLoading(false);
            setModal(true);
            setModalText('Modificato con successo');
            // cookieCutter.set('token', JSON.stringify(result.data['token']))
    
            // setLoading(false);
            // setModal(true);
            // setModalText('Creato con successo');
          } else {
            setLoading(false);
            console.log(result.data);
            setModal(true);
            setModalText('Qualcosa è andato storto,aggiorna la pagina e verifica se sei ancora loggato');
            // setLoading(false);
            // setModal(true);
            // setModalText('Qualcosa è andato storto,forse il nome utente o email gia esiste');
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
         
          setModal(true);
          setModalText('Qualcosa è andato storto,aggiorna la pagina e verifica se sei ancora loggato');
          // setLoading(false);
          // setModal(true);
          // setModalText('Qualcosa è andato storto,forse il nome utente o email gia esiste');
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
           
         
          
        
                <AccordionM
        style={{  backgroundColor: "white" }}
        onChange={expand()}
        allowZeroExpanded
        className="  grid grid-cols-1 mt-20 md:max-w-sm  shadow-md"
      >
        <AccordionItem className=" product-card" style={{ padding: "15px" }}>
          <AccordionItemHeading>
            <AccordionItemButton className="rounded whites accordion__button grid grid-cols-2">
               
                <p>Aggiungi Post </p>< BsPlusCircle className=' place-self-end'/>
           
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel
            style={{ }}
            className="bg-white accordion__panel animat"
          >
         <form
              style={{ width: "100%" }}
              className="h-full bg-w grid grid-cols-12 col-span-12  place-self-center p-10 rounded-md shadow-lg"
            >
              <div className="grid grid-cols-1 col-span-12">
                <div className="grid grid-cols-1">
                  <label className="  mt-8"> Logo</label>

                
                  <Select
                    options={options}
                    onChange={(e) => setImg(e.value)}
                  ></Select>
                </div>

               

                <div className="grid grid-cols-1 ">
                  <label className="  mt-8">Titolo</label>
                  <textarea
                   
                    className="checkout border pl-3 bg-azu"
                    {...register("titolo", {
                      required: false,
                    })}
                  />
                  {errors?.titolo?.type === "required" && (
                    <p className="error">il campo è richiesto</p>
                  )}
                  {errors?.titolo?.type === "pattern" && (
                    <p className="error">Formato E-mail non corretto</p>
                  )}
                </div>

                <div className="grid grid-cols-1 ">
                  <label className="  mt-8">Descrizione</label>
                  <textarea
                  rows={4}
                 
                    className="checkout border pl-3 bg-azu"
                    {...register("descrizione", {
                      required: false,
                    })}
                  />
                  {errors?.descrizione?.type === "required" && (
                    <p className="error">il campo è richiesto</p>
                  )}
                  {errors?.descrizione?.type === "pattern" && (
                    <p className="error">Formato E-mail non corretto</p>
                  )}
                </div>
                <div className=" hidden  ">
                  <label className="  mt-8">id</label>
                  <textarea
               
                    className="checkout border pl-3 bg-azu"
                    {...register("id", {
                      required: false,
                    })}
                  />
                  
                </div>

               

              

                <button
                  className="btn  mt-10  h-12 flex flex-wrap   w-full  justify-center  content-center"
                  onClick={handleSubmit(getData)}
                >
                  Update
                </button>
              </div>
            </form>
          </AccordionItemPanel>
        </AccordionItem>
      </AccordionM>
           
          
      


</div>
           

            
        
      
    );
}


  

export default AddPost;