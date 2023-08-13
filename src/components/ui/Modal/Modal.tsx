import { ReactNode, useEffect, useState } from 'react'

import { Dialog } from '@headlessui/react'

import { Portal } from '../../../utils/portal'

import s from './Modal.module.scss'

interface ModalProps {
  children?: ReactNode
  isOpen?: boolean
  onClose?: (isOpen: boolean) => void
  lazy?: boolean
}

export const Modal = ({ lazy, children, isOpen, onClose }: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }

    return () => {
      setIsMounted(false)
    }
  }, [isOpen])

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <Dialog as="div" open={isOpen} onClose={() => onClose?.(false)} className={s.modal}>
        <div className={s.overlay} />
        <div className={s.wrapper}>
          <Dialog.Title as="div" className={s.title} />
          <Dialog.Panel>{children}</Dialog.Panel>
        </div>
      </Dialog>
    </Portal>
  )
}
