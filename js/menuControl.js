(() => {
  moveMenuSection();
  showMobileMenuBar();
  highlightMenuList();

  function moveMenuSection() {
    const menu = document.querySelector(".aside__menu");
    menu.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const firstMenuId = menu.children[0].dataset.id;
      if (!id) {
        return;
      }
      id === firstMenuId ? moveScrollHome() : moveScrollMenu(id);
    });

    function moveScrollMenu(id) {
      const selector = document.querySelector(id);
      selector.scrollIntoView({ behavior: "smooth" });
    }

    function moveScrollHome() {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }

  function showMobileMenuBar() {
    const btn = document.querySelector(".aside__menu__btn");
    const icon = document.querySelector(".aside__menu__btn i");
    const aside = document.querySelector(".aside");
    const menu = document.querySelector(".aside__menu");

    document.addEventListener("click", (e) => {
      if (btn === e.target || icon === e.target) {
        aside.classList.toggle("active");
        menu.classList.toggle("active");
      } else if (menu === e.target || e.target.dataset.id) {
        aside.classList.add("active");
        menu.classList.add("active");
      } else {
        aside.classList.remove("active");
        menu.classList.remove("active");
      }
    });
  }

  function highlightMenuList() {
    const sections = document.querySelectorAll(".section");

    const callback = (entries, observer) => {
      // 화면 밖으로 나갔을 경우와 load와 동시에 이미 화면 밖에 있는 Ratio 0인 경우가 아닌 경우.
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
          changeMenuItemClass(
            document.querySelector(`[data-id="#${entry.target.id}"]`),
            entry.boundingClientRect.y
          );
          // 현재 위치 클래스 체크 후 수정
        } else if (entry.isIntersecting && entry.intersectionRatio > 0) {
          changeMenuItemClass(
            document.querySelector(`[data-id="#${entry.target.id}"]`)
          );
        }
      });
    };

    const REQUEST_TRESHOLD = 0.26;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: getThresholdMinimumNumber(sections, REQUEST_TRESHOLD),
    };
    let observer = new IntersectionObserver(callback, options);
    sections.forEach((dom) => observer.observe(dom));

    function removeMenuItemClass() {
      const view = document.querySelector(".aside_menu_item.view");
      if (view) view.classList.remove("view");
    }
    function addMenuItemClass(dom, y) {
      // scroll down인 경우
      if (y < 0) {
        dom.nextElementSibling.classList.add("view");
        // scroll up인 경우
      } else if (y > 0) {
        dom.previousElementSibling.classList.add("view");
        // 새로고침인 경우
      } else {
        dom.classList.add("view");
      }
    }

    function changeMenuItemClass(dom, y) {
      removeMenuItemClass();
      addMenuItemClass(dom, y);
    }

    /*  안전 장치  */
    function getThresholdMinimumNumber(section, threshold) {
      /* 
        지정한 rect의 높이의 %가 채워지면 옵저버가 가동한다. 
        주의할 점은 threshold로 지정한 %만큼의 rect 높이가 root로 지정한 부모 rect(default: viewport)의 
        높이 보다 높다면 옵저버가 가동되지 않는다.
        즉, 옵저버거 rect를 놓치지 않게 최소 인식 가능한 threshold 비율을 구해야 한다. 
      */
      const browserHeight = window.innerHeight;
      const highestSectionHeight = Array.from(section)
        .map((dom) => dom.getBoundingClientRect().height)
        .sort((a, b) => b - a)[0];
      const minimumThreshold = browserHeight / highestSectionHeight;
      return minimumThreshold < threshold
        ? minimumThreshold.toFixed(2) - 0.03
        : threshold;
    }
  }

  // function highlightMenuList() {
  //   const navbar = document.querySelector(".navbar");
  //   const navbarHeight = navbar.getBoundingClientRect().height;
  //   const section = document.querySelectorAll(".section");
  //   let sectionData = null;
  //   let ticking = false;
  //   let scrollHeight = window.pageYOffset;
  //   decideDefaultHighlightMenu(section[0].id, section[section.length - 1].id);

  //   function decideDefaultHighlightMenu(firstSectionId, lastSectionId) {
  //     if (scrollHeight === 0) {
  //       changeMenuClass(firstSectionId);
  //     } else if (
  //       scrollHeight + window.innerHeight ===
  //       document.documentElement.scrollHeight
  //     ) {
  //       changeMenuClass(lastSectionId);
  //     }
  //   }

  //   function changeMenuClass(id) {
  //     const dom = document.querySelector(`[data-id="#${id}"]`);
  //     const items = document.querySelector(".view");
  //     if (items && dom !== items) {
  //       items.classList.remove("view");
  //     }
  //     dom.classList.add("view");
  //   }

  //   function createArrSectionData(section, navHeight) {
  //     //유사배열을 실제배열로 변경
  //     const arrSection = Array.from(section);
  //     return arrSection.map((dom, i) => {
  //       if (i === 0) {
  //         return {
  //           height: dom.scrollHeight + navHeight,
  //           id: dom.id,
  //         };
  //       } else {
  //         return { height: dom.scrollHeight, id: dom.id };
  //       }
  //     });
  //   }

  //   function processSectionScrollEvent() {
  //     let prevSectionHeight = 0;
  //     let progressHeight = 0;
  //     for (let i = 0; i < sectionData.length; i++) {
  //       const currentSectionHeight = sectionData[i].height;
  //       const currentSectionId = sectionData[i].id;
  //       // 첫번째 섹션인 경우
  //       if (i === 0) {
  //         changeMenuClass(currentSectionId);
  //       } else {
  //         // 현재 누적 진행 높이보다 스크롤 높이가 높은 경우
  //         if (progressHeight <= scrollHeight) {
  //           changeMenuClass(currentSectionId);
  //         }
  //       }
  //       progressHeight =
  //       progressHeight + prevSectionHeight / 2 + currentSectionHeight / 2;
  //       prevSectionHeight = currentSectionHeight;
  //     }
  //     ticking = false;
  //   }

  //   document.addEventListener("scroll", (e) => {
  //     scrollHeight = window.pageYOffset;
  //     sectionData = createArrSectionData(section, navbarHeight);
  //     processSectionScrollEvent();
  //   }, false);
  // }
})();
