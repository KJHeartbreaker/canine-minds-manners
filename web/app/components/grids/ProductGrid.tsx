'use client'

import ProductCard, { ProductCardProps } from '../cards/ProductCard'

interface ProductGridProps {
    panels: ProductCardProps[]
}

/**
 * Product Grid Component
 * Displays products in a grid layout
 */
export default function ProductGrid({ panels }: ProductGridProps) {
    if (!panels || panels.length === 0) {
        return null
    }

    return (
        <div data-component="ProductGrid" className="grid grid-cols-3 items-center justify-center gap-5">
            {panels.map((panel) => (
                <ProductCard
                    key={panel.key}
                    image={panel.image}
                    heading={panel.heading}
                    price={panel.price}
                    cta={panel.cta}
                />
            ))}
        </div>
    )
}

