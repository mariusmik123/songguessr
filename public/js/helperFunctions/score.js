export const formatScore = (score, points) => {
let total = Number(score)+points
switch (total.toString().length){
case 1:
    return `000${total}`;
case 2:
    return `00${total}`;
case 3: 
return `0${total}`;
default: return `${total}`;
}
}