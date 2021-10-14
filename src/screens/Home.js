import { useHistory } from "react-router";
import { logUserOut } from "../apollo";
import Layout from "../components/Layout";
import { ShopCard } from "../components/shop/ShopCard";
import Title from "../components/Title";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import routes from "../routes";
import { gql, useQuery } from "@apollo/client";

const SEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($lastId: Int!) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      latitude
      longitude
    }
  }
`;

function Home() {
  const history = useHistory();
  const { data, loading } = useQuery(SEE_SHOPS_QUERY, {
    variables: {
      lastId: 0,
    },
  });
  return (
    <Layout>
      <Title>NomadCoffee</Title>
      <Button>
        <Link to={routes.add}>Add Shop!</Link>
      </Button>
      <Button onClick={() => logUserOut(history)}>Log out now!</Button>
      {loading ? (
        <h1>로딩중</h1>
      ) : (
        data?.seeCoffeeShops?.map((shop) => (
          <ShopCard
            link={"/shop/" + shop.id}
            title={shop.name}
            description={shop.latitude + " , " + shop.longitude}
          />
        ))
      )}
    </Layout>
  );
}
export default Home;
