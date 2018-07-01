const baseURL = 'http://localhost:8000/';
class Data{

    getUsers(){
        return new Promise((res,rej)=>{
            fetch(baseURL+'user').then(value=>{
                let users = value.json();
                res(users);
            })
        });
        
    }

}



export default Data;