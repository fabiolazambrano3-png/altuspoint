export const BRAND = {
  name: 'AltusPoint',
  tagline_es: 'Distribuidora de Productos Médicos',
  tagline_en: 'Medical Products Distributor',
  whatsapp: '+58412XXXXXXX', // Cambiar por número real
  email: 'info@altuspoint.com',
  address: 'Caracas, Venezuela',
};

export const COLORS = {
  navy: '#0B1D4F',
  blue: '#6B8EC2',
  lightBlue: '#E8EFF8',
  white: '#FFFFFF',
  gray: '#F5F5F5',
};

export const PAYMENT_INFO = {
  bank_transfer: {
    bank: 'Banco de Venezuela',
    account_type: 'Corriente',
    account_number: 'XXXX-XXXX-XX-XXXXXXXXXX',
    rif: 'J-501636583',
    holder: 'AltusPoint C.A.',
  },
  pago_movil: {
    phone: '0412-XXXXXXX',
    bank_code: '0102',
    id: 'J-501636583',
  },
  zelle: {
    email: 'pagos@altuspoint.com',
    holder: 'AltusPoint LLC',
  },
  crypto: {
    network: 'Binance Smart Chain (BEP20)',
    wallet: '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    currency: 'USDT',
  },
};

export const ORDER_STATUS_LABELS = {
  es: {
    pending: 'Pendiente',
    payment_uploaded: 'Comprobante enviado',
    confirmed: 'Confirmado',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
  },
  en: {
    pending: 'Pending',
    payment_uploaded: 'Payment uploaded',
    confirmed: 'Confirmed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  },
};

export const PAYMENT_METHOD_LABELS = {
  es: {
    bank_transfer: 'Transferencia Bancaria',
    pago_movil: 'Pago Móvil',
    zelle: 'Zelle',
    paypal: 'PayPal',
    crypto: 'Criptomonedas',
  },
  en: {
    bank_transfer: 'Bank Transfer',
    pago_movil: 'Pago Móvil',
    zelle: 'Zelle',
    paypal: 'PayPal',
    crypto: 'Cryptocurrency',
  },
};
