var colours = ["#12b33d", "#d9230f", "#1a25f0", "#f5ff36", "#f2f0f0", "#3d3c3c"];


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

console.log(shuffle(colours));