var customerSet = (function () {
    //private variables
    var customers = [];
    var Customer = function (name, credit = 0.00, orderCount = 0, redemptionEligible = false) {
        this.name = name;
        this.credit = credit;
        this.orderCount = orderCount;
        this.redemptionEligible = redemptionEligible;
    };

    return {
        newCustomer: function (name, credit, orderCount, redemptionEligible) {
            return new Customer(name, credit, orderCount, redemptionEligible);
        },
        addCustomer: function (customer) {
            customers.push(customer);
        },
        getCustomerByName: function (name) {
            return customers.find(customer => customer.name == name);
        },
        setRedemptionStatus: function (customer, status) {
            customer.redemptionEligible = status;
        }
    }
})();
