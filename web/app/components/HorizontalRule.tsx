interface HorizontalRuleProps {
    width?: string
    size?: string
    align?: 'left' | 'center' | 'right'
}

/**
 * Horizontal Rule Component
 * Renders a styled horizontal rule with customizable width, size, and alignment
 */
export default function HorizontalRule({ width = '100%', size = '1', align = 'left' }: HorizontalRuleProps) {
    return (
        <hr
            data-component="HorizontalRule"
            style={{
                margin: `${size}px 0`,
                width: width,
                textAlign: align,
            }}
        />
    )
}

