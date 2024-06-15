import AssignmentPrice from "./AssignmentPrice";
import Banner from "./Banner";
import FAQ from "./FAQ";
import Feature from "./Feature";
import Web from "./Web";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Feature></Feature>
      <FAQ></FAQ>
      <Web></Web>   
      <AssignmentPrice></AssignmentPrice> 
    </div>
  );
};

export default Home;
