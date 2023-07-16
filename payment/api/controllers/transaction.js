module.exports = function (Service) {
    return {
        post: async (req, res, next) => {
            try {
                const service = await Service.create(req.body, req.user);
                res.status(201).json(service);
            } catch (err) {
                next(err);
            }
        },
        get: async (req, res, next) => {
            try {
                const user = await Service.findById(parseInt(req.params.id));
                if (!user) return res.sendStatus(404);
                res.json(user);
            } catch (err) {
                next(err);
            }
        },
        search: async (req, res, next) => {
            try {
                const queryParams = req.query; // Ceci récupère tous les paramètres de requête

                // En supposant que Service.search est une fonction qui gère la logique de recherche
                const results = await Service.search(queryParams);

                if (!results || results.length === 0) {
                    return res.status(404).json({ message: 'Aucun résultat trouvé' });
                }

                res.json(results);
            } catch (err) {
                next(err);
            }
        },
        getAll: async (req, res, next) => {

        },
        
        postPSP: async (req, res, next) => {
            await fetch(`${process.env.PSP_URL}/psp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body)
            })
                .then(async response => {
                    console.log(await response.text());
                    if (!response.ok) {
                        res.status(422).json({ urlFailed: req.user.redirectUrlCancellation });
                    } else {
                        res.json({ confirmationUrl: req.user.redirectUrlConfirmation });
                    }
                })
                .catch(error => {
                    console.error('Error sending payment response:', error.message);
                });
        },
    };
};