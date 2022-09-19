const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Blog = require('./Models/Post');
const Post = require('./Models/Post');

const app = express();
const PORT = 3001;

// Connect DB
mongoose.connect('mongodb://localhost/clean-blog', {
    useNewUrlParser : true,
    useUnifiedTopology : true 
})

// Template Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('index',{
        posts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add_post', (req, res) => {
    res.render('add_post');
});

app.get('/post', (req, res) => {
    res.render('post');
});

app.post('/posts', async (req, res) => {
    await Post.create(req.body);
    res.redirect('/')
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı...`);
});