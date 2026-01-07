import React from 'react'

import { Body, Container, Head, Heading, Html, Tailwind, Text } from '@react-email/components'
import DisplayMessage from './DisplayMessage'

interface EmailProps {
    name: string
    email: string
    phone: string
    message: string
}

export const Email: React.FC<Readonly<EmailProps>> = ({ name, email, phone, message }) => (
    <Html>
        <Head />
        <Tailwind>
            <Body className="mx-auto my-auto bg-white font-sans">
                <Container className="my-[40px] rounded border border-solid border-[#eaeaea] p-[20px]">
                    <Heading className="text-black mx-0 my-[30px] p-0 text-[24px] font-normal">
                        New Form Submission!
                    </Heading>
                    <Text className="text-black text-[14px] leading-[24px]">Hello!</Text>
                    <Text className="text-black text-[14px] leading-[24px]">
                        From: <strong>{name}</strong>
                        <br />
                        Email: <strong>{email}</strong>
                        <br />
                        Phone: <strong>{phone}</strong>
                        <br />
                    </Text>
                    <Text className="text-black text-[14px] leading-[24px]">
                        <DisplayMessage message={message} />
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
)

