class DinnerRecommender extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');

    const button = document.createElement('button');
    button.textContent = '今日の夕食を提案';

    const recommendationContainer = document.createElement('div');
    recommendationContainer.setAttribute('class', 'recommendation-container');

    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }

      button {
        padding: 10px 20px;
        font-size: 1.2rem;
        cursor: pointer;
        border: none;
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
      }

      button:hover {
        background-color: #45a049;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      }

      .recommendation-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50px;
      }

      .recommendation {
        font-size: 2rem;
        font-weight: bold;
        color: #db4437;
        padding: 20px;
        background-color: #fce8e6;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(button);
    wrapper.appendChild(recommendationContainer);

    button.addEventListener('click', () => {
      this.generateRecommendation(recommendationContainer);
    });
  }

  generateRecommendation(container) {
    const dishes = [
      "寿司 (Sushi)", "ラーメン (Ramen)", "天ぷら (Tempura)", "うどん (Udon)", 
      "カレーライス (Curry Rice)", "焼肉 (Yakiniku)", "お好み焼き (Okonomiyaki)", 
      "しゃぶしゃぶ (Shabu-shabu)", "味噌汁 (Miso Soup)", "焼き鳥 (Yakitori)"
    ];
    
    container.innerHTML = '';
    const randomIndex = Math.floor(Math.random() * dishes.length);
    const dish = dishes[randomIndex];

    const recommendationDiv = document.createElement('div');
    recommendationDiv.setAttribute('class', 'recommendation');
    recommendationDiv.textContent = dish;
    container.appendChild(recommendationDiv);
  }
}

customElements.define('dinner-recommender', DinnerRecommender);

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Apply the saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}