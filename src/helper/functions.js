const addBraces = (result, resultLen) => {
    let len = resultLen;
    let indexOfOp = len;
    for(let i= 0; i< resultLen; i++){
        let index;
        if (result.indexOf("--") > 0){
            index = result.indexOf("--")
            for (let i= index + 3; i< len; i++){
                if (result[i] === "+" || result[i] === "/" || result[i] === "*" || result[i] === "-"){
                    indexOfOp = i;  

                    break;
                }
            }  
            result = result.substring(0, index + 1) + `(${result.substring(index + 1, indexOfOp)})` + result.substring(indexOfOp, len)
            indexOfOp = len + 2;
            len += 2;
        }
    }
    
    return result;
}

export { addBraces };