export default {
    type: 'object',
    required: ['title', 'price'],
    properties: {
        title: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        count: { type: 'number' },
    },
} as const;
