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
    bullet.x = player.x + (player.w + 1);
    bullet.y = player.y + (player.h / 3);
    bullet.hasFired = true;
    //console.log(bullet.hasFired);
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
  if (bullet.hasFired == true) {
      var shot = bullet.x + bullet.vx;
      bullet.vx += 4;

      ctx.fillRect(shot, bullet.y, bullet.w, bullet.h);
      if (shot >= canvas.width) {
        delete bullet;
      }

  }

}
