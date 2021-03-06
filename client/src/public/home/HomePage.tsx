import React, { useEffect } from 'react';
import { Link, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import BeforeTestingStepper from './components/BeforeTestingStepper';
import DuringTestingStepper from './components/DuringTestingStepper';
import PlaceInputForm from './components/PlaceInputForm';
import { PlacesContext } from './components/PlacesContext';
import { PlaceType } from './components/PlaceType';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginTop: theme.spacing(3),
    },
  }),
);

export function HomePage() {
  const classes = useStyles();
  const [places, setPlaces] = React.useState<PlaceType[]>([]);
  const [placesError, setPlacesError] = React.useState<string | null>(null);

  const refreshPlaces = () => {
    fetch('/api/collectionpoints')
      .then(res => res.json())
      .then(
        result => {
          setPlaces(result);
        },
        error => {
          setPlacesError(error);
        },
      );
  };
  useEffect(refreshPlaces, []);

  return (
    <PlacesContext.Provider value={{ places, error: placesError }}>
      <div style={{ marginTop: '3em', marginBottom: '6em' }}>
        <Typography variant="h1" component="h2">
          Som v rade
        </Typography>
        <Typography variant="h3" component="h4" gutterBottom>
          a chcem pomôcť
        </Typography>
        <Typography variant="body1" gutterBottom>
          Už túto sobotu a nedeľu sa postavíme do radu ku odberovým miestam. Aby sme spoločne
          obmedzili počet ľudí čakajúcich zároveň, informujme sa, koľko ľudí aktuálne čaká pred
          odberovým miestom. Čas, ktorý by sme strávili vonku v skupine ľudí čakaním možno v
          nepriaznivom počasí, budeme môcť stráviť v pohodlí domova.
        </Typography>

        <Typography variant="h5" gutterBottom className={classes.header}>
          Čo je k tomu potrebné?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Stačí, aby ste mali mobilné pripojenie a pri príchode na odberové miesto zadali na túto
          stránku počet ľudí, ktorí čakajú v rade na danom odberovom mieste. Pre Vás je to otázka
          niekoľkých sekúnd, iným to môže ušetriť desiatky minúť až hodín.
        </Typography>

        <Typography variant="h5" gutterBottom className={classes.header}>
          Ako bude stránka fungovať?
        </Typography>
        {/*<Alert severity="warning">*/}
        {/*  Ospravedlňujeme sa za momentálne výpadky služby. Služba je v pilotnom testovaní a v priebehu dnešného dňa*/}
        {/*  prebehne navýšenie výpočtových zdrojov pre bezproblémový beh počas víkendu.*/}
        {/*</Alert>*/}
        <Typography variant="body1" gutterBottom>
          Momentálne je stránka vo vývoji, informácie o samotnom vývoji získate nižšie. Princíp
          fungovania stránky bude ale nasledovný:
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.header}>
          Pred testovaním
        </Typography>
        <BeforeTestingStepper />
        <Typography variant="h6" gutterBottom className={classes.header} id="na-odbernom-mieste">
          Na odbernom mieste
        </Typography>
        <DuringTestingStepper />

        <Typography variant="h5" gutterBottom className={classes.header} id="pridat-odberne-miesto">
          Požiadať o pridanie odberného miesta
        </Typography>
        <Typography variant="body1" gutterBottom>
          Momentálne máme niekoľko stoviek požiadaviek na pridanie odberového miesta. Snažíme sa ich prechádzať a
          odstraňovať duplicitné, prípadne zle zadané miesta. Stále Vám chceme ale nechať možnosť, pridať aj Vaše
          odberné miesto, ak v zozname vyšie ešte nie je uvedené.
        </Typography>
        <Alert severity="warning">
          Skontrolujte, či sa odberné miesto už nenachádza v systéme. Vášu požiadavku na pridanie sa budeme
          snažiť schváliť čo najskôr.
        </Alert>
        <PlaceInputForm onChange={refreshPlaces} />

        <Typography variant="h5" gutterBottom className={classes.header}>
          Prosba
        </Typography>
        <Typography variant="body1" gutterBottom>
          Šírte odkaz na túto stránku medzi čo najviac ľudí, len tak bude mať zmysel a pomôžeme si
          navzájom.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tiež prosíme o jej sledovanie a informovanie nás, aké odberové miesta budú vo Vašom okolí,
          aby sme ich vopred vložili do databázy.
        </Typography>

        <Typography variant="h5" gutterBottom className={classes.header}>
          Informácie o vývoji stránky
        </Typography>
        <Typography variant="body1" gutterBottom>
          Momentálne je stránka vo vývoji. Vývoj prebieha verejne a môžete ho sledovať na stránke
          &nbsp;
          <Link href="https://github.com/psekan/somvrade">https://github.com/psekan/somvrade</Link>.
          Akékoľvek otázky môžete tiež zasielať na email{' '}
          <Link href="mailto:somvrade@gmail.com">somvrade@gmail.com</Link>
          &nbsp;a budeme radi, ak sa zapojíte a pomôžete nám stránku širiť ďalej, prípadne pomôžete
          s jej vývojom.
        </Typography>
      </div>
    </PlacesContext.Provider>
  );
}
