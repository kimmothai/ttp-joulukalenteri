import { useState } from 'react'
import format from 'date-fns/format'
import validator from 'validator'

export interface IDoor {
  day: number
  topic: string
}

export default function Door(props: IDoor) {
  const { day, topic } = props
  const today = Number(format(new Date(), 'd'))

  const [isActive, setIsActive] = useState(false)
  const [locked, setLocked] = useState(String(day))

  const handleClick = () => {
    if (day > today) {
      setLocked('🎅')
      setTimeout(() => setLocked(String(day)), 500)
    }
    if (day <= today) {
      setIsActive((current) => !current)
    }
  }

  return (
    <div className={`door door-${day} p-0 my-3 rounded-circle mx-auto`}>
      <button
        className={`door-front d-flex justify-content-center align-items-center rounded-circle mx-auto border-0 ${
          isActive ? 'active' : ''
        }
        `}
        data-bs-toggle='modal'
        data-bs-target={`#day-${day}`}
        onClick={handleClick}
      >
        <p className='fs-1 text-center m-auto'>{locked}</p>
      </button>
      <div
        className='modal fade'
        id={`day-${day}`}
        tabIndex={-1}
        aria-hidden='true'
      >
        <div className='modal-fullscreen' style={{ opacity: 1 }}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Modal title</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {day <= today ? topic : 'placeholder'}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='door-back d-flex justify-content-center align-items-center p-3 rounded-circle mx-auto'
        onClick={handleClick}
      >
        <p className='text-wrap text-center m-3'>
          {validator.isURL(topic) ? (
            <a target='_blank' rel='noopener noreferrer' href={topic}>
              {topic}
            </a>
          ) : day <= today ? (
            topic
          ) : (
            'placeholder'
          )}
          {/* {day <= today ? topic : 'placeholder'} */}
        </p>
        {/* <p>
          <a target='_blank' rel='noopener noreferrer' href={topic}>
            {topic}
          </a>
        </p> */}
      </div>
    </div>
  )
}
