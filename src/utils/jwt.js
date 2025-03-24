export function decodeJWT(token) {
  // JWT의 각 부분을 분리
  const [header, payload, signature] = token.split('.');

  // URL-safe Base64 디코딩 함수
  const base64UrlDecode = (str) => {
    // URL-safe Base64를 표준 Base64로 변환
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    // 패딩을 추가하여 Base64 디코딩이 가능하게 함
    const padding = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
    base64 += padding;
    return atob(base64); // Base64 디코딩
  };

  // 헤더와 페이로드 디코딩
  const decodedHeader = JSON.parse(base64UrlDecode(header));
  const decodedPayload = JSON.parse(base64UrlDecode(payload));

  // 결과 반환
  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature: signature, // 서명은 검증용이므로 디코딩만 가능
  };
}
