export enum QuestionFormat {
  TextWithPicture = 'Text with picture',
  TextOnly = 'Text only',
}

export type QuestionFormatOption = {
  id: number
  title: QuestionFormat
}

export const questionFormatOptions: QuestionFormatOption[] = [
  { id: 1, title: QuestionFormat.TextWithPicture },
  { id: 2, title: QuestionFormat.TextOnly },
]
