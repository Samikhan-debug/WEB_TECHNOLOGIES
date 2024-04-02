console.log("Harry")

let boxes=document.getElementsByClassName("box")
console.log(boxes)

document.getElementById("box1").style.backgroundColor="red"
//selecting by id

document.querySelector(".box").style.backgroundColor="green"
// matches the first box and apply css




let button = document.getElementById('btn')

// mouse event

button.addEventListener("click", () => {
    document.querySelector(".box").innerHTML = "Yay you were clicked"

})

// Event bubbling is a concept in JavaScript where events that are 
// triggered on a nested or child element are propagated up through the 
// DOM (Document Object Model) hierarchy to reach the parent elements. 
// This propagation continues until it reaches the root of the document.


// this type of function is run after other code
setTimeout(()=> {
    console.log("Hellok");

},100)

