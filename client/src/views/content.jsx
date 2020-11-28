import React from 'react';
import styles from './css/views.module.css';
import { Link as ReactLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { GridItem, Text } from '@chakra-ui/react';

function ColText(props) {
  const teamMotto = props.content.teamMotto ? (
    <Text textStyle="em">{props.content.teamMotto}</Text>
  ) : (
    <span />
  );
  return props.content.borderTop ? (
    <GridItem
      colSpan={props.content.colSize}
      rowStart={props.content.rowStart}
      colStart={props.content.colStart}
    >
      <div className={styles['with-border-top']}>
        <Text textStyle="h2">{props.content.title}</Text>
        <Text textStyle="paragraph">{props.content.text}</Text>
        {teamMotto}
      </div>
    </GridItem>
  ) : (
    <GridItem
      colSpan={props.content.colSize}
      rowStart={props.content.rowStart}
      colStart={props.content.colStart}
    >
      <Text textStyle="paragraph">{props.content.text}</Text>
      {teamMotto}
    </GridItem>
  );
}

function ColImage(props) {
  return props.content.multiple ? (
    <GridItem
      colSpan={props.content.colSize}
      rowStart={props.content.rowStart}
      colStart={props.content.colStart}
    >
      <figure className={styles.gameCharacters}>
        {props.images.map((img, i) => (
          <img key={i} src={img.imgSrc} alt={img.imgAlt} />
        ))}
        <figcaption className={styles.caption}>
          <Text textStyle="imageCaptions">{props.content.imgCaption}</Text>
        </figcaption>
      </figure>
    </GridItem>
  ) : (
    <GridItem colSpan={props.content.colSize} rowStart={props.content.rowStart}>
      <figure>
        <img
          src={props.content.imgSrc}
          alt={props.content.imgAlt}
          className={styles[props.content.style]}
        />
        <figcaption className={styles.caption}>
          <Text textStyle="imageCaptions">{props.content.imgCaption}</Text>
        </figcaption>
      </figure>
    </GridItem>
  );
}

function Suspects(props) {
  return (
    <GridItem colSpan={props.content.colSize}>
      <div className={`${styles['with-border-top']} ${styles['suspects']}`}>
        <figure>
          <img src={props.content.imgSrc} alt={props.content.imgAlt} />
          <figcaption className={styles.caption}>
            <Text textStyle="imageCaptions">
              {props.content.imgCaption} - {props.content.location}
            </Text>
          </figcaption>
        </figure>
        <Text textStyle="h2">{props.content.title}</Text>
        <Text textStyle="paragraph">{props.content.text}</Text>
      </div>
    </GridItem>
  );
}

function Banner(props) {
  let { buttonText, buttonName, bannerImg, searchImg } = props;
  return (
    <GridItem
      colStart={{
        xl: 4,
        lg: 'auto',
        md: 'auto',
        sm: 'auto',
      }}
      rowStart={{
        xl: 1,
        lg: 7,
        md: 7,
        sm: 7,
      }}
      colSpan={{
        xl: 1,
        lg: 4,
        md: 4,
        sm: 4,
      }}
    >
      <div className={styles.banner}>
        {/* fixme this need sto be updated to either creating or joining a lobby! */}
        <Link as={ReactLink} to="/0/lobby" style={{ textDecoration: 'none' }}>
          <div className={styles.primary}>
            <figure>
              <Text textStyle="h4">{buttonText}</Text>
              <img
                src={bannerImg.imgSrc}
                alt={bannerImg.imgAlt}
                className={styles[bannerImg.style]}
              />
              <Text textStyle="h4">{buttonText}</Text>
            </figure>
          </div>
          <div className={styles.secondary}>
            <div className={styles.centered}>
              <Text textStyle="h4">{buttonName}</Text>
              <figure>
                <img
                  src={searchImg.imgSrc}
                  alt={searchImg.imgAlt}
                  className={styles[searchImg.style]}
                />
              </figure>
            </div>
          </div>
        </Link>
      </div>
    </GridItem>
  );
}

function sectionTitle(props) {
  let { title, styling, colSize, rowStart } = props;
  styling = styling.map((className) => styles[className]);
  return (
    <GridItem rowStart={rowStart} colSpan={colSize} className={styling}>
      <Text textStyle="h3">{title}</Text>
    </GridItem>
  );
}

export { ColText, ColImage, Suspects, sectionTitle, Banner };
