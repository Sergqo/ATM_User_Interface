document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const pinContainer = document.getElementById('pin-container');
  const pinInput = document.getElementById('pin-input');
  const submitPinBtn = document.getElementById('submit-pin-btn');
  const pinError = document.getElementById('pin-error');
  const navbar = document.getElementById('navbar');
  const balanceContainer = document.getElementById('balance-container');
  const depositContainer = document.getElementById('deposit-container');
  const withdrawContainer = document.getElementById('withdraw-container');
  const depositAmountInput = document.getElementById('deposit-amount');
  const submitDepositBtn = document.getElementById('submit-deposit-btn');
  const cancelDepositBtn = document.getElementById('cancel-deposit-btn');
  const depositError = document.getElementById('deposit-error');
  const withdrawAmountInput = document.getElementById('withdraw-amount');
  const submitWithdrawBtn = document.getElementById('submit-withdraw-btn');
  const cancelWithdrawBtn = document.getElementById('cancel-withdraw-btn');
  const withdrawError = document.getElementById('withdraw-error');

  // User balance (initialized to 0)
  let userBalance = 0;

  // Login Button - Show PIN input
  loginBtn?.addEventListener('click', () => {
    pinContainer.style.display = 'block';
  });

  // Submit PIN button
  submitPinBtn?.addEventListener('click', () => {
    const pin = pinInput.value;

    if (pin === '2003') {
      pinContainer.style.display = 'none';
      
      // Update navbar with new buttons
      navbar.innerHTML = `
        <div class="left-side">
          <button class="nav-btn" id="balance-btn">Sąskaitos likutis</button>
          <button class="nav-btn" id="deposit-btn">Pinigų įdėjimas</button>
          <button class="nav-btn" id="withdraw-btn">Pinigų išėmimas</button>
        </div>
        <button class="nav-btn" id="logout-btn">Atsijungti</button>
      `;

      // Add event listeners for the new buttons
      const logoutBtn = document.getElementById('logout-btn');
      logoutBtn?.addEventListener('click', logout);
      
      const balanceBtn = document.getElementById('balance-btn');
      balanceBtn?.addEventListener('click', showBalance);
      
      const depositBtn = document.getElementById('deposit-btn');
      depositBtn?.addEventListener('click', showDepositForm);
      
      const withdrawBtn = document.getElementById('withdraw-btn');
      withdrawBtn?.addEventListener('click', showWithdrawForm);
    } else {
      pinError.textContent = 'Neteisingas PIN kodas';
    }
  });

  // Logout function
  function logout() {
    navbar.innerHTML = `<button class="nav-btn" id="login-btn">Prisijungti</button>`;
    pinInput.value = '';
    userBalance = 0;
    balanceContainer.style.display = 'none'; // Hide balance after logout

    // Re-add the login button and event listener after logout
    const newLoginBtn = document.getElementById('login-btn');
    newLoginBtn?.addEventListener('click', () => {
      pinContainer.style.display = 'block';
    });

    // Hide all containers after logout
    depositContainer.style.display = 'none';
    withdrawContainer.style.display = 'none';
    balanceContainer.style.display = 'none';
  }

  // Show balance when button is clicked
  function showBalance() {
    balanceContainer.style.display = 'block';
    balanceContainer.innerHTML = `<h2>Sąskaitos likutis: €${userBalance}</h2>`;
    // Ensure that deposit and withdraw forms are hidden
    depositContainer.style.display = 'none';
    withdrawContainer.style.display = 'none';
  }

  // Show deposit form when button is clicked
  function showDepositForm() {
    depositContainer.style.display = 'block';
    // Ensure that balance and withdraw forms are hidden
    balanceContainer.style.display = 'none';
    withdrawContainer.style.display = 'none';
  }

  // Show withdraw form when button is clicked
  function showWithdrawForm() {
    withdrawContainer.style.display = 'block';
    // Ensure that balance and deposit forms are hidden
    balanceContainer.style.display = 'none';
    depositContainer.style.display = 'none';
  }

  // Submit deposit functionality
  submitDepositBtn?.addEventListener('click', () => {
    const depositAmount = parseFloat(depositAmountInput.value);
    
    if (isNaN(depositAmount) || depositAmount <= 0) {
      depositError.textContent = 'Prašome įvesti galiojančią sumą.';
    } else {
      userBalance += depositAmount; // Add the deposit amount to the balance
      depositAmountInput.value = ''; // Clear input
      depositError.textContent = ''; // Clear any previous errors
      depositContainer.style.display = 'none'; // Hide deposit form
    }
  });

  // Cancel deposit form
  cancelDepositBtn?.addEventListener('click', () => {
    depositContainer.style.display = 'none'; // Hide deposit form if cancelled
  });

  // Submit withdraw functionality
  submitWithdrawBtn?.addEventListener('click', () => {
    const withdrawAmount = parseFloat(withdrawAmountInput.value);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      withdrawError.textContent = 'Prašome įvesti galiojančią sumą.';
    } else if (withdrawAmount > userBalance) {
      withdrawError.textContent = 'Nepakanka lėšų sąskaitoje.';
    } else {
      userBalance -= withdrawAmount; // Subtract the withdraw amount from the balance
      withdrawAmountInput.value = ''; // Clear input
      withdrawError.textContent = ''; // Clear any previous errors
      withdrawContainer.style.display = 'none'; // Hide withdraw form
    }
  });

  // Cancel withdraw form
  cancelWithdrawBtn?.addEventListener('click', () => {
    withdrawContainer.style.display = 'none'; // Hide withdraw form if cancelled
  });
});