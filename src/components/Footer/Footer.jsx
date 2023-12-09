import { ComponentFooter } from './Footer.styled';
// import { IconGoIt } from '../../images/logo.png';

export const Footer = () => {
  return (
    <ComponentFooter>
      <div>
        <p>
          <a
            href="https://github.com/GeorgiySergeev "
            target="_blank"
            rel="noreferrer noopener"
          >
            Georgiy Sergeev{' '}
          </a>
          GoIt Full Stack FSON 92
        </p>
        <a
          href="https://goit.global/ua/"
          target="_blank"
          rel="noreferrer noopener"
        >
          {/* <img src={IconGoIt} alt="" width="100px" height="30px" /> */}
        </a>
      </div>
    </ComponentFooter>
  );
};
