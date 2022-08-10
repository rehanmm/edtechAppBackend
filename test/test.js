var a = Buffer.from('baseAuth').toString('base64')

console.log(a);

var b = Buffer.from(a, 'base64').toString()
console.log(b);

