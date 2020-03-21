const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

// スキーマの定義
const schema = buildSchema(`

    # Queryスキーマ
    type Query {
        busho(id: Int): [Busho]
    }
  
    # Bushoスキーマ
    type Busho {
        id: Int
        name: String
    }

`)

// 部署配列
const dummyBushos = [
    { id: 10, name: '部署Ａ'},
    { id: 20, name: '部署Ｂ'},
    { id: 30, name: '部署Ｃ'},
    { id: 40, name: '部署Ｄ'},
    { id: 50, name: '部署Ｅ'},
    { id: 60, name: '部署Ｆ'},
]

const root = {

    // idを条件に検索
    busho: args => {

        // 引数を変数に格納
        const id = args.id
        console.log(id)

        // 一旦、部署配列の全件を変数に格納
        let dat = dummyBushos
        console.log(dat)

        // idが指定されていたら、フィルタリング
        if (id !== undefined) {
            dat = dat.filter(busho => busho.id == id)
        }
        console.log(dat)

        return dat
    },

}
  
const app = express()

// クロスドメイン対応
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, access_token'
    )
    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200)
    } else {
        next()
    }
}
app.use(allowCrossDomain)

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
  
app.listen(5000, () => console.log('Example app listening on port 5000!'))
