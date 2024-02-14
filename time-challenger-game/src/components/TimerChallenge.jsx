import { useState, useRef } from 'react'
import ResultModal from './ResultModal'

const TimerChallenge = ({ title, targetTime }) => {

  const timer = useRef()
  const resultDialog = useRef()
  const [ timeExpired, setTimeExpired ] = useState(false)
  const [ startChallenge, setStartChallenge ] = useState(false)

  const handleStart = () => {
    
    timer.current = setTimeout(() => {
      setTimeExpired(true)
      resultDialog.current.openDialog()
    }, targetTime * 1000)

    setStartChallenge(true)
  }

  const handleStop = () => {
    clearTimeout(timer.current)
  }

  return (
    <>
    <ResultModal ref={resultDialog} result={"Lost"} targetTime={targetTime} />
    <section className='challenge'>
        <h2>{ title }</h2>
        <p className='challenge-time'>
            { targetTime } second{targetTime > 1 ? 's': ''}
        </p>
        <p>
            <button onClick={startChallenge ? handleStop : handleStart}>
              {startChallenge ? 'Stop' : 'Start' } challenge
            </button>
        </p>
        <p className={startChallenge ? 'active' : undefined}>
            {startChallenge ? 'Time is running' : 'Timer inactive'}
        </p>
    </section>
    </>
  )
}

export default TimerChallenge