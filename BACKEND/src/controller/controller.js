const Company = require('../models/companys');

module.exports = {
    getDataById: async (req, res) => {
        try {
            const result = await Company.findById({ _id: req.params.id });

            if (!result) {
                res.status(404).send({ message: 'Company Not Found' });
            } else {
                res.status(200).send({ result, message: 'successfull' });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send({
                error: 'Something went wrong try again later',
            });
        }
    },

    getData: async (req, res) => {
        try {
            const result = await Company.find();

            if (!result || result.length === 0) {
                res.status(404).send({ message: 'List is empty' });
            } else {
                res.status(200).send({ result, message: 'successfull' });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send({
                error: 'Something went wrong try again later',
            });
        }
    },

    createData: async (req, res) => {
        try {
            if (!req.file || !req.file.path) {
                res.status(400).send({
                    error: 'Please select company logo',
                });
            } else {
                const data = new Company({
                    name: req.body.name,
                    email: req.body.email,
                    description: req.body.description,
                    phone: req.body.phone,
                    image: req.file.path,
                    state: req.body.state,
                    city: req.body.city,
                });
                const result = await data.save();
                res.status(201).send({
                    result,
                    message: 'Item created successfully',
                });
            }
        } catch (err) {
            if (err.message.includes('duplicate key error collection')) {
                res.status(500).send({
                    error: 'Company name or email already used',
                });
            } else {
                console.log(err);
                res.status(500).send({
                    error: 'Something went wrong try again later',
                });
            }
        }
    },

    updateData: async (req, res) => {
        try {
            if (!req.file || !req.file.path) {
                res.status(400).send({
                    error: 'Please select company logo',
                });
            } else {
                const result = await Company.findByIdAndUpdate(
                    { _id: req.params.id },
                    {
                        name: req.body.name,
                        email: req.body.email,
                        description: req.body.description,
                        phone: req.body.phone,
                        image: req.file.path || req.body.image,
                        state: req.body.state,
                        city: req.body.city,
                    },
                    { new: true }
                );
                res.status(200).send({
                    result,
                    message: 'Item updated successfully',
                });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send({
                error: 'Something went wrong try again later',
            });
        }
    },

    deleteData: async (req, res) => {
        try {
            const result = await Company.findByIdAndDelete({
                _id: req.params.id,
            });
            res.status(200).send({
                result,
                message: 'Item deleted successfully',
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send({
                error: 'Something went wrong try again later',
            });
        }
    },
};
