class UserDTO{
    constructor({id, firstname, lastname,email,password}){
        this.id = id;
        this.firstname=firstname;
        this.lastname=lastname;
        this.email=email;
        this.password='*****';
        
    }
}





module.exports={UserDTO}