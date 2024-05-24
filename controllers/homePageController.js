const e = require('express');
const Vitals = require('../models/vitalsModel');

const displayHomePage = async (req, res) => {
  try {
    res.render('home', {authenticated : req.session.authenticated, userID: req.session.id});
  } catch (error) {
    res.status(500).send(error);
  }
};

const displayVitalsPage = async (req, res) => {
  try {
      res.render('vitalsPage', {authenticated : req.session.authenticated, userID: req.session.userid});
  } catch (error) {
      res.status(400).send(error);
  }
};

const displayBodyCompPage = async (req, res) => {
  try {
      res.render('bodyComposition', {authenticated : req.session.authenticated, userID: req.session.id});
  } catch (error) {
      res.status(400).send(error);
  }
};

const displayBloodPage = async (req, res) => {
  try {
      res.render('bloodPage', {authenticated : req.session.authenticated, userID: req.session.id});
  } catch (error) {
      res.status(400).send(error);
  }
};

const getUserInfo = async (req, res) => {
  userID = req.params.id;
  try{
    const userVitalInfo = await Vitals.findOne({userID: userID});
    res.send(userVitalInfo);
  } catch (error){
    res.status(400).send(error);
  }
};

module.exports = {
  displayHomePage,
  displayVitalsPage,
  displayBodyCompPage,
  displayBloodPage,
  getUserInfo,
};