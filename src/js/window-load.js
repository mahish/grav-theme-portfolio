import footer from './footer';

const windowLoad = () => {

  footer();

  document.querySelector('.loading').classList.remove('loading');
};

export default windowLoad;
