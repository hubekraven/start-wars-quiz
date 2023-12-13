export default class TimeManager {
    counter = 0;
    timerInterval = null;


    start(){
      this.timerInterval = setInterval(() => {
        this.counter +=1
      }, 1000)
    }

    getElapseTime(){
       setInterval(() => {
        return this.counter 
      }, 1000)
    }
}
