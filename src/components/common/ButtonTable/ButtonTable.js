import Button from 'react-bootstrap/Button';

const ButtonTable = ({ onClick, children, status, ...otherProps }) => {
  let buttonVariant;

  switch (status) {
    case 'Free':
      buttonVariant = 'success';
      break;
    case 'Busy':
      buttonVariant = 'danger';
      break;
    case 'Reserved':
      buttonVariant = 'warning';
      break;
    case 'Cleaning':
      buttonVariant = 'info';
      break;
    default:
      buttonVariant = 'success';
  }

  return (
    <Button variant={`${buttonVariant} opacity-75`} onClick={onClick} {...otherProps}>
      {children}
    </Button>
  );
};

export default ButtonTable;