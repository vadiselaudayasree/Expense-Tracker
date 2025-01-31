// Get references to DOM elements
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionListEl = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

// Initialize transactions array
let transactions = [];

// Add a new transaction
function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (description.trim() === '' || isNaN(amount)) {
    alert('Please enter a valid description and amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount
  };

  transactions.push(transaction);
  updateUI();
  descriptionInput.value = '';
  amountInput.value = '';
}

// Remove a transaction
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateUI();
}

// Update the UI
function updateUI() {
  // Calculate totals
  const income = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

  const balance = income - expenses;

  // Update DOM elements
  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeEl.textContent = `$${income.toFixed(2)}`;
  expenseEl.textContent = `$${expenses.toFixed(2)}`;

  // Render transaction list
  transactionListEl.innerHTML = '';
  transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.className = transaction.amount > 0 ? 'positive' : 'negative';
    li.innerHTML = `
      ${transaction.description} 
      <span>${transaction.amount > 0 ? '+' : ''}$${transaction.amount.toFixed(2)}</span>
      <button onclick="removeTransaction(${transaction.id})">x</button>
    `;
    transactionListEl.appendChild(li);
  });
}

// Attach form submit event listener
transactionForm.addEventListener('submit', addTransaction);

// Initial render
updateUI();
