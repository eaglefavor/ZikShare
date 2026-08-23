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

  it('renders HomePage with search and Digital Library entry banner without throwing', async () => {
    const { default: HomePage } = await import('../pages/HomePage')
    const { MemoryRouter } = await import('react-router-dom')

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <HomePage />
        </ErrorBoundary>
      </MemoryRouter>
    )

    expect(screen.getByText(/UNIZIK Digital Library & Past Questions/i)).toBeInTheDocument()
    expect(screen.getByText(/Search phones, laptops, generators, past questions/i)).toBeInTheDocument()
  })
})
