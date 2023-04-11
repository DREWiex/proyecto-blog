const fetchingData = require('../helpers/fetch');

/**
 * @function
 * @async
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 */

const getEntries = async (req, res) => {

    /**
     * @const {Number} page Recibe el valor del query page o 1 será su valor por defecto
     */

    const page = req.query.page || 1;

    /**
     * @const {String} url Ruta de la API que se envía al fetch() como argumento
     */
    
    const url = `${process.env.URL_BASE_API_ENTRIES}/?page=${page}`;

    try {

        const { response } = await fetchingData(url);

        res.render('index', {
            entries: response.entries.docs,
            pagination: response.entries,
            token: req.cookies.token || ''
        });
        
    } catch (error) {

        console.log(error);
        
    };
    
}; //!FUNC-GETENTRIES

/**
 * @function
 * @async
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 */

const getEntry = async (req, res) => {

    /**
    * @const {String} url Ruta de la API que se envía al fetch() como argumento
    */

    const url = `${process.env.URL_BASE_API_ENTRIES}/${req.params.id}`;

    try {
        
        const { ok, response } = await fetchingData(url);

        if(ok){

            res.render('entry.ejs', {
                entry: response.entry,
                token: req.cookies.token || ''
            });

        };

    } catch (error) {
        
        console.log(error);

    };

}; //!FUNC-GETENTRY

/**
 * @function
 * @async
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 */

const searchEntries = async (req, res) => {

    /**
    * @const {Number} page Recibe el valor del query page o 1 será su valor por defecto
    */

    const page = req.query.page || 1;

    /**
    * @const {String} url Ruta de la API que se envía al fetch() como argumento
    */

    const url = `${process.env.URL_BASE_API_ENTRIES}/?search=${req.query.search}&page=${page}`; // "obligo" al fetch a que entre por el 'if' del controller getEntries del back
    
    try {

        if(req.query.search != ''){ // solución temporal hasta que aplique el check (express-validator) al input del buscador

            const { response } = await fetchingData(url);

            res.render('result', {
                entries: response.entries.docs,
                search: req.query.search,
                token: req.cookies.token || '',
                pagination: response.entries
            });

        } else {

            res.redirect('/'); // solución temporal hasta que aplique el check (express-validator) al input del buscador

        };
        
    } catch (error) {

        console.log(error);
        
    };

}; //!FUNC-SEARCHENTRIES


module.exports = {
    getEntries,
    getEntry,
    searchEntries
};