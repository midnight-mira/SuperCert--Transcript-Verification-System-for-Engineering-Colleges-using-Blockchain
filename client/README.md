# Client

Client corresponds to the frontend of the project, developed using react and also consists etherjs code for interaccting with blockchain.

Follow along the steps to correct execute the frontend.

**STEP 1. Download the dependencies**

```js
$npm install 

```

**STEP 2. Create and store environment variables**

create _.env_ file for storing following variables.

```js
REACT_APP_IPFS_TESTNET_ADDRESS = "your testnet address for IPFSHashStorage contract"
REACT_APP_PAYME_TESTNET_ADDRESS = "your testnet address for PayMe contract"

```

use these in address variables in /src/components/user/Verify.jsx, /src/components/admin/AddDocument.jsx



