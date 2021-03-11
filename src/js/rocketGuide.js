rocketGuide();
function rocketGuide() {
  let prevScrollHeight = 0; // 스크롤시 0부터 시작.
  const rocketImg = document.querySelector(".navbar__rocket");
  const travelRoad = document.querySelector(".navbar__guide");
  const earthImg = document.querySelector(".navbar__earth");
  const marsImg = document.querySelector(".navbar__mars");
  document.addEventListener("scroll", optimization(initRocketGuide), false);

  function initRocketGuide() {
    const travelRoadWidth = travelRoad.clientWidth;
    const scrollHeight = window.pageYOffset;
    const pageTotalHeight = document.documentElement.scrollHeight;
    const currentViewHeight = window.innerHeight;

    render();
    updatePrevScrollHeight();

    function render() {
      rocketImg.style.left = `${
        calcRocketTravelDistance() + earthImg.clientWidth
      }px`;
      rocketImg.style.transform = rocektRotate();
    }
    function rocektRotate() {
      return scrollHeight > prevScrollHeight
        ? "rotate(0deg)"
        : "rotate(180deg)";
    }
    function calcScrollTopMaximum() {
      return pageTotalHeight - currentViewHeight;
    }
    function calcHeightValuePercent() {
      return Math.floor((scrollHeight / calcScrollTopMaximum()) * 100);
    }
    function calcOnePercentWidthPixel() {
      return (
        (travelRoadWidth -
          (rocketImg.clientWidth +
            earthImg.clientWidth +
            marsImg.clientWidth)) /
        100
      );
    }
    function calcRocketTravelDistance() {
      return calcOnePercentWidthPixel() * calcHeightValuePercent();
    }
    function updatePrevScrollHeight() {
      prevScrollHeight = scrollHeight <= 0 ? 0 : scrollHeight;
    }
  }

  // 최적화
  function optimization(callback) {
    let ticking = null;
    return function () {
      if (ticking) {
        window.cancelAnimationFrame(ticking);
      }
      ticking = window.requestAnimationFrame(() => {
        callback();
      });
    };
  }
}
