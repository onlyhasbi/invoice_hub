export const getInvoiceNumber = () => {
  return crypto.randomUUID().replace(/\D/g, "").slice(0, 6);
};
