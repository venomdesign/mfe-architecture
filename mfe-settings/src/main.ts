import { initFederation } from '@angular-architects/native-federation';

// When running standalone (direct browser access), no manifest needed
// When loaded by shell, federation is already initialized
initFederation()
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
