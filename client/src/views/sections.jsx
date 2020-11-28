import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import styles from './css/views.module.css';
import * as contentHelpers from './content';
import { useContentContext } from '../ContentProvider.jsx';

/*TODO: Nav Bar*/
/*TODO: Suspect Social Icons*/
function HeaderSection() {
  const Content = useContentContext();
  return (
    <Grid gridAutoColumns={true} className={`${styles.sections} ${styles.header}`}>
      <GridItem>
        <Text textStyle="h1">{Content.text.mainTitle}</Text>
      </GridItem>
      <GridItem className={styles.dateTime}>
        <Text textStyle="paragraph">
          {new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date())}
        </Text>
      </GridItem>
    </Grid>
  );
}

function LandingSection() {
  const Content = useContentContext();
  const boardImg = {
    imgSrc: Content.images['client_src_images_landing_page_board'].default,
    imgAlt: 'Clueless Gameboard',
    imgCaption: "Mr. Boddy's Mansion",
  };
  const boddyImg = {
    imgSrc: Content.images['client_src_images_boddy'].default,
    imgAlt: 'Mr. Boddy',
    imgCaption: 'Mr. Boddy - (Deceased), ',
  };
  const characters1Img = {
    imgSrc: Content.images['client_src_images_plum_scarlet_mustard'].default,
    imgAlt: 'Characters 1',
    imgCaption: 'Professor Plum, Miss Scarlet, Colonel Mustard',
  };
  const characters2Img = {
    imgSrc: Content.images['client_src_images_white_green_peacock'].default,
    imgAlt: 'Characters 2',
    imgCaption: 'Mrs. White, Mr. Green, Mrs. Peacock',
  };
  const banner = {
    imgSrc: Content.images['client_src_images_mustard_banner'].default,
    imgAlt: 'Colonel Mustard',
    imgCaption: '',
  };
  const searchIcon = {
    imgSrc: Content.images['client_src_images_mystery'].default,
    imgAlt: 'searchIcon',
    imgCaption: '',
  };
  return (
    <Grid
      columnGap={'2ch'}
      rowGap={'2ch'}
      templateColumns={{
        xl: '1fr 1fr 1fr 20%',
        lg: '1fr 1fr 1fr',
        md: '1fr 1fr 1fr',
        sm: '1fr 1fr 1fr',
      }}
      templateRows={{
        xl: '150px 50% 10px auto',
        lg: 'auto',
        md: 'auto',
        sm: 'auto',
      }}
      className={styles.sections}
    >
      <contentHelpers.sectionTitle
        title={Content.text.title1}
        colSize={{ xl: 3, lg: 4, md: 4, sm: 4 }}
        rowStart={{ xl: 1, lg: 1, md: 1, sm: 1 }}
        styling={['title-large']}
      />
      <contentHelpers.Banner
        buttonText={Content.text.ButtonText}
        buttonName={Content.text.ButtonName}
        bannerImg={banner}
        searchImg={searchIcon}
      />
      <contentHelpers.ColText
        content={{
          colSize: { xl: 1, lg: 4, md: 4, sm: 4 },
          rowStart: { xl: 2, lg: 2, md: 2, sm: 2 },
          text: Content.text.Introduction1,
        }}
      />
      <contentHelpers.ColText
        content={{
          colSize: { xl: 1, lg: 4, md: 4, sm: 4 },
          colStart: { xl: 2, lg: 1, md: 1, sm: 1 },
          rowStart: { xl: 2, lg: 3, md: 3, sm: 3 },
          text: Content.text.Introduction2,
          teamMotto: Content.text.teamMotto,
        }}
      />
      <contentHelpers.ColImage
        content={{
          colSize: { xl: 1, lg: 4, md: 4, sm: 4 },
          colStart: { xl: 3, lg: 1, md: 1, sm: 1 },
          rowStart: { xl: 2, lg: 4, md: 4, sm: 4 },
          multiple: true,
          imgCaption:
            boddyImg.imgCaption + ` ${characters1Img.imgCaption} ${characters2Img.imgCaption}`,
        }}
        images={[boddyImg, characters1Img, characters2Img]}
      />
      <contentHelpers.ColImage
        content={{
          colSize: { xl: 1, lg: 4, md: 4, sm: 4 },
          rowStart: { xl: 4, lg: 5, md: 5, sm: 5 },
          ...boardImg,
        }}
      />
      <contentHelpers.ColText
        content={{
          colSize: { xl: 3, lg: 4, md: 4, sm: 4 },
          rowStart: { xl: 4, lg: 6, md: 6, sm: 6 },
          borderTop: true,
          title: 'More Game Lore',
          text: Content.text.Introduction2,
        }}
      />
    </Grid>
  );
}

const SuspectsSection = () => {
  const Content = useContentContext();
  return (
    <Grid
      templateColumns="repeat(2, 6fr)"
      templateRows="75px auto"
      className={`${styles.suspects} ${styles.withBorderTop} ${styles.sections}`}
    >
      <contentHelpers.sectionTitle
        title={Content.text.title2}
        colSize={2}
        styling={['title-large']}
      />
      {Content.text.Suspects.map((suspect, i) => {
        return (
          <contentHelpers.Suspects
            key={i}
            content={{
              imgSrc: Content.images[suspect.name.replace(/\s/, '').trim()].default,
              imgAlt: suspect.name,
              imgCaption: suspect.name,
              title: suspect.title,
              text: suspect.bio,
              location: suspect.location,
              colSize: { xl: 1, lg: 2, md: 2, sm: 2 },
            }}
          />
        );
      })}
    </Grid>
  );
};

const HowToPlaySection = () => {
  const Content = useContentContext();
  return (
    <div className={`${styles['with-border-top']} ${styles.sections}`}>
      <contentHelpers.sectionTitle
        title={Content.text.title3}
        colSize={2}
        styling={['title-large']}
      />
      <Grid templateColumns="1fr 1fr">
        <contentHelpers.ColText
          content={{ colSize: { xl: 1, lg: 2, md: 2, sm: 2 }, text: Content.text['Instructions1'] }}
        />
        <contentHelpers.ColText
          content={{ colSize: { xl: 1, lg: 2, md: 2, sm: 2 }, text: Content.text['Instructions4'] }}
        />
        <contentHelpers.ColText
          content={{ colSize: { xl: 1, lg: 2, md: 2, sm: 2 }, text: Content.text['Instructions2'] }}
        />
        <contentHelpers.ColText
          content={{ colSize: { xl: 1, lg: 2, md: 2, sm: 2 }, text: Content.text['Instructions5'] }}
        />
        <contentHelpers.ColText
          content={{ colSize: { xl: 1, lg: 2, md: 2, sm: 2 }, text: Content.text['Instructions6'] }}
        />
      </Grid>
    </div>
  );
};

const FooterSection = () => {
  const Content = useContentContext();
  return (
    <Grid className={styles.sections}>
      <GridItem gridAutoColumns={true} md={12} className={styles.footer}>
        <Text textStyle="paragraph">{Content.text.footer}</Text>
      </GridItem>
    </Grid>
  );
};

export { LandingSection, SuspectsSection, HeaderSection, HowToPlaySection, FooterSection };
