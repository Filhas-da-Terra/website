export default function Estatuto() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-3xl font-bold mb-6'>Estatuto Social</h1>
      <div className='w-full max-w-6xl h-[80vh] border border-gray-300 rounded-lg overflow-hidden'>
        <embed
          src='/estatuto.pdf'
          type='application/pdf'
          width='100%'
          height='100%'
          className='rounded-lg'
        />
      </div>
    </div>
  )
}
