import {gql, useMutation} from "@apollo/client";
import React, {useState} from "react";

const ADD_SHOP = gql`
    mutation AddShop($name: String!) {
        addShop(name: $name) {
            id name type
        }
    }
`;

export function AddShop() {
    const [value, setValue] = useState("");
    const [addShop, {data, loading, error}] = useMutation(ADD_SHOP,
        // {refetchQueries: ["GetShops"]}
        {
            update(cache, { data: { addShop } }) {
                cache.modify({
                    fields: {
                        allShops(existingTodos = []) {
                            const newTodoRef = cache.writeFragment({
                                data: addShop,
                                fragment: gql`
                                    fragment NewTodo on Shops {
                                        name
                                    }
                                `
                            });
                            // console.log({existingTodos, newTodoRef})
                            return [...existingTodos, newTodoRef ];
                        }
                    }
                });
            }
        }
    );

    return (
        <div>
            <h2>Add Shop!</h2>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addShop({variables: {name: value}});
                    setValue("");
                }}
            >
                <input
                    onChange={event => setValue(event.target.value)}
                />
                <button type="submit">Add Shop</button>
            </form>
            {data && <p>{JSON.stringify( data.addShop)}</p>}
        </div>
    )
}
