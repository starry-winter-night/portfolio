// 모바일 브라우저 주소창 안보이게 하기
(function () {
  function hideAddressBar() {
    if (document.height <= window.outerHeight) return; // 웹페이지의 높이가 화면높이보다 작을 때는 실행할 필요가 없으므로 종료

    var scrollTimer = setInterval(function () {
      if (!pageYOffset) {
        // 모바일 브라우저에서 주소창이 보이고 있을 때는 pageYOffset = 0 이므로 이때만 실행
        scrollTo(0, 1); // 웹페이지를 x축 0, y축 1의 위치로 끌어올림
      } else {
        clearInterval(scrollTimer); // pageYOffset !=0 인 경우 반복 종료: scrollTo(0, 1) 이 실행되었거나 사용자가 스크롤을 움직인 경우
      }
    }, 100); // 100 밀리세컨드마다 반복 실행
  }

  window.addEventListener("load", hideAddressBar, false); // 페이지 로드 되었을 때 실행
  window.addEventListener("orientationchange", hideAddressBar, false); // 화면이 가로/세로 전환되었을 때 실행
})(); // 페이지 내 다른 자바스크립트 코드에 영향을 주거나 받지 않도록 self executed anonymous function 형태로 만듬
