const { userExists, createUser, updateUser, deleteUser, getAll, searchUser } = require('../model/User');

class UserController {
    
    getUsers = (req, res) => {
        getAll(result => {
            return res.status(200).json({
                status: true,
                data: result
            });
        });
    }

    show = (req, res) => {
        const {params} = res.req;
        
        if(!params.id){
            return res.status(205).json({
                status: false,
                message: "Param id not finded"
            });
        }

        userExists({
            column: "id",
            value: params.id
        }, result => {
            if(result.length == 0){
                return res.status(205).json({
                    status: false,
                    message: "Resource not finded"
                });
            }

            return res.status(200).json({
                status: true,
                data: result
            });
        })
    }

    create = async (req, res) => {
        const { body } = req;

        if (!body.username || !body.password) {
            return res.status(205).json({
                status: false,
                message: "Todo los campos son obligatorios"
            });
        }

        userExists({
            column: "username",
            value: body.username
        }, result => {
            if (result.length > 0) {
                return res.status(200).json({
                    status: false,
                    message: "Usuario ya existente"
                });
            }

            createUser(body, response => {
                return res.status(200).json({
                    status: true,
                    message: "Nuevo usuario creado"
                });
            });
        });
    }

    update = async (req, res) => {
        const { body } = req;

        if (!body.id || !body.username || !body.password) {
            return res.status(205).json({
                status: false,
                message: "Todo los campos son obligatorios"
            });
        }

        userExists({
            column: "id",
            value: body.id
        }, result => {
            if (result.length == 0) {
                return res.status(200).json({
                    status: false,
                    message: "Usuario no encontrado"
                });
            }

            updateUser(body, result => {
                return res.status(200).json({
                    status: true,
                    message: "datos del usuario actualizado"
                });
            });
        });
    }

    destroy = (req, res) => {
        const { body } = req;

        if (!body.id) {
            return res.status(205).json({
                status: false,
                message: "Todo los campos son obligatorios"
            });
        }

        userExists({
            column: "id",
            value: body.id
        }, result => {
            if (result.length == 0) {
                return res.status(200).json({
                    status: false,
                    message: "Usuario no encontrado"
                });
            }

            deleteUser(body, result => {
                return res.status(200).json({
                    status: true,
                    message: "Usuario eliminado"
                });
            });
        });
    }

    search = (req, res) => {
        const { body } = req;

        if (!body.username) {
            return res.status(205).json({
                status: false,
                message: "Campo obligatorio"
            });
        }

        searchUser({
            column: "username",
            value: body.username,
        }, result => {
            if (result.length == 0) {
                return res.status(200).json({
                    status: false,
                    message: "Recurso no encontrado"
                });
            }

            return res.status(200).json({
                status: true,
                data: result
            });
        });
    }

}


module.exports = new UserController();
