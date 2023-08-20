import { memo, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { THeader } from '../THeader/THeader.tsx'
import { TRow } from '../TRow/TRow.tsx'

import s from './TableDecks.module.scss'

import deckImg from '@/assets/img/deckImage.jpg'
import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as PlayIcon } from '@/assets/svg/play.svg'
import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import { Typography, TypographyVariant } from '@/components/ui'
import { ConfirmModal } from '@/components/ui/ConfirmModal/ConfirmModal.tsx'
import { useMeQuery } from '@/services/auth/authApi.ts'
import { useDeleteDeckMutation } from '@/services/decks'
import { decksActions } from '@/services/decks/decksSlice.ts'
import { Deck, SortByType } from '@/services/decks/types.ts'
import { useAppDispatch } from '@/services/store.ts'
import { decksHeaderColumns } from '@/utils/constants'
import { TCell } from '@/widgets/Table/TCell/TCell.tsx'

interface TableProps {
  data?: Deck[]
  sortBy: SortByType | ''
}

export const TableDecks = memo(({ data, sortBy }: TableProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteDeck, { isLoading: isLoadingDelete }] = useDeleteDeckMutation()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [deckId, setDeckId] = useState('')
  const [nameDeck, setNameDeck] = useState('')
  const { data: authMeData } = useMeQuery()

  const handleLinkClick = (cover: string | null, id: string, nameDeck: string) => {
    dispatch(decksActions.setDeckCover(cover))
    dispatch(decksActions.setAuthorId(id))
    dispatch(decksActions.setDeckName(nameDeck))
  }
  const handleDeleteDeck = (id: string) => {
    deleteDeck({ id })
      .unwrap()
      .then(() => {
        setIsOpenConfirmModal(false)
      })
  }
  const handleClickDeleteDeck = (id: string, nameDeck: string) => {
    setIsOpenConfirmModal(true)
    setDeckId(id)
    setNameDeck(nameDeck)
  }
  const handlePlay = (deckId: string, nameDeck: string, cardsCount: number) => {
    if (cardsCount) {
      navigate(`/decks/${deckId}/learn`)
      dispatch(decksActions.setDeckName(nameDeck))
    } else {
      toast.warning('Sorry, the deck is still empty. Please choose a deck with available cards.')
    }
  }

  return (
    <table className={s.table}>
      <ConfirmModal
        title="Delete Pack"
        isOpen={isOpenConfirmModal}
        setIsOpen={setIsOpenConfirmModal}
        onAction={() => handleDeleteDeck(deckId)}
        isLoading={isLoadingDelete}
      >
        <p>
          Do you really want to remove <span className={s.nameDeck}>{nameDeck}</span>?
        </p>
        <p>All cards will be deleted. </p>
      </ConfirmModal>
      <THeader
        sortBy={sortBy}
        columns={decksHeaderColumns}
        setSortBy={sortBy => dispatch(decksActions.setSortBy(sortBy))}
      />
      <tbody>
        {data?.map(({ id, cover, name, cardsCount, updated, author }) => {
          return (
            <TRow key={id}>
              <TCell>
                <Link
                  className={s.deckName}
                  to={`/cards/${id}`}
                  onClick={() => handleLinkClick(cover, author.id, name)}
                >
                  <div className={s.deckImg}>
                    <img src={cover ? cover : deckImg} alt="deck" className={s.img} />
                  </div>
                  <Typography variant={TypographyVariant.Body2} className={s.title}>
                    {name}
                  </Typography>
                </Link>
              </TCell>

              <TCell>
                <Typography variant={TypographyVariant.Body2}>{cardsCount}</Typography>
              </TCell>
              <TCell>
                <Typography tag="span" variant={TypographyVariant.Body2}>
                  {new Date(updated).toLocaleDateString('en-GB')}
                </Typography>
              </TCell>
              <TCell>
                <Typography tag="span" variant={TypographyVariant.Body2}>
                  {author.name}
                </Typography>
              </TCell>
              <TCell>
                <PlayIcon onClick={() => handlePlay(id, name, cardsCount)} />
                {authMeData?.id === author.id && <EditIcon onClick={() => null} />}
                {authMeData?.id === author.id && (
                  <TrashIcon onClick={() => handleClickDeleteDeck(id, name)} />
                )}
              </TCell>
            </TRow>
          )
        })}
      </tbody>
    </table>
  )
})
