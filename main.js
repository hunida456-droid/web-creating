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
        min-height: 250px; /* Increased height to accommodate image and humor */
        gap: 10px;
        margin-top: 20px;
      }

      .recommendation-text {
        font-size: 2rem;
        font-weight: bold;
        color: #db4437;
        padding: 5px 10px;
        text-align: center;
      }

      .recommendation-humor {
        font-size: 1.1rem;
        color: #666;
        text-align: center;
        margin-bottom: 10px;
      }

      .recommendation-image {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        max-height: 200px; /* Limit image height */
        object-fit: cover; /* Ensure image covers the area nicely */
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
      { name: "寿司 (Sushi)", humor: "小さな宇宙、一口の幸せ！宇宙旅行に出かけませんか？" },
      { name: "ラーメン (Ramen)", humor: "スープにドボン！麺すすりは必須！今夜は麺と一緒にダンスを！" },
      { name: "天ぷら (Tempura)", humor: "サクサク魔法！一口食べればストレスもとろける！" },
      { name: "うどん (Udon)", humor: "喉越しツルツル、心のオアシス！ずるずるっと温まろう！" },
      { name: "カレーライス (Curry Rice)", humor: "日本の国民食！愛とスパイスのファンタジー融合！" },
      { name: "焼肉 (Yakiniku)", humor: "煙の中で肉が踊る！今夜の肉の王様は私だ！" },
      { name: "お好み焼き (Okonomiyaki)", humor: "ひっくり返す達人になる時！自分だけの幸せを作ろう！" },
      { name: "しゃぶしゃぶ (Shabu-shabu)", humor: "沸騰する出汁の中、肉が芸術に昇華する瞬間！" },
      { name: "味噌汁 (Miso Soup)", humor: "日本人のソウルフード！一口飲めば力が湧いてくる！" },
      { name: "焼き鳥 (Yakitori)", humor: "串に刺さった小さな幸せ！一本ずつ味わう楽しみ！" }
    ];
    
    container.innerHTML = '';
    const randomIndex = Math.floor(Math.random() * dishes.length);
    const selectedDish = dishes[randomIndex];

    const recommendationNameDiv = document.createElement('div');
    recommendationNameDiv.setAttribute('class', 'recommendation-text');
    recommendationNameDiv.textContent = selectedDish.name;
    container.appendChild(recommendationNameDiv);
    
    const recommendationHumorDiv = document.createElement('div');
    recommendationHumorDiv.setAttribute('class', 'recommendation-humor');
    recommendationHumorDiv.textContent = selectedDish.humor;
    container.appendChild(recommendationHumorDiv);

    const recommendationImage = document.createElement('img');
    recommendationImage.setAttribute('class', 'recommendation-image');
    recommendationImage.src = `https://loremflickr.com/400/300/cute,animals?random=${Math.random()}`; // Random cute animal image
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
