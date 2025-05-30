// 전역 변수
let selectedKeywords = [];

// 페이지 초기화
document.addEventListener("DOMContentLoaded", function() {
  initializeKeywords();
  updateAnalysisButton();
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
    if (selectedKeywords.length < 1) {
      selectedKeywords.push(keyword);
    } else {
      alert("키워드는 1개만 선택할 수 있습니다.");
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
    emptyMessage.textContent = "키워드를 1개 선택해주세요";
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

// 키워드 섹션으로 스크롤
function scrollToKeywords() {
  const element = document.getElementById("keyword-section");
  element.scrollIntoView({ behavior: "smooth" });
}

// 분석 시작
function startAnalysis() {
  if (selectedKeywords.length === 0) return;
  
  // 키워드를 로컬 스토리지에 저장
  saveToLocalStorage('selectedKeywords', selectedKeywords);
  
  // 분석 페이지로 이동
  location.href = 'analysis.html';
}