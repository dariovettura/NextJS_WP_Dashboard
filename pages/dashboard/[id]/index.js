import React, { useState, useEffect } from "react";
import Modify from "../../../components/ModifyPost";
import {
  Accordion as AccordionM,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { get, useForm } from "react-hook-form";
import Select, { Option } from "react-select";
import axios from "axios";
import TripModal from "../../../components/tripModal";
import { useCookies } from "react-cookie";
import Modals from "../../../components/modal";
import Loader from "react-loader-spinner";

function UserPage(props) {
  const [cookies, setCookies] = useCookies("token");
  const [cookie, setCookie] = useCookies('user_nicename');

  const [menu, setMenu] = useState(props.menu);
  const [info, setInfo] = useState(props.info);
  const [infoId, setInfoId] = useState(props.info[0].id);
  const [username,setUsename] = useState(props.info[0].title.rendered)
  console.log("id", infoId);
  console.log("info", info);
  console.log("menu", menu);

  const [logo, setLogo] = useState();
  const [img, setImg] = useState();


  


  


  useEffect(async () => {
    const result = await axios.get(
      "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/media"
    );

    setLogo(result.data);
  }, []);

  const options = logo?.map((post) => ({
    value: post.source_url,
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

  const getData = async (datas) => {
    setLoading(true);
    const infoData = { fields: 
      {
    descrizione: datas.descrizione,
    indirizzo:datas.indirizzo,
    logo:logo,
    latitudine:datas.latitudine,
    longitudine:datas.longitudine,
    video:datas.video,
    orari:datas.orari,
    telefono:datas.telefono
   } };

    try {
      const result = await axios.put(
        "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/posts/" + infoId,
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

  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [loading, setLoading] = useState(false);
  function closeModal() {
    setModal(false);
  }
  function openModal() {
    setModal(true);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div>
       <div className="h-10 w-full shadow-md grid grid-cols-2 place-content-center">
           <h2 className='pl-2 font-medium'>Dashboard / {username}</h2>
           <h2 className='pr-2 font-medium place-self-end'>Ciao {cookie.user_nicename}</h2>

         </div>
    <div className="grid grid-cols-1 w-full  md:max-w-2xl  ">
      <AccordionM
        style={{  backgroundColor: "white" }}
        onChange={expand()}
        allowZeroExpanded
        className="  grid grid-cols-1 mt-20   shadow-md"
      >
        <AccordionItem className=" product-card" style={{ padding: "15px" }}>
          <AccordionItemHeading>
            <AccordionItemButton className="rounded whites accordion__button grid grid-cols-2">
            <div className="grid grid-cols-1">
              <p className='font-semibold'>Modifica informazioni</p>
              <ul className=''>
                <li className='flex'>Logo: <p className='font-semibold'>{info[0].acf.logo}</p></li>
                <li className='flex'>Link Video:<p className='font-semibold'>{info[0].acf.video}</p></li>
                <li className='flex'>Descrizione:<p className='font-semibold'> {info[0].acf.descrizione} ...</p></li>
                <li className='flex'>Orari:<p className='font-semibold'>{info[0].acf.orari}</p></li>
                <li className='flex'>Telefono:<p className='font-semibold'>{info[0].acf.telefono}</p></li>
                <li className='flex'>Latitudine:<p className='font-semibold'>{info[0].acf.latitudine}</p></li>
                <li className='flex'>Longitudine:<p className='font-semibold'>{info[0].acf.longitudine}</p></li>
               
              </ul>
              </div>
              <p className="place-self-end">+</p>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel
            style={{ zIndex: "9999" }}
            className="bg-white accordion__panel animat"
          >
            <button onClick={openModal}>Precompila con TripAdvisor</button>

            <form
              style={{ width: "100%" }}
              className="h-full bg-w grid grid-cols-12 col-span-12  place-self-center p-10 rounded-md shadow-lg"
            >
              <div className="grid grid-cols-1 col-span-12 ">
                <div className="grid grid-cols-1">
                  <label className="  mt-8"> Logo</label>

                  <Select
                    options={options}
                    onChange={(e) => setImg(e.value)}
                  ></Select>
                </div>

                <div className="grid grid-cols-1 mt-6">
                  <label className="  "> Video Url</label>
                  <textarea
                    defaultValue={info[0].acf.video}
                    className="pl-3 checkout border bg-azu"
                    // onChange={(e) => setOrderData(e.target.value)}
                    {...register("video", {
                      required: false,
                    })}
                  ></textarea>
                  {errors?.video?.type === "required" && (
                    <p className="error">il campo è richiesto</p>
                  )}

                  {errors?.video?.type === "pattern" && (
                    <p className="error">solo lettere e numeri</p>
                  )}
                </div>

                <div className="grid grid-cols-1 ">
                  <label className="  mt-8">Descrizione</label>
                  <textarea
                   defaultValue={info[0]?.acf?.descrizione}
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

                <div className="grid grid-cols-1 ">
                  <label className="  mt-8"> Orari</label>
                  <textarea
                  
                  defaultValue={info[0].acf.orari}
                    className="checkout border pl-3 bg-azu"
                    // onChange={(e) => setOrderData(e.target.value)}
                    {...register("orari", {
                      required: false,
                    })}
                  />
                  {errors?.orari?.type === "required" && (
                    <p className="error">il campo è richiesto</p>
                  )}
                </div>
                <div className="grid grid-cols-1 ">
                  <label className="  mt-8"> latitudine</label>
                  <textarea
                    defaultValue={info[0].acf.latitudine}
                    className="checkout border pl-3 bg-azu"
                    // onChange={(e) => setOrderData(e.target.value)}
                    {...register("latitudine", {
                      required: false,
                    })}
                  />

                </div>
                <div className="grid grid-cols-1 ">
                  <label className="  mt-8"> longitudine</label>
                  <textarea
                    defaultValue={info[0].acf.longitudine}
                    className="checkout border pl-3 bg-azu"
                    // onChange={(e) => setOrderData(e.target.value)}
                    {...register("longitudine", {
                      required: false,
                    })}
                  />
                 
                </div>

                <div className="grid grid-cols-1 ">
                  <label className="  mt-8"> Telefono</label>
                  <textarea
                    defaultValue={info[0].acf.telefono}
                    className="checkout border pl-3 bg-azu"
                    // onChange={(e) => setOrderData(e.target.value)}
                    {...register("telefono", {
                      required: false,
                      maxLength: 20,
                      pattern: /\d+/,
                    })}
                  ></textarea>
                  {errors?.telefono?.type === "required" && (
                    <p className="error">il campo è richiesto</p>
                  )}
                  {errors?.telefono?.type === "maxLength" && (
                    <p className="error">nome non può eccedere 20 caratteri</p>
                  )}
                  {errors?.telefono?.type === "pattern" && (
                    <p className="error">Solo caratteri numerici</p>
                  )}
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
      <AccordionM
        style={{  backgroundColor: "white" }}
        onChange={expand()}
        allowZeroExpanded
        className="  grid grid-cols-1 mt-20 mb-40 shadow-md"
      >
        <AccordionItem className=" product-card" style={{ padding: "15px" }}>
          <AccordionItemHeading>
            <AccordionItemButton className="rounded whites accordion__button grid grid-cols-2">
             <div className="grid grid-cols-1">
                <p className='font-semibold'>Modifica Post</p>
                <ul>
             <li className='flex'>N° Post: <p className='font-semibold'>{menu.length}</p></li>
             </ul></div>
            
              <p className="place-self-end">+</p>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel
            style={{ zIndex: "9999" }}
            className="bg-white accordion__panel animat"
          >
           <Modify
           menu={menu}
           logo={logo}
           ></Modify>
          </AccordionItemPanel>
        </AccordionItem>
      </AccordionM>
      </div>
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
      <TripModal
        open={modal}
        close={closeModal}
        text={modalText}
        info={setInfo}
      ></TripModal>
    </div>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const res = await fetch(
    "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/users"
  );
  const data = await res.json();

  const paths = data.map((author) => {
    return {
      params: { id: author.id.toString() },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  // Fetch necessary data for the blog post using params.id
  const id = context.params.id;
  
  const ress = await fetch(
    "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/posts?_embed&filter[taxonomy]=category&filter[term]=menu&filter[author]=" +
      id
  );
  const pes = await fetch(
    "https://www.drinkinstreet.it/wordpress/wp-json/wp/v2/posts?filter[taxonomy]=category&filter[term]=informazioni&filter[author]=" +
      id
  );
  const menu = await ress.json();
  const info = await pes.json();

  return {
    props: {
      menu,
      info,
     
    },
    revalidate:1
  };
}



export default UserPage;
