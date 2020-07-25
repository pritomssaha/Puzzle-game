var puzzle = document.getElementById('puzzle');
var win = document.getElementById('win');
var count = 0;

var a = ["pics/p1.jpg", "pics/p2.jpg", "pics/p3.jpg",
        "pics/p4.jpg", "pics/p5.jpg", "pics/p6.jpg",
        "pics/p7.jpg", "pics/p8.jpg", "pics/p9.jpg"
    ]
    .map((x, i) => [x, i, Math.random()])
    .sort((a, b) => a[2] - b[2])

for (let i = 0; i < a.length; i++) {
    let pic = document.createElement('img');
    pic.src = a[i][0];
    pic.place = a[i][1];
    pic.clicked = false;
    puzzle.appendChild(pic);

}

var step = 1;
var p1, p2;

document.addEventListener('click', function(e) {
    switch (step) {
        case 1:
            if (e.target.tagName == 'IMG' && !e.target.clicked) {
                e.target.className = 'select';
                e.clicked = true;
                p1 = e.target;
                step = 2;
            }
            break;
        case 2:
            if (e.target.tagName == 'IMG' && !e.target.clicked) {
                e.target.className = 'select';
                e.clicked = true;
                p2 = e.target;
                step = 3;
            }
            break;
        case 3:
            let place = p2.place;
            let src = p2.src;
            p2.place = p1.place;
            p2.src = p1.src;
            p1.place = place;
            p1.src = src;
            p1.className = p2.className = "";
            step = 1;
            count++;
            if (isWin()) {
                win.textContent = `Congratulation! You complete the puzzle in ${count} moves`;
                console.log(count);
                step = 4;
            }
            break;
    }
})

function isWin() {
    let pics = document.getElementsByTagName('img');
    for (let i = 0; i < pics.length; i++) {
        if (pics[i].place != i)
            return false;
    }
    return true;
}