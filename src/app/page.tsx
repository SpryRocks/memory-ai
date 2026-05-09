import { FC } from 'react';
import Image from 'next/image';

const Home: FC = () => {
  return (
    <main style={{
      backgroundColor: '#0D1117',
      color: '#E6EDF3',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ marginBottom: '32px', position: 'relative' }}>
        <Image
          src="/icon.png"
          alt="Memory AI Logo"
          width={120}
          height={120}
          priority
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#58A6FF',
          filter: 'blur(50px)',
          opacity: 0.15,
          zIndex: -1
        }} />
      </div>

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 800,
        marginBottom: '16px',
        background: 'linear-gradient(90deg, #58A6FF, #79C0FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Memory AI
      </h1>

      <p style={{
        maxWidth: '600px',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#8B949E'
      }}>
        Memory AI is an intelligent knowledge and chat management system that
        combines the power of cloud-based AI with local vector search.
      </p>
    </main>
  );
}

export default Home;
