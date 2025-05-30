// API 엔드포인트
const API_ENDPOINTS = {
  ARTICLE_SUMMARY: '/api/article-summary',
  SENTIMENT_ANALYSIS: '/api/sentiment-analysis',
  KEYWORDS: '/api/keywords'
};

// API 요청 함수들
async function fetchArticleSummary(keyword) {
  try {
    const response = await fetch(`${API_URLS.ARTICLE_SUMMARY}?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) throw new Error('기사 요약 API 요청 실패');
    return await response.json();
  } catch (error) {
    console.error('기사 요약 API 에러:', error);
    return null;
  }
}

async function fetchSentimentAnalysis(keyword) {
  try {
    const response = await fetch(`${API_URLS.SENTIMENT_ANALYSIS}?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) throw new Error('민심 분석 API 요청 실패');
    return await response.json();
  } catch (error) {
    console.error('민심 분석 API 에러:', error);
    return null;
  }
}

async function fetchKeywords() {
  try {
    const response = await fetch(API_URLS.KEYWORDS);
    if (!response.ok) throw new Error('키워드 API 요청 실패');
    return await response.json();
  } catch (error) {
    console.error('키워드 API 에러:', error);
    return null;
  }
}

// 페이지 초기화
document.addEventListener("DOMContentLoaded", async function() {
  const keywords = getFromLocalStorage('selectedKeywords') || [];
  
  if (keywords.length === 0) {
    // 키워드가 없으면 홈으로 리다이렉트
    location.href = 'index.html';
    return;
  }
  
  // 키워드 표시
  updateResultKeywords(keywords);
  
  // 로딩 표시
  document.getElementById("loading-indicator").style.display = "flex";
  document.getElementById("analysis-results").style.display = "none";
  
  try {
    // API 요청 병렬 처리
    const [articleSummary, sentimentAnalysis] = await Promise.all([
      fetchArticleSummary(keywords[0]),
      fetchSentimentAnalysis(keywords[0])
    ]);
    
    // 결과 표시
    document.getElementById("loading-indicator").style.display = "none";
    document.getElementById("analysis-results").style.display = "flex";
    
    if (articleSummary) {
      generateArticleSummaries(articleSummary);
    }
    
    if (sentimentAnalysis) {
      updateSentimentAnalysis(sentimentAnalysis);
    }
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error);
    // 에러 처리
    document.getElementById("loading-indicator").style.display = "none";
    alert('데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
});

// 결과 키워드 업데이트
function updateResultKeywords(keywords) {
  const container = document.getElementById("result-keywords");
  container.innerHTML = "";
  
  keywords.forEach(keyword => {
    const tag = document.createElement("span");
    tag.className = "keyword tag";
    tag.textContent = `#${keyword}`;
    container.appendChild(tag);
  });
}

// 결과 생성
function generateResults(keywords) {
  // 기사 요약 생성
  generateArticleSummaries(keywords);
  
  // 여론 분석 업데이트
  updateSentimentAnalysis(keywords);
  
  // 인사이트 생성
  generateInsights(keywords);
}

// 기사 요약 생성
function generateArticleSummaries(articleData) {
  const container = document.getElementById("article-summaries");
  container.innerHTML = "";
  
  // 요약 내용 표시
  const summaryElement = document.createElement("div");
  summaryElement.className = "article";
  summaryElement.innerHTML = `
    <div class="article-header">
      <h3 class="article-title">${articleData.keyword} 관련 요약</h3>
    </div>
    <p class="article-summary">${articleData.summary}</p>
    <div class="article-meta">
      <span class="source">관련 기사 링크</span>
    </div>
    <div class="article-links">
      ${articleData.postUrl.split('\n').map(url => `
        <a href="${url}" class="article-link" target="_blank" rel="noopener noreferrer">
          ${url} ↗
        </a>
      `).join('<br>')}
    </div>
  `;
  container.appendChild(summaryElement);
}

// 여론 분석 업데이트
function updateSentimentAnalysis(sentimentData) {
  // "긍정: 15%, 중립: 40%, 부정: 45%" 형식의 문자열을 파싱
  const sentimentText = sentimentData.publicOpinion;
  const matches = sentimentText.match(/긍정: (\d+)%, 중립: (\d+)%, 부정: (\d+)%/);
  
  if (matches) {
    const positive = parseInt(matches[1]);
    const neutral = parseInt(matches[2]);
    const negative = parseInt(matches[3]);
    
    // 퍼센티지 업데이트
    document.querySelector(".sentiment-box.positive .percentage").textContent = `${positive}%`;
    document.querySelector(".sentiment-box.neutral .percentage").textContent = `${neutral}%`;
    document.querySelector(".sentiment-box.negative .percentage").textContent = `${negative}%`;
    
    // 차트 업데이트
    document.querySelector(".bar.positive").style.width = `${positive}%`;
    document.querySelector(".bar.positive").textContent = positive > 10 ? `${positive}%` : "";
    
    document.querySelector(".bar.neutral").style.width = `${neutral}%`;
    document.querySelector(".bar.neutral").textContent = neutral > 10 ? `${neutral}%` : "";
    
    document.querySelector(".bar.negative").style.width = `${negative}%`;
    document.querySelector(".bar.negative").textContent = negative > 10 ? `${negative}%` : "";
  }
}

// 인사이트 생성
function generateInsights(keywords) {
  const container = document.getElementById("key-insights");
  container.innerHTML = "";
  
  let allInsights = [];
  
  // 선택된 키워드에 대한 인사이트 수집
  keywords.forEach(keyword => {
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