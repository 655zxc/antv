let arr = [1,3,4,5,9,7,5,9,3,3,3,5,1]

for(let i = 1;i<=13;i++){
   for(let j=0;j<arr[i-1];j++){

        let str = i+""+(j+1)
        let obj = {
            "id": str, 
            "name": str, 
            "tip": "Graph "+str, 
            "level": i-1
        }
        console.log(obj);
   }
}