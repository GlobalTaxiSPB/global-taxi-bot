// Global Taxi SPB
// Создание нового заказа

function createOrder() {
  return {
    id: null,
    number: "",
    status: "NEW",

    passenger: {
      name: "",
      phone: ""
    },

    trip: {
      date: "",
      time: "",
      pickup: "",
      pickupEntrance: "",
      destination: "",
      destinationEntrance: ""
    },

    options: {
      passengers: 1,
      luggage: false,
      childSeat: false,
      oversized: false
    },

    comment: "",

    price: 0,

    driver: null,

    createdAt: new Date().toISOString()
  };
}

module.exports = {
  createOrder
};
