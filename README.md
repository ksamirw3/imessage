# message

a [Sails](http://sailsjs.org) application

make sure you install docker-compose in your machine   "sudo apt-get install docker-compose"

cd imessage folder the type "docker-compose up"

**Front Test**

http://localhost:1337


**API Test**

* User - create

`POST http://localhost:1337/user/create`

  `{ `
   `"User" : {`
	   `"username": "user1",`
     `"email" : "email@google.com",`
     `"password": "123456"`
	`}`
 `}`

* User - login 

`POST http://localhost:1337/user/login`

`{`
  `"User":{`
    `"username": "karim66",`
    `"password": "pass"`
  `}`
`}`

* User - list

`GET http://localhost:1337/user/`

* Message - Create

`POST http://localhost:1337/message/create`

`{ `
`"Message" : {`
	 `"message": "message text",`
     `"owner" : "596f5da890f4c9070028f09f"`
	`}`
 `}`
 
*  Message - List

 ` GET http://localhost:1337/message/`
  
  
  
 *  Comment - Create

`POST http://localhost:1337/comment/create`

`{ `
`"Comment" : {`
	 `"comment": "comment text.",`
     `"owner" : "5973590b2fcbf307002326c1",`
     `"message" : "597361e52fcbf307002326c5"`
	`}`
 `}`
 
*  Comment - List
`  GET http://localhost:1337/comment/`
  
  
 
