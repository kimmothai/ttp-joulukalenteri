export default function Footer() {
  const names = [
    'Fyrkka-Pekka Setelius',
    'xX_PIG_DESTROYER_Xx',
    'Jeff Pesos',
    'LinkedIn Pöhinä Ukko',
    'Kimmo Thai'
  ]
  return (
    <footer className='footer container-fluid p-3 m-3'>
      <p className='text-end'>
        {names[Math.floor(Math.random() * names.length)]}, 2022
      </p>
    </footer>
  )
}
