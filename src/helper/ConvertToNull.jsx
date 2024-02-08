export const ConvertToNull = (input) => {
    let obj={...input}
    for(const key in obj){
        if(obj[key] === ""){
            obj[key] = null
        }
    }
    
    return obj;

    
}