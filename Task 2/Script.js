window.onload = function () {
  const leftColumn = document.getElementById('left-column');
  const rightColumn = document.getElementById('right-column');
  const routeSelect = document.getElementById('route');
  const count = document.getElementById('count');
  const total = document.getElementById('total');
  const bookBtn = document.getElementById('book');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const dateInput = document.getElementById('travelDate');
  const errorMsg = document.getElementById('error-msg');

  let ticketPrice = +routeSelect.value;

  function createSeat(i) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    if (Math.random() < 0.2) seat.classList.add('booked');
    seat.dataset.seatId = 'Seat ' + (i + 1);
    seat.title = 'Seat ' + (i + 1);
    seat.addEventListener('click', () => {
      if (seat.classList.contains('booked')) {
        alert(`${seat.dataset.seatId} is already booked.`);
        return;
      }
      if (seat.classList.contains('selected')) {
        alert(`${seat.dataset.seatId} is already selected.`);
        return;
      }
      seat.classList.add('selected');
      updateSummary();
    });
    return seat;
  }

  for (let i = 0; i < 20; i++) leftColumn.appendChild(createSeat(i));
  for (let i = 20; i < 40; i++) rightColumn.appendChild(createSeat(i));

  routeSelect.addEventListener('change', () => {
    ticketPrice = +routeSelect.value;
    updateSummary();
  });

  function updateSummary() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateDate(date) {
    const today = new Date().toISOString().split('T')[0];
    return date >= today;
  }

  bookBtn.addEventListener('click', () => {
    const selected = document.querySelectorAll('.seat.selected');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const travelDate = dateInput.value;

    errorMsg.innerText = '';

    if (!name) return errorMsg.innerText = "Please enter your name.";
    if (!validateEmail(email)) return errorMsg.innerText = "Please enter a valid email.";
    if (!travelDate || !validateDate(travelDate)) return errorMsg.innerText = "Please select a valid travel date.";
    if (selected.length === 0) return errorMsg.innerText = "Please select at least one seat.";

    const selectedSeatNumbers = [...selected].map(seat => seat.dataset.seatId).join(', ');

    alert(`🎉 Booking Confirmed!
Name: ${name}
Email: ${email}
Date: ${travelDate}
Seats: ${selectedSeatNumbers}
Total: ₹${selected.length * ticketPrice}`);

    selected.forEach(seat => {
      seat.classList.remove('selected');
      seat.classList.add('booked');
    });

    nameInput.value = '';
    emailInput.value = '';
    dateInput.value = '';
    updateSummary();
  });

  const todoInput = document.getElementById('todo-input');
  const addTodoBtn = document.getElementById('add-todo-btn');
  const todoList = document.getElementById('todo-list');

  addTodoBtn.addEventListener('click', () => {
    const task = todoInput.value.trim();
    if (!task) return alert("Please enter a task.");

    const li = document.createElement('li');
    li.textContent = task;

    const delBtn = document.createElement('button');
    delBtn.title = "Delete task";
    delBtn.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" />';
    delBtn.onclick = () => todoList.removeChild(li);

    li.appendChild(delBtn);
    todoList.appendChild(li);
    todoInput.value = '';
  });

  todoInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodoBtn.click();
    }
  });
};
