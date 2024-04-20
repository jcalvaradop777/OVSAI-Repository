const { Schema, models, model } = require("mongoose");

const EstacionScheme = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        trim: true
    },
    lat: {
        type: String,
        trim: true
    },
    long: {
        type: String,
        trim: true
    },
    color: {
        type: String,
    },
    type: {
        type: Number,
        required: [true, "El tipo es requerido"]
    },
    state: {
        type: Boolean,
        required: [true, "El estado es requerido"]
    },
    emplazamiento: {
        type: String,
        trim: true        
    }
});

export default models.Estacion || model("Estacion", EstacionScheme);