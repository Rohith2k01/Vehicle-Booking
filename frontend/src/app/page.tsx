// pages/index.tsx
import Banner from '@/modules/user/Banner/Banner';
import CarCollection from '@/modules/user/CarCollection/CarCollection'
import Footer from '@/modules/user/components/Footer/Footer'
const Home: React.FC = () => {
  return (
    <div>
      <Banner />
      <CarCollection />
      <Footer />
    </div>
  );
};

export default Home;
