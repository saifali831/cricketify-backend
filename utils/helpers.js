module.exports={
    increment: inc=>{
        return inc+1;
    },
   isInArray: (array,id)=>{
    return array.some(item=>item.equals(id))
   }
}