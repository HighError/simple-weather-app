export default function getClassBackground(s) {
  switch (s) {
    case 'Rain':
      return 'rain';
    case 'Clouds':
      return 'cloud';
    case 'Clear':
      return 'sun';
    case 'Snow':
      return 'snow';
    default:
      return 'default';
  }
}
