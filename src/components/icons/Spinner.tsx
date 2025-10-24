const Spinner = () => {
  return (
    <span className='truncate'>
      <div className='w-full h-full flex items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-loader-circle animate-spin text-foreground-lighter'
        >
          <path d='M21 12a9 9 0 1 1-6.219-8.56'></path>
        </svg>
      </div>
    </span>
  )
}

export { Spinner }
