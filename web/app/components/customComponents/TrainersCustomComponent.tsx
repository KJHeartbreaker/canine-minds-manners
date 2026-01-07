'use client'

import { PortableTextBlock } from 'next-sanity'
import { cn } from '@/lib/utils'
import SimplePortableText from '../portableText/SimplePortableText'
import SanityImage from '../SanityImage'
import ContentContainer from '../wrappers/ContentContainer'

interface Trainer {
    _id: string
    name: string
    role?: string
    slug?: {
        current: string
    }
    picture?: any
    certifications?: {
        portableTextBlock?: PortableTextBlock[]
    }
    bio?: {
        portableTextBlock?: PortableTextBlock[]
    }
}

interface TrainersCustomComponentProps {
    trainers: Trainer[]
}

/**
 * Trainers Custom Component
 * Displays trainer profiles in a custom layout
 */
export default function TrainersCustomComponent({ trainers }: TrainersCustomComponentProps) {
    console.log('trainers', trainers)
    return (
        <ContentContainer data-component="TrainersCustomComponent">
            {trainers.map((tr, index) => (
                <div
                    key={tr._id || tr.slug?.current || `trainer-${index}`}
                    id={tr.slug?.current}
                    className={cn(
                        'grid grid-cols-1 gap-5 py-5',
                        'sm:grid-cols-[40%_60%] sm:gap-5 sm:py-[50px]',
                    )}
                >
                    <div className="flex flex-col order-2 sm:order-1">
                        {tr.picture && (
                            <SanityImage
                                image={tr.picture}
                                alt={tr.picture?.alt}
                                width={600}
                                height={800}
                                className="w-full h-auto"
                            />
                        )}
                        {tr.certifications && (
                            <div className="flex flex-col mt-auto sm:mt-[30px]">
                                <h3 className="text-blue-33">Certifications</h3>
                                <div className="mt-5">
                                    {tr.certifications.portableTextBlock && (
                                        <SimplePortableText value={tr.certifications.portableTextBlock} />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="order-1 sm:order-2">
                        <h2 className="text-grey-33">{tr.name}</h2>
                        {tr.role && <h3 className="text-orange">{tr.role}</h3>}
                        {tr.bio && (
                            <div className="mt-5">
                                {tr.bio.portableTextBlock && <SimplePortableText value={tr.bio.portableTextBlock} />}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </ContentContainer>
    )
}

