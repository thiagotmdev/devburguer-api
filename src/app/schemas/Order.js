import mongoose from "mongoose"; //Schema paracido com model mas é um tipo de migration parao banco ja que ele não aceita migration.

const OrderSchema = new mongoose.Schema({
    user: {
        id: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
    },
    products: [{ //Array nesse porque pode ser vários produtos.
        id: {
            type: Number,
            require: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
    },
    ],
    status: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model('Order', OrderSchema);