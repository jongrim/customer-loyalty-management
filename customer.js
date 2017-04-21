var customerSet = (function () {
    //private variables
    var customers = [];
    var Customer = function (name, credit = 0.00, orderCount = 0, redemptionEligible = false) {
        this.name = name;
        this.credit = credit.toFixed(2);
        this.orderCount = orderCount;
        this.redemptionEligible = redemptionEligible;
    };

    //DOM elements
    const customerTable = document.querySelector('#customerTable');
    const searchBar = document.querySelector('.search-bar');

    //Bind event listeners    
    searchBar.addEventListener('change', findMatches);    
    searchBar.addEventListener('keyup', findMatches);    

    //DOM rendering
    function makeTable(matchedArray) {
        let customerArray = matchedArray || customers;
        let result = `<div class="table-row header">
            <div class="text">Name</div>
            <div class="text">Lifetime Order Count</div>
            <div class="num">Credit</div>
            <div class="text">Redemption Status</div>
            <div class="input">Select User</div>
        </div>`

        let tableRows = customerArray.map((customer, i) => {
            return `
            <div class="table-row">
                <div class="text">${customer.name}</div>
                <div class="text">${customer.orderCount}</div>
                <div class="num">$${customer.credit}</div>
                <div class="text">${(customer.redemptionEligible) ? 'Eligible' : 'Not Eligible'}</div>
                <div class="input">
                    <input type="checkbox" id="customer${i}">
                </div>
            </div>
            `
        }).join('');

        customerTable.innerHTML = result + tableRows;
    }

    function findMatches() {
        let matchedArray = customers.filter(customer => {
            let matchValue = new RegExp(this.value, 'gi');
            return customer.name.match(matchValue);
        })
        makeTable(matchedArray);
    }
    
    function newCustomer (name, credit, orderCount, redemptionEligible) {
        return new Customer(name, credit, orderCount, redemptionEligible);
    };
    function addCustomer (customer) {
        customers.push(customer);
        makeTable();
    };
    function getCustomerByName (name) {
        return customers.find(customer => customer.name == name);
    };
    function setRedemptionStatus (customer, status) {
        customer.redemptionEligible = status;
    };

    return {
        newCustomer: newCustomer,
        addCustomer: addCustomer,
        getCustomerByName: getCustomerByName        
    }
})();

for (var i = 0; i < 200; i++) {
    let person = customerSet.newCustomer(`Jon${i}`, i, i, (i % 2) ? true : false);
    customerSet.addCustomer(person);
}
