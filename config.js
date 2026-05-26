// MVC  - model, views and controllers
export default class Bank{
    #database = []

    constructor(){
        this.#database = JSON.parse(localStorage.getItem('users')) || []
    }


    create_account(fullname, email, password){
        if(fullname=="" || email=="" || password==""){
            return "Input fields are required"
        }

        let check_email = this.#database.find( user => user.email === email )
        // console.log(check_email);
        
        if(check_email){
            return 'Email already exist'
        }

        let rand = Math.round(Math.random() * 100000000)
        let account_no = "20"+rand

        let user = {
            fullname,
            email,
            password,
            account_no,
            balance: 0
        }

        this.#database.push(user)
        // [{}]
        // localStorage.setItem('users', JSON.stringify(this.#database))
        localStorage.users = JSON.stringify(this.#database)
        return "Registration successfull"
    }

    login(email, password){
        if(email==null || password==null){
            return "Input fields are required"
        }

        let user = this.#database.find( user => user.email === email && user.password === password )
        if(user){
            localStorage.loggedEmail = user.email
            return {
                status: true,
                message: "Login successful"
            }
        }else{
            return {
                status: false,
                message: "Incorrect email or password"
            }
        }
        
    }

    getUser(email){
        let user = this.#database.find( user => user.email === email )
        return user
    }

    getBalance(email){
        let user = this.getUser(email)
        if(user){
            return `$${user.balance}`
        }
        else{
            return null
        }
    }

    withdraw(email, amount){
        let user = this.getUser(email)
        if(!user){
            return "User not found"
        }

        if(amount < 1){
            return 'Invalid amount'
        }
        else if(amount > user.balance){
            return 'Insufficient fund'
        }
        else{
            user.balance -= amount
            // update localstorage
            localStorage.users = JSON.stringify(this.#database)
            
            return 'Transaction successfull'
        }
    }

    deposit(email, amount){
        if(amount < 1){
            return 'Invalid amount'
        }

        let user = this.getUser(email)
        
        if(user){
            user.balance += amount
            console.log(user);

            // update localstorage
            localStorage.users = JSON.stringify(this.#database)
            
        }

        // this.#balance += amount
        return 'Transaction successful'
    }

}


// export class Transaction{

// }