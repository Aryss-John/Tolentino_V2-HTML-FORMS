document.addEventListener("DOMContentLoaded", function() {
  
  // Order buttons functionality
  const orderButton = document.querySelector(".order-in-nav.btn");
  const containerDiv = document.querySelector(".container"); // Replace "container-div" with the class of your container div

  orderButton.addEventListener("click", function(event) {
    event.preventDefault();
    containerDiv.scrollIntoView({ behavior: "smooth", block: "start" });
  });  

  // Order buttons functionality
  const orderButtons = document.querySelectorAll(".order-button");
  const receiptContent = document.querySelector(".receipt-content");
  const totalAmountElement = document.querySelector(".total-amount");
  let orderItems = {}; // Object to store ordered items

  orderButtons.forEach(button => {
    button.addEventListener("click", function() {
      const menuItem = this.parentElement;
      const foodName = menuItem.querySelector(".food-name").textContent;
      const foodPrice = parseFloat(menuItem.querySelector(".price").textContent.replace("PRICE $", ""));
      
      // Update order items object
      if (orderItems[foodName]) {
        orderItems[foodName].quantity++;
      } else {
        orderItems[foodName] = { price: foodPrice, quantity: 1 };
      }

      // Update receipt content
      updateReceipt();
    });
  });

  function updateReceipt() {
    receiptContent.innerHTML = ""; // Clear previous receipt content
    let totalAmount = 0;

    for (const foodName in orderItems) {
      const { price, quantity } = orderItems[foodName];
      const receiptItem = document.createElement("div");
      receiptItem.innerHTML = `<p><strong>${foodName} x${quantity}</strong></p><p>${(price * quantity).toFixed(2)}</p>`;
      receiptContent.appendChild(receiptItem);
      totalAmount += price * quantity;
    }

    // Update total amount
    totalAmountElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
  }

  // Dropdown functionality
  const dropdownLinks = document.querySelectorAll(".dropdown-content a");
  const dropdownMenu = document.querySelector(".dropdown-content");

  dropdownLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const sectionId = this.textContent.toLowerCase().replace(" ", "-") + "-menu";
      const section = document.querySelector(`.${sectionId}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Close dropdown menu when clicking outside
  document.body.addEventListener("click", function(event) {
    const target = event.target;
    if (!target.closest(".dropdown")) {
      dropdownMenu.classList.remove("open");
    }
  });

  // Open/close dropdown menu
  const viewMenuBtn = document.querySelector(".view-menu");
  viewMenuBtn.addEventListener("click", function() {
    dropdownMenu.classList.toggle("open");
  });

  // Clear receipt button functionality
  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear Receipt";
  clearButton.style.backgroundColor = "#c22424";
  clearButton.style.borderRadius = "20px";
  clearButton.style.padding = "10px";
  clearButton.style.color = "white";
  clearButton.addEventListener("click", function() {
    receiptContent.innerHTML = "";
    totalAmountElement.textContent = "";
    orderItems = {};
  });
  const leftSide = document.querySelector(".left-side");
  leftSide.appendChild(clearButton);

  // Place order button functionality
  const placeOrderButton = document.querySelector(".button input[type='button']");
  placeOrderButton.addEventListener("click", function() {
    if (Object.keys(orderItems).length === 0) {
      alert("Your Cart is empty! Please select an item.");
    } else {
      let orderSummary = "Order Summary:\n";
      for (const foodName in orderItems) {
        const { price, quantity } = orderItems[foodName];
        orderSummary += `${foodName} x ${quantity} - $${(price * quantity).toFixed(2)}\n`;
      }
      orderSummary += `Total: $${totalAmountElement.textContent.split(": ")[1]}`;
      alert(orderSummary);
    }
  });

});
