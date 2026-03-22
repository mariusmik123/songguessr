
let timerId = null



export function formatTime(seconds) {
  let minutes = Math.floor(Number(seconds) / 60);
  let remainingSeconds = Number(seconds) % 60;
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds.toString();
  }
  return `${minutes}:${remainingSeconds}`;
}


export async function countdowner(countContainer,duration, afterFunc){
  let endTime = Date.now() + Number(duration)
  function update (){
    const timeLeft = endTime - Date.now()
    let seconds = Math.ceil(timeLeft/1000)
    
    countContainer.textContent = seconds
    
    // Obs timerId needs to be initialized where this is used
    if (timeLeft>-1){
      timerId = setTimeout(update,1000)
    }
    else {
      
      afterFunc()
    }

  }
  update()
}

export function stopCounter(){
  clearTimeout(timerId)
}