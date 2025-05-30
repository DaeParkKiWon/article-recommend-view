// 공통 데이터
const POPULAR_KEYWORDS = [
  "대선 사전투표",
  "이준석 발언 파문",
  "김문수와 이재명의 유세",
  "상호관세 부과 일시 복원",
  "해군 초계기 추락 사고",
  "경제 성장률 전망",
  "기준금리 인하 가능성",
  "투표 용지 관리 부실 사고",
  "대선 후보들의 막판 유세",
  "트럼프 대통령의 상호관세 관련 법적 논란"
];

// 샘플 데이터
const MOCK_DATA = {
  "대선 사전투표": {
    articles: [
      {
        id: 1,
        title: "대선 사전투표율 역대 최고 기록",
        source: "정치 뉴스",
        date: "2024-03-28",
        summary: "이번 대선 사전투표율이 역대 최고를 기록하며 투표 참여 열기가 뜨겁습니다. 특히 20-30대의 높은 참여율이 주목받고 있습니다.",
        url: "https://example.com/article1",
      }
    ],
    sentiment: {
      positive: 60,
      neutral: 30,
      negative: 10,
    },
    insights: [
      {
        text: "20-30대의 높은 투표 참여율이 특징적입니다.",
        url: "https://example.com/insight1"
      },
      {
        text: "전반적으로 투표 참여에 대한 긍정적인 여론이 형성되어 있습니다.",
        url: "https://example.com/insight2"
      }
    ],
  },
  "이준석 발언 파문": {
    articles: [
      {
        id: 2,
        title: "이준석 발언 파문, 정치권 반응 엇갈려",
        source: "정치 일보",
        date: "2024-03-27",
        summary: "이준석의 발언에 대해 여야의 반응이 엇갈리고 있습니다. 일부에서는 정치적 발언이라고 비판하는 반면, 다른 측에서는 진실을 말했다고 지지하고 있습니다.",
        url: "https://example.com/article2",
      }
    ],
    sentiment: {
      positive: 30,
      neutral: 40,
      negative: 30,
    },
    insights: [
      {
        text: "여야의 반응이 극명하게 나뉘고 있습니다.",
        url: "https://example.com/insight3"
      },
      {
        text: "발언의 정치적 영향력이 커지고 있습니다.",
        url: "https://example.com/insight4"
      }
    ],
  }
};

// 로컬 스토리지 유틸리티
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// URL 파라미터 유틸리티
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function setUrlParameter(name, value) {
  const url = new URL(window.location);
  url.searchParams.set(name, value);
  window.history.pushState({}, '', url);
}