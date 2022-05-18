import React, { useReducer, useState } from 'react';

// style
import style from './calculator.module.css';

// components
import CalcButton from './shared/CalcButton';

// helper
import { replaceOP } from '../helper/functions';

const buttons = [
    {name: "CE", type: "REMOVE"}, {name: "C", type: "REMOVE"}, {name: "←", type: "REMOVE"}, {name: "/", type: "OPERATOR"},
    {name: 7, type: "NUMBER"}, {name: 8, type: "NUMBER"}, {name: 9, type: "NUMBER"}, {name: "*", type: "OPERATOR"},
    {name: 4, type: "NUMBER"}, {name: 5, type: "NUMBER"}, {name: 6, type: "NUMBER"}, {name: "-", type: "OPERATOR"},
    {name: 1, type: "NUMBER"}, {name: 2, type: "NUMBER"}, {name: 3, type: "NUMBER"}, {name: "+", type: "OPERATOR"},
    {name: "±", type: "MARK"}, {name: 0, type: "NUMBER"}, {name: ".", type: "DOT"}, {name: "=", type: "EQUAL"},
]

const a = "3*4*53+2423"
for(let i= a.length ; i >= 0; i--){
    if (a[i] === "+" || a[i] === "/" || a[i] === "*" || a[i] === "-"){
        const index = a.indexOf(a[i]);
        const b = a.substring(0, index + 1)
    }
}

const initialResult = "0";
let flag = 0;
const reducer = (result, action) => {
    // ------ ch: charactor ------
    
    const resultLen = result.length;
    const lastIndex = resultLen - 1;
    const lastCH = result[lastIndex];
    switch(action.type){
        case "NUMBER":
            if (result === "0" || flag === 1){
                result = String(action.ch);
                flag = 0;
            }
            else
                result += String(action.ch);

            return result;

        case "OPERATOR":
            if (result === "0")
                result = `0${action.ch}`;

            else if (lastCH === "*" || lastCH === "/" || lastCH === "-" || lastCH === "+")
                result = result.substring(0, lastIndex) + action.ch

            else
                result += action.ch
            
            return result;
        
        case "EQUAL":
            flag = 1;

            if (lastCH === "*" || lastCH === "/" || lastCH === "-" || lastCH === "+"){
                const num = eval(result.substring(0, lastIndex));
                result = `${num}${lastCH}${num}`;
            }

            if (result.includes("--")){
                let len = resultLen;
                for(let i= 0; i< len; i++){
                    let index;
                    if (result.indexOf("--") > 0){
                        index = result.indexOf("--")
                        result = result.substring(0, index + 1) + `(${result.substring(index + 1, index + 3)})` + result.substring(index + 3, len)

                        len = resultLen;
                    }
                }
            }

            return String(eval(result));
        
        case "REMOVE":
            if (action.ch === "←"){
                if (resultLen === 1)
                    result = "0";
                else
                    result = result.substring(0, lastIndex);
            }
                
            else if (action.ch === "C")
                result = "0";

            else
                for(let i= resultLen; i >= 0; i--){
                    if (result[i] === "+" || result[i] === "/" || result[i] === "*" || result[i] === "-"){
                        if (result[i - 1] === "+" || result[i - 1] === "/" || result[i - 1] === "*" || result[i - 1] === "-")
                            result = result.substring(0, i);
                        else
                            result = result.substring(0, i + 1);
                        
                        break;
                    }
                }

            return result;
        
        case "DOT":
            if (result === "0")
                result = "0.";
            
            if (result[lastIndex] !== "."){
                result += action.ch;
            }
            else{
                for (let i= resultLen; i >= 0; i--){
                    if (result[i] === "+" || result[i] === "/" || result[i] === "*" || result[i] === "-"){
                        for (let j= resultLen; j >= i; j--){
                            if (result[j] !== "."){
                                // result += action.ch;
                            }
                        }

                        break;
                    }
                }
            }

            if (result[lastIndex].includes("0123456789")){
                console.log(1)
            }
        
        case "MARK":
            if (Number(result) < 0 || (!result.includes("+") && !result.includes("-") && !result.includes("*") && !result.includes("/"))){
                result = eval(`-1*${result}`);
            }

            else{
                let num;
                let index;
                for(let i= lastIndex; i >= 0; i--){
                    if (result[i] === "+" || result[i] === "/" || result[i] === "*" || result[i] === "-"){
                        if (result[i - 1] === "+" || result[i - 1] === "/" || result[i - 1] === "*" || result[i - 1] === "-"){
                            num = result.substring(i, lastIndex + 1)
                            index = i;
                        }
                        else{
                            num = result.substring(i + 1, lastIndex + 1)
                            index = i + 1;
                        }
                        break;
                    }
                }
                num = eval(`-1*${num}`);
                result = `${result.substring(0, index)}${num}`;
            }

            return String(result);

        default:
            return result;
    }       

}

const Calculator = () => {

    // const [result, setResult] = useState(0);
    const [result, dispatch] = useReducer(reducer, initialResult);

    return (
        <div className={style.calculatorContainer}>
            <div className={style.display}>
                {result}
            </div>
            <div className={style.buttonsBox}>
                {
                    buttons.map(item => 
                        <CalcButton 
                            key= {item.name}
                            name= {item.name}
                            type= {item.type}
                            dispatch= {dispatch}
                        />    
                    )
                }
            </div>
        </div>
    );
};

export default Calculator;