var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
update();



function update() {
  requestAnimationFrame(update, canvas);
  if (goLeft && !goRight) {
    player.vx -= 1;
    player.friction = .9;
  }

  if (goRight && !goLeft) {
    player.vx += 1;
    player.friction = .9;
  }

  if (jump && player.isOnGround) {
    player.isOnGround = false;
    player.friction = 7;
    player.vy -= player.gravity * player.friction;
  }

  if (!goLeft && !goRight && !jump) {
    player.vx = 0;
    player.friction = 0.96;
    player.gravity = 1.3;
  }

  if (fire) {
    //bullet.x = player.x + (player.w + 1);
    //bullet.y = player.y + (player.h / 3);
    //bullet.x += bullet.vx;
    bullet.id ++;
    bulletArr.push(bullet);
    bullet.hasFired = true;

    //console.log(bullet.hasFired);
    //fireBullet();
  }

/*
  if (!fire) {
    bullet.hasFired = false;
  }
*/

  player.x += player.vx;
  player.y += player.vy;
  player.vy += player.gravity;
  //bullet.hasFired = false;

  if (player.isOnGround) {
    player.vx *= player.friction;
  }

  if (player.y + player.h > 225) {  //225 = Hauteur du sol
    player.y = 225 - player.h;
    player.isOnGround = true;
    player.vy -= player.gravity;
  }



document.getElementById("stats").innerHTML = "player.vx: " + Math.floor(player.vx) + " - " +
                                             "player.vy: " + Math.floor(player.vy) + " - " +
                                             "bullet : " + bullet.hasFired;


  render();
  //if (bullet.hasFired == true) { renderBullet(); }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Display ground
  ctx.beginPath();
  ctx.strokeStyle = "#d3d3d3";
  ctx.moveTo(0, 225);
  ctx.lineTo(canvas.width, 225);
  ctx.stroke();

  //Display player
    ctx.fillRect(player.x, player.y, player.w, player.h);

  //Display bullet
  /*
  if (bullet.hasFired) {
    ctx.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);
    do {
      bullet.x += bullet.vx;
      bullet.vx += 4;
    }
    while (bullet.x < canvas.width);
    bullet.hasFired = false;
  }
  */
  bullet.x = player.x + (player.w + 1);
  bullet.y = player.y + (player.h / 3);
  bullet.vx += 4;

if (bullet.hasFired) {

    while (bullet.x < canvas.width) {
      ctx.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);
      bullet.x += bullet.vx;
      if (bullet.vx > 5) { bullet.vx = 5; }
      ctx.fillRect(bullet.x, bullet.y, 0, 0);
      console.log("bullet.x: " + bullet.x);
      console.log("bullet.vx: " + bullet.vx);
    }

    if (bullet.x >= canvas.width) {
      delete bullet;
      bulletArr.slice(bullet,1);
      bullet.hasFired = false;
    }
  }
}

function renderBullet() {



}
