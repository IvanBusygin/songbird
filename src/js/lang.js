export default function determineLang() {
  const localLang = localStorage.getItem('lang');
  return ['ru', 'en'].includes(localLang) ? localLang : 'ru';
}
