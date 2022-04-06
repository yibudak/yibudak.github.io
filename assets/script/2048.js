var cells = new Array,
    score = 0,
    highest_score = 0,
    empty_cells = new Array,
    last_move_location = -1,
    xStart = null,
    yStart = null;

function init() {
    new_game(), document.onkeydown = function (e) {
        move(e.keycode || e.which || e.char)
    };
    var e = document.getElementsByClassName("g-frame");
    if (e && e.length > 0) {
        var t = e[0];
        t.addEventListener("touchstart", touchStartHander, !1), t.addEventListener("touchmove", touchMoveHandler, !1)
    }
}

function new_game() {
    empty_cells = new Array;
    for (var e = 0; e < 4; e++) {
        cells[e] = new Array;
        for (var t = 0; t < 4; t++) cells[e][t] = 0, empty_cells.push(4 * e + t)
    }
    score = 0, generate_new_number(), generate_new_number(), paint()
}

function paint() {
    for (var e = 0; e < 4; e++)
        for (var t = 0; t < 4; t++) {
            var l = document.getElementById("r" + (e + 1) + "c" + (t + 1));
            0 != cells[e][t] ? l.innerText = cells[e][t] : l.innerText = ""
        }
    document.getElementById("score").innerText = score, document.getElementById("highest").innerText = highest_score
}

function generate_new_number() {
    if (0 == empty_cells.length) return !1;
    var e = Math.floor(Math.random() * empty_cells.length); - 1 != last_move_location && empty_cells[e] == last_move_location && (e = Math.floor(Math.random() * empty_cells.length));
    var t = 0 == Math.floor(10 * Math.random()),
        l = Math.floor(empty_cells[e] / 4),
        c = empty_cells[e] % 4;
    cells[l][c] = 1 == t ? 4 : 2, empty_cells.splice(e, 1)
}

function move(e) {
    switch (e) {
        case 37:
        case 38:
        case 39:
        case 40:
            if (!merge(e)) return;
            paint();
            break;
        default:
            return
    }
    check_empty(), generate_new_number(), paint()
}

function merge(e) {
    var t = !1,
        l = e < 39 ? 0 : 3,
        c = e < 39 ? 1 : -1;
    last_move_location = -1;
    for (var r = l; r < 4 && r > -1; r += c)
        for (var n = l; n < 4 && n > -1; n += c)
            if (38 != e && 40 != e || 0 == cells[n][r]) {
                if ((37 == e || 39 == e) && 0 != cells[r][n]) {
                    for (o = n + c; o < 4 && o > -1 && 0 == cells[r][o]; o += c);
                    o < 4 && o > -1 && o != n && cells[r][o] == cells[r][n] && (cells[r][n] *= 2, cells[r][o] = 0, score += cells[r][n], t = !0, last_move_location = 4 * r + o);
                    for (a = n - c; a < 4 && a > -1 && 0 == cells[r][a]; a -= c);
                    a + c != n && 0 == cells[r][a + c] && (cells[r][a + c] = cells[r][n], cells[r][n] = 0, t = !0, last_move_location = 4 * r + n)
                }
            } else {
                for (var o = n + c; o < 4 && o > -1 && 0 == cells[o][r]; o += c);
                o < 4 && o > -1 && o != n && cells[o][r] == cells[n][r] && (cells[n][r] *= 2, cells[o][r] = 0, score += cells[n][r], t = !0, last_move_location = 4 * o + r);
                for (var a = n - c; a < 4 && a > -1 && 0 == cells[a][r]; a -= c);
                a + c != n && 0 == cells[a + c][r] && (cells[a + c][r] = cells[n][r], cells[n][r] = 0, t = !0, last_move_location = 4 * n + r)
            } return highest_score = score > highest_score ? score : highest_score, t
}

function check_empty() {
    empty_cells = new Array;
    for (var e = 0; e < 4; e++)
        for (var t = 0; t < 4; t++) 0 == cells[e][t] && empty_cells.push(4 * e + t)
}

function touchStartHander(e) {
    e.preventDefault(), xStart = e.touches[0].clientX, yStart = e.touches[0].clientY
}

function touchMoveHandler(e) {
    if (xStart && yStart) {
        e.preventDefault();
        var t = e.touches[0].clientX,
            l = e.touches[0].clientY,
            c = t - xStart,
            r = l - yStart;
        Math.abs(c) > Math.abs(r) ? move(c > 0 ? 39 : 37) : move(r > 0 ? 40 : 38), xStart = yStart = null
    }
}