// function test(){
//    return setTimeout(() => {
//         console.log('hello')
//     }, 3000);
// }
// test()
// console.log('h1')


function test(){
    setTimeout(() => {
        console.log('hello')
    }, 3000);
    return 'hell';
}

console.log(test()); // prints undefined
console.log('h1'); 