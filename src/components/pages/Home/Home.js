import styles from './Home.module.scss';
import ListsTables from '../../features/ListsTables/ListsTables';

const Home = () => {
  return (
    <section className={styles.section}>
      <ListsTables />
    </section>
  );
};

export default Home;