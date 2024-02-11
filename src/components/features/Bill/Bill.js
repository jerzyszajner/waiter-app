import TextInput from '../../common/TextInput/TextInput';
import { useState, useEffect } from 'react';
import { Container, Stack } from 'react-bootstrap';
import styles from './Bill.module.scss';

const Bill = ({ billAmount, setBillAmount }) => {
  const [localBillAmount, setLocalBillAmount] = useState('0');

  useEffect(() => {
    setLocalBillAmount(billAmount.toString());
  }, [billAmount]);

  const handleBillAmountChange = (e) => {
    const newBillAmount = Number(e.target.value);
    if (newBillAmount >= 0) {
      setLocalBillAmount(newBillAmount.toString());
      setBillAmount(newBillAmount);
    } else {
      setLocalBillAmount('0');
      setBillAmount(0);
    }
  };


  return (
    <Container className={styles.billContainer}>
      <Stack direction="horizontal" gap={2} className={styles.stack}>
        <div className={`${styles.label} text-outline`}>Bill:</div>
        <span className={`${styles.currency} text-outline`}>$</span>
        <TextInput
          className={styles.input}
          type="number"
          value={localBillAmount}
          onChange={handleBillAmountChange}
        />
      </Stack>
    </Container>
  );
};

export default Bill;