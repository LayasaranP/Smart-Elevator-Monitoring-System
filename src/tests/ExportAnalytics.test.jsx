import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AnalyticsExport from '../components/Statistics/ExportAnalytics';
import { vi } from 'vitest';

let originalCreateElement;

vi.mock('jspdf', () => {
  return {
    jsPDF: vi.fn().mockImplementation(() => ({
      save: vi.fn(),
      text: vi.fn(),
      rect: vi.fn(),
      addPage: vi.fn(),
      setFontSize: vi.fn(),
      setTextColor: vi.fn(),
      addImage: vi.fn(),
      roundedRect: vi.fn(),
      setFillColor: vi.fn(),
      setFont: vi.fn(),
      circle: vi.fn()
    })),
  };
});

describe('AnalyticsExport Component', () => {
  beforeEach(() => {
    originalCreateElement = document.createElement;

    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:http://localhost/fake-csv'),
    });

    vi.stubGlobal('Blob', vi.fn());

    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        const anchor = originalCreateElement.call(document, 'a');
        anchor.click = vi.fn(); 
        return anchor;
      }
      return originalCreateElement.call(document, tagName);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Export CSV and Export PDF buttons', () => {
    render(<AnalyticsExport />);
    expect(screen.getByText(/Export CSV/i)).toBeInTheDocument();
    expect(screen.getByText(/Export PDF/i)).toBeInTheDocument();
  });

  it('triggers CSV download on Export CSV click', () => {
    render(<AnalyticsExport />);
    const csvButton = screen.getByText(/Export CSV/i);
    fireEvent.click(csvButton);

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(document.createElement).toHaveBeenCalledWith('a');
  });

  it('calls jsPDF and triggers save on Export PDF click', async () => {
    render(<AnalyticsExport />);
    const pdfButton = screen.getByText(/Export PDF/i);
    fireEvent.click(pdfButton);

    await waitFor(() => {
      const { jsPDF } = require('jspdf');
      expect(jsPDF).toHaveBeenCalled();
      expect(jsPDF().save).toHaveBeenCalled();
    });
  });
});
