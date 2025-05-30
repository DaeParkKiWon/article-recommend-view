// API 엔드포인트 설정
const API_CONFIG = {
  BASE_URL: 'https://daepark.agong.store', // 백엔드 서버 URL
  ENDPOINTS: {
    ARTICLE_SUMMARY: '/api/summaries',
    SENTIMENT_ANALYSIS: '/api/summaries', // 동일한 엔드포인트 사용
    KEYWORDS: '/keywords/today'  // 키워드 API 엔드포인트 수정
  }
};

// API URL 생성 함수
function getApiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}

// API 엔드포인트 URL
const API_URLS = {
  ARTICLE_SUMMARY: getApiUrl(API_CONFIG.ENDPOINTS.ARTICLE_SUMMARY),
  SENTIMENT_ANALYSIS: getApiUrl(API_CONFIG.ENDPOINTS.SENTIMENT_ANALYSIS),
  KEYWORDS: getApiUrl(API_CONFIG.ENDPOINTS.KEYWORDS)
}; 