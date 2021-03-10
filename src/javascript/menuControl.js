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
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar.getBoundingClientRect().height;
    const section = document.querySelectorAll(".section");
    let sectionData = null;
    let ticking = false;
    let scrollHeight = window.pageYOffset;
    decideDefaultHighlightMenu(section[0].id, section[section.length - 1].id);

    function decideDefaultHighlightMenu(firstSectionId, lastSectionId) {
      if (scrollHeight === 0) {
        changeMenuClass(firstSectionId);
      } else if (
        scrollHeight + window.innerHeight ===
        document.documentElement.scrollHeight
      ) {
        changeMenuClass(lastSectionId);
      }
    }

    function changeMenuClass(id) {
      const dom = document.querySelector(`[data-id="#${id}"]`);
      const items = document.querySelector(".view");
      if (items && dom !== items) {
        items.classList.remove("view");
      }
      dom.classList.add("view");
    }

    function createArrSectionData(section, navHeight) {
      //유사배열을 실제배열로 변경
      const arrSection = Array.from(section);
      return arrSection.map((dom, i) => {
        if (i === 0) {
          return {
            height: dom.scrollHeight + navHeight,
            id: dom.id,
          };
        } else {
          return { height: dom.scrollHeight, id: dom.id };
        }
      });
    }

    function processSectionScrollEvent() {
      let prevSectionHeight = 0;
      let progressHeight = 0;
      for (let i = 0; i < sectionData.length; i++) {
        const currentSectionHeight = sectionData[i].height;
        const currentSectionId = sectionData[i].id;
        // 첫번째 섹션인 경우
        if (i === 0) {
          changeMenuClass(currentSectionId);
          progressHeight = currentSectionHeight / 2;
        } else {
          // 현재 누적 진행 높이보다 스크롤 높이가 높은 경우
          if (progressHeight <= scrollHeight) {
            changeMenuClass(currentSectionId);
            progressHeight =
              progressHeight + prevSectionHeight / 2 + currentSectionHeight / 2;
          }
        }
        prevSectionHeight = currentSectionHeight;
      }
      ticking = false;
    }

  

    document.addEventListener("scroll", (e) => {
      scrollHeight = window.pageYOffset;
      sectionData = createArrSectionData(section, navbarHeight);
      processSectionScrollEvent();
    }, false);
  }
})();
