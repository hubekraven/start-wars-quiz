/*
@ Description: Mixins to extends general fonctionnalities in a page of an activity. Add time tracker in activities
@ Note: .
*/
export const timerMixin = {
  data() {
    return {
      lessonTimeCounter: 0,
      activityTimeCounter: 0,
      elapsedCounter: 0, // count the elapse time since lesson started
      activityInterval: null,
      lessonInterval: null,
      fullInterval: null,
      timerState: 'stopped',
      elapsedInterval: null // interval of passed time since the lesson is started. used only for saving purposed
    }
  },
  methods: {
    /* Start the timer */
    startTimer(op) {
      if (op && !['activity', 'lesson'].includes(op))
        throw new Error('this is not a valid option for the timer')
      if (this.timerState === 'stopped') {
        switch (op) {
          case 'activity':
            // if (this.activityDuration.length) this.activityDuration = '00:00:00'
            this.activityInterval = setInterval(() => {
              this.activityTimeCounter += 1
            }, 1000)
            this.timerState = 'started'

            break

          case 'lesson':
            this.lessonInterval = setInterval(() => {
              this.lessonTimeCounter += 1
            }, 1000)
            break

          default:
            this.fullInterval = setInterval(() => {
              this.activityTimeCounter += 1
              this.lessonTimeCounter += 1
            }, 1000)
        }
      }
    },
    /* Stop the timer and reset  thimer to zero */
    stopTimer(op) {
      if (op && !['activity', 'lesson'].includes(op))
        throw new Error('this is not a valid parameter')

      if (this.timerState === 'started') {
        if (op === 'activity' && this.activityTimeCounter > 0) {
          this.lessonTimeCounter =
            this.lessonTimeCounter + this.activityTimeCounter //add to the lesson counter
          clearInterval(this.activityInterval) //clear the interval
          this.activityTimeCounter = 0 // reset the counter
          this.timerState = 'stopped'
        } else if (op === 'lesson' && this.lessonTimeCounter > 0) {
          clearInterval(this.lessonInterval)
          this.lessonTimeCounter = 0
        } else {
          clearInterval(this.fullInterval)
          clearInterval(this.elapsedCounter)

          this.activityTimeCounter = 0
          this.lessonTimeCounter = 0
          this.elapsedCounter = 0
        }
      }
    },
    /* Pause the timer but does not reset to zero*/
    pauseTimer(op) {
      if (op && !['activity', 'lesson'].includes(op))
        throw new Error('this is not a valid parameter')

      if (op === 'activity' && this.activityTimeCounter > 0) {
        clearInterval(this.activityInterval)
      } else if (op === 'lesson') {
        clearInterval(this.lessonInterval)
      } else {
        clearInterval(this.fullInterval)
      }
    },
    formatTime(seconds) {
      let d = new Date(null) //create a default date ref
      d.setSeconds(seconds) //set the time with passed numbers of seconds
      let ISOTime = d.toISOString().substr(11, 8) //convert the date in ISO 8601 format and get all only the time portion of it
      return ISOTime // time format 00:00:00
    }
  },
  mounted() {
    this.$bus.$on('start-timer', (op) => {
      this.startTimer(op)
    })

    this.$bus.$on('stop-timer', (op) => {
      this.stopTimer(op)
    })

    this.$bus.$on('pause-timer', (op) => {
      this.pauseTimer(op)
    })

    this.elapsedInterval = setInterval(() => {
      this.elapsedCounter += 1
    }, 1000)
  },
  computed: {
    activityDuration() {
      let duration
      if (this.activityTimeCounter > 0)
        duration = this.formatTime(this.activityTimeCounter)
      else duration = '00:00:00'

      return duration
    },
    lessonDuration() {
      this.lessonTimeCounter = this.lessonTimeCounter + this.activityTimeCounter
      let duration = this.formatTime(this.lessonTimeCounter)
      return duration
    },
    elapsedTime() {
      const eTime = this.elapsedCounter
      return eTime
    }
  }
}
//export default $extendsQuiz
