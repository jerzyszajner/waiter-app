import ButtonTable from '../../common/ButtonTable/ButtonTable';
import Bill from '../../features/Bill/Bill';
import PeopleAmount from '../../features/PeopleAmount/PeopleAmount';
import Status from '../../features/Status/Status';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import styles from './Table.module.scss';
import {
  getTableById,
  updateTableStatus,
  updatePeopleAmount,
  updateBillAmount
} from '../../../redux/tablesRedux';

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tableId = parseInt(id);
  const table = useSelector((state) => getTableById(state, tableId));

  const [tempStatus, setTempStatus] = useState(table ? table.status : 'Free');
  const [tempPeopleAmount, setTempPeopleAmount] = useState('0');
  const [tempMaxPeopleAmount, setTempMaxPeopleAmount] = useState('0');
  const [billAmount, setBillAmount] = useState(0);

  useEffect(() => {
    if (!table) {
      navigate('/');
    } else {
      setTempStatus(table.status);
      setTempPeopleAmount(table.peopleAmount);
      setTempMaxPeopleAmount(table.maxPeopleAmount);
      setBillAmount(table.bill || 0);
    }
  }, [table, navigate]);

  const handleStatusChange = (newStatus) => {
    setTempStatus(newStatus);

    if (newStatus !== 'Busy') {
      setTempPeopleAmount('0');
      setTempMaxPeopleAmount('0');
      setBillAmount(0);
    }
  };

  const handleUpdate = () => {
    dispatch(updateTableStatus(tableId, tempStatus));
    dispatch(updatePeopleAmount(tableId, tempPeopleAmount, tempMaxPeopleAmount));
    dispatch(updateBillAmount(tableId, billAmount));
  };

  if (!table) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className={`${styles.tableTitle} text-outline`}>Table: {table.id}</h2>
      <Stack gap={3}>
        <Status status={tempStatus} onStatusChange={handleStatusChange} />
        <PeopleAmount
          table={table}
          tempStatus={tempStatus}
          tempPeopleAmount={tempPeopleAmount}
          tempMaxPeopleAmount={tempMaxPeopleAmount}
          setTempPeopleAmount={setTempPeopleAmount}
          setTempMaxPeopleAmount={setTempMaxPeopleAmount}
        />
        {tempStatus === 'Busy' && <Bill billAmount={billAmount} setBillAmount={setBillAmount} />}
      </Stack>
      <div className={`${styles.justifyContentEnd}`}>
        <ButtonTable
          as={NavLink}
          to={'/'}
          onClick={handleUpdate}
          className={`${styles.fixedWidthButton}`}
        >
          Update
        </ButtonTable>
      </div>
    </Container>
  );
};

export default Table;