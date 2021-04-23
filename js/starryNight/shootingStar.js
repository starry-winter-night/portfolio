import * as starFunc from "./starFunction.js";

export default class ShootingStarBuilder {
  starSize(size) {
    this.starSize = size;
    return this;
  }

  build(canvas) {
    return new ShootingStar(canvas, this.starSize);
  }
}

class ShootingStar {
  constructor(canvas, starSize) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.starSize = starSize;

    this.shootingStar = null;

    this._init();
  }

  _init() {
    this._createShootingStar();
    this._restartShootingStar();
  }

  _createShootingStar() {
    const shootingStar = {
      x: this.canvas.width * Math.random(),
      y: 0,
      vx: Math.random() * 12,
      vy: (Math.random() + 0.3) * 5,
      r: starFunc.randomShootingStarSize(this.starSize),
      s: 0,
      e: Math.PI * 2,
      c: starFunc.randomStarColor(),
    };

    this.shootingStar = shootingStar;
  }

  _drawShootingStar() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.shootingStar.x,
      this.shootingStar.y,
      this.shootingStar.r,
      0,
      Math.PI * 2
    );
    this.ctx.closePath();
    this.ctx.fillStyle = this.shootingStar.c;
    this.ctx.fill();
  }

  _moveShootingStar() {
    const vx = Math.floor(this.shootingStar.vx);

    if (vx % 2 == 0) {
      // 좌로 이동
      this.shootingStar.x -= this.shootingStar.vx;
    } else {
      // 우로 이동
      this.shootingStar.x += this.shootingStar.vx;
    }
    // 낙하 속도
    this.shootingStar.y += this.shootingStar.vy;
  }

  _restartShootingStar = () => {
    this._drawShootingStar();
    this._moveShootingStar();

    if (
      this.shootingStar.x < 0 ||
      this.shootingStar.x > this.canvas.width ||
      this.shootingStar.y > this.canvas.height
    ) {
      this._createShootingStar();
    }

    requestAnimationFrame(this._restartShootingStar);
  };
}
