// @flow
import * as React from 'react';
import {FC, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {logMissingFieldErrors} from "@apollo/client/core/ObservableQuery";

type Props = {

};


const UPDATE_SHOP = gql`
    mutation UpdateShop($id: Int!, $type: String!) {
        updateShop(id: $id, type: $type) {
            id type
        }
    }
`;

type FormValues = {
    id: number,
    type: string,
}

export function UpdateShop(props: Props) {
    const [state, setState] = useState<FormValues>({id: 0, type: ""});
    const [updateShop, {data, loading, error}] = useMutation(UPDATE_SHOP)

    function handleChange(e) {
      const value = e.target.value;
      const name = e.target.name;
      setState({
        ...state,
        [name]: value
      });
    }

    let content = "";
    if (loading) content = "loading";
    else if (error) console.log({...error});
    else content = JSON.stringify(data?.updateShop ?? "not found");

    return (
        <div>
            <h2>Change Shop</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                updateShop({variables: {id: parseInt(state.id), type: state.type}})
            }}>
                <label>ID
                    <input type={"number"} name={"id"} onChange={handleChange} value={state.id}/>
                </label>
                <label>Type
                    <input name={"type"} onChange={handleChange} value={state.type}/>
                </label>
                <button type={"submit"} >Submit</button>
            </form>
            <p>{content}</p>
        </div>
    );
};