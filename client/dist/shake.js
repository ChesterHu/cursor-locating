var trace_x = [];
var trace_y = [];
var trace_t = [];
var i = 0;
var secs = 0
function mouse_move_handler(e) {
    var e = window.event;
    var secs_new = new Date().getTime();
    if (Math.abs(secs_new - secs) > 100) {
        trace_x.push(e.clientX);
        trace_y.push(e.clientY);
        trace_t.push(secs_new);
    }

    var last_sec_x = [];
    var last_sec_y = [];

    for (i = trace_t.length - 20; i < trace_t.length; i++) {
        if (trace_t[i] > secs_new - 1500) {
            last_sec_x.push(trace_x[i]);
            last_sec_y.push(trace_y[i]);
        }
    }

    var z = zigzag(last_sec_x, last_sec_y);
    if (z > 2) {
        alert("Haha");
    }

    i = e.clientX + ", " + e.clientY + secs;
    var x = [0, 1, 2, 1, 0, 1, 0, 1, 0, 1];
    var y = [0, 1, 2, 1, 0, 1, 0, 1, 0, 1];
    var z1 =zigzag(x, y);
    document.querySelector("body").textContent = "zigzag" + z;
    console.log(last_sec_x);
    console.log(last_sec_y);
}

function zigzag(xs, ys) {
    var dx = [];
    var dy = [];
    for (i = 0; i < xs.length - 1; i++) {
        dx.push(xs[i + 1] - xs[i]);
        dy.push(ys[i + 1] - ys[i]);
    }
    inner_prod = new Array(dx.length);
    for (var i = 0; i < inner_prod.length; i++) {
        inner_prod[i] = new Array(dx.length);
    }

    for (i = 0; i < dx.length; i++) {
        for (j = 0; j < dx.length; j++) {
            inner_prod[i][j] = dx[i] * dx[j] + dy[i] * dy[j];
        }
    }
    var DP = new Array(dx.length);
    DP[0] = 0;
    for (var i = 1; i < dx.length; i++) {
        for (var j = 0; j < i; j++) {
            var max = 0;
            if (inner_prod[i][j] < -1) {
                max = DP[j] + 1;
            } else {
                max = DP[j];
            }
            DP[i] = max;
        }
    }
    return DP[dx.length-1];
}

document.querySelector("body").textContent = "hello" + i;
document.querySelector("html").onmousemove = mouse_move_handler;