// 전역 변수
const POPULAR_KEYWORDS = [
  "인공지능",
  "메타버스",
  "블록체인",
  "자율주행",
  "로봇",
  "가상현실",
  "증강현실",
  "디지털 트랜스포메이션",
  "사이버 보안",
  "클라우드 컴퓨팅",
  "빅데이터",
  "머신러닝",
  "NFT",
  "양자컴퓨팅",
];

let selectedKeywords = [];

// 샘플 데이터
const MOCK_DATA = {
  인공지능: {
    articles: [
      {
        id: 1,
        title: "인공지능 기술의 발전과 미래 전망",
        source: "테크 인사이트",
        date: "2025-05-28",
        summary:
          "최근 인공지능 기술은 급속도로 발전하고 있으며, 특히 생성형 AI 분야에서 큰 진전이 있었습니다. 전문가들은 향후 5년 내에 인공지능이 의료, 교육, 금융 등 다양한 산업 분야에서 혁신을 가져올 것으로 전망하고 있습니다.",
        url: "https://example.com/article1",
      },
      {
        id: 2,
        title: "인공지능 윤리와 규제에 관한 국제 논의",
        source: "글로벌 뉴스",
        date: "2025-05-25",
        summary:
          "인공지능 기술의 발전에 따라 윤리적 문제와 규제에 대한 국제적 논의가 활발히 진행되고 있습니다. 특히 AI의 의사결정 과정의 투명성과 책임성에 대한 우려가 커지고 있으며, 여러 국가에서 관련 법안을 준비 중입니다.",
        url: "https://example.com/article2",
      },
    ],
    sentiment: {
      positive: 65,
      neutral: 25,
      negative: 10,
    },
    insights: [
      "인공지능 기술은 의료, 교육, 금융 분야에서 혁신을 주도할 것으로 예상됩니다.",
      "윤리적 문제와 규제에 대한 논의가 활발히 진행되고 있습니다.",
      "인공지능에 대한 전반적인 여론은 긍정적이나, 일자리 대체와 같은 우려도 존재합니다.",
    ],
  },
  메타버스: {
    articles: [
      {
        id: 4,
        title: "메타버스 플랫폼의 성장과 사용자 동향",
        source: "디지털 트렌드",
        date: "2025-05-27",
        summary:
          "메타버스 플랫폼의 사용자 수가 지속적으로 증가하고 있으며, 특히 Z세대를 중심으로 높은 인기를 얻고 있습니다. 가상 콘서트, 전시회 등 다양한 문화 행사가 메타버스 내에서 개최되고 있습니다.",
        url: "https://example.com/article4",
      },
    ],
    sentiment: {
      positive: 70,
      neutral: 20,
      negative: 10,
    },
    insights: [
      "메타버스 플랫폼은 Z세대를 중심으로 높은 인기를 얻고 있습니다.",
      "다양한 문화 행사의 장으로 활용되고 있습니다.",
    ],
  },
};

// 페이지 초기화
document.addEventListener("DOMContentLoaded", async function() {
  try {
    // 인기 키워드 가져오기
    const keywords = await fetchKeywords();
    if (keywords) {
      POPULAR_KEYWORDS = keywords;
    }
    
    initializeKeywords();
    updateAnalysisButton();
  } catch (error) {
    console.error('키워드 로딩 중 에러 발생:', error);
    // 기본 키워드 사용
    initializeKeywords();
    updateAnalysisButton();
  }
});

// 키워드 초기화
function initializeKeywords() {
  const popularKeywordsContainer = document.getElementById("popular-keywords");
  
  POPULAR_KEYWORDS.forEach(keyword => {
    const keywordElement = document.createElement("div");
    keywordElement.className = "keyword unselected";
    keywordElement.textContent = keyword;
    keywordElement.addEventListener("click", () => toggleKeyword(keyword));
    popularKeywordsContainer.appendChild(keywordElement);
  });
}

// 키워드 토글
function toggleKeyword(keyword) {
  if (selectedKeywords.includes(keyword)) {
    selectedKeywords = selectedKeywords.filter(k => k !== keyword);
  } else {
    if (selectedKeywords.length < 3) {
      selectedKeywords.push(keyword);
    } else {
      alert("키워드는 최대 3개까지 선택할 수 있습니다.");
      return;
    }
  }
  
  updateSelectedKeywords();
  updatePopularKeywords();
  updateAnalysisButton();
}

