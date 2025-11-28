import jsPDF from 'jspdf';
import { Strategy, BusinessProfile } from '../types';

export const exportStrategyToPDF = (strategy: Strategy, business: BusinessProfile) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Business Strategy Report', 20, 20);

    // Business Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Business: ${business.name}`, 20, 35);
    doc.text(`Industry: ${business.industry}`, 20, 42);
    doc.text(`Generated: ${new Date(strategy.generatedAt).toLocaleDateString()}`, 20, 49);

    // Growth Score
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Growth Score: ${strategy.growthScore}/100`, 20, 62);

    // Executive Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Summary', 20, 75);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summaryLines = doc.splitTextToSize(strategy.summary, 170);
    doc.text(summaryLines, 20, 83);

    let yPos = 83 + (summaryLines.length * 5) + 10;

    // Target Audience
    if (yPos > 250) {
        doc.addPage();
        yPos = 20;
    }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Target Audience', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    strategy.targetAudience.demographics.forEach((demo, i) => {
        if (yPos > 280) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(`• ${demo}`, 25, yPos);
        yPos += 5;
    });

    yPos += 5;

    // Marketing Channels
    if (yPos > 250) {
        doc.addPage();
        yPos = 20;
    }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Marketing Channels', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    strategy.marketingChannels.forEach((channel) => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFont('helvetica', 'bold');
        doc.text(`${channel.channel}`, 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        const rationaleLines = doc.splitTextToSize(`  ${channel.rationale}`, 165);
        doc.text(rationaleLines, 25, yPos);
        yPos += rationaleLines.length * 5 + 3;
    });

    yPos += 5;

    // Sales Funnel
    if (yPos > 250) {
        doc.addPage();
        yPos = 20;
    }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Sales Funnel', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    strategy.salesFunnel.forEach((stage) => {
        if (yPos > 275) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(`${stage.stage}: ${stage.tactic}`, 25, yPos);
        yPos += 5;
    });

    yPos += 5;

    // KPIs
    if (yPos > 250) {
        doc.addPage();
        yPos = 20;
    }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Performance Indicators', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    strategy.kpis.forEach((kpi) => {
        if (yPos > 280) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(`• ${kpi.metric}: ${kpi.target}`, 25, yPos);
        yPos += 5;
    });

    // Save PDF
    const fileName = `${business.name.replace(/\s+/g, '_')}_Strategy_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
};
