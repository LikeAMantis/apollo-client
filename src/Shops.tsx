import React from "react";
import {gql, useQuery} from "@apollo/client";

const GET_SHOPS = gql`
    query GetShops {
        allShops {
            id
            name
            type
        }
    }
`;

export function Shops() {
    const {loading, error, data} = useQuery(GET_SHOPS);

    if (loading) return <p>"Loading..."</p>;
    if (error) {
        console.log(error);
        return <p>"Error..."</p>;
    }
    console.log(data)

    return (
        <div>
            <h2>All Shops</h2>
            {data.allShops.map((shop: any) => (
                <p key={shop.id}>{JSON.stringify(shop)}</p>
            ))}
        </div>
    );
}