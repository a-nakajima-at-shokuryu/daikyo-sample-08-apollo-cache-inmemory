import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'


const GET_BUSHO_ALL = gql`
    query getBusho($id: Int) {
        selectedBusho @client
        busho(id: $id) {
            id
            name
        }
    }
`

const CHANGE_BUSHO = gql`
    mutation changeBusho($id: Int!) {
        mutChangeBusho(id: $id) @client
    }
`

export default function Busho() {

    // 部署変更時
    const doChangeSelect = (e) => {
        // console.log(e.target.value)
        mutChangeBusho({
            variables: {
                'id': e.target.value
            }
        })
    }

    // useMutaion
    const [mutChangeBusho] = useMutation(CHANGE_BUSHO)

    // ローカルステート＆部署全件取得
    const { loading, error, data } = useQuery(GET_BUSHO_ALL, {
        variables: {
            // 'id': '10'
        },
    })
    
    // 通信状態に応じたコンポーネントを表示
    if (loading) return <p>Loading...</p>
    if (error)   return <p>Error: {error}</p>
    
    const selectedBusho = data.selectedBusho
    const bushos = data.busho
    // console.log(selectedBusho)
    // console.log(bushos)

    return (
        <div>
            <InputLabel id="busho-select-label">部署</InputLabel>
            <Select
                labelId="busho-select-label"
                id="busho-select"
                value={selectedBusho}
                onChange={e => doChangeSelect(e)}
            >
            {bushos.map(repo => (
                <MenuItem value={repo.id}>{repo.id} - {repo.name}</MenuItem>
            ))}
            </Select>
        </div>
    )

}
