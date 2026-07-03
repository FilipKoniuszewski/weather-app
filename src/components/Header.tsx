import { assetUrl } from '../utils/assetUrl';

const Header = () => (
  <header className="app__header">
    <a className="app__logo-link" href={import.meta.env.BASE_URL} aria-label="Weather Now home">
      <img className="app__logo" src={assetUrl('assets/images/logo.svg')} alt="" />
    </a>
  </header>
);

export default Header;
