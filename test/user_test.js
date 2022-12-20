let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const res = require("express/lib/response");


chai.should();
chai.use(chaiHttp);

describe("User Singup Test case", ()=> {

    describe("POST/api/users/signup", ()=>{
        // it("It should return  : ", (done) => {
        //     const data = {
        //         name:"Ramesh",
        //         email:"ram23@gmail.com",
        //         password:"Ram1234@#",
        //         confirm :"Ram1234@#",
        //         contact : 888900765,
        //         role : "vendor"
        //     }
        //     chai.request(server)
        //     .post("/user/signup")
        //     .send(data)
        //     .end((req, res) =>{
        //         res.should.have.status(201);
        //         res.body.should.have.property("status").eq("Success");
        //         res.body.should.have.property("message").eq("Register Succsessfully....");
        //     })
        //     done()
        // })

        it("It should return email already exist..:", (done) => {
            const data = {
                name:"Ramesh",
                email:"ram@gmail.com",
                password :"Ram124@#",
                confirm :"Ram1234@#",
                contact : 888900765,
                role : "vendor"
            }
            chai.request(server)
            .post("/user/signup")
            .send(data)
            .end((req, res) =>{
                res.should.have.status(403);
                res.body.should.have.property("status").eq("Failed");
            })
            done()
        })

        
    })
})
