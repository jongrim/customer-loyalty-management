var customerSet = (function () {
    //private variables
    var customers = [];
    var Customer = function (name, credit = 0.00, orderCount = 0, redemptionEligible = false) {
        this.name = name;
        this.credit = credit;
        this.orderCount = orderCount;
        this.redemptionEligible = redemptionEligible;
    };
    
    function newCustomer (name, credit, orderCount, redemptionEligible) {
            return new Customer(name, credit, orderCount, redemptionEligible);
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

    return {
        newCustomer: newCustomer,
        addCustomer: addCustomer,
        getCustomerByName: getCustomerByName        
    }
})();
