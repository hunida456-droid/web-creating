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
      { name: "寿司 (Sushi)", humor: "작은 우주, 한 입의 행복! 우주여행 떠나실 분?", localImageUrl: "./images/sushi.jpg" },
      { name: "ラーメン (Ramen)", humor: "국물에 풍덩! 면치기는 필수! 오늘 밤, 면과 함께 춤을!", localImageUrl: "./images/ramen.jpg" },
      { name: "天ぷら (Tempura)", humor: "바삭함의 마법! 한 입 베어 물면 스트레스가 사르르~", localImageUrl: "./images/tempura.jpg" },
      { name: "うどん (Udon)", humor: "목 넘김이 예술! 호로록~ 하면 마음까지 따뜻!", localImageUrl: "./images/udon.jpg" },
      { name: "カレーライス (Curry Rice)", humor: "일본의 국민 음식! 사랑과 스파이스의 환상 조합!", localImageUrl: "./images/curry-rice.jpg" },
      { name: "焼肉 (Yakiniku)", humor: "연기 속에서 고기가 춤을 춘다! 오늘은 내가 고기왕!", localImageUrl: "./images/yakiniku.jpg" },
      { name: "お好み焼き (Okonomiyaki)", humor: "뒤집기의 달인이 될 시간! 내 마음대로 만드는 행복!", localImageUrl: "./images/okonomiyaki.jpg" },
      { name: "しゃぶしゃぶ (Shabu-shabu)", humor: "끓는 육수 속, 고기가 예술로 승화하는 순간!", localImageUrl: "./images/shabu-shabu.jpg" },
      { name: "味噌汁 (Miso Soup)", humor: "일본인의 소울 푸드! 한 모금 마시면 힘이 불끈!", localImageUrl: "./images/miso-soup.jpg" },
      { name: "焼き鳥 (Yakitori)", humor: "꼬치에 꽂힌 작은 행복! 하나씩 뽑아 먹는 재미!", localImageUrl: "./images/yakitori.jpg" }
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
    recommendationImage.src = selectedDish.localImageUrl;
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
