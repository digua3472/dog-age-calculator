// Safe helper to set page title if element exists
function setPageTitle(text) {
  const el = document.getElementById('page-title');
  if (el) el.innerText = text;
  else document.title = text;
}

// Load saved values
window.addEventListener('DOMContentLoaded', function () {
  const savedName = localStorage.getItem('dogName');
  const savedBirthday = localStorage.getItem('dogBirthday');

  if (savedName) {
    const nameInput = document.getElementById('dog-name');
    nameInput.value = savedName;
    document.getElementById('main-title').innerText = `${savedName} 的年齡換算`;
    setPageTitle(`${savedName} 的年齡換算`);
  }

  if (savedBirthday) {
    document.getElementById('dog-birthday').value = savedBirthday;
  }
});

// Calculation logic
document.getElementById('calc-btn').addEventListener('click', function () {
  const name = document.getElementById('dog-name').value.trim();
  const birthday = document.getElementById('dog-birthday').value;

  if (!birthday) {
    alert('請先輸入生日！');
    return;
  }

  // save
  localStorage.setItem('dogName', name);
  localStorage.setItem('dogBirthday', birthday);

  if (name !== '') {
    document.getElementById('main-title').innerText = `${name} 的年齡換算`;
    setPageTitle(`${name} 的年齡換算`);
  }

  const birth = new Date(birthday);
  const now = new Date();
  if (birth > now) {
    alert('出生日期不能晚於今天。');
    return;
  }

  const diffDays = (now - birth) / (1000 * 60 * 60 * 24);
  const dogAge = diffDays / 365.25; // more accurate

  // use formula: human_age = 16 * ln(dog_age) + 31
  let humanAge = null;
  if (dogAge > 0) {
    humanAge = 16 * Math.log(dogAge) + 31;
    humanAge = Math.round(humanAge * 10) / 10; // one decimal
  }

  const displayDogAge = (Math.round(dogAge * 10) / 10).toFixed(1);
  const displayHuman =
    humanAge !== null && isFinite(humanAge) ? humanAge.toFixed(1) : '-';

  // update UI text exactly as requested
  const displayName = name || '你的狗狗';
  const desc = `${displayName}現在大約 ${displayDogAge} 歲狗年齡，換算成人類年齡大約是 ${displayHuman} 歲。`;

  document.getElementById('desc-text').innerText = desc;

  document.getElementById('result').classList.remove('hidden');
});
