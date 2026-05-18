import { FC } from 'react';
import {Box, SxProps, Theme, Typography} from "@mui/material";

const Home: FC = () => {
  return (
    <Box sx={styles.layout}>
      <Box sx={styles.container}>
        <Typography variant="h3" component="h1" sx={styles.title}>
          🧠 Memory AI
        </Typography>

        <Typography variant="h6" sx={styles.subtitle}>
          Персональная база знаний с умным контекстом
        </Typography>

        <Box sx={styles.specBox}>
          <Typography variant="body2" sx={styles.specItem}>• Умные чаты со сквозными хэштегами</Typography>
          <Typography variant="body2" sx={styles.specItem}>• Гибридный контекст: 5 последних + 20 релевантных сообщений</Typography>
          <Typography variant="body2" sx={styles.specItem}>• Локальный векторный поиск на LanceDB</Typography>
          <Typography variant="body2" sx={styles.specItem}>• Генерация ответов через Gemini API</Typography>
        </Box>

        <Typography variant="caption" sx={styles.footer}>
          Next.js • React • LanceDB • Docker
        </Typography>
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  layout: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'background.default',
    color: 'text.primary',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  container: {
    textAlign: 'center',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 700,
    color: '#fff',
    marginBottom: 1,
  },
  subtitle: {
    color: 'primary.main',
    fontWeight: 500,
    marginBottom: 4,
  },
  specBox: {
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
    padding: 3,
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    marginBottom: 4,
  },
  specItem: {
    color: 'text.secondary',
    lineHeight: 1.4,
  },
  footer: {
    color: 'text.secondary',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
  },
};

export default Home;
