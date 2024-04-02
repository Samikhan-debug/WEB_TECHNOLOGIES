console.log("HEEH");

let age=25;

if(age>18){
    console.log("You are 18 plus")
}
else{
    console.log("You are smol")
}

if(age<18){
    console.log("You are 18 plus")
}
else if(age>18 && age<26){
    console.log("You are good")
}
else{
    console.log("smoll")
}

a=4;
b=5;

let c= a>b ? (a-b): (b-a);
console.log(c)


let arr=[1,2,3,4,5]

console.log(arr)
console.log(arr.length)
console.log(arr[3])

// arrays can be changed but strings cant be (immutable)

console.log(typeof(arr))
// arr has type object

function hello(name){
    console.log("Hey " +name);
}

hello("sami")

function sum(a,b){
    console.log(a+b);
}
sum(5,6);

const func1 = (x)=>{
    console.log("HELLO i am arrow function",x)
}
func1(3)

let a=1;

for(let i=0;i<100;i++){
    console.log(a+i);
}

let b=0;
while(b<100){
    console.log(b)
    b++;
}

let d=0;
do{
    console.log(d)
    i++;
}while(d<100)