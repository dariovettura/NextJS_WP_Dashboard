import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from "axios";

import { get, useForm } from "react-hook-form";

function TripModal(props) {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

      const [menu, setMenu] = useState([]);
    

      const getData = async (datas) => {
        const url=datas.url
        try {
    
          
          const result = await axios.post('/api/scraper', {data:url});
          console.log(result.data);
         

          if (result.data) {
    
            props.info(result.data);
    
    
            
           props.close()
            // cookieCutter.set('token', JSON.stringify(result.data['token']))
    
          
          } else {
            console.log('errore')
          
          }
         
        } catch (err) {
          console.log(err);
         
        }
      };
    




      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

function closeModal() {
    setOpen(false);
  }
    return (
        <div>

             <Modal
        isOpen={props.open}
        style={customStyles}
        contentLabel="Example Modal"
      >
     
     <form
              style={{ width: "100%" }}
              className="h-full bg-w grid grid-cols-12 col-span-12  place-self-center p-10 rounded-md shadow-lg"
            >
              <div className="grid grid-cols-1 col-span-12">

            
               
                <div className="grid grid-cols-1 ">
                  <label className="  "> Trip Advisor Url</label>
                  <textarea
                    className="pl-3 checkout border bg-azu"
                    // onChange={(e) => setOrderData(e.target.value)}
                    {...register("url", {
                      required: false,

                     
                    })}
                  ></textarea>
                  {errors?.url?.type === "required" && (
                    <p className="error">il campo è richiesto</p>
                  )}

                  {errors?.url?.type === "pattern" && (
                    <p className="error">solo lettere e numeri</p>
                  )}
                </div>


             

               

               

                <button
                  className="btn  mt-10  h-12 flex flex-wrap   w-full  justify-center  content-center"
                  onClick={handleSubmit(getData)}
                >
                  Update
                </button>

                {menu[0]?.orari}
              </div>
            </form>
      </Modal>
            
        </div>
    );
}

export default TripModal