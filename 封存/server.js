const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const userSchema = require('./userSchema.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const request = require("request");
const Dataset = require('./dataSchema')
const express_jwt = require('express-jwt')
const bodyParser = require('body-parser')
//require('dotenv').config();
const cors = require('cors')
const url = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6&fbclid=IwAR29Q4ujUKkHv6HY9ew_OIECUQqcyxylyXROLRO7Hi31AXGNtUB6gs1-rCc"
const GeoJSON = require('geojson');
const PORT = 8787
const SALT_ROUNDS = 3
const SECRET = "TESTING"
const app = express()
const authMiddleware = express_jwt({
    secret: SECRET,
    credentialsRequired: false
})
const dbURL = "mongodb+srv://oprtvx2234:S987654321@activity-cz79g.mongodb.net/test?retryWrites=true"
const conditions = [  
    {$unwind:"$showInfo"},
    { $project: {
        UID: 1,
        category: 1,
        title: 1,
        'latitude': '$showInfo.latitude',
        'longitude':'$showInfo.longitude',
        'time': '$showInfo.time',
        'endTime': '$showInfo.endTime',
        'location': '$showInfo.location',
        'locationName': '$showInfo.locationName',
        'price': '$showInfo.price',
        'onSales': '$showInfo.onSales',
        descriptionFilterHtml: 1
    }}
]

var _data = undefined

const userModel = mongoose.model('User',new mongoose.Schema({
    id: String, 
    pw: String,
}))

const commentModel = mongoose.model('Comment',new mongoose.Schema({
    content: String,
    postID: String,
    author: String,
    date: String
}))

const postModel = mongoose.model('Post', new mongoose.Schema({
    title: String, 
    author: String, 
    body: String, 
    date: String, 
    likes: Number,
    likers: [String]
}))

app.use(cors())
app.use(bodyParser.json())
app.use(authMiddleware)
app.use('/api', graphqlHTTP((req) => {
    return {
        schema: userSchema,
        rootValue: resolver,
        graphiql: true,
        context: {user: req.user}
    }
}))

app.listen((PORT), (req, res) => {
    mongoose.connect(dbURL,  (err) => {
        if(!err) console.log('mongoDB has already connected!')
    })
    console.log('Listening on port ' + PORT)
})

const createToken = (id, pw, secret) => {
    return jwt.sign({id, pw}, secret, {expiresIn: '1d'})
}

const resolver = {
    createUser: async ({id, pw}) => {
        if(! await userModel.findOne({id: id})) {
            const token = createToken(id, pw, SECRET)
            const hashPW = bcrypt.hashSync(pw, SALT_ROUNDS)
            await userModel.create({id: id, pw: hashPW})
            return token
        }
       else return ''
    },
        
    createComment: async ({content, postID, author}) => {
        const date = new Date().toString()
        await commentModel.create({content: content, postID: postID, author: author, date: date})
        return true
    },

    likePost: async ({postID, liker}) => {
        const post = await postModel.findOne({postID: postID})
        const likerIndex = post.likers.indexOf(liker)
        if(likerIndex === -1) {
            post.likers.push(liker)
            post.likes += 1
        }
        else {
            post.likers = post.likers.splice(likerIndex, 1)
            post.likes -= 1
        }
        post.save()
        return post.likes
    },

    login: async ({id, pw}, req) => {
        const user = await userModel.findOne({id: id})
        if(!user) return ''
        if(await bcrypt.compare(pw, user.pw)) {
            const token = createToken(id, pw, SECRET)
            console.log('ok')
            return token
        } 
        else return ''
    },

    comments: async ({postID}) => {
        const comments = await commentModel.find({postID: postID})
        if(!comments.length) return JSON.stringify([], undefined, 2)
        else return JSON.stringify(comments, undefined, 4)
    },

    totalGeoJson: async () => {
        return await Dataset.count({})
    },

    geoJSON: async ({page, limit}) => {
        const raw_data = await Dataset.aggregatePaginate(Dataset.aggregate(conditions), {page: page, limit: limit})
        const data = GeoJSON.parse(raw_data, {Point: ['latitude', 'longtitude']})
        return JSON.stringify(data, undefined, 2)
    }
}

const fetchData = () => {
    request({url, json:true}, (err, res, body) => {
        let data_set1 = JSON.stringify(body, undefined, 2)
        let data_set = JSON.parse(data_set1);
        Dataset.collection.insertMany(data_set, function(err){
        if (err) {
              console.log(err);
              console.log("錯誤錯誤")
            }
            else {console.log('儲存成功')}
            //saved!
        })
    })
}
