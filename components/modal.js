import React, { useState, useEffect } from "react";
import Modal from 'react-modal';

function Modals(props) {
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
     
     <button onClick={props.close}>close</button>
       <p>{props.text}</p>
      </Modal>
            
        </div>
    );
}

export default Modals