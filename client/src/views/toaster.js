import { Position, Toaster } from '@blueprintjs/core';

/** Singleton toaster instance. Create separate instances for different options. */
// TODO should we look into making this either a hook or a context?
export const AppToaster = Toaster.create({
  className: 'recipe-toaster',
  position: Position.TOP,
});
