let offset = 20,
    gf = game_field.getBoundingClientRect(),
    b = ball.getBoundingClientRect(), 
    ooo = gf.x - offset, 
    gfcx = gf.x + (gf.width * 0.5) - ooo, 
    currentGoalie = '',
    goalie = [
        'below_L.png', 
        'upper_L.png',
        'center.png',
        'upper_R.png',
        'below_R.png'
    ];

svg.setAttribute('viewBox', '0 0 ' + gf.width + ' ' + gf.height);

function grabClick(e) {
    let x = e.clientX,
        y = e.clientY,
        el = document.elementFromPoint(x, y),
        el_num = el.getAttribute('box'),
        g = Math.floor(Math.random() * 5),
        o = game_field.getBoundingClientRect(),
        hit = true;

    if (hit) {
        // Character clicked; dynamically change goalkeeper image
        if (el.getAttribute('box') == 0) {
            currentGoalie = 'below_L.png';
        } else if (el.getAttribute('box') == 1) {
            currentGoalie = 'upper_L.png';
        } else if (el.getAttribute('box') == 2) {
            currentGoalie = 'center.png';
        } else if (el.getAttribute('box') == 3) {
            currentGoalie = 'upper_R.png';
        } else if (el.getAttribute('box') == 4) {
            currentGoalie = 'below_R.png';
        } else if (el.id == 'goal') {
            currentGoalie = 'Goal_Keeper_default.png';
        }
    } else {
        currentGoalie = goalie[g];
    }

    // Animate the ball kicking towards the goal
    ball.className = 'kicked';
    let kick = setInterval(function() {
        let c = circle.getBoundingClientRect(),
            cx = c.x,
            cy = c.y;
        ball.style.left = cx - ooo - offset + 'px';
        ball.style.top = (cy - offset) + 'px';

        setTimeout(function() {
            clearInterval(kick);

            let c = circle.getBoundingClientRect(),
                cx = c.x,
                cy = c.y;

            let score = document.elementFromPoint(cx, cy);
            if (score.getAttribute('box') != el_num) {
                ball.className = 'goal';
                success.className = 'show_result';
            } else {
                ball.className = 'fall';
                failure.className = 'show_result';
            }
        }, 1000);
    }, 1000 / 30);

    // Update the goalkeeper image with a different expression
    setTimeout(function() {
        goal.style.background = 'url(' + currentGoalie + ')';
        goal.style.animation = 'none'; // Disables any previous animation
    }, 200);

    // Reset the field and goalkeeper animation after 4 seconds
    setTimeout(function() {
        goal.style.background = '';
        ball.style.left = '';
        ball.style.top = '';
        ball.style.setProperty('--ani', '');
        ball.className = '';
        success.className = '';
        failure.className = '';
        goal.style.animation = 'shake .25s linear infinite'; // Re-enable shake animation
    }, 4000);
}

// Ball movement logic on mousemove
goal.addEventListener('mousemove', function(e) {
    let x = e.clientX - ooo - offset,
        y = e.clientY;

    path.setAttribute('d', 'M ' + (b.x - ooo) + ' ' + (b.y + offset) + ' C ' + gfcx + ' 250, ' + gfcx + ' 150, ' + x + ' ' + y);
    bally.setAttribute('path', 'M ' + (b.x - ooo) + ' ' + (b.y + offset) + ' C ' + gfcx + ' 250, ' + gfcx + ' 150, ' + x + ' ' + y);
});

// Click event to trigger the grabClick function
goal.addEventListener('click', grabClick);
