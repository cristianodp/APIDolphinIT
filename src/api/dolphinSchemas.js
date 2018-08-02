const { mongoose } = require("node-restful");
const Schema = mongoose.Schema;

const ownerSchema = new mongoose.Schema({
    description: { type: String, unique: true, required: true }
})

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, min: 6, max: 12, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    ownerId: { type: Schema.Types.ObjectId, ref: 'owner', require: true },
})

const categorySchema = new mongoose.Schema({
    description: { type: String, unique: true, required: true },
    note: { type: String, required: true },
    uplevelId: { type: Schema.Types.ObjectId, ref: 'category', require: false },
    color: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'owner', require: true },
})

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {type: String, required: true, uppercase: true, enum: ['PERSON','ORGANIZATION']},
    description: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, unique: true, required: false },
    avatar: { type: String, required: false },
    ownerId: { type: Schema.Types.ObjectId, ref: 'owner', require: true },
})

const itemSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: false },
    dueDate: { type: Date, required: false },
    detail: { type: String, required: false},
    customerId: { type: String, required: true },
    uplevelId: { type: Schema.Types.ObjectId, ref: 'item', require: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'category', require: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'owner', require: true },
})

module.exports = {
    ownerSchema,
    userSchema,
    categorySchema,
    customerSchema,
    itemSchema
}
