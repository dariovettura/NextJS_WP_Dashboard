import React, {useState} from 'react';

export default (props) => {

    const {title} = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    

    return (
        <div className="accordion">
            <div className="accordion-title" onClick={toggle}>
                <span>{title}</span>
                <div className='toggle'  aria-expanded={isOpen} alt='Toggle Accordion'>Y</div>
            </div>
            <div className="accordion-content" aria-expanded={!isOpen}>
                {props.children}
            </div>
        </div>
    );

};