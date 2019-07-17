const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)         //Same as creating a new user, but new task     
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })                            
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch (error){
        res.status(400).send(error)
    }
})

//GET /tasks?completed=true
//GET /tasks?limit=2
//GET /tasks?skip=2 
//GET /tasks?sortBy=-1
router.get('/tasks/me',auth,  async (req, res) => {
    if(req.query.completed === 'true'){
        try{
            const tasks = await Task.find({
                owner: req.user._id,
                completed: req.query.completed
            },null, {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: -1
                }
            })
            res.status(201).send(tasks)
        }
        catch(error){
            res.status(500).send(error)
        }
    }else if(req.query.completed === 'false'){
        try{
            const tasks = await Task.find({
                owner: req.user._id,
                completed: req.query.completed
            },null, {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: -1
                }
            })
            res.status(201).send(tasks)
        }
        catch(error){
            res.status(500).send(error)
        }
    }else{
        try{
            const tasks = await Task.find({
                owner: req.user._id
            },null, {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: -1
                }
            })
            res.status(201).send(tasks)
        }
        catch(error){
            res.status(500).send(error)
        }
    }

    
})

//GET /tasks?completed=true
//GET /tasks?limit=2
//GET /tasks?skip=2 
//GET /tasks?sortBy=-1
router.get('/tasks', async (req, res) => {
    if(req.query.completed === 'true'){
        try{
            const tasks = await Task.find({
                completed: req.query.completed
            },null, {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: -1
                }
            })
            res.status(201).send(tasks)
        }
        catch(error){
            res.status(500).send(error)
        }
    }else if(req.query.completed === 'false'){
        try{
            const tasks = await Task.find({
                completed: req.query.completed
            },null, {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: -1
                }
            })
            res.status(201).send(tasks)
        }
        catch(error){
            res.status(500).send(error)
        }
    }else{
        try{
            const tasks = await Task.find({},null, {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: -1
                }
            })
            res.status(201).send(tasks)
        }
        catch(error){
            res.status(500).send(error)
        }
    }

    
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id               //way to retrive the param from url
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.status(200).send(task)
    }
    catch(error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        res.status(400).send({error: 'Invalid Update'})
    }

    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    }
    catch (error) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id })
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }
    catch(error){
        res.status(500).send()
    }
})

module.exports = router