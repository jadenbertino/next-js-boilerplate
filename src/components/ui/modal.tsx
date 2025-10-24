'use client'

/**
 * Modal Component
 * @see https://ui.shadcn.com/docs/components/dialog
 *
 * @example
 * ```tsx
 * import {
 *   Modal,
 *   ModalTrigger,
 *   ModalContent,
 *   ModalHeader,
 *   ModalTitle,
 *   ModalDescription,
 *   ModalFooter,
 * } from '@/components/ui/modal'
 *
 * function MyPage() {
 *   const [open, setOpen] = useState(false)
 *
 *   return (
 *     <page content here>
 *
 *     // all comopnents must be wrapped inside Modal
 *     <Modal open={open} onOpenChange={setOpen}>
 *
 *       <ModalContent showCloseButton={true}>
 *         <ModalHeader>
 *           <ModalTitle>Modal Title</ModalTitle>
 *           <ModalDescription>
 *             This is a description of what the Modal does.
 *           </ModalDescription>
 *         </ModalHeader>
 *
 *         <div>
 *           Your content here
 *         </div>
 *
 *         <ModalFooter>
 *           <button>Cancel</button>
 *           <button>Confirm</button>
 *         </ModalFooter>
 *       </ModalContent>
 *
 *     </Modal>
 *   )
 * }
 * ```
 */

import { cn } from '@/lib/utils'
import * as M from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import type { ComponentProps as CProps } from 'react'

function Modal({ ...props }: CProps<typeof M.Root>) {
  return (
    <M.Root
      data-slot='dialog'
      {...props}
    />
  )
}

function ModalTrigger({ ...props }: CProps<typeof M.Trigger>) {
  return (
    <M.Trigger
      data-slot='dialog-trigger'
      {...props}
    />
  )
}

function ModalContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: CProps<typeof M.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <ModalPortal data-slot='dialog-portal'>
      <ModalOverlay />
      <M.Content
        data-slot='dialog-content'
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <M.Close
            data-slot='dialog-close'
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className='sr-only'>Close</span>
          </M.Close>
        )}
      </M.Content>
    </ModalPortal>
  )
}

// For semantics
function ModalHeader({ className, ...props }: CProps<'div'>) {
  return (
    <div
      data-slot='dialog-header'
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

// For screen reader
function ModalTitle({ className, ...props }: CProps<typeof M.Title>) {
  return (
    <M.Title
      data-slot='dialog-title'
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

// For screen reader
function ModalDescription({
  className,
  ...props
}: CProps<typeof M.Description>) {
  return (
    <M.Description
      data-slot='dialog-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

// For semantics
function ModalFooter({ className, ...props }: CProps<'div'>) {
  return (
    <div
      data-slot='dialog-footer'
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

// Private Usage

function ModalPortal({ ...props }: CProps<typeof M.Portal>) {
  return (
    <M.Portal
      data-slot='dialog-portal'
      {...props}
    />
  )
}

function ModalClose({ ...props }: CProps<typeof M.Close>) {
  return (
    <M.Close
      data-slot='dialog-close'
      {...props}
    />
  )
}

function ModalOverlay({ className, ...props }: CProps<typeof M.Overlay>) {
  return (
    <M.Overlay
      data-slot='dialog-overlay'
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

export {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
}
