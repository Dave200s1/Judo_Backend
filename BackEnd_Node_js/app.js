const { error } = require('console');
const express = require('express')
const fs = require('fs');
const { default: mongoose } = require('mongoose');
const path = require('path');
require ('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;



//Connection aufbauen
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('Mit MongoDB Atlas erfolgreich verbunden'))
.catch(err =>{
    console.error('MongoDB Verbindugsfehler:',err);
    process.exit(1);
});


//Schemas definieren
const trainerSchema = new mongoose.Schema({
        name: String,
        grad: String,
        image: String,
        bio: String
});

const scheduleSchema = new mongoose.Schema({
        tag: String,
        zeit: String,
        gruppe: String,
        trainer: String
});

const gallerySchema = new mongoose.Schema({
        title: String,
        image: String,
        date: String,
        description: String
});


const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    match: [/\S+@\S+\.\S+/, 'Bitte gib eine gültige E-Mail ein']
  },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});


const Trainer = mongoose.model('Trainer', trainerSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);
const Gallery = mongoose.model('Gallery', gallerySchema);
const Contact = mongoose.model('Contact', contactSchema);

app.use('/imgs',express.static(path.join(__dirname, 'imgs')));

app.use(express.json());

app.get('/',(req, res ) =>{
    res.send('Judo Dojo Backend server, herzlich willkommen!');
});

app.get('/api/trainer', async (req, res) =>{
    try{
        const trainers = await Trainer.find();
        res.json(trainers);
    }catch (error){
        console.error('Fehler beim laden der Trainer Daten:',error);
        res.status(500).json({
            error: 'Server Fehler'
        });
    }
});

app.get('/api/gallery', async (req, res) => {
    try{
        const gallery = await Gallery.find();
        res.json(gallery);
    }catch (error){
        console.error('Fehler beim laden der Galerie:',error);
        res.status(500).json({
            error: 'Server Fehler'
        });
    }
});

app.get('/api/schedule', async (req, res)=>{
    try{
        const schedule = await Schedule.find();
        res.json(schedule);
    }catch (error){
        console.error('Fehler beim laden der Galerie:',error);
        res.status(500).json({
            error: 'Server Fehler'
        });
    }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validierung
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Alle Felder müssen ausgefüllt werden!'
    });
  }

  try {
    // Neuen Kontakt in MongoDB erstellen
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();
    
    console.log('📧 Neue Kontaktanfrage in MongoDB gespeichert:', {
      name,
      email,
      message
    });
    
    res.status(201).json({
      success: true,
      message: 'Nachricht empfangen und gespeichert',
      contactId: newContact._id
    });
  } catch (error) {
    console.error('Fehler beim Speichern des Kontakts:', error);
    res.status(500).json({
      error: 'Nachricht konnte nicht gespeichert werden'
    });
  }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}` )
});
