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
      <div
        className={`door-front d-flex justify-content-center align-items-center rounded-circle mx-auto ${
          isActive ? 'active' : ''
        }
        `}
        onClick={handleClick}
      >
        <p className='fs-1 text-center m-auto'>{locked}</p>
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
