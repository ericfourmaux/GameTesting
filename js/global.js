var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

var bulletArr = [];

update();



function update() {
  requestAnimationFrame(update, canvas);
  if (goLeft && !goRight) {
    player.vx -= 1;
    player.friction = .8;
  }

  if (goRight && !goLeft) {
    player.vx += 1;
    player.friction = .8;
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
    bullet.id ++;
    bullet.hasFired = true;
    bullet.x = player.x + (player.w + 1);
    bullet.y = player.y + (player.h / 3);
    bullet.vx = 0;
    console.log(bullet);
    bulletArr.push(bullet);
  }

  if (!fire) {
    bullet.hasFired = false;
  }

  player.x += player.vx;
  player.y += player.vy;
  player.vy += player.gravity;

  if (player.isOnGround) {
    player.vx *= player.friction;
  }

  if (player.y + player.h > 225) {  //225 = Hauteur du sol
    player.y = 225 - player.h;
    player.isOnGround = true;
    player.vy -= player.gravity;
  }

  document.getElementById("stats").innerHTML = "Shot: " + bullet.hasFired;

  render();
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
  if (bullet.hasFired = true) {
    for (var i=1; i < bulletArr.length; i++) {
      bulletArr[i].vx += 2;
      ctx.fillRect(bulletArr[i].x + bulletArr[i].vx, bulletArr[i].y, bulletArr[i].w, bulletArr[i].h);
      if (bulletArr[i].vx > canvas.width) {
        console.log("bullet is OUT!");
        bulletArr.splice(bulletArr[i], 1);
      }
    }
  }

}
