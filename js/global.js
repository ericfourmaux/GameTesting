var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
update();

function update() {
  requestAnimationFrame(update, canvas);
  if (goLeft && !goRight) {
    player.vx -= 1;
    player.friction = 1;
  }

  if (goRight && !goLeft) {
    player.vx += 1;
    player.friction = 1;
  }

  if (jump && player.isOnGround) {
    player.isOnGround = false;
    player.friction = 1;
    player.vy += player.jumpForce / .99999;
  }

  if (!goLeft && !goRight && !jump) {
    player.vx = 0;
    player.friction = 0.96;
    player.gravity = 1.3;
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
}
