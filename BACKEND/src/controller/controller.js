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
            res.status(500).send({ error: err.message });
        }
    },

    getData: async (req, res) => {
        try {
            const result = await Company.find();

            if (!result || result.length === 0) {
                res.status(404).send({ message: 'List is empty' });
            }
            res.status(200).send({ result, message: 'successfull' });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    createData: async (req, res) => {
        try {
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
            res.status(201).send({ result, message: 'successfull' });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    updateData: async (req, res) => {
        try {
            const result = await Company.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    name: req.body.name,
                    email: req.body.email,
                    description: req.body.description,
                    phone: req.body.phone,
                    image: req.file.path,
                    state: req.body.state,
                    city: req.body.city,
                },
                { new: true }
            );
            res.status(200).send({ result, message: 'successfull' });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },

    deleteData: async (req, res) => {
        try {
            const result = await Company.findByIdAndDelete({
                _id: req.params.id,
            });
            res.status(200).send({ result, message: 'successfull' });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    },
};
