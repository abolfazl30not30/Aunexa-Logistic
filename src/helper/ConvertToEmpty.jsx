export const ConvertToEmpty = (input) => {
    let obj={...input}
    for(const key in obj){
        if(obj[key]===null){
            obj[key] = ""
        }
    }
    
    return obj;
}