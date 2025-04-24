const { body, validationResult } = require('express-validator');

const validateTask = [
    body('name')
        .trim()
        .notEmpty().withMessage('Task name is required')
        .isLength({ max: 100 }).withMessage('Task name can be at most 100 characters long'),

    body('completed')
        .optional()
        .isBoolean().withMessage('Completed must be a boolean'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateTask };
