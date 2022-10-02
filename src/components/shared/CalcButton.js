import React from 'react';
import styled from 'styled-components';

// style
import style from './calcButton.module.css';

// styled components
const CalcBtn = styled.div`
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 50%;
    color: ${props => props.type === "NUMBER" ? "#293462" : 
        props.type === "MARK" || props.type === "DOT" ? "#ff0000" : "#fff"};
        
    background-color: ${props => props.type === "EQUAL" ? "#ffa200" : 
        props.type === "OPERATOR" ? "#293462" : props.type === "REMOVE" ? "#a8a8a8" : "#fff"};
    /* border: 0.5px solid; */
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    cursor: pointer;
    
    @media (max-width: 480px) {
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 1.3rem;
    }
`


let numberClass = style.buttonContainer + ' ' + style.textBold;
const CalcButton = ({ name, type, dispatch }) => {

    return (
        <CalcBtn type={type} onClick={() => dispatch({type: type, ch: name})}
            id= {name}>
            {name} 
        </CalcBtn>
    );
};

export default CalcButton;