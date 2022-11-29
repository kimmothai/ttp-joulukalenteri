import Footer from '../components/Footer'
import './Calendar.css'
import Door, { IDoor } from '../components/Door'

const data: IDoor[] = [
  {
    day: 1,
    topic: 'Vuoden uudet tuttavuudet: musiikki'
  },
  {
    day: 2,
    topic: 'https://create-react-app.dev/docs/deployment/'
  },
  {
    day: 3,
    topic: 'https://www.iltalehti.fi/'
  },
  {
    day: 4,
    topic: 'Topic: Suosikki-emote'
  },
  {
    day: 5,
    topic: '🐻'
  },
  {
    day: 6,
    topic: 'hii'
  },
  {
    day: 7,
    topic: 'haa'
  },
  {
    day: 8,
    topic: 'hee'
  },
  {
    day: 9,
    topic: ''
  },
  {
    day: 10,
    topic: ''
  },
  {
    day: 11,
    topic: ''
  },
  {
    day: 12,
    topic: ''
  },
  {
    day: 13,
    topic: ''
  },
  {
    day: 14,
    topic: ''
  },
  {
    day: 15,
    topic: ''
  },
  {
    day: 16,
    topic: ''
  },
  {
    day: 17,
    topic: ''
  },
  {
    day: 18,
    topic: ''
  },
  {
    day: 19,
    topic: ''
  },
  {
    day: 20,
    topic: ''
  },
  {
    day: 21,
    topic: ''
  },
  {
    day: 22,
    topic: ''
  },
  {
    day: 23,
    topic: ''
  },
  {
    day: 24,
    topic: 'Hyvää joulua!'
  }
]

export default function Calendar() {
  return (
    <div className='calendar container'>
      <div className='container m-3 p-3'>
        <h1 className='text-center'>TTP-joulukalenteri 2022</h1>
      </div>
      <div className='grid m-3 p-3'>
        <div className='row g-2'>
          {data.map((door) => (
            <div className='col-sm-6 col-lg-3'>
              <Door {...door} />
            </div>
          ))}
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}
