import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Elevator_types from '../components/Equipment_Monitor/ELevator_types.jsx';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';


// Setup before each test
beforeEach(() => {
  render(<Elevator_types />);
});

describe('Elevator_types Component', () => {
  it('renders search input and dropdown', () => {
    expect(screen.getByPlaceholderText(/search components/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders components for default "traction" elevator', () => {
    expect(screen.getByText(/Traction Motor/i)).toBeInTheDocument();
    expect(screen.getByText(/Power Supply/i)).toBeInTheDocument();
  });

  it('filters components by search input', () => {
    const searchInput = screen.getByPlaceholderText(/search components/i);
    fireEvent.change(searchInput, { target: { value: 'brake' } });

    expect(screen.getByText(/Safety Brake/i)).toBeInTheDocument();
    expect(screen.queryByText(/Traction Motor/i)).not.toBeInTheDocument();
  });

  it('displays "Not Found" when no match is found', () => {
    const searchInput = screen.getByPlaceholderText(/search components/i);
    fireEvent.change(searchInput, { target: { value: 'xyz' } });

    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });

  it('changes elevator type and shows correct components', () => {
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'freight' } });

    expect(screen.getByText(/Heavy-Duty Motor/i)).toBeInTheDocument();
    expect(screen.queryByText(/Traction Motor/i)).not.toBeInTheDocument();
  });
});
