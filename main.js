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
      { name: "寿司 (Sushi)", description: "新鮮な魚介を酢飯と共に握り込んだ、日本が世界に誇る伝統料理。職人の技が光る繊細な味わいは、まさに芸術品。健康志向の方にも人気の逸品です。" },
      { name: "ラーメン (Ramen)", description: "豚骨、鶏ガラ、魚介など様々な出汁をベースにしたスープに、特製の麺を合わせた国民食。地域ごとに特色があり、その多様な味わいが人々を魅了します。トッピングも豊富で、一杯で満足感が得られます。" },
      { name: "天ぷら (Tempura)", description: "旬の魚介や野菜を薄い衣で揚げた、日本を代表する揚げ物料理。素材の味を最大限に引き出す軽やかな食感が特徴です。熱々を塩や天つゆでいただくのが醍醐味です。" },
      { name: "うどん (Udon)", description: "太くてコシのある麺を、出汁の効いたつゆでいただく日本各地で愛される麺料理。温かいものから冷たいものまで、季節や気分に合わせて楽しめます。消化にも優しく、幅広い世代に人気です。" },
      { name: "カレーライス (Curry Rice)", description: "明治時代にイギリスから伝わり、日本独自の進化を遂げた国民的洋食。ご飯との相性は抜群で、辛さや具材のバリエーションが豊富です。家庭料理としても親しまれています。" },
      { name: "焼肉 (Yakiniku)", description: "薄切りにした肉をロースターで焼き、特製のタレでいただく贅沢な料理。友人や家族と囲んで楽しむことが多く、食欲をそそる香りが特徴です。ビールとの相性も抜群です。" },
      { name: "お好み焼き (Okonomiyaki)", description: "小麦粉の生地にキャベツや肉、魚介などを混ぜて鉄板で焼いた、関西発祥の粉もの料理。熱々をソースとマヨネーズで飾り、鰹節や青のりをかけていただきます。ボリューム満点で満足感があります。" },
      { name: "しゃぶしゃぶ (Shabu-shabu)", description: "薄切りの肉を熱湯にくぐらせ、ポン酢やごまダレでいただく鍋料理。野菜もたっぷりとれてヘルシー。みんなで鍋を囲む楽しさも魅力です。" },
      { name: "味噌汁 (Miso Soup)", description: "日本の食卓に欠かせない、味噌を溶かした出汁に豆腐やワカメなどを入れた汁物。深いコクと香りは、心と体を温めます。日本人の健康を支える一杯です。" },
      { name: "焼き鳥 (Yakitori)", description: "鶏肉の様々な部位を串に刺し、炭火で焼いた料理。塩やタレで味付けされ、お酒との相性も抜群です。手軽に楽しめる日本の居酒屋文化を象徴する一品です。" },
      { name: "とんかつ (Tonkatsu)", description: "厚切りの豚肉にパン粉をまぶして揚げた、ジューシーな洋食。サクサクの衣と柔らかい肉のハーモニーが絶妙です。ご飯やキャベツと共にいただくのが一般的です。" },
      { name: "そば (Soba)", description: "蕎麦粉を原料とする細長い麺で、風味豊かな出汁と共にいただく和食。冷たいざるそばや温かいたぬきそばなど、一年を通して多様な形で楽しまれます。ヘルシーで上品な味わいが魅力です。" },
      { name: "おでん (Oden)", description: "様々な具材（大根、卵、練り物など）を鰹と昆布の出汁でじっくり煮込んだ冬の定番料理。具材一つ一つに味が染み込み、心まで温まります。地域ごとに異なる出汁の味も楽しめます。" },
      { name: "餃子 (Gyoza)", description: "豚ひき肉と野菜を薄い皮で包み、焼いたり茹でたりしていただく中華料理。日本の家庭でも広く愛され、パリッとした焼き目とジューシーな餡が特徴です。ご飯のおかずにも、ビールのつまみにも最適です。" },
      { name: "すき焼き (Sukiyaki)", description: "薄切りの牛肉と野菜を甘辛い割り下で煮込む、日本の代表的な鍋料理。溶き卵につけて食べるのが特徴で、特別な日のご馳走としても親しまれています。豊かな香りと濃厚な味が食欲をそそります。" },
      { name: "刺身 (Sashimi)", description: "新鮮な魚介類を薄切りにして生でいただく、日本の伝統料理。素材本来の味を最大限に楽しむことができ、醤油やわさびと共にいただきます。見た目にも美しく、海外からの評価も高い一品です。" },
      { name: "たこ焼き (Takoyaki)", description: "小麦粉の生地にタコを入れて丸く焼き上げた、大阪名物のソウルフード。熱々を特製ソースとマヨネーズで飾り、鰹節と青のりを散らしていただきます。外はカリカリ、中はトロトロの食感が病みつきになります。" },
      { name: "もんじゃ焼き (Monjayaki)", description: "小麦粉の生地に出汁と具材を混ぜて鉄板で焼く、東京の下町で愛される粉もの料理。ヘラで少しずつ焼きながら食べるのが特徴で、おこげの香ばしさが魅力です。見た目とは裏腹に奥深い味わいが楽しめます。" },
      { name: "親子丼 (Oyakodon)", description: "鶏肉と卵を甘辛い出汁で煮込み、ご飯の上にのせた丼物。親子という名の通り、鶏肉と卵の優しいハーモニーが特徴です。手軽に作れて栄養も満点な家庭料理です。" },
      { name: "カツ丼 (Katsudon)", description: "サクサクに揚げた豚カツを甘辛い出汁で煮込み、卵でとじてご飯の上にのせたボリューム満点の丼物。満足感があり、頑張った日や元気を出したい日にぴったりの一品です。" },
      { name: "牛丼 (Gyudon)", description: "薄切りの牛肉と玉ねぎを甘辛く煮込み、ご飯の上にのせた日本のファストフードの定番。手早く食べられて安価でありながら、しっかりとした味わいが魅力です。紅しょうがを添えて味の変化も楽しめます。" },
      { name: "天丼 (Tendon)", description: "揚げたての天ぷらを特製の甘辛いタレにくぐらせ、ご飯の上にのせた丼物。エビや野菜の天ぷらが豪華に盛り付けられ、タレが染み込んだご飯との相性が抜群です。贅沢な気分を味わいたい時に。" },
      { name: "エビチリ (Ebi Chili)", description: "プリプリのエビをピリ辛のチリソースで炒めた中華料理。ご飯が進む濃厚な味わいで、日本の食卓でも人気のメニューです。辛さの中にもエビの旨味がしっかりと生きています。" },
      { name: "麻婆豆腐 (Mabo Tofu)", description: "挽肉と豆腐を豆板醤や甜麺醤で煮込んだ、辛さが特徴的な中華料理。ご飯が進むシビれる辛さと奥深いコクが魅力です。本場四川の味から日本風まで、様々なバリエーションがあります。" },
      { name: "担々麺 (Tantanmen)", description: "芝麻醤（ごまペースト）とラー油をベースにした濃厚なスープに、挽肉やチンゲン菜を添えた辛口の麺料理。日本では辛さを抑えたクリーミーなものが主流で、その独特の風味が多くのファンを魅了しています。" },
      { name: "ゴーヤチャンプルー (Goya Champuru)", description: "ゴーヤ、豚肉、豆腐、卵を炒め合わせた沖縄の郷土料理。ゴーヤの苦味が特徴ですが、それが食欲をそそり、夏バテ防止にも効果的と言われています。健康的な一品です。" },
      { name: "ちゃんぽん (Champon)", description: "豚肉、魚介、野菜などを炒めてスープで煮込み、太麺と合わせた長崎発祥の麺料理。様々な具材の旨味が溶け込んだ濃厚なスープが特徴で、栄養満点の一杯です。" },
      { name: "ひつまぶし (Hitsumabushi)", description: "香ばしく焼いたうなぎの蒲焼きをご飯の上にのせた名古屋の郷土料理。一杯で三度美味しい食べ方が特徴で、まずはそのまま、次に薬味と、最後にお茶漬けとして楽しめます。うなぎの贅沢を存分に味わえます。" },
      { name: "お茶漬け (Ochazuke)", description: "ご飯に熱いお茶や出汁をかけ、具材（梅干し、鮭、海苔など）を添えていただく軽食。サラサラと食べやすく、飲んだ後の〆や食欲がない時にも最適です。優しい味わいが疲れた体に染み渡ります。" },
      { name: "納豆 (Natto)", description: "大豆を発酵させて作る日本の伝統的な食品。独特の粘りと香りが特徴で、栄養価が非常に高く、健康食品として知られています。ご飯にかけて混ぜて食べるのが一般的です。" },
      { name: "からあげ (Karaage)", description: "鶏肉に下味をつけ、片栗粉などをまぶして揚げた、日本の国民的おつまみ兼おかず。ジューシーな肉とカリッとした衣の食感が魅力で、世代を問わず愛されています。" },
      { name: "焼きそば (Yakisoba)", description: "蒸し麺と豚肉、キャベツなどの野菜をソースで炒め合わせた料理。屋台の定番メニューであり、手軽に作れる家庭料理としても人気です。紅しょうがや青のりが風味を一層引き立てます。" },
      { name: "おにぎり (Onigiri)", description: "ご飯を握って様々な具材を入れた、日本の代表的な軽食。手軽に持ち運べて食べやすく、梅干し、鮭、たらこなど具材のバリエーションも豊富です。日本の食文化を象徴する存在です。" },
      { name: "とろろ (Tororo)", description: "山芋をすりおろしたもので、ご飯や蕎麦にかけていただくことが多い。独特の粘り気と栄養価の高さが特徴で、消化を助ける効果もあります。さっぱりとした味わいが魅力です。" },
      { name: "だし巻き卵 (Dashimaki Tamago)", description: "出汁をたっぷり含ませて焼いた、ふわふわとした食感の卵焼き。上品な甘みと出汁の風味が口いっぱいに広がり、和食の定番として親しまれています。" }
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
    // For AdSense high quality, let's use the detailed description here instead of humor
    recommendationHumorDiv.textContent = selectedDish.description; 
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
