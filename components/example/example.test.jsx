import React from 'react'
import { render, screen } from '@testing-library/react'
import Example from "./example";

describe('Example', () => {
    it('renders a heading', () => {
        render(<Example />)

        const heading = screen.getByRole('heading', {
            name: /Welcome to next\.js!/i,
        })

        expect(heading).toBeInTheDocument()
    })
})
