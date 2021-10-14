import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { HeaderContainer, Subtitle } from "../components/shared";
import routes from "../routes";

const CREATE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photos: [Upload]
    $categories: [String]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photos: $photos
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

function Add() {
  const history = useHistory();

  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      createCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      alert(error);
    }

    history.push(routes.home);
  };

  const [createCoffeeShop, { loading }] = useMutation(CREATE_SHOP_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return false;
    }

    const { name, latitude, longitude, files, categories } = getValues();
    let fileObj;
    if (files) fileObj = files;
    let categoryObjs = [];
    if (categories) {
      categoryObjs = categories.split(",");
    }

    createCoffeeShop({
      variables: {
        name,
        latitude,
        longitude,
        file: fileObj,
        categories: categoryObjs,
      },
    });
  };

  return (
    <Layout>
      <PageTitle title="Add Shop" />
      <FormBox>
        <HeaderContainer>
          <Subtitle>카페를 등록해보세요!</Subtitle>
        </HeaderContainer>
        <form
          method="post"
          enctype="multipart/form-data"
          onSubmit={handleSubmit(onSubmitValid)}
        >
          <Input
            {...register("name", {
              required: "카페 이름을 입력해주세요.",
            })}
            name="name"
            maxlength="100"
            type="text"
            placeholder="카페 이름"
          />
          <textarea
            {...register("categories")}
            name="categories"
            placeholder="카테고리는 쉼표로 구분됩니다."
            style={{ width: "100%", marginTop: "1vh" }}
          />
          <Input
            {...register("latitude", {
              required: "위도를 입력해주세요.",
            })}
            type="text"
            name="latitude"
            placeholder="위도"
          />
          <Input
            {...register("longitude", {
              required: "경도를 입력해주세요.",
            })}
            type="text"
            name="longitude"
            placeholder="경도"
          />
          <input {...register("files")} type="file" name="files" />
          <Button
            type="submit"
            value={loading ? "처리중..." : "등록"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
    </Layout>
  );
}

export default Add;
