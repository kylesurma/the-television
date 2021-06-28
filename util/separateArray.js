const separateArray = (arr) => {
  let nestArr = [[],[],[]]
  let firstStop = Math.floor(arr.length * .33)
  let secondStop = Math.floor(arr.length * .66)
  for(let i = 0; i < arr.length; i++) {
    let currentVideo = arr[i].videoId

    if (i <= firstStop ) {
      nestArr[0].push(currentVideo)
    }
    else if (i <= secondStop) {
    nestArr[1].push(currentVideo)
    } else nestArr[2].push(currentVideo)
  }
  return nestArr
}

export default separateArray
