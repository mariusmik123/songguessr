function scoreCalculator(guess,startTime,endTime,middle){
  if (!guess){
    return {score:0,startTime,endTime}
  }


    if (guess >= startTime && guess <= endTime) {
    return { score: 5000, startTime, endTime }
  }

  let distance

  if (guess < startTime) {
    distance = startTime - guess
  } else {
    distance = guess - endTime
  }

  // bias for sangens halvdel
  let bias = 1

  if (endTime < middle && guess < startTime) {
    bias = 0.8
  }

  if (startTime > middle && guess > endTime) {
    bias = 0.8
  }

  const scale = 35

  let score = 5000 * Math.exp(-(distance / scale) * bias)

  return {score:Math.round(score),startTime,endTime}
}

module.exports = {scoreCalculator}