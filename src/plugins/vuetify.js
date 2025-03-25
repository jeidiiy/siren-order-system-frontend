import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#F5F5F5',            // 부드러운 연한 회색, 따뜻하고 자연스러운 느낌
    surface: '#FFFFFF',              // 기본 배경색 (화이트)
    'surface-bright': '#FFFFFF',     // 밝은 표면 색
    'surface-light': '#E6E6E6',      // 연한 회색 (부드럽고 편안한 느낌)
    'surface-variant': '#D2B48C',    // 부드러운 갈색 (커피 느낌)
    'on-surface-variant': '#8B4513', // 진한 갈색 (커피 색)
    primary: '#00704A',              // 스타벅스 초록색 (주 색상)
    'primary-darken-1': '#006140',   // 초록색 어두운 톤
    secondary: '#8B4513',            // 진한 갈색 (보조 색상)
    'secondary-darken-1': '#6A3E2A',  // 어두운 갈색
    error: '#D32F2F',                // 강렬한 빨간색 (에러 메시지)
    info: '#1976D2',                 // 파란색 (정보 메시지)
    success: '#388E3C',              // 신선한 녹색 (성공 메시지)
    warning: '#FF9800',              // 따뜻한 주황색 (경고 메시지)
  },
  variables: {
    'border-color': '#8B4513',           // 진한 갈색 (커피 색으로 고급스러움)
    'border-opacity': 0.12,              // 테두리의 불투명도
    'high-emphasis-opacity': 0.87,       // 강조된 텍스트의 불투명도
    'medium-emphasis-opacity': 0.60,     // 중간 강조 텍스트의 불투명도
    'disabled-opacity': 0.38,            // 비활성화된 요소의 불투명도
    'idle-opacity': 0.04,                // 유휴 상태에서의 불투명도
    'hover-opacity': 0.04,               // 마우스 오버 상태에서의 불투명도
    'focus-opacity': 0.12,               // 포커스 상태에서의 불투명도
    'selected-opacity': 0.08,            // 선택된 상태에서의 불투명도
    'activated-opacity': 0.12,           // 활성화된 상태에서의 불투명도
    'pressed-opacity': 0.12,             // 눌린 상태에서의 불투명도
    'dragged-opacity': 0.08,             // 드래그된 상태에서의 불투명도
    'theme-kbd': '#212529',              // 키보드 배경색
    'theme-on-kbd': '#FFFFFF',           // 키보드 텍스트 색상
    'theme-code': '#F5F5F5',             // 코드 배경색
    'theme-on-code': '#000000',          // 코드 텍스트 색상
  }
}
const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#121212',            // 어두운 배경 (다크 모드에서 편안함)
    surface: '#1E1E1E',               // 어두운 표면 색상
    'surface-bright': '#333333',      // 밝은 어두운 표면 색상
    'surface-light': '#444444',       // 연한 회색 (부드러운 다크 톤)
    'surface-variant': '#424242',     // 어두운 갈색 느낌의 표면
    'on-surface-variant': '#FFFFFF',  // 밝은 텍스트 색상
    primary: '#00704A',               // 스타벅스 초록색 (주 색상)
    'primary-darken-1': '#006140',    // 어두운 초록색
    secondary: '#8B4513',             // 진한 갈색 (보조 색상)
    'secondary-darken-1': '#6A3E2A',  // 어두운 갈색
    error: '#D32F2F',                 // 강렬한 빨간색 (에러 메시지)
    info: '#1976D2',                  // 파란색 (정보 메시지)
    success: '#388E3C',               // 신선한 녹색 (성공 메시지)
    warning: '#FF9800',               // 따뜻한 주황색 (경고 메시지)
  },
  variables: {
    'border-color': '#8B4513',           // 진한 갈색 (커피 색상)
    'border-opacity': 0.12,              // 테두리의 불투명도
    'high-emphasis-opacity': 0.87,       // 강조된 텍스트의 불투명도
    'medium-emphasis-opacity': 0.60,     // 중간 강조 텍스트의 불투명도
    'disabled-opacity': 0.38,            // 비활성화된 요소의 불투명도
    'idle-opacity': 0.04,                // 유휴 상태에서의 불투명도
    'hover-opacity': 0.04,               // 마우스 오버 상태에서의 불투명도
    'focus-opacity': 0.12,               // 포커스 상태에서의 불투명도
    'selected-opacity': 0.08,            // 선택된 상태에서의 불투명도
    'activated-opacity': 0.12,           // 활성화된 상태에서의 불투명도
    'pressed-opacity': 0.12,             // 눌린 상태에서의 불투명도
    'dragged-opacity': 0.08,             // 드래그된 상태에서의 불투명도
    'theme-kbd': '#212529',              // 키보드 배경색
    'theme-on-kbd': '#FFFFFF',           // 키보드 텍스트 색상
    'theme-code': '#F5F5F5',             // 코드 배경색
    'theme-on-code': '#000000',          // 코드 텍스트 색상
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme
    },
  },
})
