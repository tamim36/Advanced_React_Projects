import { useState, useRef } from 'react'
import ResultModal from './ResultModal'

const TimerChallenge = ({ title, targetTime }) => {

  const timer = useRef()
  const resultDialog = useRef()
  
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

  const handleTimeReset = () => {
    setTimeRemaining(targetTime * 1000)
  }

  const handleExpired = () => {
    clearInterval(timer.current)
    resultDialog.current.openDialog()
  }

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
    }, 10)
  }

  const handleStop = () => {
    clearInterval(timer.current)
    resultDialog.current.openDialog()
  }

  if (timeRemaining <= 0){
    handleExpired()
  }

  return (
    <>
      <ResultModal 
        ref={resultDialog} 
        timeRemaining={timeRemaining} 
        resetTime={handleTimeReset}
        targetTime={targetTime} />
      <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}

export default TimerChallenge