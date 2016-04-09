import operators from './test/operators';
import Rx from 'rx';


// =============== CORE ===============

export default function () {
  const launcherInput = operators['Launcher.input']();

  const intervalSource = operators['Test.interval']();

  const launcherInputTransformed = launcherInput.let( operators['Test.transform_1'] );
  const intervalSourceTransformed = intervalSource.let( operators['Test.transform_2'] );

  const input = Rx.Observable.merge( launcherInputTransformed, intervalSourceTransformed )
    .let( operators['Launcher.transform'] );

  Rx.Observable.concat( operators['Launcher.init']().ignoreElements(), input )
    .let( operators['Launcher.output'] );
}
