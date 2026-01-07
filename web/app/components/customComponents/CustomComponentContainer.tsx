'use client'

import { PortableTextBlock } from 'next-sanity'
import GalleryGrid from './gallery/GalleryGrid'
import TrainersCustomComponent from './TrainersCustomComponent'
import ContentBlock from '../blocks/ContentBlock'
import AboutUsSection from './AboutUsContainer'
import { SanityImage } from '../types'

interface CustomComponentProps {
    _key: string
    _type: string
    trainers?: any[]
    galleryArr?: SanityImage[]
    iconCards?: any[]
    copy?: { portableTextBlock: PortableTextBlock[] }
}

interface CustomComponentContainerProps {
    rows: CustomComponentProps[]
    bgImage?: SanityImage | null
    overlay?: 'noOverlay' | 'darkOverlay' | 'blueOverlay'
    bgColor?: string
    removeBottomPadding?: boolean
}

/**
 * Custom Component Container
 * Routes to different custom component types (trainers, gallery, about us)
 */
export default function CustomComponentContainer({
    rows,
    bgImage,
    overlay = 'noOverlay',
    bgColor,
    removeBottomPadding = false,
}: CustomComponentContainerProps) {
    return (
        <>
            {rows.map((row) => {
                let component
                switch (row._type) {
                    case 'trainerRows':
                        component = <TrainersCustomComponent key={row._key} trainers={row.trainers || []} />
                        break
                    case 'galleryGrid':
                        component = (
                            <ContentBlock
                                bgImage={bgImage || null}
                                overlay={overlay}
                                bgColor={bgColor}
                                removeBottomPadding={removeBottomPadding}
                                skinny={false}
                                key={row._key}
                            >
                                <GalleryGrid images={row.galleryArr || []} />
                            </ContentBlock>
                        )
                        break
                    case 'aboutUsContainer':
                        component = (
                            <ContentBlock
                                bgImage={bgImage || null}
                                overlay={overlay}
                                bgColor={bgColor}
                                removeBottomPadding={removeBottomPadding}
                                skinny={false}
                                key={row._key}
                            >
                                <AboutUsSection iconCards={row.iconCards || []} copy={row.copy!} />
                            </ContentBlock>
                        )
                        break
                    default:
                        component = null
                }
                return component
            })}
        </>
    )
}

