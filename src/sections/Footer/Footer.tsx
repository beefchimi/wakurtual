import {clx} from 'beeftools';

import {TextLink} from '../../components/index.js';
// @ts-expect-error no types
import styles from './Footer.module.css';

const LARGE_FOOTER = false;

function TempLargeFooter() {
  return (
    <div id="TempLargeFooter" style={{maxWidth: 600}}>
      <p className={styles.Text}>
        Bacon ipsum dolor amet boudin shankle strip steak porchetta, bacon kevin
        picanha leberkas buffalo sausage jowl hamburger tail sirloin. Cow ribeye
        hamburger chicken tri-tip salami frankfurter beef doner short ribs jerky
        spare ribs capicola pig. Shoulder venison cupim shank drumstick pork
        shankle kielbasa brisket ribeye filet mignon flank sausage. Burgdoggen
        short ribs short loin, meatloaf jerky shank andouille.
      </p>

      <p className={styles.Text}>
        Chicken sausage corned beef short ribs t-bone shank. Leberkas turkey
        meatloaf, cow alcatra kielbasa brisket pancetta. Brisket jerky pork chop
        ham salami pastrami. Prosciutto meatball fatback picanha meatloaf ribeye
        ground round ball tip short loin tongue.
      </p>

      <p className={styles.Text}>
        T-bone turkey biltong, swine chicken ground round tongue shankle.
        Shankle chicken short loin doner shank tongue tenderloin chuck jowl
        short ribs pork belly sirloin ham hock. Chuck shankle picanha jowl.
        Flank hamburger chicken pork meatloaf capicola turducken tail brisket
        prosciutto pork belly.
      </p>

      <p className={styles.Text}>
        Burgdoggen prosciutto leberkas pork chop flank jowl. Shank chicken
        shankle, porchetta filet mignon frankfurter jerky brisket buffalo bacon.
        Landjaeger jowl frankfurter, spare ribs bacon sirloin chicken kevin
        filet mignon tri-tip t-bone tongue pancetta. Ribeye ball tip rump,
        landjaeger capicola picanha pancetta shoulder short loin hamburger
        boudin alcatra meatloaf frankfurter. Burgdoggen porchetta frankfurter
        short ribs pork loin strip steak pancetta ham. Drumstick bresaola cow
        bacon corned beef boudin hamburger jerky porchetta leberkas spare ribs
        meatball kevin shoulder ball tip.
      </p>

      <p className={styles.Text}>
        Picanha meatloaf turducken shoulder, tenderloin pork belly short ribs
        ham rump alcatra doner hamburger. Ground round sirloin hamburger jowl.
        Ham hock shankle cow, chislic pork belly bresaola frankfurter prosciutto
        strip steak hamburger pork. Spare ribs beef ribs shoulder jerky.
      </p>

      <p className={styles.Text}>
        Bacon ipsum dolor amet boudin shankle strip steak porchetta, bacon kevin
        picanha leberkas buffalo sausage jowl hamburger tail sirloin. Cow ribeye
        hamburger chicken tri-tip salami frankfurter beef doner short ribs jerky
        spare ribs capicola pig. Shoulder venison cupim shank drumstick pork
        shankle kielbasa brisket ribeye filet mignon flank sausage. Burgdoggen
        short ribs short loin, meatloaf jerky shank andouille.
      </p>

      <p className={styles.Text}>
        Chicken sausage corned beef short ribs t-bone shank. Leberkas turkey
        meatloaf, cow alcatra kielbasa brisket pancetta. Brisket jerky pork chop
        ham salami pastrami. Prosciutto meatball fatback picanha meatloaf ribeye
        ground round ball tip short loin tongue.
      </p>

      <p className={styles.Text}>
        T-bone turkey biltong, swine chicken ground round tongue shankle.
        Shankle chicken short loin doner shank tongue tenderloin chuck jowl
        short ribs pork belly sirloin ham hock. Chuck shankle picanha jowl.
        Flank hamburger chicken pork meatloaf capicola turducken tail brisket
        prosciutto pork belly.
      </p>

      <p className={styles.Text}>
        Burgdoggen prosciutto leberkas pork chop flank jowl. Shank chicken
        shankle, porchetta filet mignon frankfurter jerky brisket buffalo bacon.
        Landjaeger jowl frankfurter, spare ribs bacon sirloin chicken kevin
        filet mignon tri-tip t-bone tongue pancetta. Ribeye ball tip rump,
        landjaeger capicola picanha pancetta shoulder short loin hamburger
        boudin alcatra meatloaf frankfurter. Burgdoggen porchetta frankfurter
        short ribs pork loin strip steak pancetta ham. Drumstick bresaola cow
        bacon corned beef boudin hamburger jerky porchetta leberkas spare ribs
        meatball kevin shoulder ball tip.
      </p>

      <p className={styles.Text}>
        Picanha meatloaf turducken shoulder, tenderloin pork belly short ribs
        ham rump alcatra doner hamburger. Ground round sirloin hamburger jowl.
        Ham hock shankle cow, chislic pork belly bresaola frankfurter prosciutto
        strip steak hamburger pork. Spare ribs beef ribs shoulder jerky.
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className={styles.Footer}>
      <p className={clx('text-box-trim', styles.Text)}>
        Made by{' '}
        <TextLink label="Curtis Dulmage" url="https://dulmage.me/" external />.
        Built using <TextLink label="Waku" url="https://waku.gg/" external />{' '}
        and{' '}
        <TextLink
          label="React Virtual"
          url="https://tanstack.com/virtual/latest"
          external
        />
        … among other awesome tools.
      </p>

      {LARGE_FOOTER ? <TempLargeFooter /> : null}
    </footer>
  );
}
