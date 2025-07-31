function fetchData() {
    const boxTag = document.querySelector("#content")
    if(boxTag){
        boxTag.innerHTML = `
            <img src="./assets/images/loader.svg" alt="loader" style="width:70px" />
        `
        axios.post('https://test-site.rechcompt.com/api/v1/merchants/test-widget', {}, {
            headers: {
                "x-transaction-key":"186339491a3fc16e",
                "x-transaction-password":"03206b53ebf67688",
                "x-user-key":"409db2794eff1d8c" 
            }
        })
        .then(response => {
            if(response?.status===200){
                const clientData = response?.data.client
                const partnerData = response?.data.partner

                boxTag.innerHTML = `
                <div class="box__item">
                    <div class="box__item__top">
                    <img src="./assets/images/user.svg" alt="user">
                    <span class="status ${partnerData.partner_status==2?'actif':''}" ></span>
                    </div>
                    <div class="box__item__bottom">
                    <div class="box__item__bottom__infos">
                        <span class="name" id="partnerName">${partnerData.name}</span>
                        <div class="country">
                        <img src="./assets/images/bj.svg" alt="">
                        <span id="partnerCountry">${partnerData.country_nice_name}</span>
                        </div>
                        <div class="wallet">
                        <img src="./assets/images/wallet.svg" alt="wallet">
                        <span id="partnerBalance">${partnerData.balance+' F'}</span>
                        </div>
                    </div>
                    <div class="box__item__bottom_actions">
                        <button data-action="+">
                        <img src="./assets/images/PlusOutlined.svg" alt="+">
                        <span>Dépôt</span>
                        </button>
                        <button data-action="-">
                        <img src="./assets/images/MinusOutlined.svg" alt="-">
                        <span>Retrait</span>
                        </button>
                    </div>
                    </div>
                </div>
                <div class="box__item">
                    <div class="box__item__top">
                    <img src="./assets/images/user.svg" alt="user">
                    <span class="status ${clientData.status==2?'actif':''}"></span>
                    </div>
                    <div class="box__item__bottom">
                    <div class="box__item__bottom__infos">
                        <span class="name" id="clientName">${clientData.firstname+' '+clientData.lastname}</span>
                        <div class="country">
                        <img src="./assets/images/bj.svg" alt="">
                        <span id="clientCountry">${partnerData.country_nice_name}</span>
                        </div>
                        <div class="wallet">
                        <img src="./assets/images/wallet.svg" alt="wallet">
                        <span id="clientBalance">${clientData.balance+' F'}</span>
                        </div>
                    </div>
                    </div>
                </div>

                `

                const btn = boxTag.querySelectorAll('button')
                if(btn){
                    btn.forEach(elem => {
                        elem.addEventListener('click',function(e){
                            e.preventDefault()
                            
                            if(elem.tagName==="BUTTON"){
                                const action = e.target.getAttribute('data-action')
                                if(action){
                                    console.log("action>>",action)
                                    // generate random transaction id
                                    const randomId = Math.floor(Math.random() * 1000000000);

                                    // RcTransaction
                                    RcTransaction({
                                        transactionKey: "186339491a3fc16e",
                                        transactionPassword: "03206b53ebf67688",
                                        action: action,
                                        webhook: "https://rechcompt.com",
                                        ptner_transaction_id: randomId,
                                    })

                                    elem.innerHTML = `en cours...`
                                    setTimeout(()=>{
                                        if(action==="-"){
                                            elem.innerHTML =`
                                                <img src="./assets/images/MinusOutlined.svg" alt="-">
                                                <span>Retrait</span>
                                            `
                                        }else if(action==="+"){
                                            elem.innerHTML =`
                                                <img src="./assets/images/PlusOutlined.svg" alt="+">
                                                <span>Dépôt</span>
                                            `
                                        }
                                    },3000)
                                }
                            }
                        })
                    })
                }
            }
        })
    }
}
fetchData()


