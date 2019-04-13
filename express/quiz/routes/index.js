const express = require('express');
const router = express.Router();
const quiz = require('../data/questions.json');
const { data } = quiz;
const { questions } = data;

router.get('/', (req, res) => {
    if (!req.cookies.username){
        res.redirect('/login');
    }
    res.clearCookie('lastQuestion');
    res.render('main', { username: req.cookies.username});
})

router.get('/login', (req, res) => {
    if (req.cookies.username){
        res.redirect('/');
    }
    res.render('login');
})

router.post('/login', (req, res) => {
    const username = req.body.username; 
    if(username.length > 0) {
        res.cookie('username', username);
        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
})

router.post('/delete', (req, res) => {
    res.clearCookie('username');
    res.redirect('/login');
})

router.get('/question', (req, res) => {
    //if there is no cookie for the last question id, start from 0
    let nextId;
    const quizLength = questions.length;
    const {lastQuestion} = req.cookies;

    if(!lastQuestion){
        nextId = 0;
    }
    else {
        nextId = parseInt(lastQuestion) + 1;
    }

    if(nextId < quizLength) {
        res.cookie('lastQuestion', nextId);
        res.redirect('/question/' + nextId);
    }
    else {
        res.redirect('/results');
    }
    
})

router.get('/question/:id', (req, res) => {
    //check for cookie and redirect if the id is wrong
    const {lastQuestion} = req.cookies;
    const { id } = req.params;
    if(lastQuestion !== id) {
        res.redirect('/question');
    }


    const question = questions[id];
    res.locals.question = question.question;
    res.locals.answers = question.answers;
    res.render('question');
})

router.post('/answer', (req, res) => {
    const question = req.body.qn;
    res.redirect("/question");
})

router.get('/results', (req, res) => {
    res.render('results');
})

module.exports = router;