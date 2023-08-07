import { Typography, TypographyVariant } from '@/components/ui'

interface LoginPageProps {}

export const LoginPage = ({}: LoginPageProps) => {
  return (
    <div>
      <Typography tag="h1" variant={TypographyVariant.Large}>
        Packs list
      </Typography>
    </div>
  )
}
