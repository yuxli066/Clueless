import React from 'react';
import styles from './css/views.module.css';
import { Container, useColorModeValue, Center } from '@chakra-ui/react';
import alertImg from '../images/alert-page-not-found.png';

function PageNotFound() {
  const bg = useColorModeValue('tan.50', 'black.50');
  const color = useColorModeValue('black.900', 'black.900');
  return (
    <Container className={styles.innerContainer} bg={bg} color={color} style={{ padding: '0' }}>
      <div className={styles.notFoundPage}>
        <div
          style={{
            position: 'relative',
            background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(${alertImg})`,
            color: `${color}`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            width: '100%',
          }}
          className={styles.notFoundImage}
        >
          <Center>
            <h1 className={styles.notFoundText}> 404 - PAGE NOT FOUND</h1>
          </Center>
        </div>
      </div>
    </Container>
  );
}

export default PageNotFound;
