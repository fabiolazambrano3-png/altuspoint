import { Resend } from 'resend';

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not set');
    _resend = new Resend(key);
  }
  return _resend;
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'AltusPoint <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'gerencia.ve@altuspoint.com';

// ──────────────────────────────────────────
// CONTACT FORM EMAIL
// ──────────────────────────────────────────
export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = data;

  // Email to admin
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `Nuevo contacto web: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1D4F; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Nuevo mensaje de contacto</h1>
        </div>
        <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 100px;">Nombre:</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6B8EC2;">${email}</a></td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensaje:</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; color: #9ca3af; font-size: 12px;">
            Enviado desde el formulario de contacto de altuspoint.health
          </p>
        </div>
      </div>
    `,
  });

  // Auto-reply to the customer
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Hemos recibido tu mensaje - AltusPoint',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1D4F; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Gracias por contactarnos</h1>
        </div>
        <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="margin: 0 0 16px;">Hola <strong>${name}</strong>,</p>
          <p style="margin: 0 0 16px; line-height: 1.6; color: #374151;">
            Hemos recibido tu mensaje y nuestro equipo te responderá a la brevedad posible.
            Normalmente respondemos en un plazo de 24 horas hábiles.
          </p>
          <p style="margin: 0 0 16px; line-height: 1.6; color: #374151;">
            Si necesitas una respuesta inmediata, puedes contactarnos directamente por WhatsApp:
          </p>
          <a href="https://wa.me/584147114583" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Escribir por WhatsApp
          </a>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">
            AltusPoint, C.A. | San Cristóbal, Venezuela<br>
            gerencia.ve@altuspoint.com | +58 414-711-4583
          </p>
        </div>
      </div>
    `,
  });
}

// ──────────────────────────────────────────
// ORDER CONFIRMATION EMAIL (to customer)
// ──────────────────────────────────────────
export async function sendOrderConfirmationEmail(data: {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  totalUsd: number;
  totalBs: number;
  paymentMethod: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
}) {
  const {
    orderId,
    customerEmail,
    customerName,
    items,
    totalUsd,
    totalBs,
    paymentMethod,
    shippingAddress,
    shippingCity,
    shippingState,
  } = data;

  const paymentLabels: Record<string, string> = {
    bank_transfer: 'Transferencia Bancaria',
    pago_movil: 'Pago Móvil',
    zelle: 'Zelle',
    paypal: 'PayPal',
    crypto: 'Criptomonedas',
  };

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.unitPrice.toFixed(2)}</td>
      </tr>`
    )
    .join('');

  const orderIdShort = orderId.slice(0, 8).toUpperCase();

  // Email to customer
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: `Pedido #${orderIdShort} confirmado - AltusPoint`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1D4F; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Pedido confirmado</h1>
          <p style="color: #6B8EC2; margin: 4px 0 0; font-size: 14px;">Pedido #${orderIdShort}</p>
        </div>
        <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="margin: 0 0 16px;">Hola <strong>${customerName}</strong>,</p>
          <p style="margin: 0 0 24px; line-height: 1.6; color: #374151;">
            Tu pedido ha sido recibido exitosamente. A continuación los detalles:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="background: #0B1D4F; color: white;">
                <th style="padding: 10px 12px; text-align: left; font-size: 13px;">Producto</th>
                <th style="padding: 10px 12px; text-align: center; font-size: 13px;">Cant.</th>
                <th style="padding: 10px 12px; text-align: right; font-size: 13px;">Precio</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot>
              <tr style="background: #f3f4f6; font-weight: 600;">
                <td colspan="2" style="padding: 12px;">Total</td>
                <td style="padding: 12px; text-align: right;">$${totalUsd.toFixed(2)} / Bs. ${totalBs.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div style="padding: 12px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 4px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Método de pago</p>
              <p style="margin: 0; font-weight: 600;">${paymentLabels[paymentMethod] || paymentMethod}</p>
            </div>
            <div style="padding: 12px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 4px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Envío</p>
              <p style="margin: 0; font-weight: 600;">${shippingCity}, ${shippingState}</p>
            </div>
          </div>

          <div style="padding: 16px; background: #FEF3C7; border-radius: 8px; border: 1px solid #FDE68A; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 14px; color: #92400E;">
              <strong>Siguiente paso:</strong> Realiza el pago y sube tu comprobante desde tu panel de pedidos para que podamos procesar tu orden.
            </p>
          </div>

          <p style="margin: 0 0 16px; color: #374151; font-size: 14px;">
            Si tienes alguna pregunta, no dudes en contactarnos:
          </p>
          <a href="https://wa.me/584147114583" style="display: inline-block; background: #25D366; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            WhatsApp
          </a>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">
            AltusPoint, C.A. | San Cristóbal, Venezuela<br>
            gerencia.ve@altuspoint.com | +58 414-711-4583
          </p>
        </div>
      </div>
    `,
  });
}

// ──────────────────────────────────────────
// NEW ORDER NOTIFICATION (to admin)
// ──────────────────────────────────────────
export async function sendNewOrderNotification(data: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  totalUsd: number;
  paymentMethod: string;
  itemCount: number;
}) {
  const { orderId, customerName, customerEmail, totalUsd, paymentMethod, itemCount } = data;
  const orderIdShort = orderId.slice(0, 8).toUpperCase();

  const paymentLabels: Record<string, string> = {
    bank_transfer: 'Transferencia Bancaria',
    pago_movil: 'Pago Móvil',
    zelle: 'Zelle',
    paypal: 'PayPal',
    crypto: 'Criptomonedas',
  };

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nuevo pedido #${orderIdShort} - $${totalUsd.toFixed(2)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #7AB648; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Nuevo pedido recibido</h1>
        </div>
        <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 130px;">Pedido:</td>
              <td style="padding: 8px 0; font-weight: 600;">#${orderIdShort}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Cliente:</td>
              <td style="padding: 8px 0; font-weight: 600;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${customerEmail}" style="color: #6B8EC2;">${customerEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Productos:</td>
              <td style="padding: 8px 0;">${itemCount} artículos</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Método de pago:</td>
              <td style="padding: 8px 0;">${paymentLabels[paymentMethod] || paymentMethod}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Total:</td>
              <td style="padding: 8px 0; font-size: 20px; font-weight: 700; color: #0B1D4F;">$${totalUsd.toFixed(2)}</td>
            </tr>
          </table>
          <a href="https://altuspoint.health/es/admin/pedidos" style="display: inline-block; margin-top: 20px; background: #0B1D4F; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Ver en Admin Panel
          </a>
        </div>
      </div>
    `,
  });
}
