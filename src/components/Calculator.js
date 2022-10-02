import React, { useReducer } from 'react';

// style
import style from './calculator.module.css';

// components
import CalcButton from './shared/CalcButton';

// helper
import { addBraces } from '../helper/functions';

const buttons = [
    {name: "CE", type: "REMOVE"}, {name: "C", type: "REMOVE"}, {name: "←", type: "REMOVE"}, {name: "/", type: "OPERATOR"},
    {name: 7, type: "NUMBER"}, {name: 8, type: "NUMBER"}, {name: 9, type: "NUMBER"}, {name: "*", type: "OPERATOR"},
    {name: 4, type: "NUMBER"}, {name: 5, type: "NUMBER"}, {name: 6, type: "NUMBER"}, {name: "-", type: "OPERATOR"},
    {name: 1, type: "NUMBER"}, {name: 2, type: "NUMBER"}, {name: 3, type: "NUMBER"}, {name: "+", type: "OPERATOR"},
    {name: "±", type: "MARK"}, {name: 0, type: "NUMBER"}, {name: ".", type: "DOT"}, {name: "=", type: "EQUAL"},
]

const initialResult = "0";
let flag = 0;
const reducer = (result, action) => {
    // ------ ch: charactor ------

    // length of result
    const resultLen = result.length;

    // lastIndex: last index of result
    const lastIndex = resultLen - 1;

    // lastCH: last charactor of result
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
            flag = 0;
        
            if (result === "0")
                result = `0${action.ch}`;
            
            else if (lastCH === ".")
                result = result.substring(0, lastIndex) + action.ch;
        
            else if (lastCH === "*" || lastCH === "/" || lastCH === "-" || lastCH === "+")
                result = result.substring(0, lastIndex) + action.ch
            
            else
                result += action.ch
            
            return result;
        
        case "EQUAL":
            flag = 1;

            if (lastCH === "*" || lastCH === "/" || lastCH === "-" || lastCH === "+"){
                const num = eval(addBraces(result.substring(0, lastIndex), resultLen));
                result = `${num}${lastCH}${num}`;
            }

            if (result.includes("--")){
                result = addBraces(result, resultLen);
            }

            return String(eval(result).toLocaleString());
        
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
                for(let i= lastIndex; i >= 0; i--){
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
            flag = 0;
            if (result === "0")
                result = "0.";

            else{
                for (let i= lastIndex; i >= 0; i--){
                    if (result[i] === "+" || result[i] === "/" || result[i] === "*" || result[i] === "-"){
                        const subResult = result.substring(i + 1, resultLen);
                        if (!subResult.includes(".")){
                            if (!subResult)
                                result += "0.";
                            else
                                result += action.ch;
                            break;
                        }
                    }
                    else if (!result.includes(".")){
                        result += action.ch;
                        break;
                    }
                }
            }

            return result;
        
        case "MARK":
            flag = 1;

            if (Number(result) < 0 || (!result.includes("+") && !result.includes("-") && !result.includes("*") && !result.includes("/"))){
                result = eval(`-1*${result}`);
            }
            else if (lastCH === "+" || lastCH === "/" || lastCH === "*" || lastCH === "-"){
                const op = lastCH;
                
                const num = `${eval(addBraces(result.substring(0, lastIndex), resultLen - 1))}`;
                result = num + op + `${eval(-1*num)}`;
                result = addBraces(result, result.length);
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
            flag = 0;

            return String(result);

        default:
            return result;
    }       

}

const Calculator = () => {

    const [result, dispatch] = useReducer(reducer, initialResult);

    return (
        <div className={style.calculatorContainer}>
            <div className={style.displayBox}>
                <span className={style.display}>
                    {result}
                </span>
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