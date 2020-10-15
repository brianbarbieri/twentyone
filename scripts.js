var colours = ["#12e049", "#d9230f", "#1a25f0", "#f5ff36", "#f2f0f0", "#3d3c3c"];

function shuffle(array) {
    /*
    Shuffles the colour array so every row is different.
    */
    return array.sort(() => Math.random() - 0.5);
}

function calculateScore(){
    /*
    Function to calcualte game score. Is called with every new number added to the board.
    First calculates the normal score and afterwards bonus score.
    */
    multipliers={ // required to calculate bonus score
        "0":0, 
        "1":1, 
        "2":3,
        "3":6, 
        "4":10, 
        "5":15, 
        "6":21 
   };

   totalscore = 0;
   $( ".line" ).each(function(i, obj) {
        if (i == 5){ return false; } // last line does not have any dices but is just for showing info so break out of loop
        score = 0;
        // normal score
        crosses = $(this).find($( ".cross" ))
        crosses.each((i, elem) => {
            score += parseInt($(elem.parentElement).find($( ".cross" ))[0].innerHTML)
        })
        // bonus score
        count_mini_crosses = $(this).find($( ".minicross" )).length;
        score += multipliers[count_mini_crosses.toString()];
        totalscore += score;

        $("#" + i + ".scorebox")[0].innerHTML = score;
        $(".totalscorebox")[0].innerHTML = totalscore;
    }) 
}

function createDropdown(num){
    /*
    Creates the dropdown menu that is used to select a number when a dice is touched
    */
    text = '<select name="choices" class="choices">\n'
    for (var i = 0; i < num+1; i++) {
        text += '   <option value="' + i + '"  selected="'+ i + '">' + i + '</option>\n';
    }
    text += "</select>"
    return text
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
    if (this.value == 2){
        this.value = 3;
        val = this.querySelectorAll('.choices')[0].value

        this.querySelectorAll('.choices, .cross, .minicross').forEach(n => n.remove());

        $('<div class="cross">' + val + '</div>').appendTo(this);

        if (val == parseInt(this.querySelectorAll('.text')[0].innerHTML)){
            cross_box = Array.from(this.children).filter(label => label.className == "box")[0]
            $('<div class="minicross">&times;</div>').appendTo(cross_box);
        }
     
    }else if (this.value == 1){
        this.value = 2;
    }else if (this.value == 3){
            this.value = 0;


    }else{
        this.value = 1;
        txt = createDropdown(parseInt(this.querySelectorAll('.text')[0].innerHTML))
        $(txt).appendTo(this);
    }
    calculateScore();
 });


