const users = [
    {
        email: 'manufacturer@example.com',
        // Password: manufacturer123
        password: '$2b$10$Ck19ywB7yg6552UffP0cyeR6JnEFtG0DY41wFDNCEFWV/FD41Ey9q',
        role: 'Manufacturer'
    },
    {
        email: 'qualitycontrol@example.com',
        // Password: qualitycontrol123
        password: '$2b$10$yHWMpLbU0PCNun8919dQ.eUrGoVoaBH9ZCmTA4U3iGSjelJRARk16',
        role: 'QualityControl'
    },
    {
        email: 'distributor@example.com',
        // Password: distributor123
        password: '$2b$10$EAisKjJ30zRT/YtSYV19x.i7S8AkpVY4SqbtMa/UZESio8Z6xQisq',
        role: 'Distributor'
    },
    {
        email: 'pharmacy@example.com',
        // Password: pharmacy123
        password: '$2b$10$TC.yd8Y0VMM/T6CbjzwjLuClyyEIaDNk59KtIqHvU8m9DkrO3Xeu6',
        role: 'Pharmacy'
    },
];

export default {
    findByEmail: async (email) => users.find(u => u.email === email)
};