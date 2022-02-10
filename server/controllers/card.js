import Card from "../models/card.js";


const createTask = async (req,res) => {
    try {
        const card = new Card({
            ...req.body,
            owner : req.user._id
        });
        await card.save();
        res.send(card)
    } catch (e) {
        res.send(e)
    }
}


const getTaskById = async (req,res) => {
    console.log(req.user)
    try {
        const _id = req.params.id
        console.log(_id)
        console.log(req.user._id)
        const task = await Card.findOne({ _id, owner : req.user._id })
        if (!task) {
            res.send({error: 'Task not found'})
        }
        res.send(task)
    } catch (e) {
        res.send({error: e})
    }
}
const updateGraph = async (req,res) => {
    try {
        console.log("body",req.body.title)
        const _id = req.params.id
        const filterGraph = { _id, owner : req.user._id };
        // const updateGraph = { options.plugins.title.text : {req.body} }
        const task = await Card.findOneAndUpdate(filterGraph,{$set: {'description.options.plugins.title.text': req.body.title}},{ new: true })
        console.log("task",task)
        console.log("title is",task.description.options.plugins.title.text)
        if (!task) {
            res.send({error: 'Task not found'})
        }
        res.send(task)
    } catch (e) {
        res.send({error: e})
    }
}

const getAllTasks = async (req,res) => {
    try {
    const tasks = await Card.find({ owner : req.user._id })    
    res.send(tasks)
    } catch (e) {
        res.send(e)
    }
}

const deleteTask = async (req,res) => {
    try {
        const _id = req.params.id
        const task = await Card.findOneAndDelete({ _id : req.params.id, owner : req.user._id })    
        res.send("Task was deleted")
    } catch (e) {
        res.send(e)
    }
}

export { createTask, getTaskById, getAllTasks, deleteTask, updateGraph };