let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const res = require("express/lib/response");


chai.should();
chai.use(chaiHttp);

describe("User Singup Test case", ()=> {

//     describe("POST/api/users/signup", ()=>{
//         it("It should return signup response : ", (done) => {
//             const data = {
//                 name:"Rishabh",
//                 email:"rishabh@gmail.com",
//                 password:"Ram1234@#",
//                 confirm : "Ram1234@#",
//                 contact : 8889007865,
//                 role : "user",
//                 gender : "female"
//         }
//             chai.request(server)
//             .post("/user/signup")
//             .send(data)
//             .end((req, res) =>{
//                 res.should.have.status(201);
//                 res.body.should.have.property("status").eq("Success");
//                 res.body.should.have.property("message").eq("Register Succsessfully....");
//             })
//             done()
//         })

//         it("It should return email already exist..:", (done) => {
//             const data = {
//                 name:"Rishabh",
//                 email:"rishabh@gmail.com",
//                 password:"Ram1234@#",
//                 confirm : "Ram1234@#",
//                 contact : 8889007865,
//                 role : "user",
//                 gender : "female"
//         }
//             chai.request(server)
//             .post("/user/signup")
//             .send(data)
//             .end((req, res) =>{
//                 res.should.have.status(403);
//                 res.body.should.have.property("status").eq("Failed");
//             })
//             done()
//         })



// it("It should return password and confirm_password..:", (done) => {
//     const data = {
//         name:"Rishabh",
//  email:"rishabh@gmail.com",
//  password:"Ram1234@#",
//  confirm : "Ram134@#",
//  contact : 8889007865,
//  role : "user",
//  gender : "female"
//     }
//     chai.request(server)
//     .post("/user/signup")
//     .send(data)
//     .end((req, res) =>{
//         res.should.have.status(401);
//         res.body.should.have.property("status").eq("Failed");
//     })
//     done()
//       })        
//  }),


 /**************************Login Test cases **************************/

 describe("User Login TestCases", ()=>{
        describe("user/login/API", ()=>{
            it("It should return user login", (done)=>{
                const data = {
                    email:"mukesh@gmail.com",
                    password :"mUkesh1234@#",
                }
               chai.request(server).post('/user/login')
               .send(data)
               .end((req, res) =>{
                res.should.have.status(200);
                res.body.should.have.property("status").eq("Success");
            }) 
            done() 
            }),

            it("It should return password is not match ", (done)=>{
                const data = {
                    email:"mukesh@gmail.com",
                    password :"mUkesh134@#",
                }
               chai.request(server).post('/user/login')
               .send(data)
               .end((req, res) =>{
                res.should.have.status(401);
                res.body.should.have.property("status").eq("Failed");
                res.body.should.have.property("message").eq("Password is not match");
            }) 
            done() 
            }),
            it("It should return user is not found ", (done)=>{
                const data = {
                    email:"mukesh11@gmail.com",
                    password :"mUkesh134@#",
                }
               chai.request(server).post('/user/login')
               .send(data)
               .end((req, res) =>{
                res.should.have.status(404);
                res.body.should.have.property("status").eq("Failed");
                res.body.should.have.property("message").eq("User not found..");
            }) 
            done() 
            })
        })
 })
})


/************************ Email send for rest password test cases ************* */


describe("It's should return if Email send for forgat password",()=>{
           describe("Email send for forget password",()=>{

               it("It should return email send successfully send",(done)=>{
                   const data ={
                    "email" : "mukesh@gmail.com"
                   }
                   chai.request(server)
                   .post('/user/email_rest_pass')
                   .send(data)
                   .end((req, res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property("status").eq("Success");
                    res.body.should.have.property("message").eq("Email send to user successfully");
                   })
                   done()
                }),
                it("It should return email not send to user and user not found", (done)=>{
                    const data ={
                     "email" : "mukeshyy6@gmail.com"
                    }
                    chai.request(server)
                    .post('/user/email_rest_pass')
                    .send(data)
                    .end((req, res)=>{
                     res.should.have.status(550);
                     res.body.should.have.property("status").eq("Failed");
                     res.body.should.have.property("message").eq("User is not found");
                    })
                    done()
                 })
           })
})