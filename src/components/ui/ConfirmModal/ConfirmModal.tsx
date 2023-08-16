import { ReactNode } from 'react'

import s from './ConfirmModal.module.scss'

import { Card, CardFooter, CardHeader, Modal } from '@/components/ui'

interface ConfirmModalProps {
  children: ReactNode
  title: string
  onAction: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isLoading?: boolean
}

export const ConfirmModal = ({
  children,
  title,
  onAction,
  setIsOpen,
  isOpen,
  isLoading,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={setIsOpen} lazy>
      <div className={s.confirmModal}>
        <CardHeader title={title} onClose={setIsOpen} />
        <Card className={s.content}>{children}</Card>
        <CardFooter onDismiss={setIsOpen} onAction={onAction} twoButtons isLoading={isLoading} />
      </div>
    </Modal>
  )
}
