function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}

let invoice = {
  phone: 3000,
  internet: 6500,
};

let payment = {
  phone: 1300,
  internet: 5500,
};

// eslint-disable-next-line max-lines-per-function
function createInvoice(services = {}) {
  let phoneServiceCost = services.phone ? services.phone : 3000;
  let internetServiceCost = services.internet ? services.internet : 5500;

  return {
    phone: phoneServiceCost,
    internet: internetServiceCost,
    payments: [],

    addPayment(amount) {
      this.payments.push(amount);
    },

    addPayments(amountArray) {
      this.payments = this.payments.concat(amountArray);
    },

    total() {
      return this.phone + this.internet;
    },

    amountDue() {
      return this.total() - paymentTotal(this.payments);
    },
  };
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({internet: 6500}));
invoices.push(createInvoice({phone: 2000}));
invoices.push(
  createInvoice({
    phone: 1000,
    internet: 4500,
  })
);

console.log(invoiceTotal(invoices)); // 31000

function createPayment(services = {}) {
  let internetPayment = services.hasOwnProperty('internet')
    ? services.internet
    : 0;
  let phonePayment = services.hasOwnProperty('phone') ? services.phone : 0;
  let amount = services.hasOwnProperty('amount')
    ? services.amount
    : internetPayment + phonePayment;

  return {
    internet: internetPayment,
    phone: phonePayment,
    total() {
      return amount;
    },
  };
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(
  createPayment({
    internet: 6500,
  })
);

payments.push(
  createPayment({
    phone: 2000,
  })
);

payments.push(
  createPayment({
    phone: 1000,
    internet: 4500,
  })
);

payments.push(
  createPayment({
    amount: 10000,
  })
);

console.log(paymentTotal(payments)); // => 24000

let invoice2 = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({amount: 2000});
let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({phone: 1000});

invoice2.addPayment(payment1);
invoice2.addPayments([payment2, payment3]);
console.log(invoice2.amountDue()); // this should return 0
