export const BRAND = {
  name: 'AltusPoint',
  legalName: 'AltusPoint, C.A.',
  rif: 'J-501636583',
  tagline_es: 'Distribuidora de Material y Equipos Médicos',
  tagline_en: 'Medical Equipment & Supplies Distributor',
  slogan_es: 'Nuestro compromiso es con la seguridad',
  slogan_en: 'Our commitment is to safety',
  whatsapp: '+584147114583',
  whatsappFormatted: '+58 414-711-4583',
  phone: '+584147114583',
  email: 'gerencia.ve@altuspoint.com',
  address: 'Calle 12 #18-44 Barrio Obrero, San Cristóbal - Venezuela',
  experience: '30+',
  instagram: '@altuspointco',
  instagramUrl: 'https://www.instagram.com/altuspointco/',
  linkedin: 'altuspoint',
};

export const COLORS = {
  // Primary
  navy: '#0B1D4F',
  blue: '#6B8EC2',
  lightBlue: '#E8EFF8',
  // Secondary - Health Greens
  greenPrimary: '#7AB648',
  greenLight: '#A8D86E',
  greenDark: '#4A8C2A',
  teal: '#5BB5A2',
  // Neutrals
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray500: '#6B7280',
  gray700: '#374151',
  gray900: '#111827',
};

// Product line colors from brandbook (green → blue → navy gradient)
export const PRODUCT_LINE_COLORS: Record<string, string> = {
  'equipos-medicos': '#7AB648',
  'material-quirurgico': '#8BC66A',
  'medias-antiembolicas': '#5BB5A2',
  'cirugia-plastica': '#5BA8BF',
  'ortesis-rehabilitacion': '#6B8EC2',
  'desinfeccion-limpieza': '#5A6FAF',
  'gases-medicinales': '#3D4F8F',
  'cuidado-heridas': '#0B1D4F',
};

export const PAYMENT_INFO = {
  pago_movil: {
    phone: '0414-7114582',
    cedula: 'V-5673532',
    holder: 'Maximiliano Zambrano',
  },
  zelle: {
    email: 'fabiolamaxi@hotmail.com',
    bank: 'Bank of America',
    holder: 'Maximiliano Zambrano',
  },
  bank_transfer: {
    bank: 'Bancolombia',
    account_type: 'Ahorros',
    account_number: '63961549401',
    holder: 'AltusPoint',
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
