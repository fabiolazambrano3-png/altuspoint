import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'AltusPoint - Distribuidora de Material y Equipos Médicos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoPath = join(process.cwd(), 'public', 'images', 'logo.png');
  const logoData = await readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B1D4F 0%, #1a3478 50%, #0B1D4F 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex',
          }}
        />
        <img
          src={logoBase64}
          width={500}
          height={150}
          style={{
            filter: 'brightness(0) invert(1)',
            marginBottom: 30,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 400,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Distribuidora de Material y Equipos Médicos
        </div>
        <div
          style={{
            width: 80,
            height: 3,
            background: 'linear-gradient(90deg, #4A90D9, #6BB5FF)',
            marginTop: 24,
            marginBottom: 24,
            borderRadius: 2,
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: 3,
          }}
        >
          altuspoint.health
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
