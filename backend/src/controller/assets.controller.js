const { assets } = require('../../config');
const Assets = require('../model/Assets');

exports.createAsset = async (req, res) => {
    try {
        const body = req.body;
        if (!body || !body.name || !body.status || !body.type || !body.owner) {
            return res.status(400).json({ message: 'Faltan campos obligatorios.' });
        }

        if (!assets.status.includes(body.status)) {
            return res.status(400).json({ message: 'Estado no válido.' });
        }

        if (!assets.types.includes(body.type)) {
            return res.status(400).json({ message: 'Tipo no válido.' });
        }

        const newAssetData = {
            name: body.name,
            status: body.status,
            type: body.type,
            owner: body.owner
        };

        const asset = await Assets.create(newAssetData);
        return res.status(201).json(asset);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Error al crear el activo.', 
            error: error.message 
        });
    }
};

exports.getAllAssets = async (req, res) => {
    try {
        const {count, rows} = await Assets.findAndCountAll({
            where: { isDeleted: false },
        });
        return res.status(200).json({
            assets: rows,
            total: count
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los activos.',
            error: error.message
        });
    }
};

exports.getAssetById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: 'ID del activo es obligatorio.' });
        }

        const asset = await Assets.findOne({
            where: { id, isDeleted: false },
        });

        if (!asset) {
            return res.status(404).json({ message: `Activo con ID ${id} no encontrado.` });
        }
        return res.status(200).json(asset);
    } catch (error) {
        return res.status(500).json({ message: 'Error al buscar el activo.', error: error.message });
    }
};

exports.updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        if (
            !req.body ||
            !req.body.name ||
            !req.body.status ||
            !req.body.type ||
            !req.body.owner
        ) {return res.status(400).json({ message: 'Faltan campos obligatorios.' });}

        if (!assets.status.includes(req.body.status)) {
            return res.status(400).json({ message: 'Estado no válido.' });
        }

        if (!assets.types.includes(req.body.type)) {
            return res.status(400).json({ message: 'Tipo no válido.' });
        }

        const updatedData = { ...req.body };
        delete updatedData.id;

        await Assets.update(updatedData, {
            where: { id: id, isDeleted: false }
        });

        const updatedAsset = await Assets.findByPk(id);
        return res.status(200).json(updatedAsset);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el activo.', error: error.message });
    }
};

exports.deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;

        await Assets.update(
            { isDeleted: true },
            { where: { id: id, isDeleted: false } }
        );

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el activo.', error: error.message });
    }
};