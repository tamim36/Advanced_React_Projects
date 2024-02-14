import { forwardRef, useImperativeHandle, useRef } from 'react'

const ResultModal = forwardRef(({result, targetTime}, ref) => {

  const dialogRef = useRef()

  useImperativeHandle(ref, () => {
    return {
      openDialog () {
        dialogRef.current.showModal()
      }
    }
  })

  return (
    <dialog ref={dialogRef} className='result-modal'>
        <h3>You {result}</h3>
        <p>Your target time was <strong>{targetTime} seconds</strong></p>
        <p>Your stopped the timer with <strong>X seconds</strong> left</p>
        <form method='dialog'>
            <button>Close</button>
        </form>
    </dialog>
  )
})

export default ResultModal