import Container from 'react-bootstrap/Container';
import CardTable from '../CardTable/CardTable';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getAllTables } from '../../../redux/tablesRedux';

const ListsTables = () => {
  const allTables = useSelector(getAllTables);

  if (allTables.length === 0) {
    return (
      <div className="text-outline mt-5 mb-5 d-flex align-items-center justify-content-center">
        <Spinner animation="border" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Container>
      <div><h3 className="text-outline fs-2 p-3">All tables</h3></div>
      {allTables.map((table) => (
        <Stack direction="horizontal" gap={3} key={table.id} className="mb-3">
          <CardTable tableId={table.id} status={table.status} />
        </Stack>
      ))}
    </Container>
  );
}

export default ListsTables;
