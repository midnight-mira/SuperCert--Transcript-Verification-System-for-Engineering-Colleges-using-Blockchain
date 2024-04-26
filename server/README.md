# SERVER
Server uses MVC (not V) to handle requests coming from client and perform the following functions.

1. Authentication of admin using JWT
2. Capture the transactions made on blockchain
3. Sends email to the student (using nodemailer)

Note: Uploads folder will be created to store the document in the server before storing them to IPFS.
_____

- model consists of ipfs object and user, student and transaction document.
- routes consist of the routes for models
- controller handles the operations.
________________________

Follow the steps to configure server.
 __STEP 1. Create account on MongoDB Atlas__
 create a cluster project on atlas and store the private and public keys.

 __STEP 2. Create Pinata Account and store private key__

 __STEP 3. Download Dependencies__

 ```js
npm install 
```

__Step 4. Create *.env* file__

```js
PINATA_JWT = paste private api-key from pinata.
NODE_ENV = development
CONNECTION_STRING = mongodb cluster address
ACCESS_TOKEN_SECRET = paste your access token
REFRESH_TOKEN_SECRET = paste your refresh token
```

__Step 5. use *bcrypt* for generating token secret__

run the following in the terminal

```bash
$node
>require('crypto').randomBytes(64).toString('hex')
```

run the require statement twice and paste the output in env variables.

__Step 6. Run Server__

```js
npm start
```

## TO DO
1. Add QR code functionality

 
 
 





