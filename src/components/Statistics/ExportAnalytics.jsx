import React, { useRef } from 'react';
import { Download } from 'lucide-react';

const AnalyticsExport = () => {
  //const chartRef = useRef(null);

  const analyticsData = {
    overview: {
      totalTrips: { value: 1247, change: '+12% from yesterday' },
      energyUsage: { value: '2.8 MWh', change: '-5% from last week' },
      averageWaitTime: { value: '3 mins', change: '+1 min from last week' },
      efficiency: { value: '94.2%', change: '+2.1% this month' }
    },
    floorPopularity: [
      { floor: 'Ground', percentage: 85, visits: 340 },
      { floor: '1st', percentage: 70, visits: 280 },
      { floor: '2nd', percentage: 50, visits: 200 },
      { floor: '3rd', percentage: 30, visits: 120 },
      { floor: '4th', percentage: 20, visits: 80 },
      { floor: '5th', percentage: 10, visits: 40 },
      { floor: '6th+', percentage: 5, visits: 20 }
    ],
    energyBreakdown: [
      { component: 'Motor Operation', percentage: 45 },
      { component: 'Lighting', percentage: 20 },
      { component: 'HVAC', percentage: 15 },
      { component: 'Safety Systems', percentage: 12 },
      { component: 'Controls', percentage: 8 }
    ],
    maintenanceSchedule: [
      { component: 'Motor', lastService: '2024-01-15', nextService: '2024-04-15', status: 'Good' },
      { component: 'Brake System', lastService: '2024-02-01', nextService: '2024-05-01', status: 'Excellent' },
      { component: 'Door Mechanism', lastService: '2024-01-28', nextService: '2024-04-28', status: 'Warning' },
      { component: 'Safety Sensors', lastService: '2024-02-10', nextService: '2024-05-10', status: 'Good' },
      { component: 'Power Supply', lastService: '2024-01-20', nextService: '2024-07-20', status: 'Excellent' }
    ],
    usagePatterns: [
      { time: '06:00', trips: 200 },
      { time: '07:00', trips: 450 },
      { time: '08:00', trips: 800 },
      { time: '09:00', trips: 650 },
      { time: '10:00', trips: 400 },
      { time: '11:00', trips: 350 },
      { time: '12:00', trips: 900 },
      { time: '13:00', trips: 1100 },
      { time: '14:00', trips: 850 },
      { time: '15:00', trips: 600 },
      { time: '16:00', trips: 400 },
      { time: '17:00', trips: 750 },
      { time: '18:00', trips: 950 },
      { time: '19:00', trips: 600 },
      { time: '20:00', trips: 300 }
    ]
  };

  // Create canvas chart for PDF export
  const createChart = (canvas, data, type) => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas with dark background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);
    
    if (type === 'line') {
      // Draw usage pattern line chart with better styling
      const maxTrips = Math.max(...data.map(d => d.trips));
      const padding = 60;
      const chartWidth = width - 2 * padding;
      const chartHeight = height - 2 * padding;
      
      // Draw grid lines
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = padding + (i * chartHeight / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        const value = Math.round((maxTrips / 5) * (5 - i));
        ctx.fillText(value.toString(), padding - 10, y + 4);
      }
      
      // Vertical grid lines
      for (let i = 0; i < data.length; i += 3) {
        const x = padding + (i * chartWidth / (data.length - 1));
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
      }
      
      // Draw area under the line
      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);
      
      data.forEach((point, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = height - padding - (point.trips / maxTrips * chartHeight);
        if (index === 0) {
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.lineTo(width - padding, height - padding);
      ctx.closePath();
      ctx.fill();
      
      // Draw main line
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      
      data.forEach((point, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = height - padding - (point.trips / maxTrips * chartHeight);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
      
      // Draw data points
      ctx.fillStyle = '#10b981';
      data.forEach((point, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = height - padding - (point.trips / maxTrips * chartHeight);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
      
      // X-axis labels
      ctx.fillStyle = '#9ca3af';
      ctx.font = '11px Arial';
      ctx.textAlign = 'center';
      data.forEach((point, index) => {
        if (index % 3 === 0) {
          const x = padding + (index * chartWidth / (data.length - 1));
          ctx.fillText(point.time, x, height - padding + 20);
        }
      });
      
      // Chart title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Hourly Trip Distribution', width / 2, 30);
      
    } else if (type === 'pie') {
      // Draw energy breakdown pie chart with improved styling
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 3;
      
      let currentAngle = -Math.PI / 2;
      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
      
      // Draw pie slices
      data.forEach((segment, index) => {
        const sliceAngle = (segment.percentage / 100) * 2 * Math.PI;
        
        // Main slice
        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Slice border
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        currentAngle += sliceAngle;
      });
      
      // Draw center circle for donut effect
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add center text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Energy', centerX, centerY - 5);
      ctx.fillText('Usage', centerX, centerY + 10);
      
      // Chart title
      ctx.font = 'bold 16px Arial';
      ctx.fillText('System Energy Distribution', centerX, 30);
      
    } else if (type === 'bar') {
      // Draw floor popularity bar chart with enhanced visuals
      const maxVisits = Math.max(...data.map(d => d.visits));
      const padding = 60;
      const chartWidth = width - 2 * padding;
      const chartHeight = height - 2 * padding;
      const barWidth = chartWidth / data.length * 0.7;
      const barSpacing = chartWidth / data.length * 0.3;
      
      // Draw grid lines
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 5; i++) {
        const y = padding + (i * chartHeight / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        const value = Math.round((maxVisits / 5) * (5 - i));
        ctx.fillText(value.toString(), padding - 10, y + 4);
      }
      
      // Draw bars with gradient effect
      data.forEach((floor, index) => {
        const barHeight = (floor.visits / maxVisits) * chartHeight;
        const x = padding + (index * (barWidth + barSpacing)) + barSpacing / 2;
        const y = height - padding - barHeight;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#1e40af');
        
        // Draw bar
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Bar border
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);
        
        // Floor labels
        ctx.fillStyle = '#ffffff';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(floor.floor, x + barWidth / 2, height - padding + 20);
        
        // Value labels on top of bars
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Arial';
        ctx.fillText(floor.visits.toString(), x + barWidth / 2, y - 5);
        
        // Percentage labels
        ctx.fillStyle = '#9ca3af';
        ctx.font = '9px Arial';
        ctx.fillText(`${floor.percentage}%`, x + barWidth / 2, y - 15);
      });
      
      // Chart title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Floor Traffic Volume', width / 2, 30);
      
      // Y-axis title
      ctx.save();
      ctx.translate(20, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Number of Visits', 0, 0);
      ctx.restore();
    }
  };

  const exportToPDF = async () => {
    try {
      // Dynamic import for jsPDF
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Helper function to wait for canvas rendering
      const waitForCanvas = (canvas) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(), 100);
        });
      };
      
      // Title page with styling
      pdf.setFillColor(30, 41, 59); // slate-800
      pdf.rect(0, 0, 210, 297, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont(undefined, 'bold');
      pdf.text('Elevator Usage Analytics Report', 20, 40);
      
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 55);
      pdf.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 65);
      
      // Overview metrics with better formatting
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(59, 130, 246); // blue-500
      pdf.text('Overview Metrics', 20, 90);
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'normal');
      let yPos = 110;
      
      // Create metric boxes
      const metrics = [
        { label: 'Total Trips Today', value: analyticsData.overview.totalTrips.value, change: analyticsData.overview.totalTrips.change, color: [59, 130, 246] },
        { label: 'Energy Usage', value: analyticsData.overview.energyUsage.value, change: analyticsData.overview.energyUsage.change, color: [245, 158, 11] },
        { label: 'Average Wait Time', value: analyticsData.overview.averageWaitTime.value, change: analyticsData.overview.averageWaitTime.change, color: [16, 185, 129] },
        { label: 'Efficiency', value: analyticsData.overview.efficiency.value, change: analyticsData.overview.efficiency.change, color: [139, 92, 246] }
      ];
      
      metrics.forEach((metric, index) => {
        const x = 20 + (index % 2) * 85;
        const y = yPos + Math.floor(index / 2) * 35;
        
        // Draw metric box
        pdf.setFillColor(51, 65, 85); // slate-700
        pdf.roundedRect(x, y, 80, 30, 3, 3, 'F');
        
        // Metric label
        pdf.setTextColor(203, 213, 225); // slate-300
        pdf.setFontSize(9);
        pdf.text(metric.label, x + 3, y + 8);
        
        // Metric value
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.text(metric.value.toString(), x + 3, y + 18);
        
        // Change indicator
        pdf.setTextColor(16, 185, 129); // green-500
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'normal');
        pdf.text(metric.change, x + 3, y + 26);
      });
      
      // Floor Popularity with visual bars - MOVED UP
      yPos = 185; // Changed from 200 to 185
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(59, 130, 246);
      pdf.text('Floor Popularity', 20, yPos);
      
      yPos += 15; // Changed from 20 to 15
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      
      analyticsData.floorPopularity.forEach((floor, index) => {
        const barY = yPos + (index * 10); // Changed from 12 to 10 for tighter spacing
        
        // Floor label
        pdf.text(`${floor.floor}:`, 25, barY + 4);
        
        // Progress bar background
        pdf.setFillColor(71, 85, 105); // slate-600
        pdf.rect(45, barY, 60, 6, 'F');
        
        // Progress bar fill
        pdf.setFillColor(59, 130, 246); // blue-500
        pdf.rect(45, barY, (floor.percentage / 100) * 60, 6, 'F');
        
        // Percentage and visits
        pdf.text(`${floor.percentage}% (${floor.visits} visits)`, 110, barY + 4);
      });
      
      // New page for charts
      pdf.addPage();
      pdf.setFillColor(30, 41, 59);
      pdf.rect(0, 0, 210, 297, 'F');
      
      // Usage Pattern Chart
      pdf.setTextColor(59, 130, 246);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('Daily Usage Patterns', 20, 30);
      
      const canvas1 = document.createElement('canvas');
      canvas1.width = 600;
      canvas1.height = 300;
      createChart(canvas1, analyticsData.usagePatterns, 'line');
      await waitForCanvas(canvas1);
      
      const imgData1 = canvas1.toDataURL('image/png');
      pdf.addImage(imgData1, 'PNG', 20, 40, 170, 85);
      
      // Energy Breakdown Chart
      pdf.setTextColor(59, 130, 246);
      pdf.text('Energy Consumption Breakdown', 20, 140);
      
      const canvas2 = document.createElement('canvas');
      canvas2.width = 400;
      canvas2.height = 400;
      createChart(canvas2, analyticsData.energyBreakdown, 'pie');
      await waitForCanvas(canvas2);
      
      const imgData2 = canvas2.toDataURL('image/png');
      pdf.addImage(imgData2, 'PNG', 20, 150, 90, 90);
      
      // Energy breakdown legend with colors
      let legendY = 160;
      pdf.setFontSize(11);
      pdf.setTextColor(255, 255, 255);
      const colors = [[59, 130, 246], [16, 185, 129], [245, 158, 11], [139, 92, 246], [239, 68, 68]];
      
      analyticsData.energyBreakdown.forEach((item, index) => {
        // Color indicator
        pdf.setFillColor(...colors[index]);
        pdf.circle(120, legendY - 2, 2, 'F');
        
        pdf.text(`${item.component}: ${item.percentage}%`, 125, legendY);
        legendY += 10;
      });
      
      // Floor Popularity Bar Chart - MOVED UP
      pdf.text('Floor Traffic Distribution', 20, 245); // Changed from 255 to 245
      
      const canvas3 = document.createElement('canvas');
      canvas3.width = 600;
      canvas3.height = 200;
      createChart(canvas3, analyticsData.floorPopularity, 'bar');
      await waitForCanvas(canvas3);
      
      const imgData3 = canvas3.toDataURL('image/png');
      pdf.addImage(imgData3, 'PNG', 20, 250, 170, 50); // Changed from 260 to 250
      
      // New page for maintenance schedule
      pdf.addPage();
      pdf.setFillColor(30, 41, 59);
      pdf.rect(0, 0, 210, 297, 'F');
      
      pdf.setTextColor(59, 130, 246);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text(' Maintenance Schedule & Alerts', 20, 30);
      
      yPos = 50;
      pdf.setFontSize(11);
      pdf.setTextColor(255, 255, 255);
      
      analyticsData.maintenanceSchedule.forEach((item, index) => {
        const boxY = yPos + (index * 45);
        
        // Component box
        pdf.setFillColor(51, 65, 85);
        pdf.roundedRect(20, boxY, 170, 40, 3, 3, 'F');
        
        // Component name
        pdf.setFont(undefined, 'bold');
        pdf.setFontSize(12);
        pdf.text(item.component, 25, boxY + 10);
        
        // Status indicator
        const statusColors = {
          'Excellent': [16, 185, 129],
          'Good': [59, 130, 246],
          'Warning': [245, 158, 11],
          'Critical': [239, 68, 68]
        };
        
        pdf.setFillColor(...statusColors[item.status]);
        pdf.roundedRect(150, boxY + 5, 35, 8, 2, 2, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(8);
        pdf.text(item.status, 152, boxY + 10);
        
        // Service dates
        pdf.setTextColor(203, 213, 225);
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(9);
        pdf.text(`Last Service: ${item.lastService}`, 25, boxY + 22);
        pdf.text(`Next Service: ${item.nextService}`, 25, boxY + 32);
      });
      
      // Footer
      pdf.setTextColor(156, 163, 175);
      pdf.setFontSize(8);
      pdf.text('Generated by Elevator Analytics System', 20, 280);
      pdf.text(`Report Date: ${new Date().toLocaleString()}`, 20, 285);
      
      pdf.save('elevator-analytics-report.pdf');
      
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const prepareCSVData = () => {
    const csvData = [];
    
    // Overview metrics
    csvData.push(['OVERVIEW METRICS', '', '']);
    csvData.push(['Metric', 'Value', 'Change']);
    csvData.push(['Total Trips Today', analyticsData.overview.totalTrips.value, analyticsData.overview.totalTrips.change]);
    csvData.push(['Energy Usage', analyticsData.overview.energyUsage.value, analyticsData.overview.energyUsage.change]);
    csvData.push(['Average Wait Time', analyticsData.overview.averageWaitTime.value, analyticsData.overview.averageWaitTime.change]);
    csvData.push(['Efficiency', analyticsData.overview.efficiency.value, analyticsData.overview.efficiency.change]);
    csvData.push(['', '', '']);
    
    // Floor popularity
    csvData.push(['FLOOR POPULARITY', '', '']);
    csvData.push(['Floor', 'Percentage', 'Visits']);
    analyticsData.floorPopularity.forEach(floor => {
      csvData.push([floor.floor, `${floor.percentage}%`, floor.visits]);
    });
    csvData.push(['', '', '']);
    
    // Energy breakdown
    csvData.push(['ENERGY BREAKDOWN', '', '']);
    csvData.push(['Component', 'Percentage', '']);
    analyticsData.energyBreakdown.forEach(item => {
      csvData.push([item.component, `${item.percentage}%`, '']);
    });
    csvData.push(['', '', '']);
    
    // Usage patterns
    csvData.push(['USAGE PATTERNS', '', '']);
    csvData.push(['Time', 'Trips', '']);
    analyticsData.usagePatterns.forEach(pattern => {
      csvData.push([pattern.time, pattern.trips, '']);
    });
    csvData.push(['', '', '']);
    
    // Maintenance schedule
    csvData.push(['MAINTENANCE SCHEDULE', '', '']);
    csvData.push(['Component', 'Last Service', 'Next Service', 'Status']);
    analyticsData.maintenanceSchedule.forEach(item => {
      csvData.push([item.component, item.lastService, item.nextService, item.status]);
    });
    
    return csvData;
  };

  const downloadCSV = () => {
    const csvData = prepareCSVData();
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'elevator-analytics-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex mt-4 gap-4">
      <button className="bg-white text-black rounded-lg w-35 h-10 font-semibold hover:bg-slate-200 transition-colors duration-300" onClick={downloadCSV}>
        <Download className="inline mr-2 size-5" />
        Export CSV
      </button>
      <button className="bg-white text-black rounded-lg w-35 h-10 font-semibold hover:bg-slate-200 transition-colors duration-300" onClick={exportToPDF}>
        <Download className="inline mr-2 size-5" />
        Export PDF
      </button>
    </div>
  );
};

export default AnalyticsExport;