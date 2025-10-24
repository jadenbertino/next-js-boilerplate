'use client'

import { cn } from '@/lib/utils'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import type { ReactNode } from 'react'
import { CloseIcon } from './icons'

function Modal({
  isOpen,
  handleClose,
  children,
  blurBackground = false,
  hideCloseButton = false,
}: {
  isOpen: boolean
  handleClose: () => void
  children?: ReactNode
  blurBackground?: boolean
  hideCloseButton?: boolean
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className='relative z-10'
    >
      <DialogBackdrop
        transition
        className={cn(
          'fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50',
          blurBackground && 'backdrop-blur-xs',
        )}
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10'
          >
            {!hideCloseButton && <CloseModalButton handleClose={handleClose} />}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

const CloseModalButton = ({
  handleClose,
  children,
}: {
  handleClose: () => void
  children?: ReactNode
}) => {
  return (
    <button
      type='button'
      onClick={handleClose}
      className='absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 dark:text-white dark:hover:text-gray-300'
    >
      {children || <CloseIcon />}
    </button>
  )
}

export { CloseModalButton, Modal }
