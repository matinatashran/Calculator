import React from 'react';

// style
import style from './calcButton.module.css';



let numberClass = style.buttonContainer + ' ' + style.textBold;
const CalcButton = ({ name, type, dispatch }) => {

    return (
        <div className={typeof(name) === 'number' ? numberClass : style.buttonContainer} 
            onClick={() => dispatch({type: type, ch: name})}
            id= {name}
        >
            {name} 
        </div>
    );
};

export default CalcButton;