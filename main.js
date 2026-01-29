class DinnerRecommender extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');

    const button = document.createElement('button');
    button.textContent = '今日の運命の晩ご飯は？'; // More humorous Japanese text

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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 150px; /* Increased height to accommodate image */
        gap: 15px;
      }

      .recommendation-text {
        font-size: 2rem;
        font-weight: bold;
        color: #db4437;
        padding: 10px 20px;
        background-color: #fce8e6;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        text-align: center;
      }

      .recommendation-image {
        max-width: 100%;
        height: auto;
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
      { name: "寿司: 小さな宇宙、一口の幸せ！", imageKeyword: "sushi" },
      { name: "ラーメン: スープに溺れて、麺を吸い込め！", imageKeyword: "ramen" },
      { name: "天ぷら: サクサク衣の魔法！", imageKeyword: "tempura" },
      { name: "うどん: 喉ごしツルツル、心のオアシス！", imageKeyword: "udon" },
      { name: "カレーライス: 日本の国民食、愛とスパイスの融合！", imageKeyword: "curry-rice" },
      { name: "焼肉: 煙の中で踊る肉、最高のエンターテイメント！", imageKeyword: "yakiniku" },
      { name: "お好み焼き: 関西の魂、キャベツと粉のハーモニー！", imageKeyword: "okonomiyaki" },
      { name: "しゃぶしゃぶ: 湯気の向こうに、至福が待つ！", imageKeyword: "shabu-shabu" },
      { name: "味噌汁: 日本人のDNAに刻まれた、安らぎの味！", imageKeyword: "miso-soup" },
      { name: "焼き鳥: 串に刺さった小さな幸せ、無限ループの誘惑！", imageKeyword: "yakitori" }
    ];
    
    container.innerHTML = '';
    const randomIndex = Math.floor(Math.random() * dishes.length);
    const selectedDish = dishes[randomIndex];

    const recommendationTextDiv = document.createElement('div');
    recommendationTextDiv.setAttribute('class', 'recommendation-text');
    recommendationTextDiv.textContent = selectedDish.name;
    container.appendChild(recommendationTextDiv);

    const recommendationImage = document.createElement('img');
    recommendationImage.setAttribute('class', 'recommendation-image');
    recommendationImage.src = `https://source.unsplash.com/random/400x300/?${selectedDish.imageKeyword}`;
    recommendationImage.alt = selectedDish.name;
    container.appendChild(recommendationImage);
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