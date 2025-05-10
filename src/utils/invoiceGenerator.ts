
import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import { Order, CartItem } from '@/types';
import { formatCurrency } from '@/lib/utils';

/**
 * Generate a PDF invoice for an order
 * @param order The order to generate an invoice for
 * @returns A Promise that resolves to a Blob containing the PDF
 */
export const generateInvoicePDF = (order: Order): Promise<Blob> => {
  return new Promise((resolve) => {
    // Create a document
    const doc = new PDFDocument({ 
      size: 'A4',
      margins: { 
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      },
      bufferPages: true
    });

    // Pipe its output to a blob
    const stream = doc.pipe(blobStream());

    // Add company logo/header
    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('INVOICE', { align: 'center' })
      .moveDown(0.5);

    // Add order details
    doc
      .fontSize(12)
      .font('Helvetica')
      .text(`Invoice #: ${order.id}`)
      .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`)
      .text(`Status: ${order.status}`)
      .moveDown(1);

    // Customer information
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Customer Information')
      .moveDown(0.5);
      
    doc
      .fontSize(12)
      .font('Helvetica')
      .text(`Name: ${order.shippingAddress.fullName}`)
      .text(`Address: ${order.shippingAddress.addressLine1}`)
      .text(`${order.shippingAddress.addressLine2 ? order.shippingAddress.addressLine2 : ''}`)
      .text(`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}`)
      .text(`Country: ${order.shippingAddress.country}`)
      .moveDown(1);

    // Order items
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Order Items')
      .moveDown(0.5);

    // Table header
    const startX = 50;
    let startY = doc.y;
    const columnWidths = {
      item: 250,
      quantity: 60,
      price: 80,
      total: 100
    };

    // Draw header row
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text('Item', startX, startY)
      .text('Qty', startX + columnWidths.item, startY)
      .text('Price', startX + columnWidths.item + columnWidths.quantity, startY)
      .text('Total', startX + columnWidths.item + columnWidths.quantity + columnWidths.price, startY);

    // Move to next line
    doc.moveDown(0.5);
    startY = doc.y;

    // Draw horizontal line
    doc
      .moveTo(startX, startY - 5)
      .lineTo(startX + columnWidths.item + columnWidths.quantity + columnWidths.price + columnWidths.total, startY - 5)
      .stroke();

    // Table content
    doc.font('Helvetica');
    
    // For each item in order
    order.items.forEach((item: CartItem, index: number) => {
      const y = startY + (index * 20);
      
      // Item name with variant if applicable
      const itemName = item.variant 
        ? `${item.product.name} (${item.variant.name})` 
        : item.product.name;
        
      const itemPrice = item.variant ? item.variant.price : item.product.price;
      const itemTotal = itemPrice * item.quantity;
      
      doc
        .fontSize(10)
        .text(itemName, startX, y, { width: columnWidths.item - 10 })
        .text(`${item.quantity}`, startX + columnWidths.item, y)
        .text(formatCurrency(itemPrice), startX + columnWidths.item + columnWidths.quantity, y)
        .text(formatCurrency(itemTotal), startX + columnWidths.item + columnWidths.quantity + columnWidths.price, y);
    });

    // Draw horizontal line
    doc
      .moveTo(startX, doc.y + 10)
      .lineTo(startX + columnWidths.item + columnWidths.quantity + columnWidths.price + columnWidths.total, doc.y + 10)
      .stroke();

    // Total amount
    doc
      .moveDown(1.5)
      .fontSize(14)
      .font('Helvetica-Bold')
      .text(`Total: ${formatCurrency(order.totalAmount)}`, { align: 'right' });

    // Footer
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      
      // Footer text
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(
          'Thank you for your business!',
          50,
          doc.page.height - 50,
          { align: 'center' }
        );
      
      // Page number
      doc.text(
        `Page ${i + 1} of ${pageCount}`,
        50,
        doc.page.height - 30,
        { align: 'center' }
      );
    }

    // Finalize PDF and get blob
    doc.end();
    
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      resolve(blob);
    });
  });
};

/**
 * Download an invoice for an order
 * @param order The order to generate an invoice for
 * @param filename Optional custom filename
 */
export const downloadInvoice = async (order: Order, filename?: string): Promise<void> => {
  try {
    const blob = await generateInvoicePDF(order);
    const url = URL.createObjectURL(blob);
    
    // Create link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `invoice-${order.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    throw new Error('Failed to generate invoice PDF');
  }
};