// 선택된 키워드 업데이트
function updateSelectedKeywords() {
  const container = document.getElementById("selected-keywords");
  container.innerHTML = "";
  
  if (selectedKeywords.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "키워드를 최대 3개까지 선택해주세요";
    container.appendChild(emptyMessage);
  } else {
    selectedKeywords.forEach(keyword => {
      const keywordElement = document.createElement("div");
      keywordElement.className = "keyword selected";
      keywordElement.textContent = `${keyword} ✕`;
      keywordElement.addEventListener("click", () => toggleKeyword(keyword));
      container.appendChild(keywordElement);
    });
  }
}

// 인기 키워드 업데이트
function updatePopularKeywords() {
  const keywordElements = document.querySelectorAll("#popular-keywords .keyword");
  
  keywordElements.forEach(element => {
    const keyword = element.textContent;
    if (selectedKeywords.includes(keyword)) {
      element.className = "keyword selected";
    } else {
      element.className = "keyword unselected";
    }
  });
}

// 분석 버튼 업데이트
function updateAnalysisButton() {
  const button = document.getElementById("analysis-button");
  button.disabled = selectedKeywords.length === 0;
}

// 커스텀 키워드 추가
function addCustomKeyword() {
  const input = document.getElementById("custom-keyword");
  const keyword = input.value.trim();
  
  if (!keyword) return;
  
  if (selectedKeywords.includes(keyword)) {
    alert("이미 선택된 키워드입니다.");
    return;
  }
  
  if (selectedKeywords.length >= 3) {
    alert("키워드는 최대 3개까지 선택할 수 있습니다.");
    return;
  }
  
  selectedKeywords.push(keyword);
  input.value = "";
  
  updateSelectedKeywords();
  updatePopularKeywords();
  updateAnalysisButton();
}

// 키 입력 처리
function handleKeyDown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addCustomKeyword();
  }
}

// 키워드 섹션으로 스크롤
function scrollToKeywords() {
  const element = document.getElementById("keyword-section");
  element.scrollIntoView({ behavior: "smooth" });
}

// 분석 시작
function startAnalysis() {
  if (selectedKeywords.length === 0) return;
  
  // 결과 페이지로 이동
  showResultsPage();
  
  // 선택된 키워드 표시
  updateResultKeywords();
  
  // 로딩 표시
  document.getElementById("loading-indicator").style.display = "flex";
  document.getElementById("analysis-results").style.display = "none";
  
  // 분석 시뮬레이션 (실제로는 API 호출)
  setTimeout(() => {
    document.getElementById("loading-indicator").style.display = "none";
    document.getElementById("analysis-results").style.display = "flex";
    
    // 결과 데이터 생성 및 표시
    generateResults();
  }, 2000);
}

// 결과 키워드 업데이트
function updateResultKeywords() {
  const container = document.getElementById("result-keywords");
  container.innerHTML = "";
  
  selectedKeywords.forEach(keyword => {
    const tag = document.createElement("span");
    tag.className = "keyword tag";
    tag.textContent = `#${keyword}`;
    container.appendChild(tag);
  });
}

// 결과 생성
function generateResults() {
  // 기사 요약 생성
  generateArticleSummaries();
  
  // 여론 분석 업데이트
  updateSentimentAnalysis();
  
  // 인사이트 생성
  generateInsights();
}

