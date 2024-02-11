import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import ButtonTable from '../../common/ButtonTable/ButtonTable';
import { NavLink } from 'react-router-dom';

const CardTable = (props) => {
  
  return (
    <Container>
      <Stack direction="horizontal" className="border-3 border-bottom border-light" gap={4} >
        <div className="text-outline p-2 fs-4">Table: {props.tableId}</div>
        <div className="text-outline p-2 fs-6">Status: {props.status}</div>
        <div className="p-2 ms-auto">
          <ButtonTable as={NavLink} to={`/table/${props.tableId}`} status={props.status}>
            Show More
          </ButtonTable>

        </div>
      </Stack>
    </Container>
  );
}

export default CardTable;