// 공통 데이터
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