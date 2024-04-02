// case sensitive language
// forgiving language


var a= 5;
var b=6;
// var is globally scoped

console.log(a+b);
// to print something
console.log(typeof(a))

{
    // let is locally scoped
    let a=55
    console.log(a)
}

let x = "Harry";
let y= 22;
let z=3.55;
const p =true;
let q=undefined;
let r=null;

console.log(x,y,z,p,q,r)
console.log(typeof(x),typeof(y),typeof(z),typeof(p),typeof(q),typeof(r))

// type of null is object

let o={
    "name": "Sami",
    "id":"1"
}
console.log(o)
// like a dictionary but it is a object




let a="Sami";
console.log(a[1]);
console.log(a.length)

console.log(a.toLowerCase());

console.log(a.slice(0,3))