import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <Shops />
      <ActiveShop />
    </div>
  );
}

const GET_SHOPS = gql`
  query GetShops {
    allShops {
      id
      name
    }
  }
`;

function Shops() {
  const { loading, error, data } = useQuery(GET_SHOPS);

  if (loading) return <p>"Loading..."</p>;
  if (error) {
    console.log(error);
    return <p>"Error..."</p>;
  }

  return (
    <div>
      <h2>All Shops</h2>
      {data.allShops.map((shop: any) => (
        <p>{`id: ${shop.id}, name: ${shop.name}`}</p>
      ))}
    </div>
  );
}

const GET_SHOP = gql`
  query GetShop($id: Int) {
    shop(id: $id) {
      id
      name
    }
  }
`;
function ActiveShop() {
  const [activeShopId, setActiveShopId] = useState(1);
  const { loading, error, data } = useQuery(GET_SHOP, {
    variables: { id: activeShopId }
  });

  let content = "";
  // console.log({ loading, data });
  if (loading) content = "loading";
  if (error) console.log({ ...error });
  if (data) content = data.shop?.name ?? "not found";

  return (
    <div>
      <h2>Active Shop</h2>
      <input
        type={"number"}
        value={activeShopId}
        onChange={(e) => setActiveShopId(parseInt(e.target.value))}
      ></input>
      <p>{content}</p>
    </div>
  );
}
