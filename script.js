var form = document.querySelector('form');
var inputs = document.querySelectorAll('.typed-input');
var cards = document.querySelector('.account-cards');
var transactionsArr = [];

getFromStorage();

form.addEventListener('submit', addTransaction);

function addTransaction(event) {
    event.preventDefault();
    var type = inputs[0].value;
    var payee = inputs[2].value;
    var amount = inputs[3].value;
    var category = inputs[4].value;
    var transaction = new Transaction(type, payee, amount, category);
    transactionsArr.push(transaction)
    addCard(transaction)
}

function addCard(transaction) {
    cards.innerHTML += `
       <section class="account-card">
         <img class="account-icon" src="./assets/${transaction.type}.svg" alt="Expenses Icon">
         <div class="account-title">
           <h3>${transaction.payee}</h3>
         </div>
         <p>${transaction.category}</p>
         <h4>$${transaction.amount}</h4>
       </section>
     `
    saveToStorage(transactionsArr)
}

function saveToStorage(array) {
    var stringObj = JSON.stringify(array);
    localStorage.setItem('transaction', stringObj);
}

function getFromStorage() {
    var retrievedObj = localStorage.getItem('transaction');
    console.log(retrievedObj);
    var parsedObj = JSON.parse(retrievedObj);
    console.log(parsedObj);
    reinstatiateObject(parsedObj)
}

function reinstatiateObject(trans) {
    for (var i = 0; i < trans.length; i++) {
        console.log('test')
        var instTransaction = new Transaction({
            type: trans[i].type,
            payee: trans[i].payee,
            amount: trans[i].amount,
            category: trans[i].category
        })
        cards.innerHTML += `
       <section class="account-card">
         <img class="account-icon" src="./assets/${trans[i].type}.svg" alt="Expenses Icon">
         <div class="account-title">
           <h3>${trans[i].payee}</h3>
         </div>
         <p>${trans[i].category}</p>
         <h4>$${trans[i].amount}</h4>
       </section>`
    }
}