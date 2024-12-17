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

  let userBalance = parseFloat(localStorage.getItem('userBalance')) || 0;

  loginBtn?.addEventListener('click', () => {
    pinContainer.style.display = 'block';
  });

  submitPinBtn?.addEventListener('click', () => {
    const pin = pinInput.value;

    if (pin === '2003') {
      pinContainer.style.display = 'none';
      navbar.innerHTML = `
        <div class="left-side">
          <button class="nav-btn" id="balance-btn">Sąskaitos likutis</button>
          <button class="nav-btn" id="deposit-btn">Pinigų įdėjimas</button>
          <button class="nav-btn" id="withdraw-btn">Pinigų išėmimas</button>
        </div>
        <button class="nav-btn" id="logout-btn">Atsijungti</button>
      `;
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

  function logout() {
    navbar.innerHTML = `<button class="nav-btn" id="login-btn">Prisijungti</button>`;
    pinInput.value = '';
    balanceContainer.style.display = 'none';

    const newLoginBtn = document.getElementById('login-btn');
    newLoginBtn?.addEventListener('click', () => {
      pinContainer.style.display = 'block';
    });

    depositContainer.style.display = 'none';
    withdrawContainer.style.display = 'none';
    balanceContainer.style.display = 'none';
  }

  function showBalance() {
    balanceContainer.style.display = 'block';
    balanceContainer.innerHTML = `<h2>Sąskaitos likutis: €${userBalance}</h2>`;
    depositContainer.style.display = 'none';
    withdrawContainer.style.display = 'none';
  }

  function showDepositForm() {
    depositContainer.style.display = 'block';
    balanceContainer.style.display = 'none';
    withdrawContainer.style.display = 'none';
  }

  function showWithdrawForm() {
    withdrawContainer.style.display = 'block';
    balanceContainer.style.display = 'none';
    depositContainer.style.display = 'none';
  }

  submitDepositBtn?.addEventListener('click', () => {
    const depositAmount = parseFloat(depositAmountInput.value);

    if (!Number.isInteger(depositAmount) || isNaN(depositAmount) || depositAmount <= 0) {
      depositError.textContent = 'Galima įdėti tik sveikąją sumą.';
    } else {
      userBalance += depositAmount;
      localStorage.setItem('userBalance', userBalance);
      depositAmountInput.value = '';
      depositError.textContent = '';
      depositContainer.style.display = 'none';
    }
  });

  cancelDepositBtn?.addEventListener('click', () => {
    depositContainer.style.display = 'none';
  });

  submitWithdrawBtn?.addEventListener('click', () => {
    const withdrawAmount = parseFloat(withdrawAmountInput.value);

    if (!Number.isInteger(withdrawAmount) || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      withdrawError.textContent = 'Galima išsiimti tik sveikąją sumą.';
    } else if (withdrawAmount > userBalance) {
      withdrawError.textContent = 'Nepakanka lėšų sąskaitoje.';
    } else {
      userBalance -= withdrawAmount;
      localStorage.setItem('userBalance', userBalance);
      withdrawAmountInput.value = '';
      withdrawError.textContent = '';
      withdrawContainer.style.display = 'none';
    }
  });

  cancelWithdrawBtn?.addEventListener('click', () => {
    withdrawContainer.style.display = 'none';
  });
});