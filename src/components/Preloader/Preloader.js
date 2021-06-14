import './Preloader.css'

import Preload from '../../vendor/Preloader/Preloader';

export default function Preloader({ active }) {
  return (
    <div className={'overlay' + (active ? ' overlay--active' : '')}>
      <div className="overlay__icon"><Preload/></div>
    </div>
  );
}
