import React from 'react';
import { Form, Container } from 'react-bootstrap';
import styles from './Status.module.scss'; // Import stylów

const statusOptions = [
  { value: 'Free', label: 'Free' },
  { value: 'Busy', label: 'Busy' },
  { value: 'Reserved', label: 'Reserved' },
  { value: 'Cleaning', label: 'Cleaning' },
];

const Status = ({ status, onStatusChange }) => {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange(newStatus);
  };

  return (
    <Container className={styles.statusContainer}>
      <div className={styles.stack}>
        <div className={`${styles.label} text-outline`}>Status:</div>
        <Form.Select
          aria-label="Default select example"
          className={styles.select}
          value={status}
          onChange={handleStatusChange}
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Form.Select>
      </div>
    </Container>
  );
};

export default Status;