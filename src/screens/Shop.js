import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import routes from "../routes";

const SEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`;

const DELETE_SHOP_MUTATION = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

function Shop() {
  const history = useHistory();
  const { id: getId } = useParams();
  console.log(getId);

  const { data } = useQuery(
    SEE_SHOP_QUERY,
    {
      variables: {
        id: getId * 1,
      },
    },
    fetchData
  );

  function fetchData() {
    if (!data) {
      history.push(routes.home);
    }
  }

  const updateDeleteShop = (cache, result) => {
    const {
      data: {
        deleteCoffeeShop: { ok, error },
      },
    } = result;

    if (!ok) {
      alert(`${error}`);
    } else {
      cache.evict({ id: `CoffeeShop:${getId}` });
      alert("정상적으로 삭제 완료되었습니다.");
      history.push(routes.home);
    }
  };

  const [deleteShopMutation, { loading: deleteLoading }] = useMutation(
    DELETE_SHOP_MUTATION,
    {
      variables: {
        id: getId * 1,
      },
      update: updateDeleteShop,
    }
  );

  const deleteData = () => {
    if (deleteLoading) return false;
    if (window.confirm("해당 글을 삭제하시겠습니까?")) deleteShopMutation();
  };

  return (
    <Layout>
      <PageTitle title="Shop" />
      <div>카페이름 : {data?.seeCoffeeShop.name}</div>
      <div>위도 : {data?.seeCoffeeShop.latitude}</div>
      <div>경도 : {data?.seeCoffeeShop.longitude}</div>
      <div>생성날짜 : {data?.seeCoffeeShop.createdAt}</div>
      <div>수정날짜 : {data?.seeCoffeeShop.updatedAt}</div>
      <Button onClick={deleteData}>삭제</Button>
    </Layout>
  );
}

export default Shop;
