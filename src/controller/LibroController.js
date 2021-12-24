const {getAllType, searchType, typeExists, createType, updateType, deleteType} = require('../model/TipoLibro'); 

class LibroController{

    getTypeBooks = (req, res) => {
        getAllType(result => {
            return res.status(200).json({
                status: true,
                data: result
            });
        });
    }

    searchTypeBooks = (req, res) => {
        const {body} = req;
        
        if(!body.name){
            return res.status(205).json({
                status: false,
                message: "Input name required"
            });
        }

        searchType({
            column: "nombre_tipo",
            value: body.name
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
        });
    }
    
    showTypeBook = (req, res) => {
        const {params} = res.req;
        
        if(!params.id){
            return res.status(205).json({
                status: false,
                message: "Param id not finded"
            });
        }

        typeExists({
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

    createTypeBook = (req, res) => {
        const {body} = req;

        if(!body.name || !body.description){
            return res.status(205).json({
                status: false,
                message: "Inputs name, description required"
            });
        }
        
        typeExists({
            column: 'nombre_tipo',
            value: body.name
        }, result => {
            if(result.length > 0){
                return res.status(200).json({
                    status: false,
                    message: "Type book existend"
                });
            }
            
            createType(body, response => {
                return res.status(200).json({
                    status: true,
                    message: "Created new type book"
                });
            })
        });
        
        
    }

    updateTypeBook = (req, res) => {
        const {body} = req;
        
        if(!body.id || !body.name || !body.description){
            return res.status(205).json({
                status: false,
                message: "Complete the input required"
            });
        }

        typeExists({
            column: 'id',
            value: body.id
        }, result => {
            if(result.length == 0){
                return res.status(200).json({
                    status: false,
                    message: "Resource not finded"
                });
            }
            
            updateType(body, result => {
                return res.status(200).json({
                    status: true,
                    message: "Updated data"
                });
            })
        })

    }

    destroyTypeBook = (req, res) => {
        const {body} = req;

        if(!body.id){
            return res.status(205).json({
                status: false,
                message: "Input id required"
            });
        }

        typeExists({
            column: "id",
            value: body.id
        }, result => {
            if(result.length == 0){
                return res.status(200).json({
                    status: false,
                    message: "Resource not finded"
                }); 
            }

            deleteType(body, result => {
                return res.status(200).json({
                    status: true,
                    message: "Deleted type book"
                });
            });

        });
    }

}

module.exports = new LibroController();
