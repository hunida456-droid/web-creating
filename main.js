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
      { name: "寿司 (Sushi): 小さな宇宙、一口の幸せ！", imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce18fd43b1" },
      { name: "ラーメン (Ramen): スープに溺れて、麺を吸い込め！", imageUrl: "https://images.unsplash.com/photo-1574004241462-a25d2d22a752" },
      { name: "天ぷら (Tempura): サクサク衣の魔法！", imageUrl: "https://images.unsplash.com/photo-1626776878438-b77a46d1e39a" },
      { name: "うどん (Udon): 喉ごしツルツル、心のオアシス！", imageUrl: "https://images.unsplash.com/photo-1579883023477-0a2fa5d2d14d" },
      { name: "カレーライス (Curry Rice): 日本の国民食、愛とスパイスの融合！", imageUrl: "https://images.unsplash.com/photo-1588269219981-638707166c88" },
      { name: "焼肉 (Yakiniku): 煙の中で踊る肉、最高のエンターテイメント！", imageUrl: "https://images.unsplash.com/photo-1594179047514-9310a8274a2a" },
      { name: "お好み焼き (Okonomiyaki): 関西の魂、キャベツと粉のハーモニー！", imageUrl: "https://images.unsplash.com/photo-1562688823-06d9b0a68454" },
      { name: "しゃぶしゃぶ (Shabu-shabu): 湯気の向こうに、至福が待つ！", imageUrl: "https://images.unsplash.com/photo-1587889283726-1e96d22b3a1a" },
      { name: "味噌汁 (Miso Soup): 日本人のDNAに刻まれた、安らぎの味！", imageUrl: "https://images.unsplash.com/photo-1620005741058-22659e557b44" },
      { name: "焼き鳥 (Yakitori): 串に刺さった小さな幸せ、無限ループの誘惑！", imageUrl: "https://images.unsplash.com/photo-1624560374944-118a2872d82e" },
      { name: "とんかつ (Tonkatsu): 揚げたてサクサク、ガッツリ元気！", imageUrl: "https://images.unsplash.com/photo-1618012879389-983b06c1414c" },
      { name: "そば (Soba): 粋な和の香り、ズルズルっと一口！", imageUrl: "https://images.unsplash.com/photo-1566485863920-591e0a987033" },
      { name: "おでん (Oden): 染み渡る出汁、ホッと一息の温もり！", imageUrl: "https://images.unsplash.com/photo-1625944990840-eb5297e6fee6" },
      { name: "餃子 (Gyoza): 焼いて良し、茹でて良し、戦いは終わらない！", imageUrl: "https://images.unsplash.com/photo-1608834921953-6113c2394a59" },
      { name: "すき焼き (Sukiyaki): 豪華絢爛、肉と野菜の夢の共演！", imageUrl: "https://images.unsplash.com/photo-1582576332111-a83f9822a36d" },
      { name: "刺身 (Sashimi): 鮮度命！海の宝石箱や～！", imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754" },
      { name: "たこ焼き (Takoyaki): 外はカリッ、中はトロッ、大阪のソウル！", imageUrl: "https://images.unsplash.com/photo-1534062228519-45ab7885b596" },
      { name: "もんじゃ焼き (Monjayaki): 混ぜて焼いて、未知との遭遇！", imageUrl: "https://images.unsplash.com/photo-1621289659353-d1c925d43e26" },
      { name: "親子丼 (Oyakodon): 親と子の絆、卵と鶏肉の絶妙ハーモニー！", imageUrl: "https://images.unsplash.com/photo-1623588998018-c26696b01a18" },
      { name: "カツ丼 (Katsudon): 揚げたてカツと出汁の暴力、白米泥棒！", imageUrl: "https://images.unsplash.com/photo-1604013149179-c7a6f27fac0d" },
      { name: "牛丼 (Gyudon): 早い、安い、美味い！日本のファストフード王者！", imageUrl: "https://images.unsplash.com/photo-1564759297839-49dd9646b185" },
      { name: "天丼 (Tendon): 揚げたて天ぷら、タレが染みたご飯が最高！", imageUrl: "https://images.unsplash.com/photo-1582576332111-a83f9822a36d" },
      { name: "エビチリ (Ebi Chili): プリップリ海老とピリ辛ソース、ご飯が進む！", imageUrl: "https://images.unsplash.com/photo-1518424424368-8549481be37c" },
      { name: "麻婆豆腐 (Mabo Tofu): シビれる辛さ、止まらない旨さ、ご飯が無限！", imageUrl: "https://images.unsplash.com/photo-1599361099606-2580436d9016" },
      { name: "担々麺 (Tantanmen): 濃厚スープに痺れる辛さ、中毒性高め！", imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754" },
      { name: "ゴーヤチャンプルー (Goya Champuru): 苦味が旨さに変わる、沖縄の知恵！", imageUrl: "https://images.unsplash.com/photo-1563724498-18e388533831" },
      { name: "ちゃんぽん (Champon): 魚介の旨味が凝縮、長崎のソウルフード！", imageUrl: "https://images.unsplash.com/photo-1625944990840-eb5297e6fee6" },
      { name: "ひつまぶし (Hitsumabushi): 一度で三度美味しい、うなぎの贅沢！", imageUrl: "https://images.unsplash.com/photo-1544463428-2287f9456218" },
      { name: "お茶漬け (Ochazuke): サラサラっと〆に最高、優しいお味！", imageUrl: "https://images.unsplash.com/photo-1549485775-5f0c9b01e3b6" },
      { name: "納豆 (Natto): 粘り強さで健康に！日本人よ、これぞパワーフード！", imageUrl: "https://images.unsplash.com/photo-1598649233342-9f121e7d25e4" }
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
    recommendationImage.src = selectedDish.imageUrl;
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