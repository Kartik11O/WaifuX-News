$("#Search_bar").on('click' ,()=>{
    $("#Show1_Container").addClass("Show_1Classes")

    $("#S_Box").addClass("Type")
    $("#Show1_Container").css({
        display: "flex"
    })
    $("#NavS").css({
        display: 'flex'
    })
    console.log("l")
})

$("#Back").on('click' , ()=>{
    $("#Show1_Container").removeClass("Show_1Classes")
    $("#Show1_Container").addClass("Show_1Classes-Remove")
    $("#S_Box").removeClass("Type")
    $("#NavS").css({
        display: 'none'
    })
})