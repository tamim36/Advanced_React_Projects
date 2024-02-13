import { useState, useRef } from 'react'

const TimerChallenge = ({ title, targetTime }) => {

  const timer = useRef()
  const [ timeExpired, setTimeExpired ] = useState(false)
  const [ startChallenge, setStartChallenge ] = useState(false)

  const handleStart = () => {
    
    timer.current = setTimeout(() => {
      setTimeExpired(true)
    }, targetTime * 1000)

    setStartChallenge(true)
  }

  const handleStop = () => {
    clearTimeout(timer.current)
    setStartChallenge(false)
  }

  return (
    <section className='challenge'>
        <h2>{ title }</h2>
        { timeExpired && startChallenge &&  <p> You are LOOSER  ! </p> }
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
  )
}

export default TimerChallenge