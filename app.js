var pageElements = (function () {
    const nav = document.querySelector('.nav');
    const topOfNav = nav.offsetTop;
    const trash = document.querySelector('.trash')

    //bind scroll event to determine when the nav has been reached
    window.addEventListener('scroll', fixNav);
    trash.addEventListener('click', deleteCustomers);
    
    function fixNav() {
        if (window.scrollY >= topOfNav) {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
            nav.classList.add('fixed-nav');
        } else {
            nav.classList.remove('fixed-nav');
            document.body.style.padding = 0;
        }
    }

    function displayTrash() {
        let checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
        if (checkedBoxes.length > 0) {
            trash.classList.remove('invisible');
        } else {
            trash.classList.add('invisible');
        }
    }

    function deleteCustomers() {
        let checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
        let customersToDelete = [];
        checkedBoxes.forEach(box => customersToDelete.push(box.id));
        customerSet.removeCustomersByIDArray(customersToDelete);
        trash.classList.add('invisible');
    }

    function addCheckboxListener() {
        let checkboxes = document.querySelectorAll('input[type=checkbox]')
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('click', displayTrash)
        });
    }

    return {
        setCheckboxListeners: addCheckboxListener,
    }
})();

// for temporary testing
for (var i = 0; i < 2000; i++) {
    let person = customerSet
        .newCustomer(`Customer`,
        `${String.fromCharCode(65 + (i % 26)) + String.fromCharCode(98 + (i % 25)) + String.fromCharCode(99 + (i % 24))}`,
        i, i, (i % 2) ? true : false);
    customerSet.addCustomer(person);
}

customerSet.setCustomerList(customerSet.getSortedList(customerSet.getCustomerList()));

customerSet.makeCustomerTable();

