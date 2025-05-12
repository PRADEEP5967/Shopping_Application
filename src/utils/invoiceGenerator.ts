
import { jsPDF } from 'jspdf';
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
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Set default font
    doc.setFont('helvetica');
    
    // Add company logo/header
    doc.setFontSize(20);
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    // Add order details
    doc.setFontSize(12);
    doc.text(`Invoice #: ${order.id}`, 20, 40);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 48);
    doc.text(`Status: ${order.status}`, 20, 56);
    
    // Customer information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Information', 20, 70);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${order.shippingAddress.fullName}`, 20, 80);
    doc.text(`Address: ${order.shippingAddress.addressLine1}`, 20, 88);
    if (order.shippingAddress.addressLine2) {
      doc.text(`${order.shippingAddress.addressLine2}`, 20, 96);
    }
    doc.text(
      `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}`,
      20, order.shippingAddress.addressLine2 ? 104 : 96
    );
    doc.text(`Country: ${order.shippingAddress.country}`, 20, order.shippingAddress.addressLine2 ? 112 : 104);
    
    // Order items
    const startY = order.shippingAddress.addressLine2 ? 124 : 116;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Order Items', 20, startY);
    
    // Table header
    const headerY = startY + 10;
    doc.setFontSize(12);
    doc.text('Item', 20, headerY);
    doc.text('Qty', 120, headerY);
    doc.text('Price', 140, headerY);
    doc.text('Total', 170, headerY);
    
    // Draw horizontal line
    doc.line(20, headerY + 2, 190, headerY + 2);
    
    // Table content
    let itemY = headerY + 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // For each item in order
    order.items.forEach((item: CartItem) => {
      // Item name with variant if applicable
      const itemName = item.variant 
        ? `${item.product.name} (${item.variant.name})` 
        : item.product.name;
        
      const itemPrice = item.variant ? item.variant.price : item.product.price;
      const itemTotal = itemPrice * item.quantity;
      
      doc.text(itemName, 20, itemY, { maxWidth: 90 });
      doc.text(`${item.quantity}`, 120, itemY);
      doc.text(formatCurrency(itemPrice).replace('$', ''), 140, itemY);
      doc.text(formatCurrency(itemTotal).replace('$', ''), 170, itemY);
      
      itemY += 10;
    });
    
    // Draw horizontal line
    doc.line(20, itemY, 190, itemY);
    
    // Total amount
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ${formatCurrency(order.totalAmount)}`, 190, itemY + 10, { align: 'right' });
    
    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for your business!', 105, 270, { align: 'center' });
    doc.text(`Page 1 of 1`, 105, 280, { align: 'center' });
    
    // Convert to blob and resolve
    const pdfBlob = doc.output('blob');
    resolve(pdfBlob);
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
