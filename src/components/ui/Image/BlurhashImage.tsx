import { ImgHTMLAttributes, useEffect, useState } from 'react'

import { BlurhashCanvas } from 'react-blurhash/lib'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  blurWidth: number
  blurHeight: number
}

export const BlurhashImage = ({ src, alt, blurHeight, blurWidth, ...props }: ImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()

    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = src
  }, [src])

  return (
    <>
      <div style={{ display: imageLoaded ? 'none' : 'inline' }}>
        <BlurhashCanvas
          style={{ borderRadius: '2px' }}
          hash="L37nC1M_00s?-BaepJX50cog^nWA"
          width={blurWidth}
          height={blurHeight}
          punch={1}
        />
      </div>
      <div style={{ display: !imageLoaded ? 'none' : 'inline' }}>
        <img src={src} alt={alt} {...props} />
      </div>
    </>
  )
}
