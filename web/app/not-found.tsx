'use client'

import ContentBlock from '@/app/components/blocks/ContentBlock'
import ContentContainer from '@/app/components/wrappers/ContentContainer'
import Link from 'next/link'
import SanityImage from '@/app/components/SanityImage'
import { cn } from '@/lib/utils'

const image404 = {
	asset: {
		assetId: '8334dc66f9a91b2888075815609a851677fcb5c2',
		extension: 'jpg',
		metadata: {
			lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYFBwj/xAAkEAABAwQBAwUAAAAAAAAAAAADAQIEAAUGESESQXEHExQVMv/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGBEBAQEBAQAAAAAAAAAAAAAAAQACIRH/2gAMAwEAAhEDEQA/AIb1BscbIM9FGEcALWirz1aRyrzxTDZpL7RbzADFEMEVyCaVi7VU80s56X4drZLhjYOQL88caqvsbzO5AuHukkPd1P28buWOTxU017IchaD+8uDERGSVVvbabopMhWrJ7nFFLEWKEZU6mNVdrrtRS5Ht/9k=',
		},
		mimeType: 'image/jpeg',
		originalFilename: 'Merlin.jpg',
		path: 'images/p7fl7jqd/production/8334dc66f9a91b2888075815609a851677fcb5c2-3024x4032.jpg',
		sha1hash: '8334dc66f9a91b2888075815609a851677fcb5c2',
		size: 2013908,
		uploadId: 'LKBEM6QfNd1MDi1O6nZCBFXOxyl7juJo',
		url: 'https://cdn.sanity.io/images/p7fl7jqd/production/8334dc66f9a91b2888075815609a851677fcb5c2-3024x4032.jpg',
		_createdAt: '2023-10-22T19:15:25Z',
		_id: 'image-8334dc66f9a91b2888075815609a851677fcb5c2-3024x4032-jpg',
		_originalId: 'image-8334dc66f9a91b2888075815609a851677fcb5c2-3024x4032-jpg',
		_rev: '7V6W77YnYTSXWZozOYrxBn',
		_type: 'sanity.imageAsset',
		_updatedAt: '2023-10-22T19:15:25Z',
	},
	width: 3024,
	height: 4032,
	crop: {
		_type: 'sanity.imageCrop',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	hotspot: {
		_type: 'sanity.imageHotspot',
		x: 0.5,
		y: 0.35539215686274506,
		height: 0.6813725490196086,
		width: 1,
	},
}

export default function NotFound() {
	return (
		<ContentBlock overlay={'noOverlay'} removeBottomPadding={false} skinny={false}>
			<ContentContainer data-component="TwoColumnRow" className="flex flex-col w-full">
				<div
					className={cn(
						'grid grid-cols-1 gap-5 z-10 w-full overflow-hidden',
						'sm:items-start',
						'lg:grid-cols-2',
					)}
				>
					<div className="flex flex-col w-full">
						<h1 style={{ color: 'var(--color-orange)' }} className="mb-6">
							404: Not Found
						</h1>
						<h2 style={{ color: 'var(--color-blue-33)' }} className="mb-2.5">
							I beg your pardon!
						</h2>
						<p>I don&apos;t think that this is what you&apos;re looking for!</p>
						<p>You can try one of these instead:</p>
						<ul className="mt-4 space-y-2">
							<li>
								<Link href="/" className="text-blue-44 hover:text-blue-22 underline transition-colors">
									Home
								</Link>
							</li>
							<li>
								<Link href="/contact" className="text-blue-44 hover:text-blue-22 underline transition-colors">
									Contact
								</Link>
							</li>
							<li>
								<Link href="/dog-and-puppy-training" className="text-blue-44 hover:text-blue-22 underline transition-colors">
									Dog and Puppy Training
								</Link>
							</li>
							<li>
								<Link href="/puppy-training-classes" className="text-blue-44 hover:text-blue-22 underline transition-colors">
									Puppy Training Classes
								</Link>
							</li>
							<li>
								<Link href="/reactivity" className="text-blue-44 hover:text-blue-22 underline transition-colors">
									Reactivity Training Classes
								</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col w-full">
						<SanityImage
							image={{
								asset: image404.asset,
								alt: "Merlin the cat says you're in the wrong place",
								crop: image404.crop,
								hotspot: image404.hotspot,
							}}
							alt="Merlin the cat says you're in the wrong place"
							width={image404.width}
							height={image404.height}
							className="rounded-[20px] w-full"
						/>
					</div>
				</div>
			</ContentContainer>
		</ContentBlock>
	)
}
