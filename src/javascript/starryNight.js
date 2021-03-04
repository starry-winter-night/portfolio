(() => {
  initStarryNight();

  function initStarryNight() {
    const backgroundColor = "rgba(2, 2, 14, 0.3)";
    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvas = document.querySelector("#starryNightCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    let milkyWay = [];
    let shootingStar = null;

    createMilkyWayStar();
    shootingStar = createShootingStar();
    renderStarryNight();

    function setMilkyWayStarCount() {
      return canvas.width / 3;
    }
    function createMilkyWayStar() {
      for (i = 0; i < setMilkyWayStarCount(); i++) {
        const star = {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2,
          o: Math.random(),
          c: `${changeRandomStarColor()}`,
        };
        milkyWay.push(star);
      }
    }
    function drawMilkyWay() {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      milkyWay.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 3, true);
        ctx.fillStyle = `${star.c}, ${Math.random()})`;
        ctx.fill();
      });
    }

    function createShootingStar() {
      const star = {
        x: canvas.width * Math.random(),
        y: 0,
        vx: Math.random() * 12,
        vy: (Math.random() + 0.3) * 12,
        r: Math.random() + 1.3,
        color: changeRandomStarColor(),
      };
      return star;
    }
    function drawShootingStar() {
      ctx.beginPath();
      ctx.arc(
        shootingStar.x,
        shootingStar.y,
        shootingStar.r,
        0,
        Math.PI * 2,
        true
      );
      ctx.closePath();
      ctx.fillStyle = shootingStar.color;
      ctx.fill();
      const fallingHeight = directShootingStar();
      if (
        shootingStar.x < 0 ||
        shootingStar.x > width ||
        fallingHeight > height
      ) {
        shootingStar = createShootingStar();
      }
    }
    function changeRandomStarColor() {
      const number = Math.floor((Math.random() + 0.3) * 12);
      // ornage
      if (number === 3) return "rgba(255,127,80";
      // gold
      else if (number === 4) return "rgba(255,215,0";
      // purple
      else if (number === 5) return "rgba(128,0,128";
      // green
      else if (number === 6) return "rgba(2,154,60";
      // white
      else return "rgba(255,255,255";
    }
    
    function directShootingStar() {
      const data = Math.floor(shootingStar.vx);
      if (data % 2 == 0) {
        // 좌로 낙하
        shootingStar.x -= shootingStar.vx;
      } else {
        // 우로 낙하
        shootingStar.x += shootingStar.vx;
      }
      // 낙하 속도
      shootingStar.y += shootingStar.vy;
      return shootingStar.y;
    }

    function renderStarryNight() {
      drawMilkyWay();
      drawShootingStar();
      requestAnimationFrame(renderStarryNight);
    }
  }
})();
