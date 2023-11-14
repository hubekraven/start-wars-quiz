/*
* Shuffule a given array 
* @Param: array = the array which elements need to be shuffled
* return shuffuled array
* Ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/ 
function shuffleArray(array) {
  if(!array || !array.length) return 
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/*
* search element in an Object array
* @Param: el = element to search
* @Param: array = the array that in which to do the search
* return index Of found element if any otherwhise return false
*/

function  searchInArray(el, array) {
  let found = array.find(element =>element.key === el);
  if(found ) return found;
  else return false;
} //End SearchInarray

export {shuffleArray, searchInArray}