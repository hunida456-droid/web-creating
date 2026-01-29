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
      { name: "焼き鳥: 串に刺さった小さな幸せ、無限ループの誘惑！", imageKeyword: "yakitori" },
      { name: "とんかつ: 揚げたてサクサク、ガッツリ元気！", imageKeyword: "tonkatsu" },
      { name: "そば: 粋な和の香り、ズルズルっと一口！", imageKeyword: "soba" },
      { name: "おでん: 染み渡る出汁、ホッと一息の温もり！", imageKeyword: "oden" },
      { name: "餃子: 焼いて良し、茹でて良し、戦いは終わらない！", imageKeyword: "gyoza" },
      { name: "すき焼き: 豪華絢爛、肉と野菜の夢の共演！", imageKeyword: "sukiyaki" },
      { name: "刺身: 鮮度命！海の宝石箱や～！", imageKeyword: "sashimi" },
      { name: "たこ焼き: 外はカリッ、中はトロッ、大阪のソウル！", imageKeyword: "takoyaki" },
      { name: "もんじゃ焼き: 混ぜて焼いて、未知との遭遇！", imageKeyword: "monjayaki" },
      { name: "親子丼: 親と子の絆、卵と鶏肉の絶妙ハーモニー！", imageKeyword: "oyakodon" },
      { name: "カツ丼: 揚げたてカツと出汁の暴力、白米泥棒！", imageKeyword: "katsudon" },
      { name: "牛丼: 早い、安い、美味い！日本のファストフード王者！", imageKeyword: "gyudon" },
      { name: "天丼: 揚げたて天ぷら、タレが染みたご飯が最高！", imageKeyword: "tendon" },
      { name: "エビチリ: プリップリ海老とピリ辛ソース、ご飯が進む！", imageKeyword: "ebichili" },
      { name: "麻婆豆腐: シビれる辛さ、止まらない旨さ、ご飯が無限！", imageKeyword: "mapo-tofu" },
      { name: "担々麺: 濃厚スープに痺れる辛さ、中毒性高め！", imageKeyword: "tantanmen" },
      { name: "ゴーヤチャンプルー: 苦味が旨さに変わる、沖縄の知恵！", imageKeyword: "goya-champuru" },
      { name: "ちゃんぽん: 魚介の旨味が凝縮、長崎のソウルフード！", imageKeyword: "champon" },
      { name: "ひつまぶし: 一度で三度美味しい、うなぎの贅沢！", imageKeyword: "hitsumabushi" },
      { name: "お茶漬け: サラサラっと〆に最高、優しいお味！", imageKeyword: "ochazuke" },
      { name: "納豆: 粘り強さで健康に！日本人よ、これぞパワーフード！", imageKeyword: "natto" }
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
    recommendationImage.src = `https://source.unsplash.com/random/400x300/?${selectedDish.imageKeyword}&_=${new Date().getTime()}`;
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