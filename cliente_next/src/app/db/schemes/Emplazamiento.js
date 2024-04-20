const { Schema, models, model } = require("mongoose");

const EmplazamientoScheme = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        trim: true
    },
    lat: {
        type: String,
        required: [true, "La latitud es requerida"],
        trim: true
    },
    long: {
        type: String,
        required: [true, "La longitud es requerida"],
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
    }
});

export default models.Emplazamiento || model("Emplazamiento", EmplazamientoScheme);