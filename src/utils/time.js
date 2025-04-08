export function formatToMonthDayWeekday(dateString) {
  const date = new Date(dateString);

  const month = date.getMonth() + 1; // getMonth()는 0~11 반환
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];

  return `${month}.${day}(${weekday})`;
}

export function formatDateTime(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 1~12
  const day = String(date.getDate()).padStart(2, '0');

  let hours = date.getHours(); // 0~23
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const period = hours >= 12 ? '오후' : '오전';
  hours = hours % 12 || 12; // 12시간제로 변환, 0시는 12시로

  const formattedHour = String(hours).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${period} ${formattedHour}:${minutes}`;
}
