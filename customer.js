var customerSet = (function () {
    //private variables
    var customers = [];
    var Customer = function (firstName, lastName, credit = 0.00, orderCount = 0, redemptionEligible = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.credit = credit.toFixed(2);
        this.orderCount = orderCount;
        this.redemptionEligible = redemptionEligible;
    };

    //DOM elements
    const customerTable = document.querySelector('#customerTable');
    const searchBar = document.querySelector('.search-bar');
    const alphabetBar = document.querySelectorAll('.alphabet-letter');

    //Bind event listeners    
    searchBar.addEventListener('change', findMatches);    
    searchBar.addEventListener('keyup', findMatches);
    alphabetBar.forEach(letter => letter.addEventListener('click', findMatches));

    //DOM rendering
    function makeTable(matchedArray) {
        let customerArray = matchedArray || customers;
        customerArray = sortCustomers(customerArray);
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
                <div class="text">${customer.firstName + ' ' + customer.lastName}</div>
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

    //TODO write sort function
    function sortCustomers(unsortedList) {
        if (unsortedList.length == 1) {
            return unsortedList;
        } else {
            let midPoint = Math.floor(unsortedList.length / 2);
            var listA = sortCustomers(unsortedList.slice(0, midPoint));
            var listB = sortCustomers(unsortedList.slice(midPoint));
        }

        let mergeList = [];
        console.log(typeof listB);

        while (listA.length > 0 && listB.length > 0) {
            let result = listA[0].lastName < listB[0].lastName ? listA.shift() : listB.shift();
            mergeList.push(result);
        }

        while (listA.length > 0) {
            mergeList.push(listA.shift());
        }
        while (listB.length > 0) {
            mergeList.push(listB.shift());
        }

        return mergeList;
    }

    function jumpToLetter() {
        let letter = this.innerText;
        //TODO
        
    }

    function findMatches() {
        let matchedArray = customers.filter(customer => {
            let matchValue = new RegExp(this.value, 'gi');
            return customer.firstName.match(matchValue) || customer.lastName.match(matchValue);
        })
        makeTable(matchedArray);
    }
    
    function newCustomer (firstName, lastName, credit, orderCount, redemptionEligible) {
        return new Customer(firstName, lastName, credit, orderCount, redemptionEligible);
    };

    function addCustomer (customer) {
        customers.push(customer);
    };

    function getCustomerByName (name) {
        return customers.find(customer => customer.name == name);
    };

    function setRedemptionStatus (customer, status) {
        customer.redemptionEligible = status;
    };

    function customerList() {
        return customers;
    }

    return {
        getSortedList: sortCustomers,
        newCustomer: newCustomer,
        addCustomer: addCustomer,
        getCustomerByName: getCustomerByName,
        makeCustomerTable: makeTable,
        getCustomerList: customerList
    }
})();

// for temporary testing
for (var i = 0; i < 2000; i++) {
    let person = customerSet
        .newCustomer(`${String.fromCharCode(65 + (i % 26)) + String.fromCharCode(98 + (i % 25))}`,
        `${String.fromCharCode(65 + (i % 26)) + String.fromCharCode(98 + (i % 25))}`, i, i, (i % 2) ? true : false);
    customerSet.addCustomer(person);
}

var customers = customerSet.getCustomerList();
var sortedCustomers = customerSet.getSortedList(customers);
console.log(sortedCustomers);

customerSet.makeCustomerTable();
