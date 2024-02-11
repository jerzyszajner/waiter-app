import React, { useState, useEffect } from 'react';
import { Container, Stack } from 'react-bootstrap';
import TextInput from '../../common/TextInput/TextInput';
import styles from './PeopleAmount.module.scss';

const PeopleAmount = ({
  table,
  tempStatus,
  setTempPeopleAmount,
  setTempMaxPeopleAmount,
}) => {
  const [localTempPeopleAmount, setLocalTempPeopleAmount] = useState('0');
  const [localTempMaxPeopleAmount, setLocalTempMaxPeopleAmount] = useState('0');

  useEffect(() => {
    if (table && tempStatus === 'Busy') {
      setLocalTempPeopleAmount(table.peopleAmount.toString());
      setLocalTempMaxPeopleAmount(table.maxPeopleAmount.toString());
    } else {
      setLocalTempPeopleAmount('0');
      setLocalTempMaxPeopleAmount('0');
    }
  }, [table, tempStatus]);

  const handlePeopleAmountChange = (e) => {
    const newValue = Math.max(0, Math.min(10, Number(e.target.value)));
    setLocalTempPeopleAmount(newValue.toString());
    setTempPeopleAmount(newValue.toString());

    if (newValue > Number(localTempMaxPeopleAmount)) {
      setLocalTempMaxPeopleAmount(newValue.toString());
      setTempMaxPeopleAmount(newValue.toString());
    }
  };

  const handleMaxPeopleAmountChange = (e) => {
    const newValue = Math.max(0, Math.min(10, Number(e.target.value)));
    if (newValue < Number(localTempPeopleAmount)) {
      setLocalTempMaxPeopleAmount(localTempPeopleAmount);
      setTempMaxPeopleAmount(localTempPeopleAmount);
    } else {
      setLocalTempMaxPeopleAmount(newValue.toString());
      setTempMaxPeopleAmount(newValue.toString());
    }
  };

  return (
    <Container className={styles.peopelContainer}>
      <Stack direction="horizontal" gap={2} className={styles.stack}>
        <div className={`${styles.label} text-outline`}>People:</div>
        <TextInput
          className={styles.input}
          type="number"
          value={localTempPeopleAmount}
          onChange={handlePeopleAmountChange}
        />
        <span className={`${styles.divider} text-outline`}>/</span>
        <TextInput
          className={styles.input}
          type="number"
          value={localTempMaxPeopleAmount}
          onChange={handleMaxPeopleAmountChange}
        />
      </Stack>
    </Container>
  );
};

export default PeopleAmount;