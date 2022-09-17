import {gql, useQuery} from "@apollo/client";
import React, {useState} from "react";

const GET_SHOP = gql`
    query GetShop($id: Int) {
        shop(id: $id) {
            id
            name
            type
        }
    }
`;

export function ActiveShop() {
    const [activeShopId, setActiveShopId] = useState(1);
    const {loading, error, data} = useQuery(GET_SHOP, {
        variables: {id: activeShopId}
    });

    let content = "";
    if (loading) content = "loading";
    if (error) console.log({...error});
    if (data) content = JSON.stringify(data.shop ?? "not found");

    return (
        <div>
            <h2>Active Shop</h2>
            <input
                type={"number"}
                value={activeShopId}
                onChange={(e) => setActiveShopId(parseInt(e.target.value))}
            />
            <p>{content}</p>
        </div>
    );
}