// 기사 요약 생성
function generateArticleSummaries() {
  const container = document.getElementById("article-summaries");
  container.innerHTML = "";
  
  let allArticles = [];
  
  // 선택된 키워드에 대한 기사 수집
  selectedKeywords.forEach(keyword => {
    if (MOCK_DATA[keyword]) {
      allArticles = allArticles.concat(MOCK_DATA[keyword].articles);
    } else {
      // 샘플 데이터에 없는 키워드는 기본 데이터 생성
      allArticles.push({
        id: Math.random(),
        title: `${keyword}에 관한 최신 동향`,
        source: "테크 뉴스",
        date: "2025-05-28",
        summary: `${keyword} 분야는 최근 급속도로 발전하고 있으며, 다양한 산업에 영향을 미치고 있습니다.`,
        url: "https://example.com/article",
      });
    }
  });
  
  // 기사 요약 렌더링
  allArticles.forEach(article => {
    const articleElement = document.createElement("div");
    articleElement.className = "article";
    articleElement.innerHTML = `
      <div class="article-header">
        <h3 class="article-title">${article.title}</h3>
        <a href="${article.url}" class="article-link" target="_blank" rel="noopener noreferrer">
          원문 ↗
        </a>
      </div>
      <div class="article-meta">
        <span class="source">${article.source}</span>
        <span class="separator">•</span>
        <span class="date">${article.date}</span>
      </div>
      <p class="article-summary">${article.summary}</p>
    `;
    container.appendChild(articleElement);
  });
}

// 여론 분석 업데이트
function updateSentimentAnalysis() {
  // 평균 감정 분석 계산
  let totalPositive = 0;
  let totalNeutral = 0;
  let totalNegative = 0;
  let count = 0;
  
  selectedKeywords.forEach(keyword => {
    if (MOCK_DATA[keyword]) {
      totalPositive += MOCK_DATA[keyword].sentiment.positive;
      totalNeutral += MOCK_DATA[keyword].sentiment.neutral;
      totalNegative += MOCK_DATA[keyword].sentiment.negative;
      count++;
    } else {
      // 기본 데이터
      totalPositive += 60;
      totalNeutral += 30;
      totalNegative += 10;
      count++;
    }
  });
  
  const avgPositive = Math.round(totalPositive / count);
  const avgNeutral = Math.round(totalNeutral / count);
  const avgNegative = Math.round(totalNegative / count);
  
  // 퍼센티지 업데이트
  document.querySelector(".sentiment-box.positive .percentage").textContent = `${avgPositive}%`;
  document.querySelector(".sentiment-box.neutral .percentage").textContent = `${avgNeutral}%`;
  document.querySelector(".sentiment-box.negative .percentage").textContent = `${avgNegative}%`;
  
  // 차트 업데이트
  document.querySelector(".bar.positive").style.width = `${avgPositive}%`;
  document.querySelector(".bar.positive").textContent = avgPositive > 10 ? `${avgPositive}%` : "";
  
  document.querySelector(".bar.neutral").style.width = `${avgNeutral}%`;
  document.querySelector(".bar.neutral").textContent = avgNeutral > 10 ? `${avgNeutral}%` : "";
  
  document.querySelector(".bar.negative").style.width = `${avgNegative}%`;
  document.querySelector(".bar.negative").textContent = avgNegative > 10 ? `${avgNegative}%` : "";
}

// 인사이트 생성
function generateInsights() {
  const container = document.getElementById("key-insights");
  container.innerHTML = "";
  
  let allInsights = [];
  
  // 선택된 키워드에 대한 인사이트 수집
  selectedKeywords.forEach(keyword => {
    if (MOCK_DATA[keyword]) {
      allInsights = allInsights.concat(MOCK_DATA[keyword].insights);
    } else {
      // 기본 데이터
      allInsights.push(`${keyword} 기술은 지속적으로 발전하고 있습니다.`);
      allInsights.push(`${keyword}에 대한 투자가 증가하고 있습니다.`);
    }
  });
  
  // 인사이트 렌더링
  allInsights.forEach(insight => {
    const insightElement = document.createElement("div");
    insightElement.className = "insight";
    insightElement.innerHTML = `
      <div class="insight-icon">💡</div>
      <p class="insight-text">${insight}</p>
    `;
    container.appendChild(insightElement);
  });
}

// 페이지 전환 함수
function showHomePage() {
  document.getElementById("home-page").classList.add("active");
  document.getElementById("results-page").classList.remove("active");
  document.getElementById("about-page").classList.remove("active");
}

function showResultsPage() {
  document.getElementById("home-page").classList.remove("active");
  document.getElementById("results-page").classList.add("active");
  document.getElementById("about-page").classList.remove("active");
}

function showAboutPage() {
  document.getElementById("home-page").classList.remove("active");
  document.getElementById("results-page").classList.remove("active");
  document.getElementById("about-page").classList.add("active");
}