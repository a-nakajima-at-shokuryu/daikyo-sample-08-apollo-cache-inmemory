import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

import Button from '@material-ui/core/Button'


const GET_LOCAL_STATE = gql`
    query {
        selectedBusho @client
    }
`

export default function SubmitButton() {

    // ボタンクリック時
    const doClickButton = () => {
        alert(selectedBusho)
    }

    // ローカルステート取得
    const { data } = useQuery(GET_LOCAL_STATE)
    const selectedBusho = data.selectedBusho

    return (
        <div>
            <Button variant="contained" color="primary" onClick={e => doClickButton()}>選択されている値を取得</Button>
        </div>
    )

}
