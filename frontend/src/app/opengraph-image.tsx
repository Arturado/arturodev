import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Arturo Vasquez — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F0F0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ color: '#C17B5C', fontSize: 18, letterSpacing: '0.2em', marginBottom: 24, fontFamily: 'monospace' }}>
          arturodev.info
        </div>
        <div style={{ color: '#EDEDED', fontSize: 72, fontWeight: 800, lineHeight: 1, marginBottom: 24 }}>
          Arturo Vasquez
        </div>
        <div style={{ color: 'rgba(237,237,237,0.6)', fontSize: 32, fontWeight: 400 }}>
          Full Stack Developer
        </div>
        <div style={{ color: 'rgba(237,237,237,0.3)', fontSize: 18, marginTop: 48, fontFamily: 'monospace' }}>
          WordPress · React · NestJS · Magento · Docker
        </div>
      </div>
    ),
    { ...size }
  );
}
