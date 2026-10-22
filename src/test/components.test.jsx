import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { ErrorBoundary } from '../components/ErrorBoundary'

// A component that intentionally throws
function FaultyComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Simulation of catastrophic runtime failure')
  }
  return <div>Clean Component Render</div>
}

describe('Components & ErrorBoundary Resilience', () => {
  it('renders children smoothly when no runtime errors occur', () => {
    render(
      <ErrorBoundary>
        <FaultyComponent shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Clean Component Render')).toBeInTheDocument()
  })

  it('catches runtime exceptions without crashing the tree and displays recovery buttons', () => {
    // Suppress console.error in test runner for expected throw
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary title="Campus Render Fault">
        <FaultyComponent shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Campus Render Fault')).toBeInTheDocument()
    expect(screen.getByText(/We encountered a temporary rendering issue/i)).toBeInTheDocument()
    expect(screen.getByText('Retry / Reload')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()

    spy.mockRestore()
  })

  it('invokes onReset handler when user clicks retry', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const onResetMock = vi.fn()

    render(
      <ErrorBoundary onReset={onResetMock}>
        <FaultyComponent shouldThrow={true} />
      </ErrorBoundary>
    )

    const retryBtn = screen.getByText('Retry / Reload')
    fireEvent.click(retryBtn)
    expect(onResetMock).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })

  it('supports custom fallback render prop', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary fallback={<div>Custom Error Page</div>}>
        <FaultyComponent shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom Error Page')).toBeInTheDocument()

    spy.mockRestore()
  })

  it('renders HomePage with the library as the first thing offered', async () => {
    const { default: HomePage } = await import('../pages/HomePage')
    const { MemoryRouter } = await import('react-router-dom')

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <HomePage />
        </ErrorBoundary>
      </MemoryRouter>
    )

    // The promise comes first, then the way in.
    expect(screen.getByText(/Free study material, on your phone, right now/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Browse the library/i })).toBeInTheDocument()
    // The opening line counts what is really on the shelf, and never claims
    // course packs that were cleared.
    expect(screen.getByText(/full-length books, free to open and download/i)).toBeInTheDocument()
    expect(screen.queryByText(/student-written course packs/i)).not.toBeInTheDocument()
  })
})
