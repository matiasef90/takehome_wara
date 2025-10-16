const { assets } = require('../../config');
const Assets = require('../model/Assets');

exports.createAsset = async({name, status, type, owner}) => {
    return await Assets.create({name, status, type, owner});
}

exports.getAllAssets = async () => {
    return await Assets.findAll({ where: { isDeleted: false } });
}

exports.getAssetById = async (id) => {
    return await Assets.findOne({
        where: { id, isDeleted: false },
    });
}

exports.deleteAsset = async (id) => {
    return await Assets.update(
        { isDeleted: true },
        { where: { id, isDeleted: false } }
    );
}

exports.updateAsset = async ({id, name, status, type, owner}) => {
    return await Assets.update(
        { name, status, type, owner },
        { where: { id, isDeleted: false } }
    );
}

exports.createAssetController = ({createAsset}) => async (req, res) => {
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
            owner: body.owner,
        };

        const asset = await createAsset(newAssetData);
        return res.status(201).json(asset);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Error al crear el activo.', 
            error: error.message 
        });
    }
};

exports.getAllAssetsController = ({getAllAssets}) => async (req, res) => {
    try {
        const {count, rows} = await getAllAssets();
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

exports.getAssetByIdController = ({getAssetById}) => async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: 'ID del activo es obligatorio.' });
        }
        const asset = await getAssetById(id);

        if (!asset) {
            return res.status(404).json({ message: `Activo con ID ${id} no encontrado.` });
        }
        return res.status(200).json(asset);
    } catch (error) {
        return res.status(500).json({ message: 'Error al buscar el activo.', error: error.message });
    }
};

exports.updateAssetController = ({updateAsset, getAssetById}) => async (req, res) => {
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

        const updatedData = { ...req.body, id };

        await updateAsset(updatedData);

        const updatedAsset = await getAssetById(id);
        return res.status(200).json(updatedAsset);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el activo.', error: error.message });
    }
};

exports.deleteAssetController = ({deleteAsset}) => async (req, res) => {
    try {
        const { id } = req.params;

        await deleteAsset(id);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el activo.', error: error.message });
    }
};