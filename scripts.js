var colours = ["#12e049", "#d9230f", "#1a25f0", "#f5ff36", "#f2f0f0", "#3d3c3c"];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function calculateScore(){
    multipliers={ 
        "0":0, 
        "1":1, 
        "2":2,
        "3":6, 
        "4":10, 
        "5":15, 
        "6":21 
   };

   totalscore = 0;
   
   $( ".line" ).each(function(i, obj) {
        score = 0;
        crosses = $(this).find($( ".cross" ))
        crosses.each((i, elem) => {
            score += parseInt($(elem.parentElement).find($( ".text" ))[0].innerHTML)
        })
        count_mini_crosses = $(this).find($( ".minicross" )).length;
        score += multipliers[count_mini_crosses.toString()];
        totalscore += score;
        $("#" + i + ".scorebox")[0].innerHTML = score;
        $(".totalscorebox")[0].innerHTML = totalscore;
    }) 
    

}

$( ".line" ).each(function(i, obj) {
    var c = shuffle(colours);
    var i = 0;
    for (let dice of obj.children) {
        if (dice.className == "dice"){
            dice.style.backgroundColor = colours[i];
            i++;
        }
    }
});

$(".dice").each(function(i, ik){ik.value = 0});
$(".box").each(function(i, ik){ik.value = 0});

$('.dice').click(function(){
    if (this.value != 0){
        this.value = 0;
        this.querySelectorAll('.cross').forEach(n => n.remove());
    }else{
        this.value = 1;
        $('<div class="cross">&times;</div>').appendTo(this);
    }
    calculateScore();
 });

$('.box').click(function(){
    if (this.value != 0){
        this.value = 0;
        this.querySelectorAll('.minicross').forEach(n => n.remove());
    }else{
        this.value = 1;
        $('<div class="minicross">&times;</div>').appendTo(this);
    }
    calculateScore();
 });

